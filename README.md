<div align="center">

# 🅰️ chinese_artwork_angular（中華書畫藝術網・前台）

**以 Angular 21 打造的書畫藝術網站前台：書法集字、最新消息、深淺色主題，支援 SSR 預渲染**

[![CI](https://github.com/AnthonyFuFu/chinese_artwork_angular/actions/workflows/CI.yml/badge.svg)](https://github.com/AnthonyFuFu/chinese_artwork_angular/actions/workflows/CI.yml)
[![Angular](https://img.shields.io/badge/Angular-21-DD0031?logo=angular&logoColor=white)](https://angular.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Angular Material](https://img.shields.io/badge/Angular_Material-21-757575?logo=materialdesign&logoColor=white)](https://material.angular.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![RxJS](https://img.shields.io/badge/RxJS-7-B7178C?logo=reactivex&logoColor=white)](https://rxjs.dev/)
[![Vitest](https://img.shields.io/badge/Vitest-測試-6E9F18?logo=vitest&logoColor=white)](https://vitest.dev/)

🌐 線上預覽：[anthonyfufu.github.io/chinese_artwork_angular](https://anthonyfufu.github.io/chinese_artwork_angular/) ・
🔗 後端專案：[chineseArtwork](https://github.com/AnthonyFuFu/chineseArtwork)

[功能特色](#-功能特色) ・
[技術亮點](#-技術亮點) ・
[專案結構](#-專案結構) ・
[快速開始](#-快速開始) ・
[部署](#-部署github-pages)

</div>

---

## ✨ 功能特色

| | 功能 | 說明 |
|:---:|---|---|
| 🏠 | **首頁** | Owl Carousel 輪播橫幅、最新消息與活動卡片（活動 / 消息 / 展覽 / 更新分類），圖片載入失敗自動替換預設圖 |
| ✍️ | **書法集字** | 為每個字挑選不同書體（篆書、隸書、草書…）與書家的字形，點選後自動填入集字格的下一個空格 |
| 🔲 | **集字格產生器** | 自訂列數、行數與空白行，一鍵產生格線；側邊設定面板可拖曳調整寬度、收合 |
| 💬 | **浮動客服視窗** | 可拖曳移動、自動捲到最新訊息、Enter 送出（目前為模擬回覆） |
| 🌗 | **深色 / 淺色主題** | 切換後記在 `localStorage`，重新整理後保留 |
| 📑 | **可收合側邊選單** | 依螢幕寬度自動收合，收合狀態一併保存；麵包屑隨路由自動更新 |
| 🧑 | **使用者選單** | 頭像、編輯資料、設定、登出 |

> 🚧 藝術家（`/artist`）與作品（`/artwork`）頁面仍在開發中；目前資料以前端假資料為主，之後改接 [chineseArtwork](https://github.com/AnthonyFuFu/chineseArtwork) 的 Web API。

## 🧠 技術亮點

| 主題 | 做法 |
|------|------|
| **Standalone Components** | 不使用 NgModule，元件各自宣告相依 |
| **路由懶載入** | `loadComponent` / `loadChildren` 依頁面拆分程式碼；`Show`（首頁）與 `Main`（內頁）兩種版面 |
| **混合渲染（SSR）** | `app.routes.server.ts` 逐頁設定：首頁、藝術家、字典用 **Prerender**，作品畫廊用 **Client** 渲染 |
| **SSR 相容** | 存取 `localStorage`、`window` 前以 `isPlatformBrowser` 判斷，避免伺服器端渲染時出錯 |
| **狀態管理** | `MenuService` 以 RxJS `BehaviorSubject` 推送麵包屑，元件訂閱並在銷毀時取消 |
| **元件通訊** | `@Input` / `@Output` + `@ViewChild`：字形選擇元件發出事件，字典頁再呼叫集字格元件填字 |
| **API 封裝** | `ApiService` 統一管理 `baseUrl`，各 Service 繼承後使用 `HttpClient` |

## 🛠 技術棧

| 分類 | 技術 |
|------|------|
| 框架 | Angular 21（Standalone、Signals、新版控制流程 `@for` / `@if`） |
| 渲染 | Angular SSR（`@angular/ssr`）、Express 伺服器 |
| UI | Angular Material + CDK、Tailwind CSS 4、ngx-owl-carousel-o |
| 非同步 | RxJS 7、HttpClient |
| 測試 | Vitest + jsdom |
| CI / 部署 | GitHub Actions → GitHub Pages |

## 📂 專案結構

```text
src/
├── app/
│   ├── app.routes.ts            # 前端路由（懶載入）
│   ├── app.routes.server.ts     # 每個路由的渲染模式（Prerender / Client）
│   ├── common/                  # 路由常數、型別定義
│   ├── layout/                  # 版面：show（首頁）、main（內頁）、header、footer、left-side-bar
│   ├── pages/                   # 頁面：index、artist、artwork、dictionary
│   ├── components/              # banner、card、news、character-row、poem-grid、chat、search、user、breadcrumb
│   └── services/                # api、member、menu、search
├── environments/environment.ts  # 後端 API 位址
├── main.ts / main.server.ts     # 瀏覽器 / 伺服器進入點
├── server.ts                    # SSR Express 伺服器
└── material-theme.scss          # Angular Material 主題
```

## 🚀 快速開始

### 環境需求

- Node.js 22 以上
- npm 11

### 安裝與啟動

```bash
npm install
npm start            # 開發伺服器 http://localhost:4200
```

Windows PowerShell 若無法執行 `ng` 指令，先調整執行原則：

```powershell
Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy RemoteSigned
```

### 常用指令

| 指令 | 說明 |
|------|------|
| `npm start` | 啟動開發伺服器（熱重載） |
| `npm run build` | 正式建置，輸出到 `dist/chinese_artwork/` |
| `npm run serve:ssr:chinese_artwork` | 以 Node 啟動 SSR 伺服器 |
| `npm test` | 以 Vitest 執行單元測試 |
| `npx ng generate component <name>` | 產生新元件 |

### 設定後端位址

`src/environments/environment.ts`：

```ts
export const environment = {
  production: false,
  baseUrl: "http://localhost:8080",
};
```

## 🚢 部署（GitHub Pages）

push 到 `master` 時，[`.github/workflows/CI.yml`](.github/workflows/CI.yml) 會自動：

1. `npm ci` 安裝套件
2. 以 `--output-mode=static --base-href=/chinese_artwork_angular/` 建置成純靜態網站
3. 複製 `index.html` 為 `404.html`，讓重新整理內頁時仍能回到 Angular 路由
4. 上傳並部署到 GitHub Pages
