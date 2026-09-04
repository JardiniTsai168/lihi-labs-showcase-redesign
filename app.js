const tools = [
  {
    name: "廣告素材產生器",
    slug: "creative",
    status: "running",
    statusLabel: "立即體驗",
    chips: ["素材", "AI", "多尺寸"],
    summary: "把產品圖、logo 跟核心訊息整理成可直接開始測試的廣告素材。",
    problem: "適合想先確認素材方向，不想每次都從空白稿重新來過的團隊。",
    output: "你會拿到主視覺提案、常用尺寸延伸，與可繼續微調的素材方向。",
    highlights: ["支援上傳產品圖與 logo", "快速延伸常用廣告版位", "更貼近實際投放前的整理流程"],
    demo: "assets/creative-generator-demo.mp4",
    link: "https://creative.bktsai.link/"
  },
  {
    name: "著色圖產生器",
    slug: "coloring",
    status: "running",
    statusLabel: "立即體驗",
    chips: ["圖片", "AI", "親子"],
    summary: "把照片轉成可列印、可分享的著色圖，讓原本的圖片多一種互動用法。",
    problem: "適合想把人物、寵物或活動照片快速變成可玩的內容，不必另外重畫線稿。",
    output: "你會拿到線條清楚的黑白著色圖，能直接下載、列印，或延伸成活動素材。",
    highlights: ["上傳照片就能快速生成", "保留主體辨識度與留白空間", "適合親子互動與品牌活動"],
    demo: "assets/coloring-generator-demo.mp4",
    link: "https://coloring.bktsai.link/"
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
      </div>

      <div class="tool-notes">
        <p><strong>解決什麼問題</strong>${escapeHtml(tool.problem)}</p>
        <p><strong>你會拿到什麼</strong>${escapeHtml(tool.output)}</p>
      </div>

      <ul class="tool-highlight-list">${highlights}</ul>

      <div class="tool-links">
        <a class="tool-link tool-link-primary" href="${escapeHtml(tool.link)}" target="_blank" rel="noopener noreferrer">前往工具</a>
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
