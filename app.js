const tools = [
  {
    name: "文案+素材產生器",
    slug: "creative",
    summary: "輸入產品名稱跟三個優點，工具直接幫你產出文案、廣告平台該有的格式與可直接開始測試的廣告素材。",
    demo: "assets/creative-generator-demo.mp4",
    link: "https://creative.bktsai.link/"
  },
  {
    name: "著色圖產生器",
    slug: "coloring",
    summary: "把寵物跟家人照片轉成可列印、可分享的著色圖，讓著色圖多一份親子感。",
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
  return `
    <article class="tool-card" data-slug="${escapeHtml(tool.slug)}">
      <div class="tool-media-wrap">
        <div class="tool-video">
          <span class="media-label">範例圖 / 功能預覽</span>
          <video autoplay muted loop playsinline preload="metadata">
            <source src="${escapeHtml(tool.demo)}" type="video/mp4" />
          </video>
        </div>
      </div>

      <div class="tool-head">
        <h3 class="tool-title">${escapeHtml(tool.name)}</h3>
        <p class="tool-summary">${escapeHtml(tool.summary)}</p>
      </div>

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
