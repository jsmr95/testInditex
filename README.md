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

Make sure you have the following tools installed before you start. The project will not run correctly with older versions.

| Tool | Minimum version | Why it's needed | Download |
|------|-----------------|-----------------|----------|
| **Node.js** | 18.12.0 or higher | JavaScript runtime required to execute both the frontend and the BFF server | [nodejs.org](https://nodejs.org) |
| **pnpm** | 9.0.0 or higher | Fast, disk-efficient package manager that handles the monorepo workspace | `npm install -g pnpm` |

> 💡 **Tip:** If you use [nvm](https://github.com/nvm-sh/nvm), the project includes an `.nvmrc` file. Run `nvm use` in the root and it will switch to the correct Node.js version automatically.

### Steps

```bash
# 1. Clone the repository and enter the project directory
git clone <repository-url>
cd <folder-name>

# 2. Install all dependencies for every package in the monorepo.
#    pnpm resolves the workspace packages defined in pnpm-workspace.yaml
#    and links them together locally, so changes in one package are
#    immediately visible to others without republishing.
pnpm install

# 3. Start the application in development mode.
#    This command uses Turborepo to run the `dev` script in all packages
#    that define one (apps/web and apps/bff) in parallel.
#
#    • apps/web  → Rsbuild dev server on http://localhost:3000 (React UI)
#    • apps/bff  → Express proxy server on http://localhost:3001 (API bridge)
#
#    Both processes must be running simultaneously for the app to work.
pnpm dev
```

Open your browser at **http://localhost:3000** and the app will be ready. ✅

> **Note:** The `pnpm dev` command starts both the frontend (port `3000`) and the proxy server (port `3001`) simultaneously. The frontend proxies all `/api/*` requests to the BFF, which adds the required `x-api-key` header before forwarding them to the external Zara API. If the BFF is not running, the app will show network errors.

---

## 🏭 Build for production

The production build compiles and optimises all packages in the correct dependency order, managed by Turborepo.

```bash
# Build all packages and apps for production.
#
# Turborepo resolves the build graph automatically:
#   1. Shared packages (config, shared, ui, api-client) are built first.
#   2. apps/bff and apps/web are built afterwards, consuming the compiled packages.
#
# Output artifacts are placed in each package's `dist/` folder.
# Turborepo also caches build results locally — if nothing has changed,
# subsequent builds complete in milliseconds by replaying the cache.
pnpm build
```

After building, you can preview the production frontend locally:

```bash
# Serve the compiled frontend bundle (apps/web/dist) with a static server.
# This is useful to verify the production build behaves the same as dev.
npx serve apps/web/dist
```

To run the BFF in production mode alongside it:

```bash
# Run the compiled BFF server (Node.js, no live-reload).
# Make sure the API key environment variable is set before starting.
node apps/bff/dist/index.js
```

> **Note:** For a real deployment you would use a process manager (e.g. PM2) or containerise both processes with Docker. The above commands are for local production verification only.

---

## 🧪 Tests & code quality

```bash
# Run the full test suite across all packages.
# Turborepo builds dependent packages first, then runs Vitest in each
# package that has tests. Results are printed per-package.
pnpm test

# Run tests and generate a coverage report.
# The HTML report is saved to each package's coverage/ folder.
pnpm test:coverage

# Type-check every package with the TypeScript compiler (tsc --noEmit).
# No files are emitted — this is a pure type validation pass.
# Run this before pushing to catch type errors that tests might miss.
pnpm check

# Lint the codebase with Biome.
# Biome checks for style issues, unused imports, and potential bugs
# using the rules configured in biome.json at the root.
pnpm lint

# Auto-format all source files with Biome.
# The `--write` flag applies the formatting changes in place.
pnpm format

# Verify formatting without modifying files (useful in CI).
pnpm format:check

# Delete all build artifacts (dist/) and the node_modules folder.
# Run this if you hit stale cache issues or want a completely clean slate.
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

### 5. Feature Flags
A lightweight feature flag system was implemented in `apps/web/src/config/feature-flags.ts`. It exposes a `FeatureFlagProvider` interface intentionally compatible with [GrowthBook](https://www.growthbook.io/), the industry-standard open-source feature management platform, so the internal implementation (`SimpleFeatureFlagProvider`) can be swapped out for a real remote service in the future with zero component changes.

All flags are injected into the React tree through `ConfigContext` and consumed via the `useConfig()` hook, keeping components fully decoupled from the flag source.

Flags currently defined:

| Flag | Default | Description |
|------|---------|-------------|
| `show-similar-products` | ✅ `true` | Renders the "Similar items" carousel on the product detail page |
| `enable-dark-mode` | ❌ `false` | Reserved for future dark theme support (toggler already wired in `ConfigContext`) |
| `enable-quick-buy` | ❌ `false` | Reserved for a future one-click add-to-cart interaction |

> **How to enable a flag locally:** pass custom flags to `SimpleFeatureFlagProvider` in `ConfigContext.tsx`, or swap the provider for one backed by environment variables / a remote service.

---

## 📁 Detailed frontend structure

```
apps/web/src/
├── config/
│   ├── env.ts           → Environment variable resolution (BFF URL, dev mode)
│   └── feature-flags.ts → FeatureFlagProvider interface + SimpleFeatureFlagProvider
├── core/
│   ├── context/
│   │   ├── cart/        → CartContext + cartReducer (global cart state)
│   │   └── config/      → ConfigContext: exposes featureFlags + theme via useConfig()
│   └── services/
│       └── service-registry.ts → DI container: HttpClient, Repository, Service singletons
├── features/
│   ├── phone-list/      → Listing page with search bar and grid
│   ├── phone-detail/    → Detail page with selectors and similar items
│   └── cart/            → Shopping cart page
├── shared/
│   ├── components/      → Header, NotFound (404), and other global components
│   └── styles/          → Global styles and CSS variables
└── App.tsx              → Application route configuration
```
