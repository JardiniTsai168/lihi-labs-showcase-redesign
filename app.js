const tools = [
  {
    name: "文案+素材產生器",
    slug: "creative",
    summary: "不知道廣告該怎麼寫、素材怎麼做？輸入產品名稱和三個優點，剩下的交給我們！",
    preview: "assets/creative-generator-demo.mp4",
    previewType: "video",
    link: "https://creative.bktsai.link/"
  },
  {
    name: "著色圖產生器",
    slug: "coloring",
    summary: "把你最喜歡的寵物、家人或風景照片，變成一張可以親手上色的回憶。",
    preview: "assets/coloring-generator-demo.mp4",
    previewType: "video",
    link: "https://coloring.bktsai.link/"
  },
  {
    name: "lihiAgentMCP",
    slug: "agent-mcp",
    summary: "lihi 專屬 Agent MCP。幫你的 Agent 自動建立閱讀、廣告或貼文短網址，也能呼叫文案素材產生器 API，完成文案、素材產出與上架。",
    preview: "assets/lihi-agent-mcp-preview.svg",
    previewType: "image",
    link: "https://lihi.io/"
  },
  {
    name: "QR Code 產生器",
    slug: "qr-code",
    summary: "把網址變成好掃、好分享的 QR Code，活動現場、印刷品或門市導流都能立即使用。",
    preview: "assets/qr-code-preview.svg",
    previewType: "image",
    link: "https://lihi.io/"
  },
  {
    name: "UTM 管理員",
    slug: "utm-manager",
    summary: "把散落的 UTM 命名和連結集中整理，讓每次投放都更好追蹤，也少一點人工出錯。",
    preview: "assets/utm-manager-preview.svg",
    previewType: "image",
    link: "https://lihi.io/"
  },
  {
    name: "iOS 捷徑",
    slug: "ios-shortcut",
    summary: "在 iPhone 上一鍵建立 lihi 短網址，不用切換 App，分享連結更快一步。",
    preview: "assets/ios-shortcut-preview.svg",
    previewType: "image",
    link: "https://lihi.io/"
  },
  {
    name: "Chrome 套件",
    slug: "chrome-extension",
    summary: "瀏覽網頁時直接建立 lihi 短網址，不必來回貼連結，分享和追蹤更順手。",
    preview: "assets/chrome-extension-preview.svg",
    previewType: "image",
    link: "https://lihi.io/"
  },
  {
    name: "基礎行銷攻略",
    slug: "marketing-guide",
    summary: "從短網址、UTM 到廣告追蹤，用容易上手的方式補齊行銷基本功。",
    preview: "assets/marketing-guide-preview.svg",
    previewType: "image",
    link: "https://lihi.io/"
  },
  {
    name: "客服報表系統",
    slug: "support-report",
    summary: "讓 AI 讀懂所有客服訊息，自動整理常見問題與分析報表，幫你找出服務流程裡容易被忽略的盲點。",
    preview: "assets/support-report-preview.svg",
    previewType: "image",
    link: "https://lihi.io/"
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
  const preview = tool.previewType === "image"
    ? `<img src="${escapeHtml(tool.preview)}" alt="${escapeHtml(tool.name)} 功能預覽" loading="lazy" />`
    : `<video autoplay muted loop playsinline preload="metadata">
        <source src="${escapeHtml(tool.preview)}" type="video/mp4" />
      </video>`;

  return `
    <article class="tool-card" data-slug="${escapeHtml(tool.slug)}">
      <div class="tool-head">
        <h3 class="tool-title">${escapeHtml(tool.name)}</h3>
      </div>

      <div class="tool-media-wrap">
        <div class="tool-preview">
          <span class="media-label">範例圖 / 功能預覽</span>
          ${preview}
        </div>
      </div>

      <p class="tool-summary">${escapeHtml(tool.summary)}</p>

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
