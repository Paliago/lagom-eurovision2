# LLM Instructions for Building Lagom Eurovision App

This document outlines the step-by-step tasks for an LLM to create the Lagom Eurovision React SPA with real-time synchronization.

## Frontend (React SPA)

- [x] **Task 1: Create Landing Page**

  - [x] Create a React component for the landing page.
  - [x] Display the title "Lagom Eurovision".
  - [x] Add an input field labeled "Room Name".
  - [x] Add an input field labeled "Nickname".
  - [x] Add a "Join/Create Room" button.

- [x] **Task 2: Implement Room Logic**

  - [x] On "Join/Create Room" button click:
    - [x] Get values from "Room Name" and "Nickname" inputs.
    - [x] **Backend Call:** Send room name and nickname to the backend.
      - [x] If room exists, join the room with the nickname.
      - [x] If room doesn't exist, create the room and add the user with the nickname.
    - [x] Navigate to the Contestant List page upon successful room entry.
  - [x] Store the current room name and user's nickname in the application state (e.g., React Context or a state management library).

- [x] **Task 3: Create Contestant List Page**

  - [x] Create a React component for the Contestant List page.
  - [x] Add the eurovision constestants.
  - [x] Display the list of contestants.
  - [x] Make each contestant clickable. Clicking a contestant should navigate to the Contestant Rating page for that contestant, passing the contestant ID.

- [x] **Task 4: Create Contestant Rating Page**

  - [x] Create a React component for the Contestant Rating page. It should receive a contestant ID as a parameter.
  - [x] Display the selected contestant's name/details (fetched based on ID from the mock list or backend).
  - [x] **Display Others' Average Ratings (Real-time):**
    - [x] Fetch and display the current average ratings from other users in the room for this contestant.
    - [x] Categories: "Music", "Performance", "Vibes".
    - [x] Display a "Total Average" ( (Music + Performance + Vibes) / 3, rounded to one decimal).
    - [x] These ratings should update in real-time as other users submit their ratings.
  - [x] **Current User's Rating Inputs:**
    - [x] Provide three number input fields for the current user to rate:
      - [x] "Music" (e.g., 1-10)
      - [x] "Performance" (e.g., 1-10)
      - [x] "Vibes" (e.g., 1-10)
    - [x] As the user types a number in any of these fields:
      - [x] **Backend Call:** Send the rating (category, value, contestant ID, user nickname, room name) to the backend immediately for real-time synchronization.
    - [x] Display the current user's calculated total for their own ratings ( (Music + Performance + Vibes) / 3, rounded to one decimal).
  - [x] **Navigation:**
    - [x] Add a "Previous Contestant" button.
    - [x] Add a "Next Contestant" button.
    - [x] These buttons should navigate to the rating page of the respective contestant in the list.
    - [x] Add a "Back to List" button to navigate to the Contestant List page.

- [x] **Task 5: Create Overview Page**

  - [x] Create a React component for the Overview page.
  - [x] **Backend Call:** Fetch data for all contestants and their overall average ratings (across all users in the room).
  - [x] Display a summary table or list:
    - [x] Contestant Name
    - [x] Average Music Rating
    - [x] Average Performance Rating
    - [x] Average Vibes Rating
    - [x] Overall Total Average Rating
  - [x] This page should also reflect real-time updates to ratings.
  - [x] Add navigation to this page (e.g., from a header or the contestant list page).

- [x] **Task 6: Basic Navigation/Routing**

  - [x] Implement client-side routing (e.g., using `react-router`).
    - [x] `/`: Landing Page
    - [x] `/room/:roomName/contestants`: Contestant List Page
    - [x] `/room/:roomName/contestant/:contestantId`: Contestant Rating Page
    - [x] `/room/:roomName/overview`: Overview Page

- [x] **Task 7: Styling and UI/UX**
  - [x] Apply basic styling to make the application presentable and user-friendly.
  - [x] Ensure clear visual feedback for actions and real-time updates.

## Backend (Convex)

All backend logic will be implemented using Convex. Remember to follow Convex best practices, including defining schemas in `convex/schema.ts` and using argument/return validators.

- [x] **Task B1: Room Management**

  - [x] **Schema (`convex/schema.ts`):** Define a `rooms` table using `defineTable`.
    - [x] Fields:
      - [x] `name`: `v.string()` (unique room identifier, consider indexing)
      - [x] `users`: `v.array(v.object({ nickname: v.string(), userId: v.string() }))` (or `v.array(v.string())` if just nicknames)
      - [ ] Consider adding `hostNickname: v.string()` if applicable.
  - [x] **Mutation (`convex/rooms.ts`):** Create a `joinOrCreateRoom` mutation.
    - [x] `args`: `{ roomName: v.string(), nickname: v.string() }`
    - [x] `returns`: `v.object({ roomId: v.id("rooms"), isNewRoom: v.boolean() })` or similar.
    - [x] Logic:
      - [x] Query for an existing room by `roomName` (use an index for efficiency).
      - [x] If room exists, add the `nickname` to its `users` array (ensure nickname uniqueness within a room if needed). Use `ctx.db.patch`.
      - [x] If room doesn't exist, create a new room using `ctx.db.insert` with `roomName` and the initial user.
      - [x] Return the room's `_id` and a flag indicating if it was newly created.

- [x] **Task B2: Contestant Data**

  - [x] For simplicity in this version, contestant data will be mocked on the frontend as initially planned.
  - [ ] _Future Enhancement (Optional Backend Storage):_
    - [ ] **Schema (`convex/schema.ts`):** Define a `contestants` table using `defineTable`.
      - Fields: `name: v.string()`, `song: v.string()`, `country: v.string()`, `eurovisionYear: v.number()` (if applicable).
    - [ ] **Query (`convex/contestants.ts`):** Create a `listContestants` query to fetch all contestants.
      - `args`: `{}`
      - `returns`: `v.array(v.object({ _id: v.id("contestants"), name: v.string(), ... }))`

- [x] **Task B3: Rating Storage and Real-time Sync**

  - [x] **Schema (`convex/schema.ts`):** Define a `ratings` table using `defineTable`.
    - [x] Fields:
      - [x] `roomId`: `v.id("rooms")` (indexed for querying by room)
      - [x] `contestantId`: `v.string()` (references the mocked ID on frontend, or `v.id("contestants")` if backend-stored)
      - [x] `userId`: `v.string()` (or `nickname`, ensure consistency with `rooms` table user identification)
      - [x] `musicScore`: `v.optional(v.number())`
      - [x] `performanceScore`: `v.optional(v.number())`
      - [x] `vibesScore`: `v.optional(v.number())`
    - [x] Consider creating a compound index on `[roomId, contestantId, userId]` for efficient updates/fetches of a specific user's rating for a specific contestant in a room.
  - [x] **Mutation (`convex/ratings.ts`):** Create a `submitRating` mutation.
    - [x] `args`: `{ roomId: v.id("rooms"), contestantId: v.string(), userId: v.string(), category: v.union(v.literal("music"), v.literal("performance"), v.literal("vibes")), score: v.number() }`
    - [x] `returns`: `v.null()`
    - [x] Logic:
      - [x] Find an existing rating document for the given `roomId`, `contestantId`, and `userId`.
      - [x] If exists, `patch` the document with the new score for the given `category`.
      - [x] If not, `insert` a new rating document.
  - [x] **Query (`convex/ratings.ts`):** Create a `getRatingsForRoomAndContestant` query.
    - [x] `args`: `{ roomId: v.id("rooms"), contestantId: v.string() }`
    - [x] `returns`: `v.array(v.object({ userId: v.string(), musicScore: v.optional(v.number()), ... }))`
    - [x] Logic: Query the `ratings` table, filtered by `roomId` and `contestantId` using an index.
  - [x] **Query (`convex/ratings.ts`):** Create a `getOverviewRatingsForRoom` query.
    - [x] `args`: `{ roomId: v.id("rooms") }`
    - [x] `returns`: `v.array(v.object({ contestantId: v.string(), avgMusic: v.optional(v.number()), ...totalAvg: v.optional(v.number()) }))` (structure to be decided based on aggregation needs)
    - [x] Logic: Query all ratings for the `roomId`. Aggregate scores per contestant. This might be complex to do directly in one query if heavy aggregation is needed; consider processing on the client or using multiple queries if simpler. Convex's reactivity will ensure data updates.

- [x] **Task B4: Real-time Setup**
  - [x] **Handled by Convex:** Convex's architecture provides real-time data synchronization automatically.
    - [x] When a `mutation` (e.g., `submitRating`, `joinOrCreateRoom`) modifies data in the database, any active client-side `query` (e.g., `getRatingsForRoomAndContestant`, `getOverviewRatingsForRoom`) that observes that data will automatically re-run.
    - [x] The React hooks (`useQuery`) will then provide the updated data to the relevant components, causing them to re-render.
    - [x] No manual WebSocket or subscription management is typically needed for this core real-time functionality.

## General Considerations

- [x] **Error Handling:** Implement basic error handling on both frontend and backend (e.g., room not found, failed to submit rating). On the backend, Convex functions can throw errors which can be caught on the client.
- [x] **State Management (Frontend):** Choose and implement a suitable state management solution for React (e.g., Context API, Zustand, Redux Toolkit) if component drilling becomes complex. Convex's `useQuery` can often simplify state management for server data.
- [x] **Component Reusability:** Create reusable components where appropriate (e.g., input fields, buttons, rating display elements).
- [x] **Convex Setup:**
  - [x] Initialize Convex in the project: `npx convex dev`. This creates the `convex/` directory and `convex.json`.
  - [x] Define all database schemas in `convex/schema.ts`.
  - [x] Backend functions (queries and mutations) will reside in `.ts` files within the `convex/` directory (e.g., `convex/rooms.ts`, `convex/ratings.ts`).
  - [x] Use `v` from `convex/values` for all argument and return type validations in Convex functions.
  - [x] Utilize `api` from `convex/_generated/api.js` on the client-side (via `useQuery`, `useMutation` from `convex/react`) to call backend functions.
  - [x] Ensure `VITE_CONVEX_URL` (or `NEXT_PUBLIC_CONVEX_URL`) is set up in the frontend environment variables.

## Future Enhancements / To-Do (from todo.md)

- [x] add the ability to see the overall score for all rooms on a contestant
- [ ] fix the line break issue on the contestant list
- [x] add the contestant order to the rating page
- [x] add the ability to go around from the first to the last contestant and vice versa
- [x] make the header nicer
  - [x] make the overview button not have text
  - [x] room name in the center
  - [x] move the nickname to the right and add the users animal emoji
- [x] make the emojis on the rating page bigger
- [x] remove unused or rather redundant tailwind classes in the project (from components that already apply similar or the same ones)
