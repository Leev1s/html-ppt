#!/usr/bin/env node
// check-theme-tokens.mjs
// 用途: 校验 :root[data-theme="..."] 块的覆盖度、必含 token、值一致性
// 与 validate-brand-deck.mjs 互补：brand validator 查 4 条颜色规则，本脚本查 6 条主题块规则
// 退出码: 0 = pass / 1 = error / 2 = 文件不存在

import { readFileSync } from 'node:fs';

const file = process.argv[2];

if (!file) {
  console.error('Usage: node scripts/check-theme-tokens.mjs <index.html>');
  process.exit(2);
}

const ALLOWED_THEMES = [
  'sika-yellow', 'sika-red',
  'davco-amber', 'davco-restrained',
  'neutral-ink', 'neutral-paper'
];

const REQUIRED_TOKENS = ['--ink', '--paper'];

let html;
try {
  html = readFileSync(file, 'utf8');
} catch (e) {
  console.error(`Cannot read file: ${file}`);
  if (e.code === 'ENOENT') process.exit(2);
  throw e;
}

// 去掉 HTML 注释: 避免命中 <!-- :root[data-theme="..."] --> 占位符
const htmlNoComments = html.replace(/<!--[\s\S]*?-->/g, '');

const errors = [];
const warnings = [];

function error(msg) { errors.push(msg); console.error('  ✗ ' + msg); }
function warn(msg)  { warnings.push(msg); console.warn('  ! ' + msg); }
function ok(msg)    { console.log('  ✓ ' + msg); }

console.log(`\nValidating theme tokens: ${file}\n`);

// ============= 提取所有 :root[data-theme="..."]{...} 块 =============
// 注意: brand deck 里每个 theme id 出现 2 次 (palette 块 + font 块),
//       swiss deck 里每个 theme id 只出现 1 次 (合并块)。
// 用 Map[theme] = 拼接后的块体,确保颜色/字体 token 都能命中。
const themeBlockRe = /:root\[data-theme="([^"]+)"\]\s*\{([\s\S]*?)\}/g;
const definedThemes = new Map();
for (const m of htmlNoComments.matchAll(themeBlockRe)) {
  const t = m[1];
  const body = m[2];
  definedThemes.set(t, (definedThemes.get(t) || '') + body);
}

// ============= 检查 1 [P0]: 6 主题 :root 块覆盖度 =============
let missingThemeCount = 0;
for (const t of ALLOWED_THEMES) {
  if (!definedThemes.has(t)) {
    missingThemeCount++;
    error(`Missing :root[data-theme="${t}"] block — switching to this theme will silently fall back.`);
  } else {
    const declCount = definedThemes.get(t).split(';').length - 1;
    ok(`Theme "${t}" has CSS block (${declCount} declarations).`);
  }
}

// ============= 检查 2 [P0]: 主题块内必含 --ink / --paper =============
if (definedThemes.size) {
  let missingCoreCount = 0;
  for (const [t, block] of definedThemes) {
    for (const tok of REQUIRED_TOKENS) {
      if (!new RegExp(`${tok}\\s*:`).test(block)) {
        missingCoreCount++;
        error(`Theme "${t}" missing required token "${tok}".`);
      }
    }
  }
  if (missingCoreCount === 0) {
    ok('All 6 themes have --ink and --paper tokens.');
  }
}

// ============= 检查 3 [P0]: --ink/--ink-rgb / --paper/--paper-rgb 成对 + RGB 格式 =============
if (definedThemes.size) {
  const tokenValueRe = /--([\w-]+)\s*:\s*([^;]+);/g;
  const rgbTripletRe = /^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*$/;
  const MAX_RGB = 255;
  let pairIssueCount = 0;
  for (const [t, block] of definedThemes) {
    const tokens = {};
    for (const m of block.matchAll(tokenValueRe)) tokens[m[1]] = m[2].trim();
    for (const base of ['ink', 'paper']) {
      const colorTok = `--${base}`;
      const rgbTok   = `--${base}-rgb`;
      if (tokens[base] && tokens[`${base}-rgb`]) {
        const m = tokens[`${base}-rgb`].match(rgbTripletRe);
        if (!m) {
          pairIssueCount++;
          error(`Theme "${t}" ${rgbTok}="${tokens[`${base}-rgb`]}" is not "R,G,B" format.`);
        } else {
          const nums = [Number(m[1]), Number(m[2]), Number(m[3])];
          if (nums.some(n => n < 0 || n > MAX_RGB)) {
            pairIssueCount++;
            error(`Theme "${t}" ${rgbTok}="${tokens[`${base}-rgb`]}" has out-of-range channel (0-255 required).`);
          }
        }
      } else if (tokens[base] && !tokens[`${base}-rgb`]) {
        pairIssueCount++;
        warn(`Theme "${t}" defines ${colorTok} but not ${rgbTok} — rgba(var(${rgbTok}), .x) derivations will fail.`);
      }
    }
  }
  if (pairIssueCount === 0) {
    ok('All --ink/--ink-rgb and --paper/--paper-rgb pairs are consistent.');
  }
}

// ============= 检查 4 [P1]: accent 重名但值不同 (typo 检测) =============
// 同一主题块内 --accent 被声明 ≥2 次,值互不相同时 → warn (而非 error) :
// cascade 覆写 (如 swiss demo 在主块下方用第二个 :root[data-theme="X"]{} 降饱和) 是合法用法。
// 只在同块体内多值不同时给出 hint,大概率是手抖重复定义。
if (definedThemes.size) {
  let accentDupeCount = 0;
  for (const [t, block] of definedThemes) {
    // 只匹配 --accent( 紧接非字母数字-字符,避免吃掉 --accent-rgb / --accent-bright 等派生 token
    // 这些派生 token 值设计上就与 --accent 不同,不应判为 typo
    const accentDecls = [...block.matchAll(/--accent(?![-\w])\s*:\s*([^;]+);/g)];
    if (accentDecls.length >= 2) {
      const vals = new Set(accentDecls.map(a => a[1].trim().toLowerCase()));
      if (vals.size >= 2) {
        accentDupeCount++;
        warn(`Theme "${t}" defines --accent with ${vals.size} different values: ${[...vals].join(', ')} — if unintentional, fix the typo; if intentional cascade override, ignore.`);
      }
    }
  }
  if (accentDupeCount === 0) {
    ok('No duplicate --accent values within themes.');
  }
}

// ============= 检查 5 [P1]: 死 token 检测 =============
// 收集所有 :root[...] 块 + 裸 :root{} 默认块 (从 <style> 里抓) 里的 --xxx 声明,
// 然后对每个 token 在整个 HTML (含 var(--xxx) 引用) 里 grep 0 命中 → warn。
const styleBlockRe = /<style\b[^>]*>([\s\S]*?)<\/style>/gi;
const styleBodies = [...htmlNoComments.matchAll(styleBlockRe)].map(m => m[1]).join('\n');

// 从 style 里再抓裸 :root{} (无选择器) 块,以及 :root[...]{} 块 (双重保险,
// 因为上面 htmlNoComments 全局抓过,这里主要是把 styleBody 单列出来方便复用)
const rootDefaultRe = /(?:^|[}\s;]):root\s*\{([\s\S]*?)\}/g;
const allRootBlocks = [];
for (const m of styleBodies.matchAll(themeBlockRe)) {
  allRootBlocks.push(m[2]);
}
for (const m of styleBodies.matchAll(rootDefaultRe)) {
  allRootBlocks.push(m[1]);
}

const declaredTokens = new Set();
const declRe = /--([\w-]+)\s*:/g;
for (const body of allRootBlocks) {
  for (const m of body.matchAll(declRe)) {
    declaredTokens.add(m[1]);
  }
}

if (declaredTokens.size) {
  const deadTokens = [];
  for (const tok of declaredTokens) {
    // 查 var(--xxx) 引用: 用 (--xxx) 模式避开 'tok' 自身作为定义名再次匹配
    const usageRe = new RegExp(`var\\(\\s*--${tok}\\b`);
    if (!usageRe.test(htmlNoComments)) {
      deadTokens.push(tok);
    }
  }
  if (deadTokens.length) {
    warn(`${deadTokens.length} dead token(s) detected (declared but never referenced via var(--...)): ${deadTokens.slice(0, 8).join(', ')}${deadTokens.length > 8 ? `, ... (+${deadTokens.length - 8} more)` : ''}.`);
  } else {
    ok(`0 dead token(s) detected.`);
  }
}

// ============= 检查 6 [P2]: 跨主题色板溢出 (Sika + Davco 混搭) =============
const hasSika  = [...definedThemes.keys()].some(t => t.startsWith('sika-'));
const hasDavco = [...definedThemes.keys()].some(t => t.startsWith('davco-'));
if (hasSika && hasDavco) {
  warn(`Deck mixes Sika and Davco themes — make sure this is intentional (different brand families).`);
}

// ============= 汇总 =============
console.log('');
if (warnings.length) {
  console.warn(`Warnings: ${warnings.length}`);
  for (const w of warnings) console.warn(`- ${w}`);
}
if (errors.length) {
  console.error(`\nTheme token validation failed: ${definedThemes.size} theme(s) detected, ${errors.length} error(s), ${warnings.length} warning(s).`);
  for (const e of errors) console.error(`- ${e}`);
  process.exit(1);
}
if (missingThemeCount > 0) {
  console.error(`\nTheme token validation failed: ${definedThemes.size}/${ALLOWED_THEMES.length} theme(s) present, ${warnings.length} warning(s).`);
  process.exit(1);
}
console.log(`Theme token validation passed: ${definedThemes.size} theme(s), ${warnings.length} warning(s), ${errors.length} error(s).`);
