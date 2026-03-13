/**
 * Board Presentation PPTX Generator — Meridian Healthcare Q1 2026
 *
 * Generates a 17-slide MBB-style board-ready PPTX for the demo page.
 * Run from project root: node ww/scripts/gen-board-pptx.js
 * Output: ww/static/demo/downloads/board-presentation.pptx
 */

const pptxgen = require("pptxgenjs");
const path = require("path");
const fs = require("fs");

// ---------------------------------------------------------------------------
// Design System Constants (from shared/pptx-blueprint.md)
// ---------------------------------------------------------------------------

const COLORS = {
  deepNavy: "1B2A4A",
  mediumBlue: "2D4A7A",
  iceBlue: "E8EDF5",
  vividBlue: "2251FF",
  teal: "1A8A7D",
  forestGreen: "2C5F2D",
  amber: "D4A843",
  terracotta: "B85042",
  darkGray: "333333",
  mediumGray: "666666",
  lightGray: "999999",
  offWhite: "F8F9FA",
  white: "FFFFFF",
};

const STATUS_COLORS = {
  Green: COLORS.forestGreen,
  Amber: COLORS.amber,
  Red: COLORS.terracotta,
};

const FONTS = {
  title: "Arial Black",
  heading: "Arial",
  body: "Arial",
};

// Slide layout constants (inches, 16:9 widescreen)
const MARGIN = 0.5;
const SLIDE_W = 13.33;
const SLIDE_H = 7.5;
const CONTENT_W = SLIDE_W - 2 * MARGIN;
const CONTENT_X = MARGIN;

// ---------------------------------------------------------------------------
// Helper Functions
// ---------------------------------------------------------------------------

function ragColor(status) {
  return STATUS_COLORS[status] || COLORS.lightGray;
}

function addPageNumber(slide, num) {
  slide.addText(`${num}`, {
    x: SLIDE_W - 1.0,
    y: SLIDE_H - 0.45,
    w: 0.5,
    h: 0.3,
    fontSize: 9,
    fontFace: FONTS.body,
    color: COLORS.mediumGray,
    align: "right",
  });
}

function addSource(slide, text) {
  slide.addText(`Source: ${text}`, {
    x: MARGIN,
    y: SLIDE_H - 0.45,
    w: CONTENT_W - 1.0,
    h: 0.3,
    fontSize: 9,
    fontFace: FONTS.body,
    color: COLORS.mediumGray,
    align: "left",
  });
}

function addContentTitle(slide, text) {
  slide.addText(text, {
    x: MARGIN,
    y: 0.3,
    w: CONTENT_W,
    h: 0.65,
    fontSize: 18,
    fontFace: FONTS.heading,
    bold: true,
    color: COLORS.deepNavy,
    valign: "top",
    wrap: true,
  });
  // Ice Blue underline
  slide.addShape("rect", {
    x: MARGIN,
    y: 0.95,
    w: CONTENT_W,
    h: 0.02,
    fill: { color: COLORS.iceBlue },
  });
}

function addAccentBar(slide, x, y, w) {
  slide.addShape("rect", {
    x,
    y,
    w,
    h: 0.06,
    fill: { color: COLORS.vividBlue },
  });
}

function addDarkBackground(slide) {
  slide.background = { fill: COLORS.deepNavy };
}

function addLightBackground(slide) {
  slide.background = { fill: COLORS.offWhite };
}

function addBackupWatermark(slide) {
  slide.addText("BACKUP", {
    x: (SLIDE_W - 8) / 2,
    y: (SLIDE_H - 2) / 2,
    w: 8,
    h: 2,
    fontSize: 100,
    fontFace: FONTS.title,
    color: COLORS.lightGray,
    transparency: 85,
    align: "center",
    valign: "middle",
  });
}

// ---------------------------------------------------------------------------
// Slide 1: Title (Dark)
// ---------------------------------------------------------------------------
function slide01_Title(pres) {
  const slide = pres.addSlide();
  addDarkBackground(slide);

  // Decorative right-side accent block (behind content)
  slide.addShape("rect", {
    x: SLIDE_W - 3.5,
    y: 0,
    w: 3.5,
    h: SLIDE_H,
    fill: { color: COLORS.mediumBlue },
    transparency: 85,
  });

  // Company name
  slide.addText("MERIDIAN HEALTHCARE", {
    x: MARGIN + 0.2,
    y: 0.6,
    w: 6,
    h: 0.5,
    fontSize: 16,
    fontFace: FONTS.heading,
    bold: true,
    color: COLORS.white,
    letterSpacing: 3,
  });

  // Vivid Blue accent bar
  addAccentBar(slide, MARGIN + 0.2, 1.25, 2.5);

  // Main title
  slide.addText("Data, Analytics & AI\nBoard Update", {
    x: MARGIN + 0.2,
    y: 1.6,
    w: 8,
    h: 1.6,
    fontSize: 40,
    fontFace: FONTS.title,
    color: COLORS.white,
    lineSpacingMultiple: 1.1,
  });

  // Subtitle
  slide.addText("Q1 2026  |  March 13, 2026", {
    x: MARGIN + 0.2,
    y: 3.5,
    w: 8,
    h: 0.5,
    fontSize: 20,
    fontFace: FONTS.body,
    color: COLORS.iceBlue,
  });

  // Presenter info
  slide.addText("Chief Data & AI Officer  |  Office of the CDAIO", {
    x: MARGIN + 0.2,
    y: 4.2,
    w: 8,
    h: 0.4,
    fontSize: 14,
    fontFace: FONTS.body,
    color: COLORS.white,
  });

  // CONFIDENTIAL bottom-right
  slide.addText("CONFIDENTIAL", {
    x: SLIDE_W - 2.5,
    y: SLIDE_H - 0.6,
    w: 2,
    h: 0.3,
    fontSize: 10,
    fontFace: FONTS.body,
    color: COLORS.mediumGray,
    align: "right",
  });
}

// ---------------------------------------------------------------------------
// Slide 2: Executive Summary (Light)
// ---------------------------------------------------------------------------
function slide02_ExecSummary(pres) {
  const slide = pres.addSlide();
  addLightBackground(slide);

  addContentTitle(
    slide,
    "AI program delivered $2.4M in validated savings in Q1 while three governance gaps require Board action"
  );

  const bullets = [
    "Q1 2026 delivered $2.4M in AI value against $2.0M target, driven by procurement optimization ($1.2M) and churn prediction ($800K)",
    "Three governance gaps threaten Q2 targets: EU AI Act compliance at 40%, data quality at 87% vs 95% target, steward coverage at 40%",
    "Board approval of $1.8M incremental investment enables compliance remediation ($1.2M) and quality automation ($600K) by Q3 2026",
  ];

  bullets.forEach((text, i) => {
    const y = 1.25 + i * 1.0;
    // Vivid Blue ellipse dot
    slide.addShape("ellipse", {
      x: MARGIN + 0.15,
      y: y + 0.15,
      w: 0.18,
      h: 0.18,
      fill: { color: COLORS.vividBlue },
    });
    slide.addText(text, {
      x: MARGIN + 0.5,
      y,
      w: 7.5,
      h: 0.8,
      fontSize: 13,
      fontFace: FONTS.body,
      color: COLORS.darkGray,
      wrap: true,
      lineSpacingMultiple: 1.2,
    });
  });

  // Key numbers callout box (right side)
  const boxX = 8.8;
  const boxY = 1.25;
  const boxW = 4.0;
  const boxH = 3.4;
  slide.addShape("roundRect", {
    x: boxX,
    y: boxY,
    w: boxW,
    h: boxH,
    fill: { color: COLORS.iceBlue },
    rectRadius: 0.1,
  });
  // Left accent
  slide.addShape("rect", {
    x: boxX,
    y: boxY,
    w: 0.06,
    h: boxH,
    fill: { color: COLORS.vividBlue },
  });

  slide.addText("KEY NUMBERS", {
    x: boxX + 0.25,
    y: boxY + 0.15,
    w: boxW - 0.5,
    h: 0.35,
    fontSize: 11,
    fontFace: FONTS.heading,
    bold: true,
    color: COLORS.vividBlue,
  });

  const keyNums = [
    { value: "$2.4M", label: "Q1 value delivered" },
    { value: "156", label: "models in production" },
    { value: "42%", label: "model adoption" },
    { value: "$1.8M", label: "incremental ask" },
  ];

  keyNums.forEach((item, i) => {
    const ky = boxY + 0.6 + i * 0.65;
    slide.addText(item.value, {
      x: boxX + 0.25,
      y: ky,
      w: boxW - 0.5,
      h: 0.35,
      fontSize: 22,
      fontFace: FONTS.title,
      color: COLORS.deepNavy,
    });
    slide.addText(item.label, {
      x: boxX + 0.25,
      y: ky + 0.3,
      w: boxW - 0.5,
      h: 0.25,
      fontSize: 10,
      fontFace: FONTS.body,
      color: COLORS.mediumGray,
    });
  });

  addSource(slide, "Finance & Operations teams, Q1 2026");
  addPageNumber(slide, 2);
}

// ---------------------------------------------------------------------------
// Slide 3: Agenda (Light)
// ---------------------------------------------------------------------------
function slide03_Agenda(pres) {
  const slide = pres.addSlide();
  addLightBackground(slide);

  addContentTitle(
    slide,
    "Five topics for Board discussion span performance, initiatives, risk, budget, and decisions"
  );

  const items = [
    { num: "01", title: "Performance Dashboard", desc: "KPI tracking and trend analysis" },
    { num: "02", title: "Initiative Portfolio", desc: "Status of active data & AI initiatives" },
    { num: "03", title: "Risk Landscape", desc: "Critical risks and mitigation status" },
    { num: "04", title: "Budget & Investment", desc: "Financial position and incremental funding request" },
    { num: "05", title: "Board Decisions", desc: "Recommendations and approval requests" },
  ];

  items.forEach((item, i) => {
    const y = 1.4 + i * 1.05;
    // Number
    slide.addText(item.num, {
      x: MARGIN + 0.2,
      y,
      w: 0.8,
      h: 0.7,
      fontSize: 28,
      fontFace: FONTS.title,
      color: COLORS.deepNavy,
      valign: "top",
    });
    // Accent bar
    slide.addShape("rect", {
      x: MARGIN + 1.1,
      y: y + 0.05,
      w: 0.04,
      h: 0.5,
      fill: { color: COLORS.vividBlue },
    });
    // Title
    slide.addText(item.title, {
      x: MARGIN + 1.4,
      y,
      w: 5,
      h: 0.35,
      fontSize: 18,
      fontFace: FONTS.heading,
      bold: true,
      color: COLORS.deepNavy,
    });
    // Description
    slide.addText(item.desc, {
      x: MARGIN + 1.4,
      y: y + 0.35,
      w: 8,
      h: 0.3,
      fontSize: 12,
      fontFace: FONTS.body,
      color: COLORS.mediumGray,
    });
  });

  addPageNumber(slide, 3);
}

// ---------------------------------------------------------------------------
// Section Divider helper
// ---------------------------------------------------------------------------
function addSectionDivider(pres, sectionNum, title, subtitle) {
  const slide = pres.addSlide();
  addDarkBackground(slide);

  // Decorative right-side accent block
  slide.addShape("rect", {
    x: SLIDE_W - 3.5,
    y: 0,
    w: 3.5,
    h: SLIDE_H,
    fill: { color: COLORS.mediumBlue },
    transparency: 85,
  });

  // Section number
  slide.addText(sectionNum, {
    x: MARGIN + 0.2,
    y: 2.0,
    w: 3,
    h: 0.8,
    fontSize: 48,
    fontFace: FONTS.title,
    color: COLORS.vividBlue,
  });

  // Accent bar
  addAccentBar(slide, MARGIN + 0.2, 2.9, 2.5);

  // Title
  slide.addText(title, {
    x: MARGIN + 0.2,
    y: 3.15,
    w: 9,
    h: 0.8,
    fontSize: 32,
    fontFace: FONTS.title,
    color: COLORS.white,
  });

  // Subtitle
  slide.addText(subtitle, {
    x: MARGIN + 0.2,
    y: 4.1,
    w: 9,
    h: 0.5,
    fontSize: 16,
    fontFace: FONTS.body,
    color: COLORS.iceBlue,
  });
}

// ---------------------------------------------------------------------------
// Slide 4: Section Divider — Performance Dashboard
// ---------------------------------------------------------------------------
function slide04_SectionPerformance(pres) {
  addSectionDivider(pres, "01", "PERFORMANCE DASHBOARD", "KPI tracking and trend analysis");
}

// ---------------------------------------------------------------------------
// Slide 5: KPI Dashboard (Light)
// ---------------------------------------------------------------------------
function slide05_KPIDashboard(pres) {
  const slide = pres.addSlide();
  addLightBackground(slide);

  addContentTitle(
    slide,
    "5 of 8 KPIs are on track; data quality (87%) and steward coverage (40%) require acceleration"
  );

  const kpis = [
    // Row 1
    { name: "AI Value", value: "$2.4M", trend: "+20% vs target", status: "Green", target: "$2.0M" },
    { name: "Model Adoption", value: "42%", trend: "+5% QoQ", status: "Green", target: "40%" },
    { name: "Platform Uptime", value: "98.2%", trend: "-0.3% QoQ", status: "Amber", target: "99.0%" },
    { name: "Models in Prod.", value: "156", trend: "+23 new", status: "Green", target: "150" },
    // Row 2
    { name: "Stakeholder NPS", value: "4.2", trend: "-0.3 QoQ", status: "Amber", target: "4.5" },
    { name: "Data Quality", value: "87%", trend: "+4% QoQ", status: "Red", target: "95%" },
    { name: "Policy Compliance", value: "78%", trend: "+12% QoQ", status: "Amber", target: "95%" },
    { name: "Steward Coverage", value: "40%", trend: "+15% QoQ", status: "Red", target: "80%" },
  ];

  const cols = 4;
  const gap = 0.2;
  const cardW = (CONTENT_W - (cols - 1) * gap) / cols;
  const cardH = 2.0;
  const startY = 1.2;

  kpis.forEach((kpi, i) => {
    const col = i % cols;
    const row = Math.floor(i / cols);
    const x = MARGIN + col * (cardW + gap);
    const y = startY + row * (cardH + 0.25);

    // Card background
    slide.addShape("roundRect", {
      x,
      y,
      w: cardW,
      h: cardH,
      fill: { color: COLORS.iceBlue },
      rectRadius: 0.08,
    });

    // RAG dot (top-right)
    slide.addShape("ellipse", {
      x: x + cardW - 0.4,
      y: y + 0.15,
      w: 0.22,
      h: 0.22,
      fill: { color: ragColor(kpi.status) },
    });

    // KPI name
    slide.addText(kpi.name, {
      x: x + 0.15,
      y: y + 0.12,
      w: cardW - 0.55,
      h: 0.3,
      fontSize: 10,
      fontFace: FONTS.heading,
      bold: true,
      color: COLORS.mediumBlue,
    });

    // Big number
    slide.addText(kpi.value, {
      x: x + 0.15,
      y: y + 0.5,
      w: cardW - 0.3,
      h: 0.6,
      fontSize: 28,
      fontFace: FONTS.title,
      color: COLORS.deepNavy,
    });

    // Trend (colored by status)
    slide.addText(kpi.trend, {
      x: x + 0.15,
      y: y + 1.15,
      w: cardW - 0.3,
      h: 0.3,
      fontSize: 10,
      fontFace: FONTS.body,
      color: ragColor(kpi.status),
    });

    // Target
    slide.addText(`Target: ${kpi.target}`, {
      x: x + 0.15,
      y: y + 1.55,
      w: cardW - 0.3,
      h: 0.25,
      fontSize: 9,
      fontFace: FONTS.body,
      color: COLORS.mediumGray,
    });
  });

  addSource(slide, "Internal dashboards, Q1 2026");
  addPageNumber(slide, 5);
}

// ---------------------------------------------------------------------------
// Slide 6: KPI Trend Details (Light)
// ---------------------------------------------------------------------------
function slide06_KPITrends(pres) {
  const slide = pres.addSlide();
  addLightBackground(slide);

  addContentTitle(
    slide,
    "Three KPIs require intervention: data quality trails target by 8 points, compliance by 17 points"
  );

  const panels = [
    {
      name: "Data Quality",
      current: "87%",
      currentPct: 0.87,
      target: "95%",
      targetPct: 0.95,
      trend: "+4% / quarter",
      pace: "~8 quarters to target at current pace",
      note: "Needs acceleration",
      status: "Red",
    },
    {
      name: "Policy Compliance",
      current: "78%",
      currentPct: 0.78,
      target: "95%",
      targetPct: 0.95,
      trend: "+12% / quarter",
      pace: "~2 quarters at current pace",
      note: "On track if sustained",
      status: "Amber",
    },
    {
      name: "Steward Coverage",
      current: "40%",
      currentPct: 0.40,
      target: "80%",
      targetPct: 0.80,
      trend: "+15% / quarter",
      pace: "~3 quarters at current pace",
      note: "Achievable with hiring plan",
      status: "Red",
    },
  ];

  const panelW = (CONTENT_W - 0.4) / 3;
  const panelH = 4.8;
  const panelY = 1.2;

  panels.forEach((p, i) => {
    const x = MARGIN + i * (panelW + 0.2);

    // Card background
    slide.addShape("roundRect", {
      x,
      y: panelY,
      w: panelW,
      h: panelH,
      fill: { color: COLORS.iceBlue },
      rectRadius: 0.08,
    });

    // Status accent bar at top
    slide.addShape("rect", {
      x,
      y: panelY,
      w: panelW,
      h: 0.06,
      fill: { color: ragColor(p.status) },
    });

    // KPI name
    slide.addText(p.name, {
      x: x + 0.2,
      y: panelY + 0.2,
      w: panelW - 0.4,
      h: 0.35,
      fontSize: 14,
      fontFace: FONTS.heading,
      bold: true,
      color: COLORS.deepNavy,
    });

    // Current value (large)
    slide.addText(p.current, {
      x: x + 0.2,
      y: panelY + 0.65,
      w: panelW - 0.4,
      h: 0.7,
      fontSize: 36,
      fontFace: FONTS.title,
      color: COLORS.deepNavy,
    });

    // Target
    slide.addText(`Target: ${p.target}`, {
      x: x + 0.2,
      y: panelY + 1.35,
      w: panelW - 0.4,
      h: 0.3,
      fontSize: 11,
      fontFace: FONTS.body,
      color: COLORS.mediumGray,
    });

    // QoQ trend
    slide.addText(`QoQ: ${p.trend}`, {
      x: x + 0.2,
      y: panelY + 1.7,
      w: panelW - 0.4,
      h: 0.3,
      fontSize: 11,
      fontFace: FONTS.body,
      color: ragColor(p.status),
    });

    // Pace
    slide.addText(p.pace, {
      x: x + 0.2,
      y: panelY + 2.1,
      w: panelW - 0.4,
      h: 0.3,
      fontSize: 10,
      fontFace: FONTS.body,
      color: COLORS.darkGray,
      wrap: true,
    });

    // Note
    slide.addText(p.note, {
      x: x + 0.2,
      y: panelY + 2.5,
      w: panelW - 0.4,
      h: 0.25,
      fontSize: 10,
      fontFace: FONTS.body,
      italic: true,
      color: COLORS.mediumGray,
    });

    // Progress bar background (gray)
    const barX = x + 0.2;
    const barY = panelY + 3.0;
    const barW = panelW - 0.4;
    const barH = 0.25;
    slide.addShape("roundRect", {
      x: barX,
      y: barY,
      w: barW,
      h: barH,
      fill: { color: COLORS.lightGray },
      rectRadius: 0.05,
    });

    // Progress bar fill (current / target ratio, capped at 100%)
    const ratio = Math.min(p.currentPct / p.targetPct, 1.0);
    slide.addShape("roundRect", {
      x: barX,
      y: barY,
      w: barW * ratio,
      h: barH,
      fill: { color: ragColor(p.status) },
      rectRadius: 0.05,
    });

    // Bar labels
    slide.addText(`${p.current} / ${p.target}`, {
      x: barX,
      y: barY + 0.3,
      w: barW,
      h: 0.2,
      fontSize: 9,
      fontFace: FONTS.body,
      color: COLORS.mediumGray,
      align: "center",
    });
  });

  addSource(slide, "Governance office, data quality monitoring system");
  addPageNumber(slide, 6);
}

// ---------------------------------------------------------------------------
// Slide 7: Section Divider — Initiative Portfolio
// ---------------------------------------------------------------------------
function slide07_SectionInitiatives(pres) {
  addSectionDivider(pres, "02", "INITIATIVE PORTFOLIO", "Status of active data & AI initiatives");
}

// ---------------------------------------------------------------------------
// Slide 8: Initiative Portfolio Table (Light)
// ---------------------------------------------------------------------------
function slide08_InitiativeTable(pres) {
  const slide = pres.addSlide();
  addLightBackground(slide);

  addContentTitle(
    slide,
    "6 active initiatives span governance, architecture, and AI deployment with 4 on track and 2 at risk"
  );

  const headerRow = [
    { text: "Initiative", options: { bold: true, color: COLORS.white, fill: { color: COLORS.deepNavy }, fontSize: 10, fontFace: FONTS.heading, align: "left", valign: "middle" } },
    { text: "Owner", options: { bold: true, color: COLORS.white, fill: { color: COLORS.deepNavy }, fontSize: 10, fontFace: FONTS.heading, align: "left", valign: "middle" } },
    { text: "Target Date", options: { bold: true, color: COLORS.white, fill: { color: COLORS.deepNavy }, fontSize: 10, fontFace: FONTS.heading, align: "center", valign: "middle" } },
    { text: "Progress", options: { bold: true, color: COLORS.white, fill: { color: COLORS.deepNavy }, fontSize: 10, fontFace: FONTS.heading, align: "center", valign: "middle" } },
    { text: "Status", options: { bold: true, color: COLORS.white, fill: { color: COLORS.deepNavy }, fontSize: 10, fontFace: FONTS.heading, align: "center", valign: "middle" } },
    { text: "Impact", options: { bold: true, color: COLORS.white, fill: { color: COLORS.deepNavy }, fontSize: 10, fontFace: FONTS.heading, align: "left", valign: "middle" } },
  ];

  const initiatives = [
    { name: "Data governance framework", owner: "Head of Governance", target: "Q2 2026", progress: "85%", status: "Green", impact: "Regulatory readiness" },
    { name: "EU AI Act compliance", owner: "Compliance Officer", target: "Q3 2026", progress: "40%", status: "Red", impact: "3 regulatory gaps" },
    { name: "Model risk management", owner: "AI/ML Lead", target: "Q2 2026", progress: "72%", status: "Green", impact: "Production safety" },
    { name: "Data quality program", owner: "Data Steward", target: "Q3 2026", progress: "55%", status: "Amber", impact: "Quality 87% to 95%" },
    { name: "Security & access controls", owner: "Data Custodian", target: "Q1 2026", progress: "95%", status: "Green", impact: "Zero breaches" },
    { name: "MLOps pipeline", owner: "Data Engineer", target: "Q4 2026", progress: "30%", status: "Amber", impact: "CI/CD for models" },
  ];

  const dataRows = initiatives.map((init, i) => {
    const fillColor = i % 2 === 0 ? COLORS.white : COLORS.iceBlue;
    return [
      { text: init.name, options: { bold: true, color: COLORS.darkGray, fill: { color: fillColor }, fontSize: 10, fontFace: FONTS.body, align: "left", valign: "middle" } },
      { text: init.owner, options: { color: COLORS.darkGray, fill: { color: fillColor }, fontSize: 10, fontFace: FONTS.body, align: "left", valign: "middle" } },
      { text: init.target, options: { color: COLORS.darkGray, fill: { color: fillColor }, fontSize: 10, fontFace: FONTS.body, align: "center", valign: "middle" } },
      { text: init.progress, options: { color: COLORS.darkGray, fill: { color: fillColor }, fontSize: 10, fontFace: FONTS.body, align: "center", valign: "middle" } },
      { text: init.status, options: { bold: true, color: ragColor(init.status), fill: { color: fillColor }, fontSize: 10, fontFace: FONTS.body, align: "center", valign: "middle" } },
      { text: init.impact, options: { color: COLORS.darkGray, fill: { color: fillColor }, fontSize: 10, fontFace: FONTS.body, align: "left", valign: "middle" } },
    ];
  });

  const allRows = [headerRow, ...dataRows];

  slide.addTable(allRows, {
    x: MARGIN,
    y: 1.2,
    w: CONTENT_W,
    colW: [3.2, 2.0, 1.4, 1.2, 1.0, 3.53],
    rowH: 0.55,
    border: { type: "solid", pt: 0.5, color: COLORS.iceBlue },
    margin: [4, 8, 4, 8],
  });

  addSource(slide, "CDAIO Office initiative tracker, Q1 2026");
  addPageNumber(slide, 8);
}

// ---------------------------------------------------------------------------
// Slide 9: Section Divider — Risk Landscape
// ---------------------------------------------------------------------------
function slide09_SectionRisk(pres) {
  addSectionDivider(pres, "03", "RISK LANDSCAPE", "Critical risks and mitigation status");
}

// ---------------------------------------------------------------------------
// Slide 10: Risk Overview — Two-Column (Light)
// ---------------------------------------------------------------------------
function slide10_RiskOverview(pres) {
  const slide = pres.addSlide();
  addLightBackground(slide);

  addContentTitle(
    slide,
    "EU AI Act compliance gap and data quality deficit represent the two highest-severity risks"
  );

  const colW = (CONTENT_W - 0.3) / 2;
  const leftX = MARGIN;
  const rightX = MARGIN + colW + 0.3;
  const cardStartY = 1.55;

  // --- Left column: Critical Risks ---
  // Column header
  slide.addText("Critical Risks", {
    x: leftX,
    y: 1.15,
    w: colW,
    h: 0.3,
    fontSize: 13,
    fontFace: FONTS.heading,
    bold: true,
    color: COLORS.deepNavy,
  });
  // Vivid Blue accent bar
  addAccentBar(slide, leftX, 1.45, colW);

  // Risk 1
  const r1Y = cardStartY;
  const rCardH = 2.3;
  slide.addShape("roundRect", {
    x: leftX,
    y: r1Y,
    w: colW,
    h: rCardH,
    fill: { color: COLORS.iceBlue },
    rectRadius: 0.08,
  });
  slide.addText("EU AI Act Non-Compliance", {
    x: leftX + 0.15,
    y: r1Y + 0.1,
    w: colW - 1.3,
    h: 0.3,
    fontSize: 12,
    fontFace: FONTS.heading,
    bold: true,
    color: COLORS.deepNavy,
  });
  // Severity badge
  slide.addShape("roundRect", {
    x: leftX + colW - 1.1,
    y: r1Y + 0.1,
    w: 0.9,
    h: 0.3,
    fill: { color: ragColor("Red") },
    rectRadius: 0.05,
  });
  slide.addText("CRITICAL", {
    x: leftX + colW - 1.1,
    y: r1Y + 0.1,
    w: 0.9,
    h: 0.3,
    fontSize: 8,
    fontFace: FONTS.heading,
    bold: true,
    color: COLORS.white,
    align: "center",
    valign: "middle",
  });
  slide.addText("Likelihood: High", {
    x: leftX + 0.15,
    y: r1Y + 0.5,
    w: colW - 0.3,
    h: 0.2,
    fontSize: 9,
    fontFace: FONTS.body,
    color: COLORS.mediumGray,
  });
  slide.addText("Impact: Potential fines up to 7% of revenue ($36.4M)", {
    x: leftX + 0.15,
    y: r1Y + 0.8,
    w: colW - 0.3,
    h: 0.4,
    fontSize: 10,
    fontFace: FONTS.body,
    color: COLORS.darkGray,
    wrap: true,
  });
  slide.addText("Mitigation: $1.2M compliance program, external counsel, Q3 deadline", {
    x: leftX + 0.15,
    y: r1Y + 1.3,
    w: colW - 0.3,
    h: 0.4,
    fontSize: 10,
    fontFace: FONTS.body,
    color: COLORS.darkGray,
    wrap: true,
  });

  // Risk 2
  const r2Y = r1Y + rCardH + 0.2;
  slide.addShape("roundRect", {
    x: leftX,
    y: r2Y,
    w: colW,
    h: rCardH,
    fill: { color: COLORS.iceBlue },
    rectRadius: 0.08,
  });
  slide.addText("Data Quality Below Threshold", {
    x: leftX + 0.15,
    y: r2Y + 0.1,
    w: colW - 1.3,
    h: 0.3,
    fontSize: 12,
    fontFace: FONTS.heading,
    bold: true,
    color: COLORS.deepNavy,
  });
  slide.addShape("roundRect", {
    x: leftX + colW - 1.1,
    y: r2Y + 0.1,
    w: 0.9,
    h: 0.3,
    fill: { color: ragColor("Red") },
    rectRadius: 0.05,
  });
  slide.addText("CRITICAL", {
    x: leftX + colW - 1.1,
    y: r2Y + 0.1,
    w: 0.9,
    h: 0.3,
    fontSize: 8,
    fontFace: FONTS.heading,
    bold: true,
    color: COLORS.white,
    align: "center",
    valign: "middle",
  });
  slide.addText("Likelihood: Medium", {
    x: leftX + 0.15,
    y: r2Y + 0.5,
    w: colW - 0.3,
    h: 0.2,
    fontSize: 9,
    fontFace: FONTS.body,
    color: COLORS.mediumGray,
  });
  slide.addText("Impact: Model accuracy degradation, clinical decision risk", {
    x: leftX + 0.15,
    y: r2Y + 0.8,
    w: colW - 0.3,
    h: 0.4,
    fontSize: 10,
    fontFace: FONTS.body,
    color: COLORS.darkGray,
    wrap: true,
  });
  slide.addText("Mitigation: Automated monitoring, 12 domain coverage, $600K investment", {
    x: leftX + 0.15,
    y: r2Y + 1.3,
    w: colW - 0.3,
    h: 0.4,
    fontSize: 10,
    fontFace: FONTS.body,
    color: COLORS.darkGray,
    wrap: true,
  });

  // --- Right column: Watchlist ---
  slide.addText("Watchlist", {
    x: rightX,
    y: 1.15,
    w: colW,
    h: 0.3,
    fontSize: 13,
    fontFace: FONTS.heading,
    bold: true,
    color: COLORS.deepNavy,
  });
  // Teal accent bar
  slide.addShape("rect", {
    x: rightX,
    y: 1.45,
    w: colW,
    h: 0.06,
    fill: { color: COLORS.teal },
  });

  // Risk 3
  const r3Y = cardStartY;
  slide.addShape("roundRect", {
    x: rightX,
    y: r3Y,
    w: colW,
    h: rCardH,
    fill: { color: COLORS.iceBlue },
    rectRadius: 0.08,
  });
  slide.addText("Data Science Talent Gap", {
    x: rightX + 0.15,
    y: r3Y + 0.1,
    w: colW - 1.3,
    h: 0.3,
    fontSize: 12,
    fontFace: FONTS.heading,
    bold: true,
    color: COLORS.deepNavy,
  });
  slide.addShape("roundRect", {
    x: rightX + colW - 1.1,
    y: r3Y + 0.1,
    w: 0.9,
    h: 0.3,
    fill: { color: ragColor("Amber") },
    rectRadius: 0.05,
  });
  slide.addText("MEDIUM", {
    x: rightX + colW - 1.1,
    y: r3Y + 0.1,
    w: 0.9,
    h: 0.3,
    fontSize: 8,
    fontFace: FONTS.heading,
    bold: true,
    color: COLORS.white,
    align: "center",
    valign: "middle",
  });
  slide.addText("Likelihood: Medium", {
    x: rightX + 0.15,
    y: r3Y + 0.5,
    w: colW - 0.3,
    h: 0.2,
    fontSize: 9,
    fontFace: FONTS.body,
    color: COLORS.mediumGray,
  });
  slide.addText("Impact: 8 open positions, 6-month avg fill time", {
    x: rightX + 0.15,
    y: r3Y + 0.8,
    w: colW - 0.3,
    h: 0.4,
    fontSize: 10,
    fontFace: FONTS.body,
    color: COLORS.darkGray,
    wrap: true,
  });
  slide.addText("Monitoring: Weekly recruiting pipeline review, university partnerships", {
    x: rightX + 0.15,
    y: r3Y + 1.3,
    w: colW - 0.3,
    h: 0.4,
    fontSize: 10,
    fontFace: FONTS.body,
    color: COLORS.darkGray,
    wrap: true,
  });

  // Risk 4
  const r4Y = r3Y + rCardH + 0.2;
  slide.addShape("roundRect", {
    x: rightX,
    y: r4Y,
    w: colW,
    h: rCardH,
    fill: { color: COLORS.iceBlue },
    rectRadius: 0.08,
  });
  slide.addText("Cloud Migration Delays", {
    x: rightX + 0.15,
    y: r4Y + 0.1,
    w: colW - 1.3,
    h: 0.3,
    fontSize: 12,
    fontFace: FONTS.heading,
    bold: true,
    color: COLORS.deepNavy,
  });
  slide.addShape("roundRect", {
    x: rightX + colW - 1.1,
    y: r4Y + 0.1,
    w: 0.9,
    h: 0.3,
    fill: { color: ragColor("Amber") },
    rectRadius: 0.05,
  });
  slide.addText("MEDIUM", {
    x: rightX + colW - 1.1,
    y: r4Y + 0.1,
    w: 0.9,
    h: 0.3,
    fontSize: 8,
    fontFace: FONTS.heading,
    bold: true,
    color: COLORS.white,
    align: "center",
    valign: "middle",
  });
  slide.addText("Likelihood: Low", {
    x: rightX + 0.15,
    y: r4Y + 0.5,
    w: colW - 0.3,
    h: 0.2,
    fontSize: 9,
    fontFace: FONTS.body,
    color: COLORS.mediumGray,
  });
  slide.addText("Impact: 3-month slip affects Phase 2 timeline", {
    x: rightX + 0.15,
    y: r4Y + 0.8,
    w: colW - 0.3,
    h: 0.4,
    fontSize: 10,
    fontFace: FONTS.body,
    color: COLORS.darkGray,
    wrap: true,
  });
  slide.addText("Monitoring: Bi-weekly vendor steering committee", {
    x: rightX + 0.15,
    y: r4Y + 1.3,
    w: colW - 0.3,
    h: 0.4,
    fontSize: 10,
    fontFace: FONTS.body,
    color: COLORS.darkGray,
    wrap: true,
  });

  addSource(slide, "Risk register, compliance assessment, HR analytics");
  addPageNumber(slide, 10);
}

// ---------------------------------------------------------------------------
// Slide 11: Section Divider — Budget & Investment
// ---------------------------------------------------------------------------
function slide11_SectionBudget(pres) {
  addSectionDivider(pres, "04", "BUDGET & INVESTMENT", "Financial position and incremental funding request");
}

// ---------------------------------------------------------------------------
// Slide 12: Budget Overview (Light)
// ---------------------------------------------------------------------------
function slide12_BudgetOverview(pres) {
  const slide = pres.addSlide();
  addLightBackground(slide);

  addContentTitle(
    slide,
    "$4.1M three-year budget is 92% committed; $1.8M incremental ask for compliance and quality"
  );

  // --- Top section: Committed Budget ---
  slide.addText("Committed Budget  |  $2.0M Year 1", {
    x: MARGIN,
    y: 1.15,
    w: CONTENT_W,
    h: 0.35,
    fontSize: 13,
    fontFace: FONTS.heading,
    bold: true,
    color: COLORS.deepNavy,
  });

  const budgetItems = [
    { name: "People", amount: "$850K", pct: "42%" },
    { name: "Technology", amount: "$420K", pct: "21%" },
    { name: "Consulting", amount: "$350K", pct: "18%" },
    { name: "Training", amount: "$180K", pct: "9%" },
    { name: "Licensing", amount: "$200K", pct: "10%" },
  ];

  const budgetCardW = (CONTENT_W - 4 * 0.15) / 5;
  const budgetCardH = 1.2;
  const budgetCardY = 1.6;

  budgetItems.forEach((item, i) => {
    const x = MARGIN + i * (budgetCardW + 0.15);
    // Card background
    slide.addShape("roundRect", {
      x,
      y: budgetCardY,
      w: budgetCardW,
      h: budgetCardH,
      fill: { color: COLORS.iceBlue },
      rectRadius: 0.06,
    });
    // Category name
    slide.addText(item.name, {
      x: x + 0.1,
      y: budgetCardY + 0.1,
      w: budgetCardW - 0.2,
      h: 0.3,
      fontSize: 10,
      fontFace: FONTS.heading,
      bold: true,
      color: COLORS.mediumBlue,
    });
    // Amount
    slide.addText(item.amount, {
      x: x + 0.1,
      y: budgetCardY + 0.4,
      w: budgetCardW - 0.2,
      h: 0.35,
      fontSize: 20,
      fontFace: FONTS.title,
      color: COLORS.deepNavy,
    });
    // Percentage
    slide.addText(item.pct, {
      x: x + 0.1,
      y: budgetCardY + 0.8,
      w: budgetCardW - 0.2,
      h: 0.25,
      fontSize: 10,
      fontFace: FONTS.body,
      color: COLORS.mediumGray,
    });
  });

  // --- Bottom section: Incremental Investment ---
  slide.addText("Incremental Investment Request  |  $1.8M", {
    x: MARGIN,
    y: 3.15,
    w: CONTENT_W,
    h: 0.35,
    fontSize: 13,
    fontFace: FONTS.heading,
    bold: true,
    color: COLORS.deepNavy,
  });

  const incrW = (CONTENT_W - 0.2) / 2;
  const incrY = 3.6;
  const incrH = 1.6;

  // Card 1: EU AI Act Compliance
  slide.addShape("roundRect", {
    x: MARGIN,
    y: incrY,
    w: incrW,
    h: incrH,
    fill: { color: COLORS.iceBlue },
    rectRadius: 0.08,
  });
  slide.addShape("rect", {
    x: MARGIN,
    y: incrY,
    w: 0.06,
    h: incrH,
    fill: { color: COLORS.terracotta },
  });
  slide.addText("EU AI Act Compliance", {
    x: MARGIN + 0.2,
    y: incrY + 0.1,
    w: incrW - 0.4,
    h: 0.3,
    fontSize: 12,
    fontFace: FONTS.heading,
    bold: true,
    color: COLORS.deepNavy,
  });
  slide.addText("$1.2M", {
    x: MARGIN + 0.2,
    y: incrY + 0.45,
    w: incrW - 0.4,
    h: 0.4,
    fontSize: 24,
    fontFace: FONTS.title,
    color: COLORS.terracotta,
  });
  slide.addText("2 FTEs + external counsel + tool licensing", {
    x: MARGIN + 0.2,
    y: incrY + 0.95,
    w: incrW - 0.4,
    h: 0.35,
    fontSize: 10,
    fontFace: FONTS.body,
    color: COLORS.darkGray,
    wrap: true,
  });

  // Card 2: Data Quality Acceleration
  const card2X = MARGIN + incrW + 0.2;
  slide.addShape("roundRect", {
    x: card2X,
    y: incrY,
    w: incrW,
    h: incrH,
    fill: { color: COLORS.iceBlue },
    rectRadius: 0.08,
  });
  slide.addShape("rect", {
    x: card2X,
    y: incrY,
    w: 0.06,
    h: incrH,
    fill: { color: COLORS.amber },
  });
  slide.addText("Data Quality Acceleration", {
    x: card2X + 0.2,
    y: incrY + 0.1,
    w: incrW - 0.4,
    h: 0.3,
    fontSize: 12,
    fontFace: FONTS.heading,
    bold: true,
    color: COLORS.deepNavy,
  });
  slide.addText("$600K", {
    x: card2X + 0.2,
    y: incrY + 0.45,
    w: incrW - 0.4,
    h: 0.4,
    fontSize: 24,
    fontFace: FONTS.title,
    color: COLORS.amber,
  });
  slide.addText("Automated monitoring infrastructure", {
    x: card2X + 0.2,
    y: incrY + 0.95,
    w: incrW - 0.4,
    h: 0.35,
    fontSize: 10,
    fontFace: FONTS.body,
    color: COLORS.darkGray,
    wrap: true,
  });

  // Total line
  slide.addShape("rect", {
    x: MARGIN,
    y: 5.5,
    w: CONTENT_W,
    h: 0.5,
    fill: { color: COLORS.deepNavy },
    rectRadius: 0.06,
  });
  slide.addText("Three-Year Total: $4.1M (committed) + $1.8M (incremental) = $5.9M all-in", {
    x: MARGIN + 0.2,
    y: 5.5,
    w: CONTENT_W - 0.4,
    h: 0.5,
    fontSize: 13,
    fontFace: FONTS.heading,
    bold: true,
    color: COLORS.white,
    valign: "middle",
  });

  addSource(slide, "Finance team, CDAIO Office budget model");
  addPageNumber(slide, 12);
}

// ---------------------------------------------------------------------------
// Slide 13: Recommendations (Light)
// ---------------------------------------------------------------------------
function slide13_Recommendations(pres) {
  const slide = pres.addSlide();
  addLightBackground(slide);

  addContentTitle(
    slide,
    "Three near-term initiatives deliver $3.8M in Year 1 value while addressing critical governance gaps"
  );

  const recs = [
    {
      num: "1",
      title: "Deploy clinical NLP documentation system across 3 pilot departments",
      impact: "$1.1M Y1",
      timeline: "Q2 2026",
      owner: "AI/ML Lead",
    },
    {
      num: "2",
      title: "Launch predictive no-show model for appointment optimization",
      impact: "$920K Y1",
      timeline: "Q3 2026",
      owner: "Data Analyst",
    },
    {
      num: "3",
      title: "Implement automated data quality monitoring across 12 clinical data domains",
      impact: "Quality 87% \u2192 95%",
      timeline: "Q3 2026",
      owner: "Data Steward",
    },
  ];

  const recCardW = CONTENT_W;
  const recCardH = 1.4;
  const recStartY = 1.2;

  recs.forEach((rec, i) => {
    const y = recStartY + i * (recCardH + 0.2);

    // Card background
    slide.addShape("roundRect", {
      x: MARGIN,
      y,
      w: recCardW,
      h: recCardH,
      fill: { color: COLORS.iceBlue },
      rectRadius: 0.08,
    });

    // Number circle
    slide.addShape("ellipse", {
      x: MARGIN + 0.2,
      y: y + 0.3,
      w: 0.6,
      h: 0.6,
      fill: { color: COLORS.vividBlue },
    });
    slide.addText(rec.num, {
      x: MARGIN + 0.2,
      y: y + 0.3,
      w: 0.6,
      h: 0.6,
      fontSize: 20,
      fontFace: FONTS.title,
      color: COLORS.white,
      align: "center",
      valign: "middle",
    });

    // Title
    slide.addText(rec.title, {
      x: MARGIN + 1.0,
      y: y + 0.15,
      w: recCardW - 1.4,
      h: 0.5,
      fontSize: 13,
      fontFace: FONTS.heading,
      bold: true,
      color: COLORS.deepNavy,
      wrap: true,
    });

    // Impact, Timeline, Owner — inline
    const metaY = y + 0.75;
    const metaItems = [
      { label: "Impact:", value: rec.impact },
      { label: "Timeline:", value: rec.timeline },
      { label: "Owner:", value: rec.owner },
    ];
    metaItems.forEach((m, j) => {
      const mx = MARGIN + 1.0 + j * 3.2;
      slide.addText([
        { text: `${m.label} `, options: { fontSize: 10, fontFace: FONTS.body, color: COLORS.mediumGray } },
        { text: m.value, options: { fontSize: 10, fontFace: FONTS.heading, bold: true, color: COLORS.deepNavy } },
      ], {
        x: mx,
        y: metaY,
        w: 3.0,
        h: 0.3,
      });
    });
  });

  addSource(slide, "Use case scoring matrix, implementation roadmap");
  addPageNumber(slide, 13);
}

// ---------------------------------------------------------------------------
// Slide 14: Board Asks / Next Steps (Light)
// ---------------------------------------------------------------------------
function slide14_BoardAsks(pres) {
  const slide = pres.addSlide();
  addLightBackground(slide);

  addContentTitle(
    slide,
    "Board is asked to approve $1.8M incremental budget and endorse Q2 governance framework launch"
  );

  const asks = [
    {
      num: "1",
      title: "Approve $1.8M incremental investment for EU AI Act compliance ($1.2M) and data quality acceleration ($600K)",
      type: "Budget approval",
      requiredBy: "Q2 2026",
    },
    {
      num: "2",
      title: "Endorse data governance framework launch with 6 domain stewards across clinical and operational data",
      type: "Strategic endorsement",
      requiredBy: "Q2 2026",
    },
    {
      num: "3",
      title: "Schedule AI ethics policy review and responsible AI framework presentation at next Board meeting",
      type: "Agenda item",
      requiredBy: "Q3 2026",
    },
  ];

  const askCardW = CONTENT_W;
  const askCardH = 1.5;
  const askStartY = 1.2;

  asks.forEach((ask, i) => {
    const y = askStartY + i * (askCardH + 0.2);

    // Card background
    slide.addShape("roundRect", {
      x: MARGIN,
      y,
      w: askCardW,
      h: askCardH,
      fill: { color: COLORS.iceBlue },
      rectRadius: 0.08,
    });

    // Number circle (Vivid Blue)
    slide.addShape("ellipse", {
      x: MARGIN + 0.2,
      y: y + 0.35,
      w: 0.65,
      h: 0.65,
      fill: { color: COLORS.vividBlue },
    });
    slide.addText(ask.num, {
      x: MARGIN + 0.2,
      y: y + 0.35,
      w: 0.65,
      h: 0.65,
      fontSize: 22,
      fontFace: FONTS.title,
      color: COLORS.white,
      align: "center",
      valign: "middle",
    });

    // Title
    slide.addText(ask.title, {
      x: MARGIN + 1.1,
      y: y + 0.15,
      w: askCardW - 1.5,
      h: 0.6,
      fontSize: 13,
      fontFace: FONTS.heading,
      bold: true,
      color: COLORS.deepNavy,
      wrap: true,
    });

    // Decision type & required by
    const metaY = y + 0.9;
    slide.addText([
      { text: "Decision type: ", options: { fontSize: 10, fontFace: FONTS.body, color: COLORS.mediumGray } },
      { text: ask.type, options: { fontSize: 10, fontFace: FONTS.heading, bold: true, color: COLORS.deepNavy } },
    ], {
      x: MARGIN + 1.1,
      y: metaY,
      w: 4.0,
      h: 0.3,
    });
    slide.addText([
      { text: "Required by: ", options: { fontSize: 10, fontFace: FONTS.body, color: COLORS.mediumGray } },
      { text: ask.requiredBy, options: { fontSize: 10, fontFace: FONTS.heading, bold: true, color: COLORS.deepNavy } },
    ], {
      x: MARGIN + 5.1,
      y: metaY,
      w: 3.0,
      h: 0.3,
    });
  });

  addSource(slide, "CDAIO Office, Finance team cost estimates");
  addPageNumber(slide, 14);
}

// ---------------------------------------------------------------------------
// Slide 15: Appendix Section Divider (Dark)
// ---------------------------------------------------------------------------
function slide15_AppendixDivider(pres) {
  const slide = pres.addSlide();
  addDarkBackground(slide);

  // Decorative right-side accent block
  slide.addShape("rect", {
    x: SLIDE_W - 3.5,
    y: 0,
    w: 3.5,
    h: SLIDE_H,
    fill: { color: COLORS.mediumBlue },
    transparency: 85,
  });

  // Accent bar
  addAccentBar(slide, MARGIN + 0.2, 2.6, 2.5);

  // APPENDIX title
  slide.addText("APPENDIX", {
    x: MARGIN + 0.2,
    y: 2.8,
    w: 9,
    h: 0.8,
    fontSize: 32,
    fontFace: FONTS.title,
    color: COLORS.white,
  });

  // Subtitle
  slide.addText("Supporting data and detailed analysis", {
    x: MARGIN + 0.2,
    y: 3.7,
    w: 9,
    h: 0.5,
    fontSize: 16,
    fontFace: FONTS.body,
    color: COLORS.iceBlue,
  });
}

// ---------------------------------------------------------------------------
// Slide 16: Appendix — Detailed KPI Data (Backup)
// ---------------------------------------------------------------------------
function slide16_AppendixKPIData(pres) {
  const slide = pres.addSlide();
  addLightBackground(slide);

  // BACKUP watermark
  addBackupWatermark(slide);

  addContentTitle(
    slide,
    "Detailed KPI tracking data supports the performance assessment across 8 metrics"
  );

  const headerRow = [
    { text: "KPI", options: { bold: true, color: COLORS.white, fill: { color: COLORS.deepNavy }, fontSize: 9, fontFace: FONTS.heading, align: "left", valign: "middle" } },
    { text: "Q4 2025", options: { bold: true, color: COLORS.white, fill: { color: COLORS.deepNavy }, fontSize: 9, fontFace: FONTS.heading, align: "center", valign: "middle" } },
    { text: "Q1 2026", options: { bold: true, color: COLORS.white, fill: { color: COLORS.deepNavy }, fontSize: 9, fontFace: FONTS.heading, align: "center", valign: "middle" } },
    { text: "QoQ Change", options: { bold: true, color: COLORS.white, fill: { color: COLORS.deepNavy }, fontSize: 9, fontFace: FONTS.heading, align: "center", valign: "middle" } },
    { text: "Target", options: { bold: true, color: COLORS.white, fill: { color: COLORS.deepNavy }, fontSize: 9, fontFace: FONTS.heading, align: "center", valign: "middle" } },
    { text: "Gap", options: { bold: true, color: COLORS.white, fill: { color: COLORS.deepNavy }, fontSize: 9, fontFace: FONTS.heading, align: "center", valign: "middle" } },
    { text: "Status", options: { bold: true, color: COLORS.white, fill: { color: COLORS.deepNavy }, fontSize: 9, fontFace: FONTS.heading, align: "center", valign: "middle" } },
  ];

  const kpiData = [
    { kpi: "AI Value", q4: "$1.8M", q1: "$2.4M", change: "+$600K", target: "$2.0M", gap: "+$400K", status: "Green" },
    { kpi: "Model Adoption", q4: "37%", q1: "42%", change: "+5%", target: "40%", gap: "+2%", status: "Green" },
    { kpi: "Platform Uptime", q4: "98.5%", q1: "98.2%", change: "-0.3%", target: "99.0%", gap: "-0.8%", status: "Amber" },
    { kpi: "Models in Production", q4: "133", q1: "156", change: "+23", target: "150", gap: "+6", status: "Green" },
    { kpi: "Stakeholder NPS", q4: "4.5", q1: "4.2", change: "-0.3", target: "4.5", gap: "-0.3", status: "Amber" },
    { kpi: "Data Quality", q4: "83%", q1: "87%", change: "+4%", target: "95%", gap: "-8%", status: "Red" },
    { kpi: "Policy Compliance", q4: "66%", q1: "78%", change: "+12%", target: "95%", gap: "-17%", status: "Amber" },
    { kpi: "Steward Coverage", q4: "25%", q1: "40%", change: "+15%", target: "80%", gap: "-40%", status: "Red" },
  ];

  const dataRows = kpiData.map((row, i) => {
    const fillColor = i % 2 === 0 ? COLORS.white : COLORS.iceBlue;
    const cellOpts = { color: COLORS.darkGray, fill: { color: fillColor }, fontSize: 9, fontFace: FONTS.body, valign: "middle" };
    return [
      { text: row.kpi, options: { ...cellOpts, bold: true, align: "left" } },
      { text: row.q4, options: { ...cellOpts, align: "center" } },
      { text: row.q1, options: { ...cellOpts, align: "center" } },
      { text: row.change, options: { ...cellOpts, align: "center" } },
      { text: row.target, options: { ...cellOpts, align: "center" } },
      { text: row.gap, options: { ...cellOpts, align: "center" } },
      { text: row.status, options: { ...cellOpts, bold: true, color: ragColor(row.status), align: "center" } },
    ];
  });

  slide.addTable([headerRow, ...dataRows], {
    x: MARGIN,
    y: 1.2,
    w: CONTENT_W,
    colW: [2.2, 1.4, 1.4, 1.4, 1.4, 1.4, 1.4],
    rowH: 0.48,
    border: { type: "solid", pt: 0.5, color: COLORS.iceBlue },
    margin: [3, 6, 3, 6],
  });

  // Methodology note
  slide.addText("Methodology: KPIs measured quarterly via internal dashboards, validated by Finance and Operations. QoQ change represents absolute delta. Gap = Current - Target.", {
    x: MARGIN,
    y: 5.8,
    w: CONTENT_W,
    h: 0.4,
    fontSize: 9,
    fontFace: FONTS.body,
    italic: true,
    color: COLORS.mediumGray,
    wrap: true,
  });

  addSource(slide, "Internal dashboards, governance office, Q1 2026");
  addPageNumber(slide, 16);
}

// ---------------------------------------------------------------------------
// Slide 17: Appendix — Risk Register (Backup)
// ---------------------------------------------------------------------------
function slide17_AppendixRiskRegister(pres) {
  const slide = pres.addSlide();
  addLightBackground(slide);

  // BACKUP watermark
  addBackupWatermark(slide);

  addContentTitle(
    slide,
    "Complete risk register with severity assessment and mitigation ownership"
  );

  const headerRow = [
    { text: "Risk", options: { bold: true, color: COLORS.white, fill: { color: COLORS.deepNavy }, fontSize: 8, fontFace: FONTS.heading, align: "left", valign: "middle" } },
    { text: "Category", options: { bold: true, color: COLORS.white, fill: { color: COLORS.deepNavy }, fontSize: 8, fontFace: FONTS.heading, align: "center", valign: "middle" } },
    { text: "Severity", options: { bold: true, color: COLORS.white, fill: { color: COLORS.deepNavy }, fontSize: 8, fontFace: FONTS.heading, align: "center", valign: "middle" } },
    { text: "Likelihood", options: { bold: true, color: COLORS.white, fill: { color: COLORS.deepNavy }, fontSize: 8, fontFace: FONTS.heading, align: "center", valign: "middle" } },
    { text: "Impact", options: { bold: true, color: COLORS.white, fill: { color: COLORS.deepNavy }, fontSize: 8, fontFace: FONTS.heading, align: "left", valign: "middle" } },
    { text: "Mitigation", options: { bold: true, color: COLORS.white, fill: { color: COLORS.deepNavy }, fontSize: 8, fontFace: FONTS.heading, align: "left", valign: "middle" } },
    { text: "Owner", options: { bold: true, color: COLORS.white, fill: { color: COLORS.deepNavy }, fontSize: 8, fontFace: FONTS.heading, align: "center", valign: "middle" } },
    { text: "Status", options: { bold: true, color: COLORS.white, fill: { color: COLORS.deepNavy }, fontSize: 8, fontFace: FONTS.heading, align: "center", valign: "middle" } },
  ];

  const risks = [
    { risk: "EU AI Act Non-Compliance", category: "Regulatory", severity: "Critical", likelihood: "High", impact: "$36.4M potential fines", mitigation: "Compliance program", owner: "Compliance Officer", status: "Red" },
    { risk: "Data Quality Below Threshold", category: "Operational", severity: "High", likelihood: "Medium", impact: "Model accuracy risk", mitigation: "Automated monitoring", owner: "Data Steward", status: "Red" },
    { risk: "Talent Acquisition Delays", category: "Organizational", severity: "Medium", likelihood: "Medium", impact: "Execution slowdown", mitigation: "Recruiting pipeline", owner: "Head of AI", status: "Amber" },
    { risk: "Cloud Migration Slippage", category: "Technical", severity: "Medium", likelihood: "Low", impact: "Phase 2 delay", mitigation: "Vendor management", owner: "Data Engineer", status: "Amber" },
    { risk: "Stakeholder Resistance", category: "Change Mgmt", severity: "Low", likelihood: "Medium", impact: "Adoption risk", mitigation: "Communication plan", owner: "Stakeholder Relations", status: "Green" },
  ];

  const dataRows = risks.map((row, i) => {
    const fillColor = i % 2 === 0 ? COLORS.white : COLORS.iceBlue;
    const cellOpts = { color: COLORS.darkGray, fill: { color: fillColor }, fontSize: 8, fontFace: FONTS.body, valign: "middle" };
    return [
      { text: row.risk, options: { ...cellOpts, bold: true, align: "left" } },
      { text: row.category, options: { ...cellOpts, align: "center" } },
      { text: row.severity, options: { ...cellOpts, align: "center" } },
      { text: row.likelihood, options: { ...cellOpts, align: "center" } },
      { text: row.impact, options: { ...cellOpts, align: "left" } },
      { text: row.mitigation, options: { ...cellOpts, align: "left" } },
      { text: row.owner, options: { ...cellOpts, align: "center" } },
      { text: row.status, options: { ...cellOpts, bold: true, color: ragColor(row.status), align: "center" } },
    ];
  });

  slide.addTable([headerRow, ...dataRows], {
    x: MARGIN,
    y: 1.2,
    w: CONTENT_W,
    colW: [2.0, 1.2, 1.0, 1.0, 1.8, 1.8, 1.73, 0.8],
    rowH: 0.55,
    border: { type: "solid", pt: 0.5, color: COLORS.iceBlue },
    margin: [3, 5, 3, 5],
  });

  addSource(slide, "Risk register, quarterly assessment, Q1 2026");
  addPageNumber(slide, 17);
}

// ---------------------------------------------------------------------------
// Main — Build and save the presentation
// ---------------------------------------------------------------------------
async function main() {
  const pres = new pptxgen();
  pres.layout = "LAYOUT_WIDE";
  pres.author = "CDAIO Office";
  pres.company = "Meridian Healthcare";
  pres.subject = "Q1 2026 Board Update";
  pres.title = "Meridian Healthcare — Data, Analytics & AI Board Update";

  // Build all 17 slides in order
  slide01_Title(pres);         // Slide 1  — Title (Dark, no page number)
  slide02_ExecSummary(pres);   // Slide 2  — Executive Summary (Light, page 2)
  slide03_Agenda(pres);        // Slide 3  — Agenda (Light, page 3)
  slide04_SectionPerformance(pres); // Slide 4 — Section Divider (Dark, no page number)
  slide05_KPIDashboard(pres);  // Slide 5  — KPI Dashboard (Light, page 5)
  slide06_KPITrends(pres);     // Slide 6  — KPI Trend Details (Light, page 6)
  slide07_SectionInitiatives(pres); // Slide 7 — Section Divider (Dark, no page number)
  slide08_InitiativeTable(pres); // Slide 8 — Initiative Portfolio (Light, page 8)
  slide09_SectionRisk(pres);   // Slide 9  — Section Divider (Dark, no page number)
  slide10_RiskOverview(pres);  // Slide 10 — Risk Overview (Light, page 10)
  slide11_SectionBudget(pres); // Slide 11 — Section Divider (Dark, no page number)
  slide12_BudgetOverview(pres); // Slide 12 — Budget Overview (Light, page 12)
  slide13_Recommendations(pres); // Slide 13 — Recommendations (Light, page 13)
  slide14_BoardAsks(pres);     // Slide 14 — Board Asks (Light, page 14)
  slide15_AppendixDivider(pres); // Slide 15 — Appendix Divider (Dark, no page number)
  slide16_AppendixKPIData(pres); // Slide 16 — Appendix KPI Data (Light, page 16)
  slide17_AppendixRiskRegister(pres); // Slide 17 — Appendix Risk Register (Light, page 17)

  // Write output
  const outputPath = path.resolve("ww/static/demo/downloads/board-presentation.pptx");
  const outputDir = path.dirname(outputPath);
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  await pres.writeFile({ fileName: outputPath });
  console.log(`Board presentation generated: ${outputPath}`);
  console.log(`Slides: 17 | Layout: LAYOUT_WIDE (16:9)`);
  console.log(`Company: Meridian Healthcare | Period: Q1 2026`);
}

main().catch((err) => {
  console.error("Error generating board presentation:", err);
  process.exit(1);
});
