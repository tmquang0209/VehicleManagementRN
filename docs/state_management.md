# State Management Architecture

The project splits state into **Client State** (Global App Variables) and **Server State** (Data from API/Backend), processing each using an optimized tool approach.

## 1. Global Client State (Zustand)

Global UI state (themes, selected entities such as current active House) and non-volatile app configurations are maintained using **Zustand**.

### Implementation Details:

- **Location:** `/store` folder (e.g., `house-store.ts`, `settings-store.ts`)
- **Persistence:** Zustand stores rely on the `persist` middleware wrapping `@react-native-async-storage/async-storage`. This allows settings and specific session context to survive app restarts.
- **Design Pattern:** Stores are strictly typed using standard TypeScript interfaces. They export a custom hook (e.g., `useHouseStore`) that components directly call to read reactive variables or exact state modifying actions (`set`, `get`).

### Example (House Store Reference):

The `useHouseStore` sets and gets the currently selected House across the app, ensuring that when the user switches Houses, the entire application dynamically updates without passing props deeply.

## 2. Server State & Data Caching (React Query + Axios)

Data meant to be fetched, mutated, or polled from backend APIS lives under **TanStack React Query**.

### Implementation Details:

- **Provider Setup:** The `QueryClientProvider` is injected globally at the root layout (`app/_layout.tsx`).
- **Networking Utility:** `axios` operates as the data transport layer to handle network requests.
- **Beneficial Features Utilized:**
  - Automatic caching & deduping of requests.
  - Background data refetching ensuring screens remain fresh when focused.
  - Mutation handlers mapped to components providing fast optical rollbacks or success toasts (via `toastify-react-native`).

## 3. Local Component State & Form State

- **UI Ephemeral State:** `useState` / `useReducer` from React are exclusively reserved for localized toggles (e.g. `isModalVisible`, `isExpanded`).
- **Form State:** `react-hook-form` controls text inputs avoiding excessive re-renders during text typing. Forms strictly adhere to schemas mapped in `/schema` parsed using `zodResolver`.
