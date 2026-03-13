(function() {
  'use strict';

  function TerminalPlayer(el) {
    this.el = el;
    this.id = el.id;
    this.src = el.dataset.src;
    this.output = el.querySelector('.tp-output');
    this.playBtn = el.querySelector('.tp-play');
    this.skipBtn = el.querySelector('.tp-skip');
    this.gallery = el.querySelector('.tp-gallery');
    this.data = null;
    this.running = false;
    this.paused = false;
    this.completed = false;
    this.stepIndex = 0;
    this.timers = [];

    var self = this;
    this.playBtn.addEventListener('click', function() {
      if (self.completed) {
        self.restart();
      } else if (self.running) {
        self.pause();
      } else if (self.paused) {
        self.resume();
      } else {
        self.start();
      }
    });
    this.skipBtn.addEventListener('click', function() { self.skipToEnd(); });
  }

  TerminalPlayer.prototype.load = function() {
    var self = this;
    return fetch(this.src).then(function(r) { return r.json(); }).then(function(d) {
      self.data = d;
      var title = self.el.querySelector('.tp-title');
      if (title && d.title) title.textContent = d.title;
    });
  };

  // Fresh start from step 0
  TerminalPlayer.prototype.start = function() {
    if (!this.data) return;
    this.output.innerHTML = '';
    this.gallery.hidden = true;
    this.hideDownloads();
    this.stepIndex = 0;
    this.completed = false;
    this.paused = false;
    this.running = true;
    this.playBtn.textContent = 'Pause';
    this.skipBtn.hidden = false;
    this.output.classList.add('tp-cursor');
    this._runNext();
  };

  // Pause — keep output, remember position
  TerminalPlayer.prototype.pause = function() {
    this.running = false;
    this.paused = true;
    this.timers.forEach(clearTimeout);
    this.timers = [];
    this.output.classList.remove('tp-cursor');
    this.playBtn.textContent = 'Continue';
  };

  // Resume from where we paused
  TerminalPlayer.prototype.resume = function() {
    if (!this.data || !this.paused) return;
    this.paused = false;
    this.running = true;
    this.playBtn.textContent = 'Pause';
    this.output.classList.add('tp-cursor');
    this._runNext();
  };

  // Replay after completion
  TerminalPlayer.prototype.restart = function() {
    this.start();
  };

  // Hard stop — used when switching tabs
  TerminalPlayer.prototype.fullStop = function() {
    this.running = false;
    this.paused = false;
    this.completed = false;
    this.stepIndex = 0;
    this.timers.forEach(clearTimeout);
    this.timers = [];
    this.output.classList.remove('tp-cursor');
    this.output.innerHTML = '';
    this.gallery.hidden = true;
    this.hideDownloads();
    this.playBtn.textContent = 'Play';
    this.skipBtn.hidden = true;
  };

  TerminalPlayer.prototype._runNext = function() {
    if (!this.running || this.stepIndex >= this.data.steps.length) {
      if (this.running) this.onComplete();
      return;
    }
    var step = this.data.steps[this.stepIndex];
    this.stepIndex++;
    var self = this;

    if (step.type === 'command') {
      this.typeCommand(step, function() { self._runNext(); });
    } else if (step.type === 'output') {
      this.revealOutput(step, function() { self._runNext(); });
    } else if (step.type === 'pause') {
      var t = setTimeout(function() { self._runNext(); }, step.duration || 500);
      this.timers.push(t);
    } else {
      this._runNext();
    }
  };

  TerminalPlayer.prototype.skipToEnd = function() {
    this.timers.forEach(clearTimeout);
    this.timers = [];
    this.running = false;
    this.paused = false;
    this.renderFinal();
    this.onComplete();
  };

  TerminalPlayer.prototype.typeCommand = function(step, cb) {
    var self = this;
    var text = step.text;
    var speed = step.speed || 40;
    var line = document.createElement('div');
    line.innerHTML = '<span class="tp-prompt">$ </span>';
    var span = document.createElement('span');
    line.appendChild(span);
    this.output.appendChild(line);
    this.scrollToBottom();

    var ci = 0;
    function tick() {
      if (!self.running) return;
      if (ci < text.length) {
        span.textContent += text[ci++];
        self.scrollToBottom();
        var t = setTimeout(tick, speed);
        self.timers.push(t);
      } else {
        var t = setTimeout(cb, 200);
        self.timers.push(t);
      }
    }
    tick();
  };

  TerminalPlayer.prototype.revealOutput = function(step, cb) {
    var self = this;
    var lines = step.lines;
    var delay = step.delay || 60;
    var li = 0;

    function tick() {
      if (!self.running) return;
      if (li < lines.length) {
        var div = document.createElement('div');
        div.innerHTML = lines[li++];
        self.output.appendChild(div);
        self.scrollToBottom();
        var t = setTimeout(tick, delay);
        self.timers.push(t);
      } else {
        var t = setTimeout(cb, 300);
        self.timers.push(t);
      }
    }
    tick();
  };

  TerminalPlayer.prototype.renderFinal = function() {
    this.output.innerHTML = '';
    var steps = this.data.steps;
    for (var i = 0; i < steps.length; i++) {
      var step = steps[i];
      if (step.type === 'command') {
        var div = document.createElement('div');
        div.innerHTML = '<span class="tp-prompt">$ </span>' + step.text;
        this.output.appendChild(div);
      } else if (step.type === 'output') {
        for (var j = 0; j < step.lines.length; j++) {
          var ld = document.createElement('div');
          ld.innerHTML = step.lines[j];
          this.output.appendChild(ld);
        }
      }
    }
    this.scrollToBottom();
  };

  TerminalPlayer.prototype.onComplete = function() {
    this.running = false;
    this.paused = false;
    this.completed = true;
    this.output.classList.remove('tp-cursor');
    this.playBtn.textContent = 'Replay';
    this.skipBtn.hidden = true;
    this.showGallery();
    this.showDownloads();

    this.output.setAttribute('aria-live', 'polite');
    var announce = document.createElement('span');
    announce.className = 'sr-only';
    announce.textContent = 'Demo complete: ' + (this.data.title || 'Terminal session');
    this.output.appendChild(announce);
  };

  TerminalPlayer.prototype.showGallery = function() {
    if (!this.data.gallery || !this.data.gallery.length) return;
    this.gallery.innerHTML = '';
    var self = this;
    this.data.gallery.forEach(function(item) {
      var fig = document.createElement('figure');
      fig.className = 'tp-gallery-item';
      var img = document.createElement('img');
      img.src = '/' + item.src;
      img.alt = item.alt || '';
      img.loading = 'lazy';
      img.addEventListener('click', function() { self.openLightbox(img.src, item.alt); });
      fig.appendChild(img);
      if (item.caption) {
        var cap = document.createElement('figcaption');
        cap.className = 'tp-gallery-caption';
        cap.textContent = item.caption;
        fig.appendChild(cap);
      }
      self.gallery.appendChild(fig);
    });
    this.gallery.hidden = false;
  };

  TerminalPlayer.prototype.showDownloads = function() {
    if (!this.data.downloads || !this.data.downloads.length) return;
    var existing = this.el.querySelector('.tp-downloads');
    if (existing) existing.remove();
    var bar = document.createElement('div');
    bar.className = 'tp-downloads';
    var label = document.createElement('span');
    label.className = 'tp-downloads-label';
    label.textContent = 'Sample deliverables';
    bar.appendChild(label);
    this.data.downloads.forEach(function(item) {
      var a = document.createElement('a');
      a.className = 'tp-download-link';
      a.href = '/' + item.src;
      a.download = item.label;
      a.innerHTML = '<span class="tp-download-icon">\u2913</span>' + item.label;
      bar.appendChild(a);
    });
    var controls = this.el.querySelector('.tp-controls');
    if (controls && controls.nextSibling) {
      controls.parentNode.insertBefore(bar, controls.nextSibling);
    } else {
      this.el.appendChild(bar);
    }
  };

  TerminalPlayer.prototype.hideDownloads = function() {
    var bar = this.el.querySelector('.tp-downloads');
    if (bar) bar.remove();
  };

  TerminalPlayer.prototype.openLightbox = function(src, alt) {
    var lb = document.createElement('div');
    lb.className = 'tp-lightbox';
    lb.setAttribute('role', 'dialog');
    lb.setAttribute('aria-label', alt || 'Image preview');
    var img = document.createElement('img');
    img.src = src;
    img.alt = alt || '';
    lb.appendChild(img);
    lb.addEventListener('click', function() { lb.remove(); });
    function onKey(e) { if (e.key === 'Escape') { lb.remove(); document.removeEventListener('keydown', onKey); } }
    document.addEventListener('keydown', onKey);
    document.body.appendChild(lb);
  };

  TerminalPlayer.prototype.scrollToBottom = function() {
    var body = this.el.querySelector('.tp-body');
    if (body) body.scrollTop = body.scrollHeight;
  };

  // Reduced motion: skip animations
  var reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Init all players
  var players = {};
  document.querySelectorAll('.terminal-player').forEach(function(el) {
    var player = new TerminalPlayer(el);
    players[el.id] = player;
  });

  // Check if an element is visible (not inside a hidden panel)
  function isVisible(el) {
    return el.offsetParent !== null;
  }

  // Auto-play a single player
  function autoPlay(p) {
    if (!p.data) return;
    if (reducedMotion) {
      p.renderFinal();
      p.onComplete();
    } else if (!p.running && !p.paused && !p.completed) {
      p.start();
    }
  }

  // Auto-play all visible players
  function autoPlayAll() {
    Object.keys(players).forEach(function(id) {
      if (isVisible(players[id].el)) {
        autoPlay(players[id]);
      }
    });
  }

  // On tab switch: full-stop tab players, then auto-play new tab
  document.querySelectorAll('input[name="demo-tab"]').forEach(function(r) {
    r.addEventListener('change', function() {
      // Only stop players inside the tab container
      var tabs = r.closest('.demo-tabs');
      if (tabs) {
        tabs.querySelectorAll('.terminal-player').forEach(function(el) {
          if (players[el.id]) players[el.id].fullStop();
        });
      }
      // Auto-play the newly visible tab player
      var panelId = r.id.replace('demo-tab', 'panel-demo');
      var panel = document.getElementById(panelId);
      if (panel) {
        var tp = panel.querySelector('.terminal-player');
        if (tp && players[tp.id]) autoPlay(players[tp.id]);
      }
    });
  });

  // Load all data, then auto-play all visible
  Promise.all(Object.keys(players).map(function(id) {
    return players[id].load();
  })).then(function() {
    autoPlayAll();
  });
})();
