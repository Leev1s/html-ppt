# Sika 黄底反转模板（Yellow Background Patterns）

这些模板用于满足“红黄反转、黄做背景”的页面需求。它们不新增品牌色,只改变 Sika Red / Sika Yellow 的面积关系: **Sika Yellow 作为页面主背景**,Sika Red 只承担标题、关键数字、分割线或单个焦点块。

## 使用原则

- 黄底页适合封面、章节过渡、关键数据页、行动号召页;不要连续使用超过 2 页。
- 黄底上正文默认用 `--ink`,重点用 `--accent`。不要在黄底上放白色小字。
- 红色面积要克制:一个大标题、一条粗线、一个 KPI 卡或一个角标即可。
- Sika Precision 正文页仍要写登记版式 `data-layout="Sxx"`;封面/封底变体可复用 `SWISS-COVER-ASCII` / `SWISS-CLOSING-ASCII`。

---

## 1. Sika Precision Yellow Cover · 黄底封面

```html
<section class="slide sika-yellow" data-layout="SWISS-COVER-ASCII" data-animate="hero">
  <div class="canvas-card">
    <div class="sika-brand-band" aria-hidden="true"></div>
    <div class="chrome-min">
      <div class="l"><span class="sika-badge"><span>Sika</span></span> · Project Issue</div>
      <div class="r">YY · 01 / NN</div>
    </div>

    <div style="flex:1;display:grid;grid-template-rows:auto 1fr auto;gap:2.6vh;padding:0">
      <div data-anim="kicker" class="t-meta" style="letter-spacing:.22em">SIKA YELLOW MODE</div>
      <h1 data-anim="title" style="align-self:center;font-family:var(--sans),var(--sans-zh);font-weight:200;font-size:min(11vw,18vh);line-height:.92;letter-spacing:-.03em;color:var(--accent)">
        黄底主标题<br/><span style="font-style:italic;font-weight:300;color:var(--ink)">Red Focus</span>
      </h1>
      <div data-anim="bottom" style="display:grid;gap:1.6vh;border-top:2px solid var(--accent);padding-top:2vh">
        <div class="lead" style="max-width:52ch;color:var(--ink)">用黄底做强品牌开场,红色只做标题和分割线。</div>
        <div class="t-meta" style="display:flex;justify-content:space-between"><span>Sika Corporate</span><span>→ swipe</span></div>
      </div>
    </div>
  </div>
</section>
```

---

## 2. Sika Precision Yellow KPI Strip · 黄底数据页

```html
<section class="slide sika-yellow" data-layout="S05" data-animate="grid-reveal">
  <div class="canvas-card">
    <div class="chrome-min"><div class="l">SIKA DATA</div><div class="r">NN / NN</div></div>
    <div style="display:grid;grid-template-rows:auto 1fr;gap:6vh;flex:1">
      <div>
        <div class="t-cat" data-anim="kicker" style="color:var(--accent)">YELLOW BACKGROUND · RED KPI</div>
        <h2 data-anim="title" class="h-xl-zh" style="color:var(--ink);max-width:12ch">黄底数据结论</h2>
      </div>
      <div data-anim="cards" style="display:grid;grid-template-columns:repeat(4,1fr);gap:1px;background:rgba(var(--ink-rgb),.22);align-self:end">
        <div class="sika-reverse-panel" style="padding:3vh 1.6vw"><div class="t-meta">01</div><div class="kpi-thin-sm">90d</div><p class="t-body">项目周期</p></div>
        <div class="sika-reverse-panel" style="padding:3vh 1.6vw"><div class="t-meta">02</div><div class="kpi-thin-sm">24</div><p class="t-body">施工节点</p></div>
        <div class="sika-reverse-panel red" style="padding:3vh 1.6vw"><div class="t-meta">03</div><div class="kpi-thin-sm">128</div><p class="t-body">质量检查</p></div>
        <div class="sika-reverse-panel" style="padding:3vh 1.6vw"><div class="t-meta">04</div><div class="kpi-thin-sm">12K</div><p class="t-body">覆盖面积</p></div>
      </div>
    </div>
  </div>
</section>
```

---

## 3. Magazine Yellow Divider · 杂志风黄底章节页

```html
<section class="slide hero sika-yellow" data-theme="light" data-animate="hero">
  <div class="sika-brand-band" aria-hidden="true"></div>
  <div class="chrome">
    <div class="left"><span class="sika-badge"><span>Sika</span></span><span>Act II</span></div>
    <div class="right">Yellow Section · 03 / NN</div>
  </div>
  <div class="frame" style="display:grid;align-content:center;min-height:76vh;gap:4vh">
    <div class="kicker" data-anim style="color:var(--ink);opacity:.85">BUILDING TRUST</div>
    <h1 class="h-hero" data-anim style="color:var(--ink);max-width:11ch">黄底章节标题</h1>
    <div class="sika-stripe" data-anim style="width:32vw"></div>
    <p class="lead" data-anim style="max-width:58vw;color:var(--ink)">黄底用于章节切换,红色只保留在线条、徽章和关键词上。</p>
  </div>
  <div class="foot"><div>Sika Corporate</div><div>Yellow Mode</div></div>
</section>
```

---

## 4. Magazine Yellow Cards · 杂志风黄底卡片页

```html
<section class="slide sika-yellow" data-theme="light" data-animate="cascade">
  <div class="chrome"><div>SIKA · YELLOW CARDS</div><div>NN / NN</div></div>
  <div class="frame" style="padding-top:6vh">
    <div class="kicker" data-anim style="color:var(--ink);opacity:.85">PROJECT LOGIC</div>
    <h2 class="h-xl" data-anim style="color:var(--ink);max-width:10ch">红色只突出一张卡</h2>
    <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:1.2vw;margin-top:8vh">
      <div class="sika-yellow-panel" data-anim><div class="meta">01</div><h3 class="h3-zh">材料</h3><p class="body-zh">说明文字 1-2 行。</p></div>
      <div class="sika-yellow-panel red" data-anim><div class="meta">02</div><h3 class="h3-zh">质量</h3><p class="body-zh">唯一红色焦点卡。</p></div>
      <div class="sika-yellow-panel" data-anim><div class="meta">03</div><h3 class="h3-zh">交付</h3><p class="body-zh">说明文字 1-2 行。</p></div>
    </div>
  </div>
  <div class="foot"><div>Sika Project</div><div>Yellow Background</div></div>
</section>
```
