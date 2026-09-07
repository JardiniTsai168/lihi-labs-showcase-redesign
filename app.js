const tools = [
  {
    name: "文案+素材產生器",
    slug: "creative",
    summary: "不知道廣告該怎麼寫、素材怎麼做？輸入產品名稱和三個優點，剩下的交給我們！",
    fee: "限量免費，需註冊",
    preview: "assets/creative-generator-demo.mp4",
    previewType: "video",
    beta: true,
    link: "https://creative.bktsai.link/"
  },
  {
    name: "lihiAgentMCP",
    slug: "agent-mcp",
    summary: "lihi 專屬 Agent MCP。幫你的 Agent 自動建立閱讀、廣告或貼文短網址，也能呼叫文案素材產生器 API，完成文案、素材產出與上架。",
    fee: "免費",
    preview: "assets/lihi-agent-mcp-preview.svg",
    previewType: "image",
    beta: true,
    link: "https://lihi.io/"
  },
  {
    name: "快客數據",
    slug: "quickdash",
    summary: "快速串接 Meta、GA4、Google Ads、LINE 等平台，把分散的行銷數據集中成報表，再用 AI 找出值得優化的關鍵。",
    fee: "免費",
    preview: "assets/quickdash-preview.svg",
    previewType: "image",
    link: "https://quickdash.com.tw/tw"
  },
  {
    name: "UTM 管理員",
    slug: "utm-manager",
    summary: "把散落的 UTM 命名和連結集中整理，讓每次投放都更好追蹤，也少一點人工出錯。",
    fee: "免費",
    preview: "assets/utm-manager-preview.svg",
    previewType: "image",
    link: "https://lihi.io/"
  },
  {
    name: "QR Code 產生器",
    slug: "qr-code",
    summary: "把網址變成好掃、好分享的 QR Code，活動現場、印刷品或門市導流都能立即使用。",
    fee: "免費",
    preview: "assets/qr-code-preview.svg",
    previewType: "image",
    link: "https://lihi.io/"
  },
  {
    name: "Chrome 套件",
    slug: "chrome-extension",
    summary: "瀏覽網頁時直接建立 lihi 短網址，不必來回貼連結，分享和追蹤更順手。",
    fee: "免費",
    preview: "assets/chrome-extension-preview.svg",
    previewType: "image",
    link: "https://lihi.io/"
  },
  {
    name: "iOS 捷徑",
    slug: "ios-shortcut",
    summary: "在 iPhone 上一鍵建立 lihi 短網址，不用切換 App，分享連結更快一步。",
    fee: "需訂閱帳號",
    preview: "assets/ios-shortcut-preview.svg",
    previewType: "image",
    link: "https://lihi.io/"
  },
  {
    name: "Google 試算表外掛",
    slug: "sheets-addon",
    summary: "在 Google 試算表裡直接輸入指令，就能快速建立 lihi 短網址，整理大量連結也不用來回切換工具。",
    fee: "免費（不包含自訂網域）",
    preview: "assets/sheets-addon-preview.svg",
    previewType: "image",
    link: "https://lihi.io/"
  },
  {
    name: "客服報表系統",
    slug: "support-report",
    summary: "讓 AI 分析所有客服訊息，自動整理歸納以及產出客服分析報表，幫你找出客服長時間忽略的盲點。",
    fee: "限額開放",
    preview: "assets/support-report-preview.svg",
    previewType: "image",
    beta: true,
    link: "https://lihi.io/"
  },
  {
    name: "基礎行銷攻略",
    slug: "marketing-guide",
    summary: "從短網址、UTM 到廣告追蹤，用容易上手的方式補齊行銷基本功。",
    fee: "免費",
    preview: "assets/marketing-guide-preview.svg",
    previewType: "image",
    link: "https://lihi.io/"
  },
  {
    name: "lihi WordPress Plugin",
    slug: "wordpress-plugin",
    summary: "在 WordPress 後台直接為文章、頁面與媒體建立或複製 lihi 短網址，也能加入網域、標籤與 UTM，不必離開內容管理畫面。",
    fee: "免費",
    preview: "assets/wordpress-plugin-preview.svg",
    previewType: "image",
    link: "https://wordpress.org/plugins/lihi-short-url/"
  },
  {
    name: "著色圖產生器",
    slug: "coloring",
    summary: "把你最喜歡的寵物、家人或風景照片，變成一張可以親手上色的回憶。",
    fee: "限量免費",
    preview: "assets/coloring-generator-demo.mp4",
    previewType: "video",
    link: "https://coloring.bktsai.link/"
  }
];

const PAGE_SIZE = 6;
const FAVORITES_STORAGE_KEY = "lihi-tool-library-favorites";
const toolGrid = document.querySelector("#tool-grid");
const toolsSection = document.querySelector("#tools");
const pagination = document.querySelector("#pagination");
const pageSummary = document.querySelector("#page-summary");
const favoriteTools = document.querySelector("#favorite-tools");
const favoriteEmpty = document.querySelector("#favorite-empty");
const favoriteStatus = document.querySelector("#favorite-status");
const singleColumnTools = window.matchMedia("(max-width: 640px)");
const twoColumnTools = window.matchMedia("(min-width: 641px) and (max-width: 980px)");

let currentPage = 1;
const favoriteSlugs = loadFavorites();

renderPage();
renderFavorites();

toolGrid?.addEventListener("click", handleFavoriteToggle);
favoriteTools?.addEventListener("click", handleFavoriteToggle);
pagination?.addEventListener("click", handlePageChange);
singleColumnTools.addEventListener("change", handleToolLayoutChange);
twoColumnTools.addEventListener("change", handleToolLayoutChange);

function renderPage({ scroll = false } = {}) {
  const totalPages = Math.max(1, Math.ceil(tools.length / PAGE_SIZE));
  currentPage = Math.min(Math.max(currentPage, 1), totalPages);
  const pageStart = (currentPage - 1) * PAGE_SIZE;
  const pageItems = tools.slice(pageStart, pageStart + PAGE_SIZE);

  renderGrid(toolGrid, pageItems, "目前沒有可展示的工具。");
  renderPagination(totalPages);

  if (pageSummary) {
    pageSummary.textContent = `第 ${currentPage} / ${totalPages} 頁，共 ${tools.length} 個工具`;
  }

  if (scroll && toolsSection) {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    toolsSection.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" });
  }
}

function renderGrid(target, items, emptyMessage) {
  if (!target) {
    return;
  }

  if (!items.length) {
    target.innerHTML = `<div class="tool-empty">${escapeHtml(emptyMessage)}</div>`;
    return;
  }

  const renderedItems = items.map(renderCard);

  if (target === toolGrid && currentPage === 1) {
    const promoPosition = singleColumnTools.matches ? 1 : twoColumnTools.matches ? 2 : 3;
    renderedItems.splice(promoPosition, 0, renderBrandDomainCallout());
  }

  target.innerHTML = renderedItems.join("");
}

function handleToolLayoutChange() {
  if (currentPage === 1) {
    renderPage();
  }
}

function renderBrandDomainCallout() {
  return `
    <aside class="brand-domain-callout">
      <strong>品牌網域只要 $1</strong>
      <span>為你的專案申請專屬品牌網域，只要 $1，讓每一次的分享都更有信任感。</span>
    </aside>
  `;
}

function renderPagination(totalPages) {
  if (!pagination) {
    return;
  }

  if (totalPages <= 1) {
    pagination.hidden = true;
    pagination.innerHTML = "";
    return;
  }

  pagination.hidden = false;
  const pageButtons = Array.from({ length: totalPages }, (_, index) => {
    const page = index + 1;
    const currentAttribute = page === currentPage ? ` aria-current="page"` : "";
    return `<button type="button" class="pagination-page" data-page="${page}"${currentAttribute}>${page}</button>`;
  }).join("");

  pagination.innerHTML = `
    <button type="button" class="pagination-direction" data-page="${currentPage - 1}" ${currentPage === 1 ? "disabled" : ""}>上一頁</button>
    <div class="pagination-pages">${pageButtons}</div>
    <button type="button" class="pagination-direction" data-page="${currentPage + 1}" ${currentPage === totalPages ? "disabled" : ""}>下一頁</button>
  `;
}

function handlePageChange(event) {
  const button = event.target.closest("[data-page]");
  if (!button || button.disabled) {
    return;
  }

  const nextPage = Number(button.dataset.page);
  if (!Number.isInteger(nextPage) || nextPage === currentPage) {
    return;
  }

  currentPage = nextPage;
  renderPage({ scroll: true });
}

function handleFavoriteToggle(event) {
  const button = event.target.closest("[data-favorite-toggle]");
  if (!button) {
    return;
  }

  const slug = button.dataset.favoriteToggle;
  const tool = tools.find((item) => item.slug === slug);
  if (!tool) {
    return;
  }

  const isRemoving = favoriteSlugs.has(slug);
  if (isRemoving) {
    favoriteSlugs.delete(slug);
  } else {
    favoriteSlugs.add(slug);
  }

  saveFavorites();
  renderFavorites();
  renderPage();

  if (favoriteStatus) {
    favoriteStatus.textContent = isRemoving
      ? `已將${tool.name}從常用工具移除。`
      : `已將${tool.name}加入常用工具。`;
  }
}

function renderFavorites() {
  if (!favoriteTools || !favoriteEmpty) {
    return;
  }

  const favorites = tools.filter((tool) => favoriteSlugs.has(tool.slug));
  favoriteEmpty.hidden = favorites.length > 0;
  favoriteTools.hidden = favorites.length === 0;
  favoriteTools.innerHTML = favorites.map(renderFavoriteShortcut).join("");
}

function renderFavoriteShortcut(tool) {
  const betaBadge = tool.beta ? `<span class="favorite-beta">Beta</span>` : "";

  return `
    <article class="favorite-tool">
      <div class="favorite-tool-name">
        <span class="favorite-star" aria-hidden="true">★</span>
        <strong>${escapeHtml(tool.name)}</strong>
        ${betaBadge}
      </div>
      <div class="favorite-tool-actions">
        <a href="${escapeHtml(tool.link)}" target="_blank" rel="noopener noreferrer">前往工具</a>
        <button type="button" data-favorite-toggle="${escapeHtml(tool.slug)}" aria-label="從常用工具移除${escapeHtml(tool.name)}">移除</button>
      </div>
    </article>
  `;
}

function loadFavorites() {
  try {
    const storedValue = window.localStorage.getItem(FAVORITES_STORAGE_KEY);
    const storedSlugs = storedValue ? JSON.parse(storedValue) : [];
    const validSlugs = Array.isArray(storedSlugs)
      ? storedSlugs.filter((slug) => tools.some((tool) => tool.slug === slug))
      : [];
    return new Set(validSlugs);
  } catch {
    return new Set();
  }
}

function saveFavorites() {
  try {
    window.localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify([...favoriteSlugs]));
  } catch {
    // Favorites still work for the current page when browser storage is unavailable.
  }
}

function renderCard(tool) {
  const preview = tool.previewType === "image"
    ? `<img src="${escapeHtml(tool.preview)}" alt="${escapeHtml(tool.name)} 功能預覽" loading="lazy" />`
    : `<video autoplay muted loop playsinline preload="metadata">
        <source src="${escapeHtml(tool.preview)}" type="video/mp4" />
      </video>`;
  const betaBadge = tool.beta ? `<span class="tool-beta">Beta</span>` : "";
  const isFavorite = favoriteSlugs.has(tool.slug);
  const favoriteLabel = isFavorite ? "已加入常用" : "加入常用工具";
  const favoriteIcon = isFavorite ? "★" : "☆";

  return `
    <article class="tool-card" data-slug="${escapeHtml(tool.slug)}">
      <div class="tool-head">
        <h3 class="tool-title">${escapeHtml(tool.name)}</h3>
        ${betaBadge}
      </div>

      <div class="tool-media-wrap">
        <div class="tool-preview">
          <span class="media-label">範例圖 / 功能預覽</span>
          ${preview}
        </div>
      </div>

      <p class="tool-summary">${escapeHtml(tool.summary)}</p>

      <p class="tool-fee">
        <span>費用</span>
        <strong>${escapeHtml(tool.fee)}</strong>
      </p>

      <div class="tool-links">
        <button type="button" class="favorite-button" data-favorite-toggle="${escapeHtml(tool.slug)}" aria-pressed="${isFavorite}">
          <span aria-hidden="true">${favoriteIcon}</span>
          <span>${favoriteLabel}</span>
        </button>
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
