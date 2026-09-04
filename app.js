const tools = [
  {
    name: "廣告文案產生器",
    slug: "copy-generator",
    status: "running",
    statusLabel: "Running",
    chips: ["文案", "廣告", "可立即使用"],
    summary: "貼上商品頁與賣點，快速產出可投放的廣告文案與多平台格式。",
    description:
      "適合需要快速驗證訊息、整理 CTA、切出 Meta 廣告與 Google Ads 版本的團隊。重點不是寫一篇漂亮文案，而是縮短從商品頁到上稿素材的距離。",
    highlights: ["讀商品頁後整理賣點", "可切 Meta / Google Ads / LINE / SMS", "適合行銷人先做第一輪草稿"],
    thumb: "assets/copy-generator-cover.svg",
    demo: "assets/copy-generator-demo.mp4",
    link: "https://lihi.io/labs/copy-generator",
    noteLink: "https://lihidev.com/labs/"
  },
  {
    name: "廣告素材產生器",
    slug: "creative",
    status: "running",
    statusLabel: "Running",
    chips: ["素材", "AI", "多尺寸"],
    summary: "從產品圖與文案往下走，整理成可用於社群投放的廣告主圖。",
    description:
      "適合想快速做第一輪素材方向的團隊。除了主圖，還能延伸出多平台比例，讓 creative testing 的前置成本更低。",
    highlights: ["可上傳產品圖與 logo", "支援多平台比例延伸", "保留 style / talent / prompt 控制感"],
    thumb: "assets/creative-generator-cover.svg",
    demo: "assets/creative-generator-demo.mp4",
    link: "https://creative.bktsai.link/",
    noteLink: "https://github.com/JardiniTsai168/lihi-copy-generator-creative-v1"
  },
  {
    name: "FB 貼文匯出整理器",
    slug: "fb-post-export",
    status: "beta",
    statusLabel: "Staging",
    chips: ["內容整理", "Facebook", "即將上線"],
    summary: "把 Facebook 匯出的資料重新整理成可 review、可挑選、可再利用的內容清單。",
    description:
      "適合需要回收舊貼文、做內容資產盤點，或從個人與品牌累積內容中抽出可再製素材的情境。這張卡先展示未來上線時的呈現方式。",
    highlights: ["匯出後可做 review 與篩選", "讓舊貼文變成再利用素材", "適合內容盤點與精選整理"],
    thumb: "assets/fb-export-cover.svg",
    demo: "assets/fb-export-demo.mp4",
    link: "https://blog.bktsai.link/studio/",
    noteLink: "https://blog.bktsai.link/studio/"
  }
];

const grid = document.querySelector("#tool-grid");
const searchInput = document.querySelector("#searchInput");

renderCards("");

if (searchInput) {
  searchInput.addEventListener("input", () => renderCards(searchInput.value));
}

function renderCards(keyword) {
  const query = String(keyword || "")
    .trim()
    .toLowerCase();

  const matched = tools.filter((tool) => {
    if (!query) {
      return true;
    }

    const haystack = [tool.name, tool.summary, tool.description, ...(tool.chips || []), ...(tool.highlights || [])]
      .join(" ")
      .toLowerCase();

    return haystack.includes(query);
  });

  if (!grid) {
    return;
  }

  if (!matched.length) {
    grid.innerHTML = '<div class="tool-empty">目前沒有符合的工具，試試看搜尋「AI」、「廣告」或「Facebook」。</div>';
    return;
  }

  grid.innerHTML = matched.map(renderCard).join("");
}

function renderCard(tool) {
  const chips = (tool.chips || []).map((chip) => `<span class="tool-chip">${escapeHtml(chip)}</span>`).join("");
  const highlights = (tool.highlights || []).map((item) => `<li>${escapeHtml(item)}</li>`).join("");

  return `
    <article class="tool-card" data-status="${escapeHtml(tool.status)}">
      <div class="tool-media-wrap">
        <div class="tool-thumb">
          <img src="${escapeHtml(tool.thumb)}" alt="${escapeHtml(tool.name)} 縮圖" />
        </div>
        <div class="tool-video">
          <span class="media-label">Demo Preview</span>
          <video autoplay muted loop playsinline preload="metadata" poster="${escapeHtml(tool.thumb)}">
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

      <div class="tool-meta">
        <p class="tool-description">${escapeHtml(tool.description)}</p>
        <ul class="tool-highlight-list">${highlights}</ul>
      </div>

      <div class="tool-links">
        <a class="tool-link tool-link-primary" href="${escapeHtml(tool.link)}" target="_blank" rel="noopener noreferrer">看工具</a>
        <a class="tool-link tool-link-secondary" href="${escapeHtml(tool.noteLink)}" target="_blank" rel="noopener noreferrer">看更多</a>
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
