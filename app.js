const tools = [
  {
    name: "廣告素材產生器",
    slug: "creative",
    status: "running",
    statusLabel: "立即體驗",
    chips: ["素材", "AI", "多尺寸"],
    summary: "輸入產品名稱跟優點，直接幫你產出文案與可開始測試的廣告素材。",
    problem: "適合想快速整理第一波廣告方向，不用自己先拆文案再另外做素材的人。",
    output: "你會拿到可直接測試的文案素材組合，方便快速進入廣告投放與優化。",
    highlights: ["輸入產品名稱與賣點就能開始", "同步整理文案與素材方向", "更快進入第一輪廣告測試"],
    demo: "assets/creative-generator-demo.mp4",
    link: "https://creative.bktsai.link/"
  },
  {
    name: "著色圖產生器",
    slug: "coloring",
    status: "running",
    statusLabel: "立即體驗",
    chips: ["圖片", "AI", "親子"],
    summary: "把寵物跟家人照片轉成可列印、可分享的著色圖，讓著色圖多一份親子感。",
    problem: "適合想把日常照片快速變成親子互動內容，不用另外找插畫或重畫線稿。",
    output: "你會拿到可下載、可列印、可分享的著色圖，能直接陪小朋友一起玩。",
    highlights: ["把家人或寵物照片快速轉成著色圖", "保留主體輪廓，方便上色", "更適合親子互動與日常分享"],
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
