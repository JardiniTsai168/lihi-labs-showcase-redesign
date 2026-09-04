const tools = [
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
    name: "著色圖產生器",
    slug: "coloring",
    status: "running",
    statusLabel: "立即體驗",
    chips: ["圖片", "AI", "親子"],
    summary: "把照片快速整理成可列印、可上色的著色圖，讓靈感直接變成可玩的內容。",
    description:
      "適合想快速把人物、寵物或日常照片變成著色素材的情境。上傳照片後，能直接拿到線條清楚、適合列印與分享的著色版本。",
    forWho: ["親子家庭", "想快速做互動素材的品牌", "需要圖像再利用內容的人"],
    outputs: ["A4 著色圖", "可下載的黑白線稿", "適合列印與分享的圖片版本"],
    highlights: ["上傳照片就能快速轉成著色圖", "保留主體辨識度與可上色空間", "適合活動素材、親子互動與內容延伸"],
    demo: "assets/coloring-generator-demo.mp4",
    link: "https://coloring.bktsai.link/",
    noteLink: "https://coloring.bktsai.link/"
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
    <article class="tool-card" data-status="${escapeHtml(tool.status)}" data-slug="${escapeHtml(tool.slug)}">
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
