# Learnings for Lagom Eurovision App Development

This document records key architectural decisions, tool configurations, common patterns, and user clarifications encountered during the development of the Lagom Eurovision application.

## Project Setup & Tooling

- **Package Manager**: `bun` is used for package management and running scripts (as per general project instructions).
- **Frontend**: React with Vite.
- **Backend**: Convex.
- **Routing**: `react-router` v7+ (specifically 7.6.0 confirmed by user). Imports like `BrowserRouter`, `Routes`, `Route`, `Link`, `useNavigate`, `useParams` are directly from the `react-router` package.
- **Styling**: `tailwindcss` is the primary styling solution. Utility classes have been applied to all main page components (`LandingPage`, `ContestantListPage`, `ContestantRatingPage`, `OverviewPage`) for layout, typography, form elements, buttons, and basic card/table structures. An `index.css` file exists, which should contain Tailwind directives.
- **Linting**: ESLint is active. Key preferences observed:
  - Use `Number.isNaN()` instead of global `isNaN()`.
  - Use `Number.parseInt()` and `Number.parseFloat()` instead of global equivalents.
  - Handle promises in event handlers carefully (e.g., by wrapping async calls in `void` or another function: `onClick={() => { void handleAsync(); }}`).
  - Avoid non-null assertions (`!`) where possible; provide explicit checks.
  - Hook dependency arrays are strictly checked; deviations require justification (e.g., `useEffect` in `ContestantRatingPage.tsx` with `[contestantId]` was deemed correct despite linter warning).

## Convex Specifics

- **Schema**: Defined in `convex/schema.ts`. Includes `rooms` and `ratings` tables with appropriate fields and indexes.
- **Functions**: Mutations and queries are located in separate `.ts` files within the `convex/` directory.
  - `convex/rooms.ts`:
    - `joinOrCreateRoom`: Handles user joining or creating a room.
  - `convex/ratings.ts`:
    - `submitRating`: Upserts a user's rating for a contestant category.
    - `getRatingsForRoomAndContestant`: Fetches all ratings for a specific contestant in a room.
    - `getOverviewRatingsForRoom`: Fetches all ratings for a room and aggregates them per contestant (calculates averages).
    - `getUserRatingForContestant`: Fetches a specific user's rating (if any) for a contestant in a room. Used to populate user's own score inputs.
- **ID Fields**: Use `v.id("tableName")` for schema fields that reference IDs from other tables. Client-side, these IDs are typically strings, which Convex handles correctly if they are valid `Id` representations.
- **ESLint & Convex Files**: An ESLint parsing error has been noted for files in the `convex/` directory, related to `tsconfig.json` project inclusion. This may require running `npx convex dev` (which has been done) or specific ESLint configuration updates. This should be re-checked. The user has accepted that this is an ongoing issue for now.

## Application Structure & Logic Highlights

- **Guiding Document**: `LLM_INSTRUCTIONS.md` serves as the primary task list.
- **Page Components (`src/pages/`)**:
  - `LandingPage.tsx`:
    - Collects `roomName` and `nickname`.
    - Generates/retrieves temporary `userId` (from `localStorage`).
    - Calls `joinOrCreateRoom` Convex mutation.
    - Stores `eurovisionUserId`, `eurovisionNickname`, and `eurovisionRoomId` (the actual Convex `Id` as a string) in `localStorage`.
    - Navigates to `/room/:roomName/contestants`.
    - Styled with Tailwind CSS for a centered form layout.
  - `ContestantListPage.tsx`:
    - Displays a list of mock contestants (defined in the same file).
    - Retrieves `roomName` from URL parameters; `nickname` from `localStorage`.
    - Navigates to `/room/:roomName/contestant/:contestantId`.
    - Exports mock data utility functions: `getMockContestantById`, `getNextContestantId`, `getPreviousContestantId`.
    - Styled with Tailwind CSS for a clean list presentation with clickable items.
  - `ContestantRatingPage.tsx`:
    - Retrieves `roomName`, `contestantId` from URL; `userId`, `storedRoomId`, `nickname` from `localStorage`.
    - Uses mock data functions for contestant details.
    - Allows user to input ratings (Music, Performance, Vibes), calls `submitRating` Convex mutation on change.
    - Uses `useQuery` with `api.ratings.getUserRatingForContestant` to fetch the current user's own ratings for the displayed contestant.
    - Uses `useQuery` with `api.ratings.getRatingsForRoomAndContestant` to fetch other users' ratings for calculating room averages.
    - Calculates and displays average ratings from others using `useMemo`.
    - `useEffect` pre-fills current user's scores using data from `api.ratings.getUserRatingForContestant`.
    - `useEffect` with `[contestantId]` dependency clears scores on contestant navigation.
    - Provides navigation to Previous/Next contestant and Back to List.
    - Styled with Tailwind CSS using a two-card layout for ratings and styled inputs/buttons.
  - `OverviewPage.tsx`:
    - Retrieves `roomName` from URL; `storedRoomId` from `localStorage`.
    - Uses `useQuery` with `api.ratings.getOverviewRatingsForRoom` to fetch aggregated room data.
    - Displays a table of contestants with their average Music, Performance, Vibes, and Overall scores, plus number of raters.
    - Uses `getMockContestantById` to display contestant names.
    - Styled with Tailwind CSS for a responsive table and centered action buttons.
- **Routing (`App.tsx`)**: Defines routes for all pages using `react-router`.
- **Setup (`main.tsx`)**:
  - Initializes `ConvexReactClient`.
  - Wraps `App` with `ConvexProvider` and `BrowserRouter`.
- **Styling Approach**: Tailwind CSS utility classes applied directly in components for styling. Reusable Tailwind classes for buttons/inputs defined as constants within components (e.g., `inputBaseClasses` in `ContestantRatingPage.tsx`, `primaryButtonClasses`, `secondaryButtonClasses` in `ContestantListPage.tsx` and `OverviewPage.tsx`) for consistency.
- **Linter Compliance**: Adherence to ESLint rules, with reasoned acceptance of some specific hook dependency warnings when functionally correct (e.g., `useEffect` with `[contestantId]` in `ContestantRatingPage.tsx`).

## Frontend Patterns & Decisions

- **User & Room Identification**: `userId` (temporary client-generated), `nickname`, and `roomId` (actual Convex ID) are stored in `localStorage` for session persistence and use across components.
- **Data Fetching**: Convex `useQuery` for real-time data from the backend. `"skip"` option used in `useQuery` if required parameters are not yet available.
- **Data Transformation**: `useMemo` used in `ContestantRatingPage.tsx` to calculate derived data (others' average ratings) efficiently.
- **Mock Data**: Contestant details are currently hardcoded in `ContestantListPage.tsx` and accessed via exported functions.
- **Styling Approach**: Tailwind CSS utility classes applied directly in components for styling. Reusable Tailwind classes for buttons/inputs defined as constants within components (e.g., `inputBaseClasses` in `ContestantRatingPage.tsx`, `primaryButtonClasses`, `secondaryButtonClasses` in `ContestantListPage.tsx` and `OverviewPage.tsx`) for consistency.
- **Linter Compliance**: Adherence to ESLint rules, with reasoned acceptance of some specific hook dependency warnings when functionally correct (e.g., `useEffect` with `[contestantId]` in `ContestantRatingPage.tsx`).

## User Clarifications

- **`react-router` Version**: User specified `react-router` v7.6.0 is in use; `react-router-dom` package is not separate/needed.
- **Development Workflow**:
  - **Running the Application**: The `dev` script in `package.json` (`npm-run-all --parallel dev:frontend dev:backend`) is used to run both the Vite frontend and Convex backend concurrently. The command to execute this is `bun run dev`.
  - **File Cleanup**: Unused files, such as the initial `convex/myFunctions.ts`, have been removed.

## Styling Updates & Fixes

- **Input Text Color**: Added `text-gray-900` to input fields (e.g., in `LandingPage.tsx`, `ContestantRatingPage.tsx`) to ensure text is visible against light backgrounds. `placeholder-gray-400` was also added for consistency in placeholders.
- **Button Standardization**: Common button styles (e.g., `primaryButtonClasses`, `secondaryButtonClasses`) have been defined as constants in relevant components (e.g., `ContestantListPage.tsx`, `OverviewPage.tsx`) and applied for greater visual consistency across the application.

## Convex Query Design and Client-Side Data Handling

- **Match Query Return Structure to Client Expectation**: Ensure that what a Convex query returns (especially aggregate queries vs. lists of raw documents) matches what the client-side code (`useQuery` hook consumers) expects. A mismatch here can lead to client-side calculations being performed on incorrectly structured data or trying to iterate over a single aggregate object.
- **`returns` Validators are Crucial**: Always define a `returns` validator for every Convex query and mutation. This provides type safety, enables better type inference in the client, and helps catch mismatches between backend and frontend data structures early. Without it, `useQuery` might infer `any` or `unknown`, leading to type assertions and potential runtime errors. When a query returns aggregated data, the `returns` validator should describe that aggregate object, not the individual documents that were aggregated.

## Bug Fixes & Refinements

- **Incorrect User Data Display on Joining Empty Room**: Resolved an issue where a new user joining an existing, but currently empty, room might see the creator's ID and ratings in their input fields. This was fixed by:
  - Adding a new Convex query `getUserRatingForContestant` that fetches ratings specifically for the current `userId`, `roomId`, and `contestantId`.
  - Updating `ContestantRatingPage.tsx` to use this dedicated query for populating the user's score input fields, ensuring only their own data (or empty fields if no prior rating) is displayed.
