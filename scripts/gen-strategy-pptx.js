/**
 * AI Strategy Summary PPTX Generator (Demo)
 *
 * Generates a 20-slide MBB-style AI Strategy Summary presentation for
 * Meridian Healthcare. Designed for the demo page of the Hugo website.
 *
 * Usage:
 *   node ww/scripts/gen-strategy-pptx.js
 *
 * Output: ww/static/demo/downloads/ai-strategy-summary.pptx
 *
 * Part of the CDAIO Skills Suite
 */

const pptxgen = require("pptxgenjs");
const fs = require("fs");
const path = require("path");

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

const MARGIN = 0.5;
const SLIDE_W = 13.33;
const SLIDE_H = 7.5;
const CONTENT_W = SLIDE_W - 2 * MARGIN;

const PILLAR_COLORS = [COLORS.vividBlue, COLORS.teal, COLORS.forestGreen];

// ---------------------------------------------------------------------------
// Meridian Healthcare Data
// ---------------------------------------------------------------------------

const COMPANY = {
  name: "Meridian Healthcare",
  revenue: "$520M",
  employees: 5000,
  industry: "Healthcare",
  aiSpend: "$180K",
  aiSpendPct: "0.03%",
  leaderBenchmark: "0.8%",
  investmentGap: "26x",
  overallMaturity: 2.2,
  targetMaturity: 3.5,
  healthcareAvg: 2.8,
  healthcareLeaders: 4.0,
  modelsInProd: 2,
  leaderModels: "15+",
  investmentBase: "$4.1M",
  returnBase: "$9.2M",
  roi: "2.2x",
  phase1: "$1.2M",
  phase2: "$1.5M",
  phase3: "$1.4M",
  regulations: ["HIPAA", "EU AI Act"],
};

const DIMENSIONS = [
  { name: "Strategy & Ambition", weight: 0.20, score: 2.5, target: 3.5, gap: -1.0 },
  { name: "Data & Technology", weight: 0.20, score: 2.3, target: 3.5, gap: -1.2 },
  { name: "Talent & Capabilities", weight: 0.15, score: 1.8, target: 3.5, gap: -1.7 },
  { name: "Governance & Responsible AI", weight: 0.20, score: 1.6, target: 3.5, gap: -1.9 },
  { name: "Use Case Development", weight: 0.15, score: 2.8, target: 3.5, gap: -0.7 },
  { name: "Ecosystem & Innovation", weight: 0.10, score: 2.4, target: 3.5, gap: -1.1 },
];

const USE_CASES = [
  { name: "Clinical NLP Documentation", func: "Operations", impact: 9.2, y1: "$1.1M", ttv: "4 months", status: "Green" },
  { name: "Predictive No-Show Model", func: "Revenue Cycle", impact: 8.7, y1: "$920K", ttv: "6 months", status: "Green" },
  { name: "Drug Interaction Checker", func: "Clinical Safety", impact: 7.8, y1: "$780K", ttv: "5 months", status: "Amber" },
  { name: "Supply Chain Optimizer", func: "Logistics", impact: 7.4, y1: "$540K", ttv: "8 months", status: "Green" },
  { name: "Claims Processing AI", func: "Finance", impact: 6.9, y1: "$460K", ttv: "7 months", status: "Amber" },
];

const SCENARIOS = [
  { name: "Conservative", investment: "$3.4M", return3yr: "$5.8M", roi: "1.7x", breakeven: "22 months" },
  { name: "Base", investment: "$4.1M", return3yr: "$9.2M", roi: "2.2x", breakeven: "18 months" },
  { name: "Aggressive", investment: "$4.8M", return3yr: "$13.5M", roi: "2.8x", breakeven: "14 months" },
];

const KPI_METRICS = [
  { name: "Maturity Score", baseline: "2.2", y1: "2.8", y3: "3.5", status: "Green" },
  { name: "AI Value Delivered", baseline: "$0", y1: "$3.8M", y3: "$9.2M", status: "Green" },
  { name: "Models in Production", baseline: "2", y1: "8", y3: "20+", status: "Green" },
  { name: "Data Quality Score", baseline: "72%", y1: "85%", y3: "95%", status: "Amber" },
  { name: "Stakeholder Adoption", baseline: "5%", y1: "25%", y3: "40%", status: "Amber" },
  { name: "Governance Compliance", baseline: "30%", y1: "75%", y3: "95%", status: "Red" },
];

// ---------------------------------------------------------------------------
// Helper Functions
// ---------------------------------------------------------------------------

function ragColor(status) {
  return STATUS_COLORS[status] || COLORS.lightGray;
}

function ragFromGap(gap) {
  const absGap = Math.abs(gap);
  if (absGap > 1.5) return "Red";
  if (absGap >= 0.8) return "Amber";
  return "Green";
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
    x: x,
    y: y,
    w: w,
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

// ---------------------------------------------------------------------------
// Slide 1: Title (Dark)
// ---------------------------------------------------------------------------

function slide01Title(pres) {
  const slide = pres.addSlide();
  addDarkBackground(slide);

  // Company name uppercased with letter-spacing
  slide.addText("MERIDIAN HEALTHCARE", {
    x: MARGIN + 0.2,
    y: 0.6,
    w: 6,
    h: 0.5,
    fontSize: 16,
    fontFace: FONTS.heading,
    bold: true,
    color: COLORS.white,
    charSpacing: 3,
  });

  // Vivid Blue accent bar
  addAccentBar(slide, 0.7, 1.25, 2.5);

  // Main title
  slide.addText("AI & Data Strategy\n2026-2028", {
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
  slide.addText("Three-Year Roadmap  |  March 2026", {
    x: MARGIN + 0.2,
    y: 3.5,
    w: 8,
    h: 0.5,
    fontSize: 20,
    fontFace: FONTS.body,
    color: COLORS.iceBlue,
  });

  // Presenter line
  slide.addText("Chief Data & AI Officer  |  Office of the CDAIO", {
    x: MARGIN + 0.2,
    y: 4.2,
    w: 8,
    h: 0.4,
    fontSize: 14,
    fontFace: FONTS.body,
    color: COLORS.white,
  });

  // CONFIDENTIAL footer
  slide.addText("CONFIDENTIAL", {
    x: SLIDE_W - 2.5,
    y: SLIDE_H - 0.5,
    w: 2.0,
    h: 0.3,
    fontSize: 10,
    fontFace: FONTS.body,
    color: COLORS.mediumGray,
    align: "right",
  });

  // Semi-transparent decorative rect on right edge
  slide.addShape("rect", {
    x: SLIDE_W - 3.0,
    y: 0,
    w: 3.0,
    h: SLIDE_H,
    fill: { color: COLORS.mediumBlue, transparency: 85 },
  });
}

// ---------------------------------------------------------------------------
// Slide 2: Executive Summary (Light)
// ---------------------------------------------------------------------------

function slide02ExecSummary(pres) {
  const slide = pres.addSlide();
  addLightBackground(slide);
  addContentTitle(
    slide,
    "Meridian\u2019s $180K AI spend trails healthcare peers by 26x, creating a $9.2M value gap closable in 3 years"
  );
  addPageNumber(slide, 2);

  const startY = 1.2;
  const dotSize = 0.18;
  const bulletX = MARGIN + 0.1;
  const textX = MARGIN + 0.45;
  const textW = 7.5;

  const scr = [
    {
      label: "Situation",
      text: "$520M healthcare company invests only 0.03% of revenue in AI vs leader benchmark of 0.8% \u2014 a 26x investment gap",
    },
    {
      label: "Complication",
      text: "Only 2 ML models in production vs leaders\u2019 15+, maturity at 2.2/5.0 vs leaders\u2019 4.0, no governance framework",
    },
    {
      label: "Resolution",
      text: "$4.1M phased investment across 12 use cases closes maturity gap to 3.5 and generates $9.2M return (base case)",
    },
  ];

  scr.forEach((item, i) => {
    const y = startY + i * 1.1;
    // Vivid Blue ellipse dot
    slide.addShape("ellipse", {
      x: bulletX,
      y: y + 0.15,
      w: dotSize,
      h: dotSize,
      fill: { color: COLORS.vividBlue },
    });
    // Label bold + text
    slide.addText([
      { text: `${item.label}: `, options: { bold: true, color: COLORS.deepNavy } },
      { text: item.text, options: { color: COLORS.darkGray } },
    ], {
      x: textX,
      y: y,
      w: textW,
      h: 0.8,
      fontSize: 14,
      fontFace: FONTS.body,
      valign: "top",
      wrap: true,
    });
  });

  // Key numbers callout box (Ice Blue rounded rect on right)
  const boxX = 9.2;
  const boxY = 1.2;
  const boxW = 3.5;
  const boxH = 3.5;
  slide.addShape("roundRect", {
    x: boxX,
    y: boxY,
    w: boxW,
    h: boxH,
    fill: { color: COLORS.iceBlue },
    rectRadius: 0.1,
  });

  slide.addText("KEY NUMBERS", {
    x: boxX,
    y: boxY + 0.15,
    w: boxW,
    h: 0.35,
    fontSize: 11,
    fontFace: FONTS.heading,
    bold: true,
    color: COLORS.deepNavy,
    align: "center",
  });

  const keyNums = [
    { value: "$4.1M", label: "Investment" },
    { value: "$9.2M", label: "Return" },
    { value: "2.2x", label: "ROI" },
    { value: "12", label: "Use Cases" },
  ];

  keyNums.forEach((kn, i) => {
    const ky = boxY + 0.6 + i * 0.7;
    slide.addText(kn.value, {
      x: boxX + 0.3,
      y: ky,
      w: boxW - 0.6,
      h: 0.35,
      fontSize: 22,
      fontFace: FONTS.title,
      bold: true,
      color: COLORS.vividBlue,
      align: "left",
    });
    slide.addText(kn.label, {
      x: boxX + 0.3,
      y: ky + 0.3,
      w: boxW - 0.6,
      h: 0.25,
      fontSize: 11,
      fontFace: FONTS.body,
      color: COLORS.mediumGray,
      align: "left",
    });
  });

  addSource(slide, "CDAIO Office analysis, maturity assessment, use case scoring");
}

// ---------------------------------------------------------------------------
// Slide 3: Agenda (Light)
// ---------------------------------------------------------------------------

function slide03Agenda(pres) {
  const slide = pres.addSlide();
  addLightBackground(slide);
  addContentTitle(
    slide,
    "Five sections structure the path from 2.2 maturity to competitive parity at 3.5"
  );
  addPageNumber(slide, 3);

  const agenda = [
    "Current State Assessment",
    "The AI Opportunity",
    "Strategic Pillars & Roadmap",
    "Implementation Plan",
    "Investment & Returns",
  ];

  const cardW = CONTENT_W;
  const cardH = 0.85;
  const startY = 1.3;
  const gap = 0.15;

  agenda.forEach((item, i) => {
    const y = startY + i * (cardH + gap);
    // Card background
    slide.addShape("roundRect", {
      x: MARGIN,
      y: y,
      w: cardW,
      h: cardH,
      fill: { color: COLORS.white },
      rectRadius: 0.06,
      shadow: { type: "outer", blur: 3, offset: 1, color: "C0C0C0", opacity: 0.3 },
    });
    // Section number in Vivid Blue
    const numStr = String(i + 1).padStart(2, "0");
    slide.addText(numStr, {
      x: MARGIN + 0.3,
      y: y,
      w: 0.8,
      h: cardH,
      fontSize: 24,
      fontFace: FONTS.title,
      color: COLORS.vividBlue,
      valign: "middle",
    });
    // Section name
    slide.addText(item, {
      x: MARGIN + 1.3,
      y: y,
      w: cardW - 2.0,
      h: cardH,
      fontSize: 16,
      fontFace: FONTS.heading,
      bold: true,
      color: COLORS.deepNavy,
      valign: "middle",
    });
  });
}

// ---------------------------------------------------------------------------
// Section Divider Helper
// ---------------------------------------------------------------------------

function addSectionDivider(pres, number, title, subtitle) {
  const slide = pres.addSlide();
  addDarkBackground(slide);

  // Section number
  slide.addText(number, {
    x: MARGIN + 0.2,
    y: 1.8,
    w: 3,
    h: 1.2,
    fontSize: 72,
    fontFace: FONTS.title,
    color: COLORS.vividBlue,
  });

  // Section title uppercased
  slide.addText(title.toUpperCase(), {
    x: MARGIN + 0.2,
    y: 3.2,
    w: 10,
    h: 0.8,
    fontSize: 32,
    fontFace: FONTS.title,
    color: COLORS.white,
    charSpacing: 2,
  });

  // Subtitle
  slide.addText(subtitle, {
    x: MARGIN + 0.2,
    y: 4.2,
    w: 10,
    h: 0.5,
    fontSize: 16,
    fontFace: FONTS.body,
    color: COLORS.iceBlue,
  });

  // Accent bar at bottom
  addAccentBar(slide, MARGIN + 0.2, 5.2, 4);
}

// ---------------------------------------------------------------------------
// Slide 4: Section Divider 01 (Dark)
// ---------------------------------------------------------------------------

function slide04SectionDivider01(pres) {
  addSectionDivider(
    pres,
    "01",
    "Current State Assessment",
    "Where we stand today across 6 maturity dimensions"
  );
}

// ---------------------------------------------------------------------------
// Slide 5: Maturity Dashboard (Light)
// ---------------------------------------------------------------------------

function slide05MaturityDashboard(pres) {
  const slide = pres.addSlide();
  addLightBackground(slide);
  addContentTitle(
    slide,
    "Overall AI maturity of 2.2/5.0 places Meridian at the Emerging stage, trailing healthcare leaders by 1.8 points"
  );
  addPageNumber(slide, 5);

  const cols = 3;
  const rows = 2;
  const cardW = 3.8;
  const cardH = 2.4;
  const gapX = 0.35;
  const gapY = 0.3;
  const startX = MARGIN + 0.15;
  const startY = 1.25;

  DIMENSIONS.forEach((dim, i) => {
    const col = i % cols;
    const row = Math.floor(i / cols);
    const x = startX + col * (cardW + gapX);
    const y = startY + row * (cardH + gapY);
    const rag = ragFromGap(dim.gap);
    const statusColor = ragColor(rag);

    // Card background
    slide.addShape("roundRect", {
      x: x,
      y: y,
      w: cardW,
      h: cardH,
      fill: { color: COLORS.iceBlue },
      rectRadius: 0.1,
    });

    // RAG dot
    slide.addShape("ellipse", {
      x: x + cardW - 0.5,
      y: y + 0.15,
      w: 0.22,
      h: 0.22,
      fill: { color: statusColor },
    });

    // Big score number
    slide.addText(dim.score.toFixed(1), {
      x: x + 0.2,
      y: y + 0.2,
      w: 2.0,
      h: 0.8,
      fontSize: 36,
      fontFace: FONTS.title,
      color: COLORS.deepNavy,
      bold: true,
    });

    // "/ 5.0" suffix
    slide.addText("/ 5.0", {
      x: x + 1.4,
      y: y + 0.45,
      w: 1.0,
      h: 0.4,
      fontSize: 14,
      fontFace: FONTS.body,
      color: COLORS.mediumGray,
    });

    // Dimension name
    slide.addText(dim.name, {
      x: x + 0.2,
      y: y + 1.1,
      w: cardW - 0.4,
      h: 0.45,
      fontSize: 13,
      fontFace: FONTS.heading,
      bold: true,
      color: COLORS.deepNavy,
      wrap: true,
    });

    // Gap text
    slide.addText(`Gap: ${dim.gap.toFixed(1)}  |  Target: ${dim.target.toFixed(1)}`, {
      x: x + 0.2,
      y: y + 1.6,
      w: cardW - 0.4,
      h: 0.35,
      fontSize: 11,
      fontFace: FONTS.body,
      color: statusColor,
    });

    // Weight info
    slide.addText(`Weight: ${(dim.weight * 100).toFixed(0)}%`, {
      x: x + 0.2,
      y: y + 1.95,
      w: cardW - 0.4,
      h: 0.3,
      fontSize: 10,
      fontFace: FONTS.body,
      color: COLORS.mediumGray,
    });
  });

  addSource(slide, "CDAIO maturity assessment, industry benchmarks (McKinsey, 2024)");
}

// ---------------------------------------------------------------------------
// Slide 6: Maturity Gap Chart (Light)
// ---------------------------------------------------------------------------

function slide06MaturityGapChart(pres) {
  const slide = pres.addSlide();
  addLightBackground(slide);
  addContentTitle(
    slide,
    "Governance and talent gaps of 1.9 and 1.7 points respectively require immediate foundation investment"
  );
  addPageNumber(slide, 6);

  const startY = 1.35;
  const barH = 0.45;
  const rowH = 0.75;
  const labelW = 3.2;
  const barAreaX = MARGIN + labelW + 0.2;
  const barAreaW = 8.5;
  const maxScore = 5.0;

  DIMENSIONS.forEach((dim, i) => {
    const y = startY + i * rowH;

    // Dimension label
    slide.addText(dim.name, {
      x: MARGIN,
      y: y,
      w: labelW,
      h: barH,
      fontSize: 11,
      fontFace: FONTS.heading,
      bold: true,
      color: COLORS.deepNavy,
      align: "right",
      valign: "middle",
    });

    // Meridian score bar (Deep Navy)
    const meridianW = (dim.score / maxScore) * barAreaW;
    slide.addShape("rect", {
      x: barAreaX,
      y: y + 0.02,
      w: meridianW,
      h: barH * 0.4,
      fill: { color: COLORS.deepNavy },
    });

    // Healthcare avg bar (Medium Blue)
    const avgW = (COMPANY.healthcareAvg / maxScore) * barAreaW;
    slide.addShape("rect", {
      x: barAreaX,
      y: y + barH * 0.45,
      w: avgW,
      h: barH * 0.4,
      fill: { color: COLORS.mediumBlue },
    });

    // Target marker (Vivid Blue vertical line)
    const targetX = barAreaX + (dim.target / maxScore) * barAreaW;
    slide.addShape("rect", {
      x: targetX,
      y: y - 0.02,
      w: 0.04,
      h: barH + 0.04,
      fill: { color: COLORS.vividBlue },
    });

    // Score labels
    slide.addText(dim.score.toFixed(1), {
      x: barAreaX + meridianW + 0.08,
      y: y - 0.02,
      w: 0.5,
      h: barH * 0.5,
      fontSize: 9,
      fontFace: FONTS.body,
      color: COLORS.deepNavy,
      bold: true,
    });
  });

  // Legend
  const legendY = startY + DIMENSIONS.length * rowH + 0.3;
  const legendItems = [
    { color: COLORS.deepNavy, label: "Meridian" },
    { color: COLORS.mediumBlue, label: "Healthcare Avg (2.8)" },
    { color: COLORS.vividBlue, label: "Target (3.5)" },
  ];

  legendItems.forEach((item, i) => {
    const lx = MARGIN + 3.5 + i * 3.0;
    slide.addShape("rect", {
      x: lx,
      y: legendY + 0.05,
      w: 0.3,
      h: 0.15,
      fill: { color: item.color },
    });
    slide.addText(item.label, {
      x: lx + 0.4,
      y: legendY,
      w: 2.5,
      h: 0.25,
      fontSize: 10,
      fontFace: FONTS.body,
      color: COLORS.darkGray,
    });
  });

  addSource(slide, "CDAIO assessment, McKinsey Healthcare AI Survey (2024)");
}

// ---------------------------------------------------------------------------
// Slide 7: Section Divider 02 (Dark)
// ---------------------------------------------------------------------------

function slide07SectionDivider02(pres) {
  addSectionDivider(
    pres,
    "02",
    "The AI Opportunity",
    "Market context and use case portfolio"
  );
}

// ---------------------------------------------------------------------------
// Slide 8: Market Context (Light)
// ---------------------------------------------------------------------------

function slide08MarketContext(pres) {
  const slide = pres.addSlide();
  addLightBackground(slide);
  addContentTitle(
    slide,
    "Healthcare AI market delivers $150-260B in total value; Meridian\u2019s $520M revenue positions it for $9.2M capture"
  );
  addPageNumber(slide, 8);

  // 3 stat cards
  const stats = [
    { value: "$150-260B", title: "Healthcare AI Market", sub: "Total industry value pool" },
    { value: "10-15%", title: "Leader EBITDA Uplift", sub: "AI-driven performance gain" },
    { value: "10-20%", title: "Cost Reduction", sub: "Operational efficiency potential" },
  ];

  const cardW = 3.8;
  const cardH = 2.0;
  const gapX = 0.35;
  const startX = MARGIN + 0.15;
  const startY = 1.25;

  stats.forEach((st, i) => {
    const x = startX + i * (cardW + gapX);
    slide.addShape("roundRect", {
      x: x,
      y: startY,
      w: cardW,
      h: cardH,
      fill: { color: COLORS.iceBlue },
      rectRadius: 0.1,
    });
    slide.addText(st.value, {
      x: x + 0.25,
      y: startY + 0.2,
      w: cardW - 0.5,
      h: 0.65,
      fontSize: 28,
      fontFace: FONTS.title,
      color: COLORS.vividBlue,
      bold: true,
    });
    slide.addText(st.title, {
      x: x + 0.25,
      y: startY + 0.9,
      w: cardW - 0.5,
      h: 0.4,
      fontSize: 13,
      fontFace: FONTS.heading,
      bold: true,
      color: COLORS.deepNavy,
    });
    slide.addText(st.sub, {
      x: x + 0.25,
      y: startY + 1.3,
      w: cardW - 0.5,
      h: 0.4,
      fontSize: 11,
      fontFace: FONTS.body,
      color: COLORS.mediumGray,
    });
  });

  // 3 contextual bullets
  const bullets = [
    "78% of healthcare leaders have AI strategies; only 23% have operationalized them",
    "Clinical NLP and predictive analytics show highest near-term ROI in healthcare",
    "HIPAA-compliant cloud infrastructure enables 40% faster model deployment",
  ];

  const bulletStartY = startY + cardH + 0.5;
  bullets.forEach((b, i) => {
    const y = bulletStartY + i * 0.7;
    slide.addShape("ellipse", {
      x: MARGIN + 0.3,
      y: y + 0.12,
      w: 0.14,
      h: 0.14,
      fill: { color: COLORS.vividBlue },
    });
    slide.addText(b, {
      x: MARGIN + 0.6,
      y: y,
      w: CONTENT_W - 1.0,
      h: 0.55,
      fontSize: 13,
      fontFace: FONTS.body,
      color: COLORS.darkGray,
      wrap: true,
    });
  });

  addSource(slide, "McKinsey Global AI Survey (2024), BCG Healthcare AI Report (2024)");
}

// ---------------------------------------------------------------------------
// Slide 9: Use Cases Table (Light)
// ---------------------------------------------------------------------------

function slide09UseCasesTable(pres) {
  const slide = pres.addSlide();
  addLightBackground(slide);
  addContentTitle(
    slide,
    "5 quick-win use cases generate $3.8M in Year 1 with payback periods under 9 months"
  );
  addPageNumber(slide, 9);

  const tableX = MARGIN;
  const tableY = 1.2;
  const tableW = CONTENT_W;

  // Table header + rows
  const headerRow = [
    { text: "Use Case", options: { bold: true, color: COLORS.white, fill: { color: COLORS.deepNavy }, fontSize: 11, fontFace: FONTS.heading, align: "left", valign: "middle" } },
    { text: "Function", options: { bold: true, color: COLORS.white, fill: { color: COLORS.deepNavy }, fontSize: 11, fontFace: FONTS.heading, align: "center", valign: "middle" } },
    { text: "Impact Score", options: { bold: true, color: COLORS.white, fill: { color: COLORS.deepNavy }, fontSize: 11, fontFace: FONTS.heading, align: "center", valign: "middle" } },
    { text: "Y1 Impact", options: { bold: true, color: COLORS.white, fill: { color: COLORS.deepNavy }, fontSize: 11, fontFace: FONTS.heading, align: "center", valign: "middle" } },
    { text: "Time to Value", options: { bold: true, color: COLORS.white, fill: { color: COLORS.deepNavy }, fontSize: 11, fontFace: FONTS.heading, align: "center", valign: "middle" } },
    { text: "Status", options: { bold: true, color: COLORS.white, fill: { color: COLORS.deepNavy }, fontSize: 11, fontFace: FONTS.heading, align: "center", valign: "middle" } },
  ];

  const dataRows = USE_CASES.map((uc, i) => {
    const rowFill = i % 2 === 0 ? COLORS.white : COLORS.iceBlue;
    const statusClr = ragColor(uc.status);
    return [
      { text: uc.name, options: { fontSize: 11, fontFace: FONTS.body, color: COLORS.darkGray, fill: { color: rowFill }, align: "left", valign: "middle" } },
      { text: uc.func, options: { fontSize: 11, fontFace: FONTS.body, color: COLORS.darkGray, fill: { color: rowFill }, align: "center", valign: "middle" } },
      { text: uc.impact.toFixed(1), options: { fontSize: 11, fontFace: FONTS.body, color: COLORS.deepNavy, bold: true, fill: { color: rowFill }, align: "center", valign: "middle" } },
      { text: uc.y1, options: { fontSize: 11, fontFace: FONTS.body, color: COLORS.deepNavy, bold: true, fill: { color: rowFill }, align: "center", valign: "middle" } },
      { text: uc.ttv, options: { fontSize: 11, fontFace: FONTS.body, color: COLORS.darkGray, fill: { color: rowFill }, align: "center", valign: "middle" } },
      { text: `\u25CF ${uc.status}`, options: { fontSize: 11, fontFace: FONTS.body, color: statusClr, bold: true, fill: { color: rowFill }, align: "center", valign: "middle" } },
    ];
  });

  slide.addTable([headerRow, ...dataRows], {
    x: tableX,
    y: tableY,
    w: tableW,
    colW: [3.5, 1.8, 1.5, 1.5, 1.8, 1.5],
    rowH: 0.55,
    border: { type: "solid", pt: 0.5, color: COLORS.iceBlue },
    margin: [0.05, 0.15, 0.05, 0.15],
  });

  // Footnote
  slide.addText("Top 5 of 12 scored use cases shown; full portfolio available in use-case-portfolio.xlsx", {
    x: MARGIN,
    y: tableY + 0.55 * 6 + 0.2,
    w: CONTENT_W,
    h: 0.3,
    fontSize: 9,
    fontFace: FONTS.body,
    italic: true,
    color: COLORS.mediumGray,
  });

  addSource(slide, "Use case scoring matrix, industry impact benchmarks (McKinsey, BCG)");
}

// ---------------------------------------------------------------------------
// Slide 10: Section Divider 03 (Dark)
// ---------------------------------------------------------------------------

function slide10SectionDivider03(pres) {
  addSectionDivider(
    pres,
    "03",
    "Strategic Pillars",
    "Three pillars to close the maturity gap"
  );
}

// ---------------------------------------------------------------------------
// Slide 11: Vision & Pillars (Light)
// ---------------------------------------------------------------------------

function slide11VisionPillars(pres) {
  const slide = pres.addSlide();
  addLightBackground(slide);
  addContentTitle(
    slide,
    "Three pillars \u2014 Foundation, Scale, and Governance \u2014 sequence investments across 24 months"
  );
  addPageNumber(slide, 11);

  // Vision statement
  slide.addText(
    "Transform Meridian Healthcare from reactive data consumer to predictive, AI-enabled care organization",
    {
      x: MARGIN + 0.2,
      y: 1.2,
      w: CONTENT_W - 0.4,
      h: 0.5,
      fontSize: 14,
      fontFace: FONTS.body,
      italic: true,
      color: COLORS.mediumGray,
      align: "center",
    }
  );

  // 3 pillar cards
  const pillars = [
    {
      name: "Foundation & Data",
      color: COLORS.vividBlue,
      items: ["Data governance framework", "MDM implementation", "Cloud migration"],
      timeline: "H1 2026",
    },
    {
      name: "Scale & Impact",
      color: COLORS.teal,
      items: ["12 use case deployments", "MLOps pipeline", "Self-service analytics"],
      timeline: "H2 2026 - H1 2027",
    },
    {
      name: "Governance & Trust",
      color: COLORS.forestGreen,
      items: ["Responsible AI framework", "EU AI Act compliance", "Model monitoring"],
      timeline: "Continuous",
    },
  ];

  const cardW = 3.8;
  const cardH = 3.6;
  const gapX = 0.35;
  const startX = MARGIN + 0.15;
  const startY = 2.0;

  pillars.forEach((p, i) => {
    const x = startX + i * (cardW + gapX);

    // Card
    slide.addShape("roundRect", {
      x: x,
      y: startY,
      w: cardW,
      h: cardH,
      fill: { color: COLORS.white },
      rectRadius: 0.08,
      shadow: { type: "outer", blur: 3, offset: 1, color: "C0C0C0", opacity: 0.3 },
    });

    // Colored accent bar at top of card
    slide.addShape("rect", {
      x: x,
      y: startY,
      w: cardW,
      h: 0.08,
      fill: { color: p.color },
    });

    // Pillar name
    slide.addText(p.name, {
      x: x + 0.25,
      y: startY + 0.25,
      w: cardW - 0.5,
      h: 0.45,
      fontSize: 15,
      fontFace: FONTS.heading,
      bold: true,
      color: COLORS.deepNavy,
    });

    // Initiative bullets
    p.items.forEach((item, j) => {
      const iy = startY + 0.85 + j * 0.6;
      slide.addShape("ellipse", {
        x: x + 0.3,
        y: iy + 0.1,
        w: 0.12,
        h: 0.12,
        fill: { color: p.color },
      });
      slide.addText(item, {
        x: x + 0.55,
        y: iy,
        w: cardW - 0.85,
        h: 0.45,
        fontSize: 12,
        fontFace: FONTS.body,
        color: COLORS.darkGray,
        wrap: true,
      });
    });

    // Timeline
    slide.addText(p.timeline, {
      x: x + 0.25,
      y: startY + cardH - 0.55,
      w: cardW - 0.5,
      h: 0.35,
      fontSize: 11,
      fontFace: FONTS.body,
      bold: true,
      color: p.color,
      align: "center",
    });
  });

  addSource(slide, "CDAIO Office strategic framework");
}

// ---------------------------------------------------------------------------
// Slide 12: Pillar Initiative Details (Light)
// ---------------------------------------------------------------------------

function slide12PillarDetails(pres) {
  const slide = pres.addSlide();
  addLightBackground(slide);
  addContentTitle(
    slide,
    "Phase 1 deploys governance framework and 5 quick wins; Phase 2 scales to full production across 12 models"
  );
  addPageNumber(slide, 12);

  const columns = [
    {
      title: "Foundation",
      color: COLORS.vividBlue,
      items: [
        { name: "Data governance", detail: "Q2 2026, 6 stewards" },
        { name: "MDM platform", detail: "Q3 2026, Vendor TBD" },
        { name: "Cloud migration", detail: "Q4 2026, Azure/Databricks" },
      ],
    },
    {
      title: "Scale",
      color: COLORS.teal,
      items: [
        { name: "Clinical NLP pilot", detail: "Q2 2026, $1.1M impact" },
        { name: "Predictive models", detail: "Q3 2026, 3 models" },
        { name: "Self-service rollout", detail: "Q4 2026, 200 users" },
      ],
    },
    {
      title: "Governance",
      color: COLORS.forestGreen,
      items: [
        { name: "AI ethics policy", detail: "Q2 2026, Board review" },
        { name: "EU AI Act compliance", detail: "Q3 2026, 3 gaps" },
        { name: "Model monitoring", detail: "Q4 2026, All prod models" },
      ],
    },
  ];

  const colW = 3.8;
  const gapX = 0.35;
  const startX = MARGIN + 0.15;
  const startY = 1.2;

  columns.forEach((col, ci) => {
    const x = startX + ci * (colW + gapX);

    // Column header
    slide.addShape("rect", {
      x: x,
      y: startY,
      w: colW,
      h: 0.5,
      fill: { color: col.color },
    });
    slide.addText(col.title, {
      x: x,
      y: startY,
      w: colW,
      h: 0.5,
      fontSize: 14,
      fontFace: FONTS.heading,
      bold: true,
      color: COLORS.white,
      align: "center",
      valign: "middle",
    });

    // Initiative cards
    col.items.forEach((item, ii) => {
      const iy = startY + 0.65 + ii * 1.5;
      slide.addShape("roundRect", {
        x: x + 0.1,
        y: iy,
        w: colW - 0.2,
        h: 1.25,
        fill: { color: COLORS.iceBlue },
        rectRadius: 0.08,
      });
      slide.addText(item.name, {
        x: x + 0.25,
        y: iy + 0.15,
        w: colW - 0.5,
        h: 0.4,
        fontSize: 13,
        fontFace: FONTS.heading,
        bold: true,
        color: COLORS.deepNavy,
      });
      slide.addText(item.detail, {
        x: x + 0.25,
        y: iy + 0.6,
        w: colW - 0.5,
        h: 0.4,
        fontSize: 11,
        fontFace: FONTS.body,
        color: COLORS.mediumGray,
      });
    });
  });

  addSource(slide, "CDAIO implementation roadmap");
}

// ---------------------------------------------------------------------------
// Slide 13: Section Divider 04 (Dark)
// ---------------------------------------------------------------------------

function slide13SectionDivider04(pres) {
  addSectionDivider(
    pres,
    "04",
    "Implementation Roadmap",
    "Phased approach to execution"
  );
}

// ---------------------------------------------------------------------------
// Slide 14: Roadmap (Light)
// ---------------------------------------------------------------------------

function slide14Roadmap(pres) {
  const slide = pres.addSlide();
  addLightBackground(slide);
  addContentTitle(
    slide,
    "Phase 1 ($1.2M, H1 2026) delivers governance and quick wins before scaling in Phase 2 ($1.5M)"
  );
  addPageNumber(slide, 14);

  const phases = [
    {
      title: "Phase 1",
      period: "H1 2026",
      budget: "$1.2M",
      color: COLORS.vividBlue,
      items: ["Governance framework", "5 quick-win use cases", "Data quality baseline"],
    },
    {
      title: "Phase 2",
      period: "H2 2026 - H1 2027",
      budget: "$1.5M",
      color: COLORS.teal,
      items: ["Scale to 12 models", "MLOps pipeline", "Self-service analytics"],
    },
    {
      title: "Phase 3",
      period: "H2 2027 - 2028",
      budget: "$1.4M",
      color: COLORS.forestGreen,
      items: ["20+ use cases", "Predictive analytics org", "3.5 maturity target"],
    },
  ];

  const colW = 3.8;
  const gapX = 0.35;
  const startX = MARGIN + 0.15;
  const startY = 1.2;

  phases.forEach((ph, i) => {
    const x = startX + i * (colW + gapX);

    // Phase header with accent
    slide.addShape("rect", {
      x: x,
      y: startY,
      w: colW,
      h: 0.08,
      fill: { color: ph.color },
    });

    slide.addShape("roundRect", {
      x: x,
      y: startY + 0.08,
      w: colW,
      h: 1.0,
      fill: { color: COLORS.white },
      rectRadius: 0,
      shadow: { type: "outer", blur: 2, offset: 1, color: "C0C0C0", opacity: 0.2 },
    });

    slide.addText(ph.title, {
      x: x + 0.2,
      y: startY + 0.15,
      w: colW - 0.4,
      h: 0.35,
      fontSize: 16,
      fontFace: FONTS.heading,
      bold: true,
      color: COLORS.deepNavy,
    });
    slide.addText(`${ph.period}  |  ${ph.budget}`, {
      x: x + 0.2,
      y: startY + 0.5,
      w: colW - 0.4,
      h: 0.35,
      fontSize: 12,
      fontFace: FONTS.body,
      color: ph.color,
      bold: true,
    });

    // Initiative items as cards
    ph.items.forEach((item, j) => {
      const iy = startY + 1.3 + j * 1.1;
      slide.addShape("roundRect", {
        x: x + 0.1,
        y: iy,
        w: colW - 0.2,
        h: 0.85,
        fill: { color: COLORS.iceBlue },
        rectRadius: 0.08,
      });
      slide.addText(item, {
        x: x + 0.3,
        y: iy,
        w: colW - 0.6,
        h: 0.85,
        fontSize: 12,
        fontFace: FONTS.body,
        color: COLORS.darkGray,
        valign: "middle",
        wrap: true,
      });
    });

    // Arrow connector between phases (except last)
    if (i < phases.length - 1) {
      const arrowX = x + colW + 0.05;
      const arrowY = startY + 0.5;
      slide.addText("\u25B6", {
        x: arrowX,
        y: arrowY,
        w: 0.25,
        h: 0.35,
        fontSize: 14,
        fontFace: FONTS.body,
        color: COLORS.vividBlue,
        align: "center",
        valign: "middle",
      });
    }
  });

  addSource(slide, "CDAIO Office implementation plan, Finance team cost estimates");
}

// ---------------------------------------------------------------------------
// Slide 15: Section Divider 05 (Dark)
// ---------------------------------------------------------------------------

function slide15SectionDivider05(pres) {
  addSectionDivider(
    pres,
    "05",
    "Investment & Returns",
    "Financial case and risk considerations"
  );
}

// ---------------------------------------------------------------------------
// Slide 16: Investment Case (Light)
// ---------------------------------------------------------------------------

function slide16InvestmentCase(pres) {
  const slide = pres.addSlide();
  addLightBackground(slide);
  addContentTitle(
    slide,
    "$4.1M base-case investment generates $9.2M return at 2.2x ROI with breakeven at Month 18"
  );
  addPageNumber(slide, 16);

  // 3 large KPI cards across top
  const kpis = [
    { value: "$4.1M", label: "Total Investment", status: "Green" },
    { value: "$9.2M", label: "Projected Return", status: "Green" },
    { value: "2.2x", label: "ROI", status: "Green" },
  ];

  const cardW = 3.8;
  const cardH = 1.6;
  const gapX = 0.35;
  const startX = MARGIN + 0.15;
  const startY = 1.2;

  kpis.forEach((kpi, i) => {
    const x = startX + i * (cardW + gapX);
    const statusClr = ragColor(kpi.status);
    slide.addShape("roundRect", {
      x: x,
      y: startY,
      w: cardW,
      h: cardH,
      fill: { color: COLORS.iceBlue },
      rectRadius: 0.1,
    });
    // RAG dot
    slide.addShape("ellipse", {
      x: x + cardW - 0.5,
      y: startY + 0.15,
      w: 0.2,
      h: 0.2,
      fill: { color: statusClr },
    });
    slide.addText(kpi.value, {
      x: x + 0.25,
      y: startY + 0.2,
      w: cardW - 0.8,
      h: 0.65,
      fontSize: 30,
      fontFace: FONTS.title,
      color: COLORS.deepNavy,
      bold: true,
    });
    slide.addText(kpi.label, {
      x: x + 0.25,
      y: startY + 0.9,
      w: cardW - 0.5,
      h: 0.4,
      fontSize: 13,
      fontFace: FONTS.heading,
      bold: true,
      color: COLORS.mediumGray,
    });
  });

  // Scenario table
  const tableY = startY + cardH + 0.5;

  const headerRow = [
    { text: "Scenario", options: { bold: true, color: COLORS.white, fill: { color: COLORS.deepNavy }, fontSize: 11, fontFace: FONTS.heading, align: "left", valign: "middle" } },
    { text: "Investment", options: { bold: true, color: COLORS.white, fill: { color: COLORS.deepNavy }, fontSize: 11, fontFace: FONTS.heading, align: "center", valign: "middle" } },
    { text: "3-Year Return", options: { bold: true, color: COLORS.white, fill: { color: COLORS.deepNavy }, fontSize: 11, fontFace: FONTS.heading, align: "center", valign: "middle" } },
    { text: "ROI", options: { bold: true, color: COLORS.white, fill: { color: COLORS.deepNavy }, fontSize: 11, fontFace: FONTS.heading, align: "center", valign: "middle" } },
    { text: "Breakeven", options: { bold: true, color: COLORS.white, fill: { color: COLORS.deepNavy }, fontSize: 11, fontFace: FONTS.heading, align: "center", valign: "middle" } },
  ];

  const dataRows = SCENARIOS.map((sc, i) => {
    const rowFill = i % 2 === 0 ? COLORS.white : COLORS.iceBlue;
    const isBase = sc.name === "Base";
    return [
      { text: sc.name, options: { fontSize: 11, fontFace: FONTS.body, color: COLORS.darkGray, bold: isBase, fill: { color: rowFill }, align: "left", valign: "middle" } },
      { text: sc.investment, options: { fontSize: 11, fontFace: FONTS.body, color: COLORS.deepNavy, bold: isBase, fill: { color: rowFill }, align: "center", valign: "middle" } },
      { text: sc.return3yr, options: { fontSize: 11, fontFace: FONTS.body, color: COLORS.deepNavy, bold: isBase, fill: { color: rowFill }, align: "center", valign: "middle" } },
      { text: sc.roi, options: { fontSize: 11, fontFace: FONTS.body, color: COLORS.deepNavy, bold: isBase, fill: { color: rowFill }, align: "center", valign: "middle" } },
      { text: sc.breakeven, options: { fontSize: 11, fontFace: FONTS.body, color: COLORS.deepNavy, bold: isBase, fill: { color: rowFill }, align: "center", valign: "middle" } },
    ];
  });

  slide.addTable([headerRow, ...dataRows], {
    x: MARGIN + 1.0,
    y: tableY,
    w: CONTENT_W - 2.0,
    colW: [2.2, 2.0, 2.0, 1.5, 2.0],
    rowH: 0.5,
    border: { type: "solid", pt: 0.5, color: COLORS.iceBlue },
    margin: [0.05, 0.15, 0.05, 0.15],
  });

  addSource(slide, "Investment case model, Finance team validation, industry benchmarks");
}

// ---------------------------------------------------------------------------
// Slide 17: Risk & Governance (Light)
// ---------------------------------------------------------------------------

function slide17RiskGovernance(pres) {
  const slide = pres.addSlide();
  addLightBackground(slide);
  addContentTitle(
    slide,
    "Three risk categories require active mitigation: regulatory compliance, talent acquisition, and data quality"
  );
  addPageNumber(slide, 17);

  const leftX = MARGIN;
  const rightX = MARGIN + 6.5;
  const colW = 5.8;
  const startY = 1.2;

  // Left column: Key Risks
  slide.addText("KEY RISKS", {
    x: leftX,
    y: startY,
    w: colW,
    h: 0.4,
    fontSize: 13,
    fontFace: FONTS.heading,
    bold: true,
    color: COLORS.deepNavy,
  });

  const risks = [
    { name: "HIPAA & EU AI Act Compliance", status: "Red", mitigation: "External counsel + dedicated compliance team" },
    { name: "Data Science Talent Gap", status: "Amber", mitigation: "Hire 8 FTEs + upskill 20 existing staff" },
    { name: "Data Quality Baseline", status: "Amber", mitigation: "Automated monitoring across 12 domains" },
  ];

  risks.forEach((risk, i) => {
    const ry = startY + 0.55 + i * 1.6;
    const statusClr = ragColor(risk.status);

    slide.addShape("roundRect", {
      x: leftX + 0.1,
      y: ry,
      w: colW - 0.2,
      h: 1.35,
      fill: { color: COLORS.iceBlue },
      rectRadius: 0.08,
    });
    // Status dot
    slide.addShape("ellipse", {
      x: leftX + 0.3,
      y: ry + 0.2,
      w: 0.2,
      h: 0.2,
      fill: { color: statusClr },
    });
    slide.addText(risk.name, {
      x: leftX + 0.6,
      y: ry + 0.12,
      w: colW - 1.0,
      h: 0.35,
      fontSize: 13,
      fontFace: FONTS.heading,
      bold: true,
      color: COLORS.deepNavy,
    });
    slide.addText([
      { text: "Mitigation: ", options: { bold: true, color: COLORS.mediumGray } },
      { text: risk.mitigation, options: { color: COLORS.darkGray } },
    ], {
      x: leftX + 0.6,
      y: ry + 0.55,
      w: colW - 1.0,
      h: 0.6,
      fontSize: 11,
      fontFace: FONTS.body,
      wrap: true,
    });
  });

  // Right column: Governance Framework
  slide.addText("GOVERNANCE FRAMEWORK", {
    x: rightX,
    y: startY,
    w: colW,
    h: 0.4,
    fontSize: 13,
    fontFace: FONTS.heading,
    bold: true,
    color: COLORS.deepNavy,
  });

  const govItems = [
    { name: "AI Ethics Board", detail: "Quarterly review, cross-functional" },
    { name: "Model Risk Management", detail: "Pre-deployment validation gate" },
    { name: "Regulatory Monitoring", detail: "Continuous HIPAA/EU AI Act tracking" },
  ];

  govItems.forEach((item, i) => {
    const gy = startY + 0.55 + i * 1.6;

    slide.addShape("roundRect", {
      x: rightX + 0.1,
      y: gy,
      w: colW - 0.2,
      h: 1.35,
      fill: { color: COLORS.white },
      rectRadius: 0.08,
      shadow: { type: "outer", blur: 2, offset: 1, color: "C0C0C0", opacity: 0.2 },
    });

    // Vivid Blue left accent
    slide.addShape("rect", {
      x: rightX + 0.1,
      y: gy,
      w: 0.06,
      h: 1.35,
      fill: { color: COLORS.vividBlue },
    });

    slide.addText(item.name, {
      x: rightX + 0.35,
      y: gy + 0.2,
      w: colW - 0.7,
      h: 0.35,
      fontSize: 13,
      fontFace: FONTS.heading,
      bold: true,
      color: COLORS.deepNavy,
    });
    slide.addText(item.detail, {
      x: rightX + 0.35,
      y: gy + 0.6,
      w: colW - 0.7,
      h: 0.5,
      fontSize: 11,
      fontFace: FONTS.body,
      color: COLORS.mediumGray,
      wrap: true,
    });
  });

  addSource(slide, "Risk assessment, regulatory landscape analysis");
}

// ---------------------------------------------------------------------------
// Slide 18: Success Metrics (Light)
// ---------------------------------------------------------------------------

function slide18SuccessMetrics(pres) {
  const slide = pres.addSlide();
  addLightBackground(slide);
  addContentTitle(
    slide,
    "Six KPIs will track program success with quarterly reporting to the Board starting Q2 2026"
  );
  addPageNumber(slide, 18);

  const cols = 3;
  const cardW = 3.8;
  const cardH = 2.4;
  const gapX = 0.35;
  const gapY = 0.3;
  const startX = MARGIN + 0.15;
  const startY = 1.25;

  KPI_METRICS.forEach((kpi, i) => {
    const col = i % cols;
    const row = Math.floor(i / cols);
    const x = startX + col * (cardW + gapX);
    const y = startY + row * (cardH + gapY);
    const statusClr = ragColor(kpi.status);

    // Card background
    slide.addShape("roundRect", {
      x: x,
      y: y,
      w: cardW,
      h: cardH,
      fill: { color: COLORS.iceBlue },
      rectRadius: 0.1,
    });

    // RAG dot
    slide.addShape("ellipse", {
      x: x + cardW - 0.5,
      y: y + 0.15,
      w: 0.22,
      h: 0.22,
      fill: { color: statusClr },
    });

    // KPI name
    slide.addText(kpi.name, {
      x: x + 0.2,
      y: y + 0.15,
      w: cardW - 0.8,
      h: 0.4,
      fontSize: 14,
      fontFace: FONTS.heading,
      bold: true,
      color: COLORS.deepNavy,
    });

    // Baseline
    slide.addText("Baseline", {
      x: x + 0.2,
      y: y + 0.65,
      w: 1.4,
      h: 0.25,
      fontSize: 10,
      fontFace: FONTS.body,
      color: COLORS.mediumGray,
    });
    slide.addText(kpi.baseline, {
      x: x + 0.2,
      y: y + 0.9,
      w: 1.4,
      h: 0.4,
      fontSize: 18,
      fontFace: FONTS.title,
      color: COLORS.darkGray,
      bold: true,
    });

    // Y1 Target
    slide.addText("Y1 Target", {
      x: x + 1.5,
      y: y + 0.65,
      w: 1.4,
      h: 0.25,
      fontSize: 10,
      fontFace: FONTS.body,
      color: COLORS.mediumGray,
    });
    slide.addText(kpi.y1, {
      x: x + 1.5,
      y: y + 0.9,
      w: 1.4,
      h: 0.4,
      fontSize: 18,
      fontFace: FONTS.title,
      color: COLORS.vividBlue,
      bold: true,
    });

    // Y3 Target
    slide.addText("Y3 Target", {
      x: x + 2.8,
      y: y + 0.65,
      w: 1.0,
      h: 0.25,
      fontSize: 10,
      fontFace: FONTS.body,
      color: COLORS.mediumGray,
    });
    slide.addText(kpi.y3, {
      x: x + 2.8,
      y: y + 0.9,
      w: 1.0,
      h: 0.4,
      fontSize: 18,
      fontFace: FONTS.title,
      color: COLORS.deepNavy,
      bold: true,
    });

    // Progress bar (visual)
    const barY = y + 1.55;
    const barW = cardW - 0.5;
    // Background bar
    slide.addShape("rect", {
      x: x + 0.25,
      y: barY,
      w: barW,
      h: 0.12,
      fill: { color: COLORS.white },
    });
    // Filled portion (baseline as fraction of y3 target, simplified)
    const baseNum = parseFloat(kpi.baseline.replace(/[^0-9.]/g, "")) || 0;
    const y3Num = parseFloat(kpi.y3.replace(/[^0-9.]/g, "")) || 1;
    const fillPct = Math.min(baseNum / y3Num, 1.0);
    slide.addShape("rect", {
      x: x + 0.25,
      y: barY,
      w: barW * fillPct,
      h: 0.12,
      fill: { color: statusClr },
    });

    // Status label
    slide.addText(`\u25CF ${kpi.status}`, {
      x: x + 0.2,
      y: y + cardH - 0.45,
      w: cardW - 0.4,
      h: 0.3,
      fontSize: 10,
      fontFace: FONTS.body,
      bold: true,
      color: statusClr,
    });
  });

  addSource(slide, "CDAIO Office measurement framework");
}

// ---------------------------------------------------------------------------
// Slide 19: Recommendations (Light)
// ---------------------------------------------------------------------------

function slide19Recommendations(pres) {
  const slide = pres.addSlide();
  addLightBackground(slide);
  addContentTitle(
    slide,
    "Three recommended actions position Meridian for $3.8M Year 1 value capture starting Q2 2026"
  );
  addPageNumber(slide, 19);

  const recs = [
    {
      num: "1",
      text: "Approve $1.2M Phase 1 budget for governance foundation and 5 quick-win use cases",
      owner: "CFO",
      timeline: "Q2 2026",
      impact: "$3.8M Y1 value",
    },
    {
      num: "2",
      text: "Appoint Chief Data & AI Officer with direct CEO reporting line and cross-functional mandate",
      owner: "CEO",
      timeline: "Q2 2026",
      impact: "Accelerates execution by 40%",
    },
    {
      num: "3",
      text: "Launch data governance framework with 6 domain stewards across clinical and operational data",
      owner: "CDAIO",
      timeline: "Q2 2026",
      impact: "Closes 3 regulatory gaps",
    },
  ];

  const cardW = CONTENT_W - 0.3;
  const cardH = 1.55;
  const gapY = 0.2;
  const startY = 1.2;
  const startX = MARGIN + 0.15;

  recs.forEach((rec, i) => {
    const y = startY + i * (cardH + gapY);

    // Card background
    slide.addShape("roundRect", {
      x: startX,
      y: y,
      w: cardW,
      h: cardH,
      fill: { color: COLORS.iceBlue },
      rectRadius: 0.1,
    });

    // Number circle
    const circleSize = 0.55;
    slide.addShape("ellipse", {
      x: startX + 0.25,
      y: y + (cardH - circleSize) / 2,
      w: circleSize,
      h: circleSize,
      fill: { color: COLORS.vividBlue },
    });
    slide.addText(rec.num, {
      x: startX + 0.25,
      y: y + (cardH - circleSize) / 2,
      w: circleSize,
      h: circleSize,
      fontSize: 22,
      fontFace: FONTS.title,
      color: COLORS.white,
      align: "center",
      valign: "middle",
    });

    // Recommendation text
    slide.addText(rec.text, {
      x: startX + 1.1,
      y: y + 0.15,
      w: cardW - 1.5,
      h: 0.7,
      fontSize: 14,
      fontFace: FONTS.body,
      color: COLORS.deepNavy,
      bold: true,
      wrap: true,
    });

    // Details row: Owner | Timeline | Impact
    slide.addText([
      { text: "Owner: ", options: { bold: true, color: COLORS.mediumGray, fontSize: 11 } },
      { text: rec.owner, options: { color: COLORS.darkGray, fontSize: 11 } },
      { text: "    Timeline: ", options: { bold: true, color: COLORS.mediumGray, fontSize: 11 } },
      { text: rec.timeline, options: { color: COLORS.darkGray, fontSize: 11 } },
      { text: "    Impact: ", options: { bold: true, color: COLORS.mediumGray, fontSize: 11 } },
      { text: rec.impact, options: { color: COLORS.vividBlue, bold: true, fontSize: 11 } },
    ], {
      x: startX + 1.1,
      y: y + 0.9,
      w: cardW - 1.5,
      h: 0.4,
      fontFace: FONTS.body,
    });
  });

  addSource(slide, "CDAIO Office strategic recommendations");
}

// ---------------------------------------------------------------------------
// Slide 20: Closing (Dark)
// ---------------------------------------------------------------------------

function slide20Closing(pres) {
  const slide = pres.addSlide();
  addDarkBackground(slide);

  // Company name
  slide.addText("MERIDIAN HEALTHCARE", {
    x: MARGIN,
    y: 1.8,
    w: CONTENT_W,
    h: 0.6,
    fontSize: 20,
    fontFace: FONTS.heading,
    bold: true,
    color: COLORS.white,
    align: "center",
    charSpacing: 4,
  });

  // Main title
  slide.addText("AI & Data Strategy 2026-2028", {
    x: MARGIN,
    y: 2.6,
    w: CONTENT_W,
    h: 0.8,
    fontSize: 28,
    fontFace: FONTS.title,
    color: COLORS.white,
    align: "center",
  });

  // Accent bar
  addAccentBar(slide, (SLIDE_W - 3) / 2, 3.7, 3);

  // Thank you
  slide.addText("Thank you", {
    x: MARGIN,
    y: 4.2,
    w: CONTENT_W,
    h: 0.5,
    fontSize: 16,
    fontFace: FONTS.body,
    color: COLORS.iceBlue,
    align: "center",
  });

  // Footer
  slide.addText("Office of the CDAIO  |  Confidential", {
    x: MARGIN,
    y: 5.2,
    w: CONTENT_W,
    h: 0.4,
    fontSize: 12,
    fontFace: FONTS.body,
    color: COLORS.mediumGray,
    align: "center",
  });
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

async function main() {
  const pres = new pptxgen();

  pres.layout = "LAYOUT_WIDE";
  pres.author = "Office of the CDAIO";
  pres.company = "Meridian Healthcare";
  pres.subject = "AI & Data Strategy 2026-2028";
  pres.title = "Meridian Healthcare - AI Strategy Summary";

  // Build all 20 slides in order
  slide01Title(pres);            // Slide 1: Title (Dark)
  slide02ExecSummary(pres);      // Slide 2: Executive Summary (Light)
  slide03Agenda(pres);           // Slide 3: Agenda (Light)
  slide04SectionDivider01(pres); // Slide 4: Section Divider 01 (Dark)
  slide05MaturityDashboard(pres);// Slide 5: Maturity Dashboard (Light)
  slide06MaturityGapChart(pres); // Slide 6: Maturity Gap Chart (Light)
  slide07SectionDivider02(pres); // Slide 7: Section Divider 02 (Dark)
  slide08MarketContext(pres);    // Slide 8: Market Context (Light)
  slide09UseCasesTable(pres);    // Slide 9: Use Cases Table (Light)
  slide10SectionDivider03(pres); // Slide 10: Section Divider 03 (Dark)
  slide11VisionPillars(pres);    // Slide 11: Vision & Pillars (Light)
  slide12PillarDetails(pres);    // Slide 12: Pillar Initiative Details (Light)
  slide13SectionDivider04(pres); // Slide 13: Section Divider 04 (Dark)
  slide14Roadmap(pres);          // Slide 14: Roadmap (Light)
  slide15SectionDivider05(pres); // Slide 15: Section Divider 05 (Dark)
  slide16InvestmentCase(pres);   // Slide 16: Investment Case (Light)
  slide17RiskGovernance(pres);   // Slide 17: Risk & Governance (Light)
  slide18SuccessMetrics(pres);   // Slide 18: Success Metrics (Light)
  slide19Recommendations(pres);  // Slide 19: Recommendations (Light)
  slide20Closing(pres);          // Slide 20: Closing (Dark)

  // Output
  const outPath = path.resolve("ww/static/demo/downloads/ai-strategy-summary.pptx");
  const outDir = path.dirname(outPath);
  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
  }

  await pres.writeFile({ fileName: outPath });
  console.log(`[gen-strategy-pptx] Generated 20-slide AI Strategy Summary`);
  console.log(`[gen-strategy-pptx] Output: ${outPath}`);
}

main().catch((err) => {
  console.error("[gen-strategy-pptx] Error:", err);
  process.exit(1);
});
