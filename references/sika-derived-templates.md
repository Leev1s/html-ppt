# Sika 衍生页面模板（Derivative Page Patterns）

这些模板用于在固定 Sika Corporate 色板内做版式衍生。它们不是新主题,只是在 **Sika Red / Sika Yellow / 暖砂灰** 三者之间调整面积、层级和信息密度。

## 使用原则

- 每个衍生页仍要服务一个清晰语义:封面、章节、数据、流程、对比、照片、行动号召。
- 红色是结论焦点;黄色可以做背景、条带或信息容器;暖砂灰负责长正文阅读。
- Sika Precision 页必须保留 `data-layout="Sxx"` 或登记的封面/封底 layout;不要为了衍生版新增未登记正文结构。
- 同一 deck 中最多选择 2-3 种衍生模式,避免每页都变体导致品牌节奏混乱。

---

## 1. Yellow Split Compare · 黄底双栏对比

```html
<section class="slide sika-yellow" data-layout="S08" data-animate="duo-mirror">
  <div class="canvas-card">
    <div class="chrome-min"><div class="l">SIKA COMPARE</div><div class="r">NN / NN</div></div>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:1px;background:rgba(var(--ink-rgb),.25);flex:1;margin-top:4vh">
      <div class="sika-reverse-panel" style="padding:4vh 2.4vw;display:flex;flex-direction:column;justify-content:space-between">
        <div><div class="t-cat">BEFORE</div><h2 class="h-md">传统方案</h2></div>
        <p class="t-body">用 2-3 行说明原有流程、风险或低效率。</p>
      </div>
      <div class="sika-reverse-panel red" style="padding:4vh 2.4vw;display:flex;flex-direction:column;justify-content:space-between">
        <div><div class="t-cat">AFTER</div><h2 class="h-md">Sika 方案</h2></div>
        <p class="t-body">红色只给推荐方案,形成清晰决策方向。</p>
      </div>
    </div>
  </div>
</section>
```

---

## 2. Red Band Process · 红色横带流程

```html
<section class="slide" data-layout="S12" data-animate="grid-reveal">
  <div class="canvas-card">
    <div class="chrome-min"><div class="l">PROCESS</div><div class="r">NN / NN</div></div>
    <div style="display:grid;grid-template-rows:auto 1fr;gap:6vh;flex:1">
      <div><div class="t-cat accent">SIKA WORKFLOW</div><h2 class="h-xl-zh">四步交付流程</h2></div>
      <div style="display:grid;grid-template-columns:repeat(4,1fr);align-self:end;border-top:14px solid var(--accent)">
        <div class="sika-reverse-panel" style="padding:3vh 1.4vw"><div class="t-meta">01</div><h3 class="h-sm">评估</h3><p class="t-body">现场条件与材料需求。</p></div>
        <div class="sika-reverse-panel" style="padding:3vh 1.4vw"><div class="t-meta">02</div><h3 class="h-sm">方案</h3><p class="t-body">系统组合与施工路径。</p></div>
        <div class="sika-reverse-panel" style="padding:3vh 1.4vw"><div class="t-meta">03</div><h3 class="h-sm">施工</h3><p class="t-body">节点控制与质量记录。</p></div>
        <div class="sika-reverse-panel red" style="padding:3vh 1.4vw"><div class="t-meta">04</div><h3 class="h-sm">交付</h3><p class="t-body">验收、维护与信任闭环。</p></div>
      </div>
    </div>
  </div>
</section>
```

---

## 3. Photo With Yellow Frame · 黄框照片主视觉

```html
<section class="slide" data-layout="S22" data-animate="image-hero">
  <div class="canvas-card">
    <div class="chrome-min"><div class="l">PROJECT PHOTO</div><div class="r">NN / NN</div></div>
    <div style="display:grid;grid-template-rows:auto auto 1fr;gap:3vh;flex:1">
      <div><div class="t-cat accent">SITE EVIDENCE</div><h2 class="h-xl-zh">现场证据页</h2></div>
      <figure class="frame-img r-21x9 swiss-lined" style="border:18px solid var(--brand-secondary);border-top-width:18px" data-anim="image">
        <img src="images/sika-site.jpg" data-image-slot="s22-hero-21x9" alt="Sika 项目现场">
      </figure>
      <div class="t-body" style="max-width:62ch;color:var(--text-secondary)">黄框把照片变成 Sika 品牌证据,红色只保留在顶部细线和标签中。</div>
    </div>
  </div>
</section>
```

---

## 4. Warm Sand Quote · 暖砂金句页

```html
<section class="slide grey" data-layout="S09" data-animate="statement">
  <div class="canvas-card">
    <div class="sika-stripe" aria-hidden="true"></div>
    <div style="flex:1;display:grid;align-content:center;gap:4vh">
      <div class="t-cat accent">BUILDING TRUST</div>
      <h2 class="h-statement" style="color:var(--ink);max-width:14ch">信任不是口号,是每个节点的交付记录。</h2>
      <p class="lead" style="max-width:48ch;color:var(--text-secondary)">暖砂底适合承载长句和观点,比纯黄更耐读。</p>
    </div>
  </div>
</section>
```

---

## 5. Yellow CTA Closing · 黄底行动号召

```html
<section class="slide sika-yellow" data-layout="SWISS-CLOSING-ASCII" data-animate="split-statement">
  <div class="canvas-card">
    <div class="sika-brand-band" aria-hidden="true"></div>
    <div class="chrome-min"><div class="l">NEXT STEP</div><div class="r">END</div></div>
    <div style="flex:1;display:grid;grid-template-columns:1.2fr .8fr;gap:4vw;align-items:center">
      <h2 class="h-statement" style="color:var(--accent);max-width:10ch">把下一步落到现场。</h2>
      <div class="sika-reverse-panel red" style="padding:4vh 2vw">
        <div class="t-cat">ACTION</div>
        <p class="lead" style="color:var(--accent-on)">确认材料、节点、人员与时间表。</p>
      </div>
    </div>
  </div>
</section>
```

---

## 6. Signal Risk Board · 红色风险信号板

```html
<section class="slide" data-layout="S10" data-animate="grid-reveal">
  <div class="canvas-card">
    <div class="chrome-min"><div class="l">RISK SIGNAL</div><div class="r">NN / NN</div></div>
    <div style="display:grid;grid-template-columns:.75fr 1.25fr;gap:4vw;align-items:stretch;flex:1">
      <div style="background:var(--accent);color:var(--accent-on);padding:4vh 2vw;display:flex;flex-direction:column;justify-content:space-between">
        <div><div class="t-cat" style="color:currentColor;opacity:.72">FOCUS</div><h2 class="h-xl-zh" style="color:currentColor">一个必须先解决的风险。</h2></div>
        <div class="t-meta" style="color:currentColor;opacity:.72">Sika Red = decision / alert</div>
      </div>
      <div style="display:grid;grid-template-rows:repeat(3,1fr);gap:1px;background:rgba(var(--ink-rgb),.18)">
        <div class="sika-reverse-panel" style="padding:3vh 2vw"><div class="t-meta">01</div><h3 class="h-sm">现场条件</h3><p class="t-body">把风险写成可验证的现场条件。</p></div>
        <div class="sika-reverse-panel" style="padding:3vh 2vw"><div class="t-meta">02</div><h3 class="h-sm">影响范围</h3><p class="t-body">说明对质量、周期或成本的影响。</p></div>
        <div class="sika-reverse-panel" style="padding:3vh 2vw"><div class="t-meta">03</div><h3 class="h-sm">处理动作</h3><p class="t-body">给出下一步责任人和检查节点。</p></div>
      </div>
    </div>
  </div>
</section>
```

---

## 7. Product System Matrix · 产品系统矩阵

```html
<section class="slide" data-layout="S16" data-animate="grid-reveal">
  <div class="canvas-card">
    <div class="chrome-min"><div class="l">SYSTEM MATRIX</div><div class="r">NN / NN</div></div>
    <div style="display:grid;grid-template-rows:auto 1fr;gap:4vh;flex:1">
      <div><div class="t-cat accent">SIKA SYSTEM</div><h2 class="h-xl-zh">材料 × 场景 × 交付节点</h2></div>
      <div style="display:grid;grid-template-columns:repeat(3,1fr);grid-template-rows:repeat(2,1fr);gap:1px;background:rgba(var(--ink-rgb),.18)">
        <div class="sika-reverse-panel" style="padding:3vh 1.6vw"><div class="t-meta">A1</div><h3 class="h-sm">防水</h3><p class="t-body">材料组合与适用边界。</p></div>
        <div class="sika-reverse-panel" style="padding:3vh 1.6vw"><div class="t-meta">A2</div><h3 class="h-sm">修补</h3><p class="t-body">节点控制与检测方式。</p></div>
        <div class="sika-reverse-panel red" style="padding:3vh 1.6vw"><div class="t-meta">A3</div><h3 class="h-sm">关键推荐</h3><p class="t-body">唯一红色焦点给最终选择。</p></div>
        <div class="sika-reverse-panel" style="padding:3vh 1.6vw"><div class="t-meta">B1</div><h3 class="h-sm">密封</h3><p class="t-body">场景约束和施工窗口。</p></div>
        <div class="sika-reverse-panel" style="padding:3vh 1.6vw"><div class="t-meta">B2</div><h3 class="h-sm">粘接</h3><p class="t-body">强度、耐久和维护要求。</p></div>
        <div class="sika-reverse-panel" style="padding:3vh 1.6vw"><div class="t-meta">B3</div><h3 class="h-sm">验收</h3><p class="t-body">证据、记录和交付闭环。</p></div>
      </div>
    </div>
  </div>
</section>
```

---

## 8. Yellow Evidence Stack · 黄底证据堆叠

```html
<section class="slide sika-yellow" data-layout="S15" data-animate="grid-reveal">
  <div class="canvas-card">
    <div class="sika-brand-band" aria-hidden="true"></div>
    <div class="chrome-min"><div class="l">EVIDENCE STACK</div><div class="r">NN / NN</div></div>
    <div style="display:grid;grid-template-columns:.9fr 1.1fr;gap:4vw;align-items:end;flex:1">
      <div>
        <div class="t-cat">PROOF</div>
        <h2 class="h-xl-zh" style="color:var(--accent)">三组证据支撑一个结论。</h2>
      </div>
      <div style="display:grid;gap:1.2vh">
        <figure class="frame-img r-16x10 fit-cover" style="border:10px solid var(--paper)" data-anim="image"><img src="images/evidence-a.jpg" alt="证据 A"></figure>
        <figure class="frame-img r-16x10 fit-cover" style="border:10px solid var(--paper)" data-anim="image"><img src="images/evidence-b.jpg" alt="证据 B"></figure>
        <figure class="frame-img r-16x10 fit-cover" style="border:10px solid var(--accent)" data-anim="image"><img src="images/evidence-c.jpg" alt="关键证据"></figure>
      </div>
    </div>
  </div>
</section>
```
