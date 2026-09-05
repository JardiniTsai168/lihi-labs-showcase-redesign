const tools = [
  {
    name: "文案+素材產生器",
    slug: "creative",
    summary: "不知道廣告該怎麼寫、素材怎麼做？輸入產品名稱和三個優點，剩下的交給我們！",
    demo: "assets/creative-generator-demo.mp4",
    link: "https://creative.bktsai.link/"
  },
  {
    name: "著色圖產生器",
    slug: "coloring",
    summary: "把你最喜歡的寵物、家人或風景照片，變成一張可以親手上色的回憶。",
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
