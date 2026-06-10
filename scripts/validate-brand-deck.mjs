#!/usr/bin/env node
// validate-brand-deck.mjs
// 用途: 校验多主题 HTML deck 是否合规
// 支持主题 id: sika-yellow / sika-red / davco-amber / davco-restrained / neutral-ink / neutral-paper

import { readFileSync } from 'node:fs';

const file = process.argv[2];
const strict = process.argv.includes('--strict');

if (!file) {
  console.error('Usage: node scripts/validate-brand-deck.mjs <index.html> [--strict]');
  process.exit(2);
}

const ALLOWED_THEMES = new Set([
  'sika-yellow', 'sika-red', 'davco-amber',
  'davco-restrained', 'neutral-ink', 'neutral-paper'
]);

// 6 主题对应的字体家族必须存在
const THEME_FONTS = {
  'sika-yellow': ['Barlow Condensed', 'Noto Sans SC'],
  'sika-red': ['Space Grotesk', 'Noto Sans SC'],
  'davco-amber': ['DM Sans', 'Noto Sans SC'],
  'davco-restrained': ['IBM Plex Sans', 'Noto Sans SC'],
  'neutral-ink': ['Playfair Display', 'Noto Serif SC'],
  'neutral-paper': ['Fraunces', 'Noto Serif SC']
};

let html;
try {
  html = readFileSync(file, 'utf8');
} catch (e) {
  console.error(`Cannot read file: ${file}`);
  if (e.code === 'ENOENT') process.exit(2);
  throw e;
}

// 去掉 HTML 注释: 避免校验命中注释里的占位符 (e.g. <html data-theme="<id>">)
const htmlNoComments = html.replace(/<!--[\s\S]*?-->/g, '');

// 进一步剥掉 <style> / <script> 块: 用于结构性属性检查 (避免命中 CSS 选择器 :root[data-theme="..."])
const htmlBody = htmlNoComments
  .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, '')
  .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, '');

// CSS 源码 = 拼接所有 <style> 块内容,并去掉 CSS 注释,供规则 11/12/13 使用
// (避免规则 11 把 ":root[data-theme=\"X\"]" 出现在 CSS /* */ 注释里误判为已定义)
const cssSource = [...htmlNoComments.matchAll(/<style\b[^>]*>([\s\S]*?)<\/style>/gi)]
  .map(m => m[1])
  .join('\n')
  .replace(/\/\*[\s\S]*?\*\//g, '');

const errors = [];
const warnings = [];

function error(msg) { errors.push(msg); console.error('  ✗ ' + msg); }
function warn(msg)  { warnings.push(msg); console.warn('  ! ' + msg); }
function ok(msg)    { console.log('  ✓ ' + msg); }

console.log(`\nValidating brand deck: ${file}\n`);

// 1) <html> / <body> 存在
if (!/<html\b/i.test(html)) error('Missing <html> root tag.');
if (!/<body\b/i.test(html)) error('Missing <body> tag.');
ok('html/body root tags present');

// 2) <section class="slide ..."> 至少 1 个
const slideRe = /<section\b[^>]*\bclass="[^"]*\bslide\b[^"]*"[^>]*>/gi;
const slides = [...htmlBody.matchAll(slideRe)];
if (!slides.length) {
  error('No <section class="slide ..."> pages found.');
} else if (slides.length < 3) {
  warn(`Only ${slides.length} slide(s) found; brand decks typically ship 12-24 pages.`);
} else {
  ok(`${slides.length} slide(s) detected.`);
}

// 3) 每个 slide 都有 light/dark/hero light/hero dark 之一
const slideThemeRe = /<section\b([^>]*)>/gi;
let slideIdx = 0;
let missingThemeCount = 0;
for (const m of htmlBody.matchAll(slideThemeRe)) {
  const attrs = m[1];
  if (!/\bclass="[^"]*\bslide\b/.test(attrs)) continue;
  slideIdx++;
  const hasLight = /\bclass="[^"]*\blight\b/.test(attrs)
    || /\bclass="[^"]*\bhero\b[^"]*\blight\b/.test(attrs)
    || /\bclass="[^"]*\bgrey\b/.test(attrs)  // swiss 风格别名: .grey = 浅色页
    || /\bclass="[^"]*\bcanvas-card\b/.test(attrs); // swiss canvas 容器
  const hasDark  = /\bclass="[^"]*\bdark\b/.test(attrs)
    || /\bclass="[^"]*\bhero\b[^"]*\bdark\b/.test(attrs)
    || /\bclass="[^"]*\baccent\b[^"]*\b/.test(attrs) // swiss: .slide.accent 作深色页
    || /\bclass="[^"]*\bink\b[^"]*\b/.test(attrs);  // swiss: .slide 含 ink 类作深色
  // data-theme 推断: 显式声明的主题所属 light/dark 不固定,这里不强制
  if (!hasLight && !hasDark) {
    missingThemeCount++;
    if (missingThemeCount <= 3) {
      warn(`slide #${slideIdx}: no light/dark/hero modifier — Swiss-style .slide with bare class is allowed (e.g. S03/S05 use layout-level theming).`);
    }
  }
}
if (missingThemeCount === 0) {
  ok(`All ${slideIdx} slide(s) carry light/dark/hero light/hero dark.`);
} else if (missingThemeCount > 3) {
  warn(`... and ${missingThemeCount - 3} more slides without light/dark/hero modifier (allowed for Swiss-style layouts).`);
}

// 4) data-theme 值都在白名单内
const themeAttrRe = /\bdata-theme="([^"]+)"/g;
const seenThemes = new Set();
const badThemes = new Set();
for (const m of htmlBody.matchAll(themeAttrRe)) {
  const t = m[1];
  seenThemes.add(t);
  if (!ALLOWED_THEMES.has(t)) badThemes.add(t);
}
if (badThemes.size) {
  for (const t of badThemes) error(`data-theme="${t}" is not in the 6-theme whitelist.`);
} else if (seenThemes.size) {
  ok(`data-theme values OK: ${[...seenThemes].join(', ')}`);
} else {
  ok('No data-theme attribute set (uses default — fine).');
}

// 5) 主题字体家族在 Google Fonts link 中
const fontLinkRe = /<link\b[^>]*\bhref="([^"]*fonts\.googleapis\.com[^"]*)"/g;
const fontLinks = [...htmlNoComments.matchAll(fontLinkRe)].map(m => decodeURIComponent(m[1])).join(' ');
if (seenThemes.size === 0) {
  ok('No themes referenced — font check skipped.');
} else if (!fontLinks) {
  error('No Google Fonts <link> found, but the deck references theme(s) that require per-theme fonts.');
} else {
  for (const t of seenThemes) {
    if (!ALLOWED_THEMES.has(t)) continue;
    const fonts = THEME_FONTS[t] || [];
    for (const f of fonts) {
      if (!fontLinks.includes(f.replace(/ /g, '+')) && !fontLinks.includes(f)) {
        error(`Theme "${t}" requires font "${f}" in the Google Fonts <link>, but it is missing.`);
      }
    }
  }
  if (!errors.some(e => e.includes('requires font'))) {
    ok(`Google Fonts link covers all ${seenThemes.size} referenced theme(s).`);
  }
}

// 6) .theme-chip 选择器存在
if (/\bclass="[^"]*\btheme-chip\b/.test(htmlBody)) {
  ok('.theme-chip switcher UI present.');
} else {
  error('Missing .theme-chip switcher UI. Brand decks must expose a 6-theme switcher chip.');
}

// 7) JS 切换逻辑存在
const setThemeRe = /setAttribute\(\s*['"]data-theme['"]/g;
const setThemeHits = [...htmlNoComments.matchAll(setThemeRe)];
if (setThemeHits.length >= 1) {
  ok(`JS theme switcher present (${setThemeHits.length} setAttribute('data-theme', ...) call(s)).`);
} else {
  error("No setAttribute('data-theme', ...) call found. JS theme switcher is missing.");
}

// 8) URL 参数支持
const hasUrlTheme  = /(?:\?|&|#).*?theme=/.test(htmlNoComments) || /location\.search.*theme=/.test(htmlNoComments);
const hasUrlSearch = /URLSearchParams\b/.test(htmlNoComments);
if (hasUrlTheme || hasUrlSearch) {
  ok('URL ?theme= parameter support present.');
} else {
  error('No ?theme= or URLSearchParams usage found. URL-driven theme switching is missing.');
}

// 9) slide 主题节奏警告: 连续 3+ 个 slide 同 light/dark 警告
const slideToneRe = /<section\b([^>]*)>/gi;
const tones = [];
for (const m of htmlBody.matchAll(slideToneRe)) {
  const attrs = m[1];
  if (!/\bclass="[^"]*\bslide\b/.test(attrs)) continue;
  const isHero = /\bclass="[^"]*\bhero\b/.test(attrs);
  const isLight = /\bclass="[^"]*\blight\b/.test(attrs);
  const isDark  = /\bclass="[^"]*\bdark\b/.test(attrs);
  let tone = 'unknown';
  if (isHero && isLight) tone = 'hero-light';
  else if (isHero && isDark) tone = 'hero-dark';
  else if (isLight) tone = 'light';
  else if (isDark) tone = 'dark';
  tones.push(tone);
}
let runStart = 0;
let longRuns = 0;
for (let i = 1; i <= tones.length; i++) {
  if (i < tones.length && tones[i] === tones[runStart] && tones[i] !== 'unknown' && tones[i] !== 'hero-light' && tones[i] !== 'hero-dark') {
    continue;
  }
  const runLen = i - runStart;
  if (runLen >= 3 && tones[runStart] !== 'unknown' && tones[runStart] !== 'hero-light' && tones[runStart] !== 'hero-dark') {
    warn(`${runLen} consecutive slides share tone "${tones[runStart]}" (slides #${runStart + 1}-#${i}). Consider breaking the rhythm.`);
    longRuns++;
  }
  runStart = i;
}
if (longRuns === 0) ok('Slide light/dark rhythm looks balanced.');

// 10) 散落 hex 颜色警告 (不阻断)
const hexRe = /#[0-9a-fA-F]{6}\b/g;
const hexHits = [...htmlBody.matchAll(hexRe)];
if (hexHits.length > 20) {
  warn(`Detected ${hexHits.length} hex color literals. Prefer var(--ink)/var(--paper) over scattered hex values.`);
} else {
  ok(`Hex literals count: ${hexHits.length} (acceptable).`);
}

// 11) [P0] :root[data-theme="..."] CSS 块覆盖度
// 防止 "data-theme='X' 写了但 :root[data-theme="X"]{...} 没写" 的静默失效。
// 仅检查 HTML 中实际引用过的 theme (seenThemes),避免对只发 1-2 个主题的 deck 假阳性。
const themeBlockRe = /:root\[data-theme="([^"]+)"\]/g;
const definedThemes = new Set([...cssSource.matchAll(themeBlockRe)].map(m => m[1]));
if (seenThemes.size === 0) {
  ok('No themes referenced — :root[data-theme] block check skipped.');
} else {
  const missingBlocks = [...seenThemes].filter(t => !definedThemes.has(t));
  if (missingBlocks.length) {
    for (const t of missingBlocks) {
      error(`CSS missing :root[data-theme="${t}"] block — switching to this theme will silently fall back.`);
    }
  } else {
    const allSix = [...ALLOWED_THEMES].every(t => definedThemes.has(t));
    if (allSix) {
      ok(`All 6 brand theme blocks present in CSS (${[...definedThemes].join(', ')}).`);
    } else {
      ok(`All ${seenThemes.size} referenced theme block(s) defined in CSS: ${[...seenThemes].join(', ')}.`);
    }
  }
}

// 12) [P0] 同一主题块内同一 --accent-* 变量被赋了不同值 (按变量名分组,而不是把 --accent 与 --accent-rgb 混为一谈)
// 防止 ":root[data-theme="X"]{ --accent:#FCC500; --accent:#D82828 }" 这种手抖重复定义。
// --accent / --accent-rgb / --accent-on / --accent-bright 是不同变量,允许不同值。
// 用非贪婪 [^}]+ 提取单个块体 (这些主题块都是平铺变量声明,无嵌套,够用)。
const themeAccentRe = /:root\[data-theme="([^"]+)"\]\s*\{([^}]+)\}/g;
const accentDupes = [];
for (const m of cssSource.matchAll(themeAccentRe)) {
  const t = m[1];
  const block = m[2];
  // 按变量名分组: --accent / --accent-rgb / --accent-on / --accent-bright ...
  const byName = new Map();
  for (const d of block.matchAll(/--(accent(?:-[a-z]+)?)\s*:\s*([^;]+);/g)) {
    const name = d[1];
    const val = d[2].trim().toLowerCase();
    if (!byName.has(name)) byName.set(name, new Set());
    byName.get(name).add(val);
  }
  for (const [name, vals] of byName) {
    if (vals.size >= 2) {
      accentDupes.push({ theme: t, name, values: [...vals] });
    }
  }
}
if (accentDupes.length) {
  for (const d of accentDupes) {
    error(`Theme "${d.theme}" redefines --${d.name} with ${d.values.length} different values (${d.values.join(' vs ')}) — likely a typo.`);
  }
} else {
  ok('--accent* variables are uniquely defined per :root[data-theme] block (no conflicting duplicates).');
}

// 13) [P1] :root 块外的 hex 字面量位置警告
// 现有规则 10 只查数量,不查位置。inline `style="color:#D82828"` 不会跟主题切换。
// 用 cssSource (已合并 <style> 块并剥离 CSS 注释),移除所有 :root[...] 块后,再数 hex。
let outsideHexCount = 0;
const outsideHexSamples = [];
{
  // 移除所有 :root[...] {...} 块 (非贪婪匹配到第一个 } 即可,因为主题块无嵌套)
  const stripped = cssSource.replace(/:root[^{]*\{[\s\S]*?\}/g, '');
  const hits = stripped.match(/#[0-9a-fA-F]{6}\b/g) || [];
  outsideHexCount += hits.length;
  if (hits.length && outsideHexSamples.length < 3) {
    outsideHexSamples.push(...hits.slice(0, 3 - outsideHexSamples.length));
  }
}
if (outsideHexCount > 5) {
  warn(`${outsideHexCount} hex literal(s) found OUTSIDE :root — these will not switch with [data-theme]. Samples: ${outsideHexSamples.join(', ')}`);
} else {
  ok(`Hex literals outside :root: ${outsideHexCount} (acceptable${outsideHexSamples.length ? `, samples: ${outsideHexSamples.join(', ')}` : ''}).`);
}

// 14) [P0] WCAG 2.0 AA 对比度: 6 主题下 ink/paper/text-secondary/text-muted/paper-tint 的可读性守门
// 手写 sRGB→linear→luminance 公式 (WCAG 2.0 § 1.4.3), 不引入 npm 依赖。
// 同一主题有多个 :root[data-theme="X"] 块 (demo polish 覆写) 时, 用最后定义胜出 (CSS 级联语义)。
// 主题可能把 accent 命名成 --accent (swiss) 或 --brand-secondary (杂志), 通过 fallback 字段兼容。
function sRGBToLinear(c) {
  const v = c / 255;
  return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
}
function relativeLuminance(hex) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return 0.2126 * sRGBToLinear(r) + 0.7152 * sRGBToLinear(g) + 0.0722 * sRGBToLinear(b);
}
function wcagContrast(hex1, hex2) {
  const L1 = relativeLuminance(hex1);
  const L2 = relativeLuminance(hex2);
  const [light, dark] = L1 > L2 ? [L1, L2] : [L2, L1];
  return (light + 0.05) / (dark + 0.05);
}

const themeColors = new Map();
{
  const themeBlockRe14 = /:root\[data-theme="([^"]+)"\]\s*\{([\s\S]*?)\}/g;
  const tokenRe14 = /--(ink|paper|accent|brand-secondary|text-secondary|text-muted|paper-tint|grey-1|grey-2|grey-3)\s*:\s*(#[0-9a-fA-F]{6})\s*;/g;
  for (const m of cssSource.matchAll(themeBlockRe14)) {
    const id = m[1];
    const block = m[2];
    const colors = themeColors.get(id) || {};
    for (const t of block.matchAll(tokenRe14)) {
      colors[t[1]] = t[2];
    }
    themeColors.set(id, colors);
  }
}

if (themeColors.size === 0) {
  ok('No :root[data-theme] blocks with color tokens found — WCAG contrast check skipped.');
} else {
  // [fgToken, bgToken, minRatio, label, swissOnly]
  // fgToken / bgToken 可为数组, 表示 "主名 || fallback 名" (如 accent 在杂志模板里叫 brand-secondary)
  const REQUIRED_PAIRS = [
    [['ink'],            ['paper'],       4.5, '正文文字'],
    [['ink'],            ['paper-tint'],  4.5, '次级底色文字'],
    [['text-secondary'], ['paper'],       4.5, '二级正文'],
    [['text-muted'],     ['paper'],       4.5, '辅助文字'],
    [['grey-3'],         ['paper'],       4.5, '灰色文字 (swiss)',  true],
    [['paper'],          ['accent','brand-secondary'], 3.0, 'accent 上的反色文字'],
    [['ink'],            ['accent','brand-secondary'], 3.0, 'accent 上的前景文字'],
  ];
  function pickColor(colors, names) {
    for (const n of names) if (colors[n]) return colors[n];
    return null;
  }
  let contrastErrors = 0;
  for (const [t, colors] of themeColors) {
    for (const [fgNames, bgNames, minRatio, label, swissOnly] of REQUIRED_PAIRS) {
      const fg = pickColor(colors, fgNames);
      const bg = pickColor(colors, bgNames);
      if (!fg || !bg) continue;
      const ratio = wcagContrast(fg, bg);
      if (ratio < minRatio) {
        const fgName = fgNames.find(n => colors[n]) || fgNames[0];
        const bgName = bgNames.find(n => colors[n]) || bgNames[0];
        error(`Theme "${t}" --${fgName}(${fg}) on --${bgName}(${bg}) = ${ratio.toFixed(2)}:1, < ${minRatio}:1 (${label}).`);
        contrastErrors++;
      }
    }
  }
  if (contrastErrors === 0) {
    ok(`WCAG contrast: all checked pairs across ${themeColors.size} theme(s) meet AA threshold.`);
  }
}

// ============= 汇总 =============
console.log('');
if (warnings.length) {
  console.warn(`Warnings: ${warnings.length}`);
  for (const w of warnings) console.warn(`- ${w}`);
}
if (errors.length) {
  console.error(`\nBrand deck validation failed: ${errors.length} error(s), ${warnings.length} warning(s).`);
  for (const e of errors) console.error(`- ${e}`);
  process.exit(1);
}
if (strict && warnings.length) {
  console.error(`\n--strict mode: ${warnings.length} warning(s) treated as error(s).`);
  process.exit(1);
}
console.log(`Brand deck validation passed: ${slideIdx || slides.length} slide(s), ${warnings.length} warning(s).`);
