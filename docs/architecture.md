# Software Architecture Document

## 1. Overview

The **Vehicle Management App** is a mobile application tailored for managing boarding houses (nhà trọ), rooms, and vehicles. Built with React Native and Expo, the system applies a modern and efficient tech stack to ensure high maintainability, performance, and strong separation of concerns.

## 2. Tech Stack

### Core Framework

- **Framework:** React Native + Expo (v54+)
- **Routing:** Expo Router (File-based routing)

### State Management & Data Fetching

- **Global State:** Zustand (coupled with AsyncStorage for persistence)
- **Server State / Caching:** `@tanstack/react-query`
- **Networking:** Axios

### Forms & Validation

- **Form Management:** React Hook Form
- **Schema Validation:** Zod

### UI & Styling

- **Styling:** Custom Themed Components & React Native StyleSheet
- **Theme Handling:** Dynamic color scheme switching (Light/Dark themes) using `useColorScheme` custom hook
- **Icons:** `@expo/vector-icons` (MaterialCommunityIcons, etc.)

## 3. Directory Structure

```text
/app             # Expo Router pages and layouts
  /(tabs)        # Bottom tab navigation (Home, Rooms, Scan, Notifications, Profile)
  /(house)       # House management screens (e.g. house forms, room list, vehicle lists)
  /(auth)        # Authentication screens
  /vehicles      # Standalone vehicle management screens
/components      # Reusable UI components
  /ui            # Base UI elements (ThemedButton, TextInput, ThemedView, Switch, etc.)
  /house         # House specific components
  /rooms         # Room specific components
  /scanner       # Camera and scanning related components
/store           # Zustand global state (house-store.ts, settings-store.ts)
/schema          # Zod validation schemas (room.schema.ts, house.schema.ts, auth.schema.ts)
/interfaces      # TypeScript type definitions (room.ts, house.ts, etc.)
/hooks           # Custom React hooks (useColorScheme.ts, usePushNotifications.ts)
/constants       # App constants, Theme colors (theme.ts)
```

## 4. Key Architectural Patterns

- **File-based Routing:** We use Expo Router. The folder structure in `app/` serves as the absolute source of truth for navigation.
- **Separation of State:**
  - _Client State:_ Managed synchronously with Zustand (e.g., currently selected house, UI toggles).
  - _Server State:_ Managed asynchronously with TanStack Query mapping directly to API endpoints via Axios.
- **Schema-First Validation:** `Zod` schemas dictate both compile-time Typescript types and runtime form validations. This approach prevents mismatching models between the frontend and the data expected by the API.
- **Custom Themed UI:** Instead of relying on a heavy UI component library (like NativeBase or UI Kitten), the app defines custom themed components (`ThemedView`, `ThemedText`, `ThemedButton`) that directly read from a central `Colors` constant. This guarantees minimal bundle size, complete design control, and flawless Light/Dark mode transitions.
