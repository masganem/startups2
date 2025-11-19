## End-to-end plan for the mobile-first Vite + React demo app

### 1. Environment & toolchain bootstrap
1. `npm create vite@latest startups2 -- --template react-swc-typescript`.
2. Install UI + tooling deps:
   - Component system: `@radix-ui/themes`, `@radix-ui/react-icons` for accessible primitives; `tailwindcss` + `clsx` for utility styling and responsive spacing (Radix integrates nicely with Tailwind).
   - State/query helpers: `@tanstack/react-query`, `zustand` (or lightweight context) for UI state toggle.
   - Router: `react-router-dom`.
   - Form helpers: `react-hook-form`, `zod` for schema/resolver.
   - Media upload stub: use `browser-image-compression` mock or simple FileReader util.
3. Configure Tailwind (`npx tailwindcss init -p`), include Radix + custom theme tokens in `tailwind.config.js`, set up `src/styles/index.css` with Tailwind base & CSS variables for theme.
4. Add linting (ESLint + React hooks) and optional Prettier config for consistent formatting.

### 2. Project structure
```
src/
  main.tsx                      // bootstraps Router + QueryClient + Radix provider
  App.tsx                       // defines route tree + global layout
  styles/                       // tailwind + theme tokens
  assets/                       // logos/placeholders
  data/                         // mock data + generators
  services/                     // mock API + query keys
  store/                        // zustand slices or contexts
  components/                   // shared UI primitives
  modules/
    auth/
    search/
    company/
    report/
  utils/                        // helpers (formatting, device info, delays)
  types/                        // TypeScript interfaces shared across modules
```

### 3. Domain modeling & mock data
1. Define TypeScript interfaces in `types/`:
   - `User`, `Company`, `Service`, `BugReport`, `DeviceInfo`.
2. Build `data/mockData.ts` exporting:
   - Static current user.
   - Array of companies; each with nested services and bug reports (generate >30 entries to enable infinite scroll).
3. Provide helper functions in `data/generators.ts`:
   - `generateCompanies(count)` with random metrics + logos from placeholder set.
   - `generateBugReports(companyId, serviceId, count)`.
4. Create `services/mockApi.ts` exposing async functions that mimic latency:
   - `fetchCompanies({ cursor, limit })`, `fetchCompanyById(id)`, `fetchBugReports({ serviceId, cursor, limit })`, `submitBugReport(payload)`, `endorseBugReport(reportId, file)`.
   - Each returns `Promise` resolved after `delay(ms)` util.
5. Define query keys in `services/queryKeys.ts`.

### 4. Global providers & infrastructure
1. `main.tsx`: setup `QueryClientProvider`, `RouterProvider`, `RadixProvider`, `ThemeProvider`, `DeviceContext` (if needed), wrap `<App />`.
2. `App.tsx`: layout skeleton with top status bar (user avatar, title) and `<Outlet />`.
3. `store/uiStore.ts` (Zustand or Context) for light state:
   - `selectedService`, `deviceInfo`, `recentUploads`, `modalState`.
4. Hooks:
   - `useDeviceInfo`: reads `navigator` APIs, mock fallback; exposes `refresh()` to override.
   - `useInfiniteCompanies`, `useInfiniteBugReports`: wrappers around `react-query` infinite queries hitting mock API.
   - `useBugReportForm`: wraps `react-hook-form` with schema + default values computed from context.

### 5. Shared components library (`components/`)
1. `Layout/HeaderBar.tsx`: displays current user, login toggle CTA, global nav icon.
2. `Layout/PageShell.tsx`: handles responsive padding, background, scroll container.
3. `Logo.tsx`, `CompanyMetric.tsx`, `InfiniteList.tsx` (virtualized scroll), `StatPill.tsx`.
4. `Buttons/IconButton.tsx`, `Buttons/PrimaryButton.tsx`, `Buttons/SecondaryButton.tsx`, `FloatingCTA.tsx`.
5. `Cards/CompanyCard.tsx`: show logo, name, metrics, `Report` icon button.
6. `Cards/BugReportCard.tsx`: show title, truncated description, device badge, endorse button, attachments indicator.
7. `Form/InputField.tsx`, `Form/TextArea.tsx`, `Form/DatePicker.tsx` (Radix primitive), `Form/FileUploader.tsx`.
8. `Feedback/Toast.tsx` hooking into Radix Toast for form submissions.

### 6. Routing & screen modules

#### Start Screen (`modules/auth/`)
1. Route `/` shows `StartScreen`.
2. Components:
   - `IntroHero`: big hero text, mock login button (`PrimaryButton`) + secondary "log in as company".
   - `LoginActions`: sets `userRole` in store (keeping default user) and navigates to `/search`.
3. Functions:
   - `handleMockLogin`: updates store, triggers toast, `navigate('/search')`.

#### Search Screen (`modules/search/`)
1. Route `/search`.
2. Layout:
   - `SearchBar` component with controlled input, optional filter chips.
   - `CompanyFeed`: uses `useInfiniteCompanies` to show scroll list of `CompanyCard`.
3. Logic:
   - `handleSearchChange(term)`: updates local state, debounces call to `mockApi.fetchCompanies`.
   - `onReportClick(companyId, defaultServiceId)`: store `selectedService`, `navigate('/report', { state })`.
   - `onCompanySelect(companyId)`: navigate to `/company/:id`.
4. Visual detail: apply skeleton loaders while data fetching; include "scroll sentinel" that calls `fetchNextPage`.

#### Company Screen (`modules/company/`)
1. Route `/company/:companyId`.
2. Data:
   - Query company info via `useQuery(['company', id], fetchCompanyById)`.
   - Query bug reports per service via `useInfiniteBugReports`.
3. Sections:
   - `CompanyHeader`: logo, name, total metrics (use `CompanyMetric`).
   - `BountyStats`: cards for total + last month; `BugStats` for counts.
   - `CallToAction`: `FloatingCTA` to report bug, using default `selectedService`.
   - `BugReportsList`: infinite list of `BugReportCard` with endorse icon.
4. Logic functions:
   - `handleReportCTA(serviceId?)`: update store and navigate to `/report`.
   - `handleEndorse(reportId)`: open file picker via hidden input → call `mockApi.endorseBugReport`.
   - `formatCurrency`, `formatDate` from utils.

#### Report Bug Screen (`modules/report/`)
1. Route `/report`.
2. Data:
   - Prefill `service` from location state or store's `selectedService`.
   - Use `useDeviceInfo` for default device fields.
3. Form:
   - Fields: service display pill, title input, description textarea, date picker (default `new Date()`), device info editable fields (OS, browser, version, locale), upload section for screenshots (drag-drop or simple file input).
   - Use `react-hook-form` with `zodResolver`.
4. Submission flow:
   - `onSubmit(values)`: call `mockApi.submitBugReport`, invalidate `['bugReports', serviceId]`, show Toast, redirect to `/company/:companyId`.
   - Show inline validation messages.
   - Provide `AutoFillDevice` button to re-fetch device info.

### 7. Utilities (`utils/`)
1. `formatters.ts`: currency, number, date.
2. `async.ts`: `delay(ms)`, `paginate(array, cursor, limit)`.
3. `device.ts`: reads user agent, returns `DeviceInfo`.
4. `storage.ts`: optional localStorage helpers for persisting last selected service.

### 8. Styling system
1. Tailwind config:
   - Define color palette consistent with Radix brand tokens.
   - Set breakpoints focusing on mobile-first, with `sm` for >640px.
2. Create `styles/globals.css` importing Tailwind layers, define CSS vars for fonts, background gradient.
3. Use `radixThemes` provider for baseline typography.

### 9. Testing & quality gates
1. Lightweight tests using `vitest` + `@testing-library/react`:
   - Render `CompanyCard` with props, assert metrics displayed.
   - `useDeviceInfo` hook returns fallback when navigator absent.
   - `mockApi.fetchCompanies` paginates correctly.
2. Manual QA checklist:
   - Verify navigation flow across all screens.
   - Validate infinite scroll loads additional data.
   - Submit bug form and see toast & navigation back to company page.

### 10. Delivery checklist
1. `README` summarizing setup, scripts, component libs.
2. Ensure `npm run dev`, `npm run build`, `npm run test` succeed.
