const tools = [
  {
    name: "廣告文案產生器",
    slug: "copy-generator",
    status: "running",
    statusLabel: "Available",
    chips: ["文案", "廣告", "可立即使用"],
    summary: "貼上商品頁與賣點，快速產出可投放的廣告文案與多平台格式。",
    description:
      "適合需要快速驗證訊息、整理 CTA、切出 Meta 廣告與 Google Ads 版本的團隊。從商品頁出發，先把第一版可用文案做出來。",
    forWho: ["行銷人員", "需要快速上稿的品牌", "想先做第一輪測試的團隊"],
    outputs: ["主要文案", "Meta 廣告版本", "Google Ads / LINE / SMS / Email"],
    highlights: ["讀商品頁後整理賣點", "縮短從網址到上稿文案的時間", "多格式一起展開，不必手動重寫"],
    thumb: "assets/copy-generator-cover.svg",
    demo: "assets/copy-generator-demo.mp4",
    link: "https://lihi.io/labs/copy-generator",
    noteLink: "https://lihi.io/labs/copy-generator"
  },
  {
    name: "廣告素材產生器",
    slug: "creative",
    status: "running",
    statusLabel: "Available",
    chips: ["素材", "AI", "多尺寸"],
    summary: "從產品圖與文案往下走，整理成可用於社群投放的廣告主圖。",
    description:
      "適合想快速做第一輪素材方向的團隊。除了主圖，還能延伸出多平台比例，讓 creative testing 的前置成本更低。",
    forWho: ["廣告操盤手", "品牌設計與行銷協作", "需要快速測風格方向的團隊"],
    outputs: ["主視覺素材", "多平台尺寸延伸", "可控的 style / prompt / talent 設定"],
    highlights: ["可上傳產品圖與 logo", "支援平台比例延伸", "比純生成更接近實際廣告工作流"],
    thumb: "assets/creative-generator-cover.svg",
    demo: "assets/creative-generator-demo.mp4",
    link: "https://creative.bktsai.link/",
    noteLink: "https://creative.bktsai.link/"
  },
  {
    name: "FB 貼文匯出整理器",
    slug: "fb-post-export",
    status: "staging",
    statusLabel: "Staging",
    chips: ["內容整理", "Facebook", "即將上線"],
    summary: "把 Facebook 匯出的資料重新整理成可 review、可挑選、可再利用的內容清單。",
    description:
      "適合需要回收舊貼文、做內容資產盤點，或從個人與品牌累積內容中抽出可再製素材的情境。",
    forWho: ["內容團隊", "品牌經營者", "想把舊貼文再利用的人"],
    outputs: ["可 review 的貼文清單", "內容篩選流程", "再製與精選素材基礎"],
    highlights: ["把舊資料變成可操作內容資產", "適合做內容盤點與二次創作", "目前先展示即將上線的產品定位"],
    thumb: "assets/fb-export-cover.svg",
    demo: "assets/fb-export-demo.mp4",
    link: "https://blog.bktsai.link/studio/",
    noteLink: "https://blog.bktsai.link/studio/"
  }
];

const availableGrid = document.querySelector("#available-grid");
const upcomingGrid = document.querySelector("#upcoming-grid");
const heroStats = document.querySelector("#hero-stats");
const searchInput = document.querySelector("#searchInput");

renderAll("");

if (searchInput) {
  searchInput.addEventListener("input", () => renderAll(searchInput.value));
}

function renderAll(keyword) {
  const query = String(keyword || "")
    .trim()
    .toLowerCase();

  const matched = tools.filter((tool) => {
    if (!query) {
      return true;
    }

    const haystack = [tool.name, tool.summary, tool.description, ...(tool.chips || []), ...(tool.highlights || []), ...(tool.forWho || [])]
      .join(" ")
      .toLowerCase();

    return haystack.includes(query);
  });

  const available = matched.filter((tool) => tool.status === "running");
  const upcoming = matched.filter((tool) => tool.status !== "running");

  renderHeroStats();
  renderGrid(availableGrid, available, "目前沒有符合的可用工具。");
  renderGrid(upcomingGrid, upcoming, "目前沒有符合的即將登場工具。");
}

function renderHeroStats() {
  if (!heroStats) {
    return;
  }

  const availableCount = tools.filter((tool) => tool.status === "running").length;
  const upcomingCount = tools.filter((tool) => tool.status !== "running").length;

  heroStats.innerHTML = `
    <article>
      <strong>${availableCount}</strong>
      <span>現在可用工具</span>
    </article>
    <article>
      <strong>${upcomingCount}</strong>
      <span>即將登場工具</span>
    </article>
    <article>
      <strong>${tools.length}</strong>
      <span>目前展示項目</span>
    </article>
  `;
}

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
        <a class="tool-link tool-link-primary" href="${escapeHtml(tool.link)}" target="_blank" rel="noopener noreferrer">立即查看</a>
        <a class="tool-link tool-link-secondary" href="${escapeHtml(tool.noteLink)}" target="_blank" rel="noopener noreferrer">開啟展示</a>
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
