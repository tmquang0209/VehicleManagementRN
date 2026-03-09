# Data Models & Schemas

The application ensures consistency across UI elements, Forms, and Server interaction by adhering to **Schema-First Design**.

## 1. Schema Definition (Zod)

The source of validation truth is located inside the `/schema` directory using **Zod**.

### Core Schemas:

- **`house.schema.ts`**: Verifies attributes representing a boarding house (Name, Address, Location parameters).
- **`room.schema.ts`**: Validates Room characteristics including Floor number, Base Price, Area metrics, and Occupancy Status (`empty`, `occupied`, `maintenance`).
- **`vehicle.schema.ts`**: Evaluates Vehicle identifiers, specifically license plates read either manually or via OCR scanning.
- **`auth.schema.ts`**: Handled authentication login, registration strings formatting.

These defined schemas enforce requirements (e.g., minimum characters, mandatory numerics) returning pre-determined, localized Vietnamese error strings to automatically populate UI errors.

## 2. TypeScript Interfaces

The `/interfaces` directory serves strict data models aligning directly to API responses or persistent storage mechanisms.

### Core Interfaces:

- **House Interface:** Defines identity parameters (ID, Name, Total Rooms, Occupied Rooms, Registered Vehicles).
- **Room Interface:** Specifies room instances tracking its linked standard schema elements along alongside unique system UUIDs.

## 3. Practical Usage Map

1. Form user invokes action.
2. `useForm({ resolver: zodResolver(EntitySchema) })` catches discrepancies directly.
3. Only upon successful structural format validation, `react-hook-form` fires the submit handler sending fully-typed data to an API service (`React Query` hook).
4. Data updates the backend logic.
5. On fetch, `axios` resolves and casts data precisely back to its mapped interface (`schemas/interfaces`).
