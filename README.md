# 📱 Zara Phone Catalog — Technical Challenge

Solution to the Zara technical challenge for building a smartphone catalog web application.

---

## ✨ What does this app do?

An online smartphone store with three main pages:

| View | Description |
|------|-------------|
| 🏠 **Phone list** | Grid showing the first 20 phones. Includes a real-time search bar filtered by name or brand, with a result counter. |
| 📋 **Product detail** | Full device information: specifications, color selector with image preview, storage selector with real-time price update, and a carousel of similar items. |
| 🛒 **Shopping cart** | List of added products with image, color, capacity, and price. Shows the total and allows removing items individually. Cart state persists even after closing the browser. |

---

## 🚀 How to run the project

### Prerequisites

You need to have the following installed on your machine:

| Tool | Minimum version | Download |
|------|-----------------|----------|
| **Node.js** | 18.12.0 or higher | [nodejs.org](https://nodejs.org) |
| **pnpm** | 9.0.0 or higher | `npm install -g pnpm` |

### Steps

```bash
# 1. Clone the repository
git clone <repository-url>
cd <folder-name>

# 2. Install all dependencies
pnpm install

# 3. Start the application in development mode
pnpm dev
```

Open your browser at **http://localhost:3000** and the app will be ready. ✅

> **Note:** The `pnpm dev` command starts both the frontend (port `3000`) and the proxy server (port `3001`) simultaneously. Both are required for the application to work correctly.

### Production build

```bash
pnpm build
```

---

## 🧪 Tests & code quality

```bash
# Run all tests
pnpm test

# Check TypeScript types without compiling
pnpm check

# Lint the codebase for style issues
pnpm lint

# Auto-format the code
pnpm format

# Clean cache and build folders
pnpm clean
```

The test suite includes:
- **HTTP integration tests** with real mock servers (MSW), verifying that communication with the external API works end-to-end.
- **Service unit tests** that validate caching logic, data deduplication, and the search flow.

---

## 🏗️ Project architecture

The project is organized as a **monorepo** — all the code lives in a single repository, but is split into independent packages that can be developed and tested separately.

```
TestInditex/
├── apps/
│   ├── web/         → React application (what the user sees)
│   └── bff/         → Node.js proxy server (intermediary with the external API)
│
└── packages/
    ├── api-client/  → API request logic and data transformation
    ├── ui/          → Reusable visual components (buttons, inputs, images…)
    ├── shared/      → TypeScript types, constants, and shared utilities
    └── config/      → Base TypeScript configuration for the entire project
```

### Why this structure?

**`apps/web`** — The React frontend that renders the three pages of the application. It uses React Router for navigation and CSS Modules for styling, ensuring that each component's styles don't interfere with others.

**`apps/bff`** — A small Express server that acts as an intermediary between the browser and the Zara external API. This ensures the **API key is never exposed** in browser code (where anyone could inspect it).

**`packages/api-client`** — All data communication logic: how requests are made, how results are cached in `localStorage` to avoid repeated calls, and how API data is transformed into the format the UI needs.

**`packages/ui`** — Standalone visual components: buttons, text inputs, lazy-loaded images, skeleton loaders, Toast notifications, Error Boundary, etc.

**`packages/shared`** — Code shared across all packages: TypeScript type definitions, constants (API routes, cache keys, navigation routes), and a safe `localStorage` abstraction with TTL expiry support.

---

## 🛠️ Tech stack

| Category | Technology | Purpose |
|----------|-----------|---------|
| **Frontend** | [React 19](https://react.dev/) | UI rendering |
| **Routing** | [React Router 7](https://reactrouter.com/) | Navigation between the three pages |
| **Bundler** | [Rsbuild](https://rsbuild.dev/) + Rspack | Ultra-fast Rust-based compilation |
| **Backend** | [Express](https://expressjs.com/) + TypeScript | BFF proxy server |
| **Styles** | CSS Modules | Scoped per-component styles |
| **Font** | `Helvetica, Arial, sans-serif` | Project typography |
| **Testing** | [Vitest](https://vitest.dev/) + [MSW](https://mswjs.io/) | Unit and integration tests |
| **Linter** | [Biome](https://biomejs.dev/) | Static analysis and code formatting |
| **Monorepo** | [Turborepo](https://turbo.build/) + [pnpm](https://pnpm.io/) | Package management and build caching |

---

## 💡 Design decisions

### 1. BFF (Backend-For-Frontend)
A Node.js intermediary server was added to avoid exposing the API key (`x-api-key`) in browser code. Every request goes through the BFF, which transparently adds authentication headers.

### 2. Cache with TTL expiry
The phone list and individual product details are stored in the browser's `localStorage` for 1 hour. This avoids unnecessary network requests when navigating between pages and improves perceived load speed.

### 3. Repository + Mapper pattern
The data access layer is abstracted using the Repository pattern. Raw API response data is always transformed through Mappers before reaching any component, making the code easier to test and maintain if the API changes in the future.

### 4. Persistent shopping cart
The cart state is stored in `localStorage` via React Context, so products are not lost when the page is refreshed or the browser is closed.

---

## 📁 Detailed frontend structure

```
apps/web/src/
├── features/
│   ├── phone-list/      → Listing page with search bar and grid
│   ├── phone-detail/    → Detail page with selectors and similar items
│   └── cart/            → Shopping cart page
├── shared/
│   ├── components/      → Header, NotFound (404), and other global components
│   ├── context/         → React Context for the cart (global state)
│   └── styles/          → Global styles and CSS variables
└── App.tsx              → Application route configuration
```
