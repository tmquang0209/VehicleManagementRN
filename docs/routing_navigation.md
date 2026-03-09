# Routing & Navigation Architecture

Navigation fundamentally relies on **Expo Router** which adopts a file-system based routing approach modeled similarly to Next.js.

## 1. Layout Structure

- **Root Layout (`app/_layout.tsx`):**
  Wraps the entire application with necessary context providers (`QueryClientProvider`, `ThemeProvider`, `GestureHandlerRootView`) and defines the outer `<Stack>`. Also handles the hiding of the custom splash screen when initial loading procedures finish.
- **Tab Layout (`app/(tabs)/_layout.tsx`):**
  Determines the core navigation of the application (Bottom Tabs). Shows screens such as "Trang chủ" (Home), "Phòng" (Rooms), Notifications, and User Profiles.
- **Nested Groups (e.g. `app/(house)` or `app/(auth)`):**
  Directories wrapped in parentheses act as logical groupings and do not explicitly alter the URL path string. Components inside `(house)` handle isolated flows like House details, Room additions, and related entity management.

## 2. Specialized Routing Patterns

- **Floating/Action Tabs:**
  In the `Tabs` layout, a dummy tab route is used to intercept routing allowing the implementation of a floating central button (e.g. `Quét mã` - Scan Button).
- **Modals and Overlays:**
  Presentational pages requiring modal appearance use Expo Router's `<Stack.Screen options={{ presentation: 'modal' }} />`.

## 3. Best Practices for Modifying Routes

- **File Names = Route Paths:** Create new `.tsx` files in the exact layout directory corresponding to the required deep link or route map.
- **Typed Routes:** Expo Router handles type generation for routes implicitly allowing `useRouter().push('/path')` to maintain strict types constraints.
