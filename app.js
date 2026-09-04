const tools = [
  {
    name: "廣告文案產生器",
    slug: "copy-generator",
    status: "running",
    statusLabel: "立即體驗",
    chips: ["文案", "廣告", "立即可用"],
    summary: "把商品頁整理成可直接測試的廣告文案，先把第一版上稿速度拉起來。",
    description:
      "適合正在趕檔期、要快速驗證賣點與 CTA 的品牌團隊。輸入商品頁後，先產出能上稿、能比較、能往下優化的文案版本。",
    forWho: ["需要快速上稿的品牌", "要先測訊息方向的行銷團隊", "想把商品頁重點整理出來的人"],
    outputs: ["主文案方向", "Meta 廣告版本", "Google Ads、LINE、SMS、Email 延伸格式"],
    highlights: ["從商品頁整理核心賣點", "把 CTA 與訴求先切成可測試版本", "多平台格式一起展開，降低手動重寫時間"],
    demo: "assets/copy-generator-demo.mp4",
    link: "https://lihi.io/labs/copy-generator",
    noteLink: "https://lihi.io/labs/copy-generator"
  },
  {
    name: "廣告素材產生器",
    slug: "creative",
    status: "running",
    statusLabel: "立即體驗",
    chips: ["素材", "AI", "多尺寸"],
    summary: "把產品圖、logo 與文案整理成可直接拿去測試的廣告素材方向。",
    description:
      "適合想先做第一輪素材測試、但不想每次都從零開稿的團隊。先把可用主圖做出來，再往不同平台尺寸延伸。",
    forWho: ["需要快速測素材方向的品牌", "廣告操盤與設計協作團隊", "想降低 creative testing 前置成本的人"],
    outputs: ["主視覺素材", "多平台尺寸延伸", "可調整的風格與人物設定"],
    highlights: ["支援上傳產品圖與 logo", "可延伸常用廣告比例", "更貼近實際投放前的素材整理流程"],
    demo: "assets/creative-generator-demo.mp4",
    link: "https://creative.bktsai.link/",
    noteLink: "https://creative.bktsai.link/"
  },
  {
    name: "FB 貼文匯出整理器",
    slug: "fb-post-export",
    status: "staging",
    statusLabel: "即將上線",
    chips: ["內容整理", "Facebook", "即將上線"],
    summary: "把 Facebook 舊貼文重新整理成可篩選、可回看、可再利用的內容資產。",
    description:
      "適合想把舊內容重新盤點、挑出可再製素材的團隊。不是單純匯出資料，而是把內容重新整理成下一步能用的清單。",
    forWho: ["內容團隊", "品牌經營者", "想重整舊貼文資產的人"],
    outputs: ["可 review 的貼文列表", "內容篩選流程", "後續精選與再製的整理基礎"],
    highlights: ["把舊貼文轉成可操作的內容資產", "適合做內容盤點與再利用", "目前在 staging，會持續收斂體驗"],
    demo: "assets/fb-export-demo.mp4",
    link: "https://blog.bktsai.link/studio/",
    noteLink: "https://blog.bktsai.link/studio/"
  }
];

const toolGrid = document.querySelector("#tool-grid");

renderGrid(toolGrid, tools, "目前沒有可展示的工具。");

function renderGrid(target, items, emptyMessage) {
  if (!target) {
    return;
  }

  if (!items.length) {
    target.innerHTML = `<div class="tool-empty">${escapeHtml(emptyMessage)}</div>`;
    return;
  }

  target.innerHTML = items.map(renderCard).join("");
}

function renderCard(tool) {
  const chips = (tool.chips || []).map((chip) => `<span class="tool-chip">${escapeHtml(chip)}</span>`).join("");
  const forWho = (tool.forWho || []).map((item) => `<li>${escapeHtml(item)}</li>`).join("");
  const outputs = (tool.outputs || []).map((item) => `<li>${escapeHtml(item)}</li>`).join("");
  const highlights = (tool.highlights || []).map((item) => `<li>${escapeHtml(item)}</li>`).join("");

  return `
    <article class="tool-card" data-status="${escapeHtml(tool.status)}">
      <div class="tool-media-wrap">
        <div class="tool-video">
          <span class="media-label">功能預覽</span>
          <video autoplay muted loop playsinline preload="metadata">
            <source src="${escapeHtml(tool.demo)}" type="video/mp4" />
          </video>
        </div>
      </div>

      <div class="tool-head">
        <div class="tool-topline">
          <span class="tool-status">${escapeHtml(tool.statusLabel)}</span>
          ${chips}
        </div>
        <h3 class="tool-title">${escapeHtml(tool.name)}</h3>
        <p class="tool-summary">${escapeHtml(tool.summary)}</p>
        <p class="tool-description">${escapeHtml(tool.description)}</p>
      </div>

      <div class="tool-meta-clusters">
        <div class="tool-cluster">
          <strong>適合誰</strong>
          <ul class="tool-detail-list">${forWho}</ul>
        </div>
        <div class="tool-cluster">
          <strong>你會拿到什麼</strong>
          <ul class="tool-detail-list">${outputs}</ul>
        </div>
      </div>

      <ul class="tool-highlight-list">${highlights}</ul>

      <div class="tool-links">
        <a class="tool-link tool-link-primary" href="${escapeHtml(tool.link)}" target="_blank" rel="noopener noreferrer">前往工具</a>
        <a class="tool-link tool-link-secondary" href="${escapeHtml(tool.noteLink)}" target="_blank" rel="noopener noreferrer">查看展示</a>
      </div>
    </article>
  `;
}

function escapeHtml(value) {
  return String(value == null ? "" : value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
