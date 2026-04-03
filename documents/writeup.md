# Recipe App — Project Writeup

---

## Overview

The Recipe App is a single-page React application that lets users browse, search, add, edit, and delete personal recipes. It was built as part of a Full-Stack Web Development Bootcamp curriculum to practice integrating a React frontend with a lightweight REST-style backend (JSON Server).

---

## Goals

- Apply React fundamentals — components, props, state, and hooks — in a real-world project
- Use client-side routing to simulate a multi-page experience
- Persist data to a local JSON database via API calls instead of browser storage
- Practice component reuse, custom hooks, and the Context API for shared application state
- Build a responsive, clean UI using vanilla CSS variables and layout patterns

---

## Architecture

The app is split into three concerns:

**Data Layer**

- `db.json` serves as the database, managed at runtime by JSON Server on port 3002
- `src/services/recipesApi.js` is a thin API client that handles all `fetch` calls (GET, POST, PUT, DELETE) and centralises error messaging
- `src/hooks/useRecipes.js` exposes a React Context + custom hook pattern (`RecipesProvider` / `useRecipes`) that loads recipes on mount, broadcasts them to every page, and provides add, edit, and remove actions — keeping all async logic out of page components

**Routing**

- `react-router-dom` v7 handles navigation via a nested route structure defined in `App.jsx`
- A shared `Layout` component renders the persistent header and navigation, with `<Outlet />` rendering the active page
- Four routes are registered: Home (`/`), Add Recipe (`/add`), Browse Recipes (`/recipes`), and Recipe Detail (`/recipes/:id`)
- Unknown paths redirect to Home

**UI Components and Pages**
| File | Purpose |
|---|---|
| `Layout.jsx` | Persistent branded header with active-aware navigation links |
| `RecipeCard.jsx` | Summary card shown in the browse grid; links to detail |
| `RecipeForm.jsx` | Controlled form shared by both Add and Edit flows; accepts `initialData` to pre-populate fields on edit |
| `Home.jsx` | Hero panel with CTAs and a featured recipe preview |
| `AddRecipe.jsx` | Wraps `RecipeForm`, calls `addRecipe` from hook, redirects to new recipe's detail page on success |
| `BrowseRecipes.jsx` | Search input + category dropdown filter; filters live against name, ingredients, and category |
| `RecipeDetail.jsx` | Loads recipe by route id, shows full ingredients/instructions, and provides Edit and Delete actions inline |

---

## Key Decisions

**JSON Server as the backend**
JSON Server was chosen because it behaves like a real REST API (supporting GET, POST, PUT, DELETE) while requiring zero backend code. `db.json` doubles as both the schema definition and the seed data file.

**Context API over Redux**
The data requirements are straightforward — a list of recipes and four operations on it. The Context API with `useCallback`/`useMemo` memoization provides enough structure without the overhead of a full state management library.

**Shared RecipeForm for add and edit**
Rather than duplicating form markup, `RecipeForm` accepts an optional `initialData` prop. When provided, it converts stored array fields (ingredients, instructions) back into newline-separated strings so the textarea is pre-populated. This keeps the add and edit experiences consistent with a single component to maintain.

**Port 3002 for JSON Server**
Port 3001 (the JSON Server default) may conflict with other development tools, so 3002 is used as a project convention. The port is centralised in `recipesApi.js` and the `npm run server` script so it only needs to change in one place.

---

## Features

- **Browse recipes** — responsive card grid showing category, name, description, key ingredients, and total time
- **Search** — live text filter across recipe name, ingredients, and category
- **Category filter** — dropdown that narrows the browse view to one meal type
- **Add recipe** — form with validation for name, category, description, prep/cook time, servings, ingredients, and instructions
- **Recipe detail** — full ingredient list and numbered instructions; shows prep, cook, and serving metadata
- **Edit recipe** — inline edit mode on the detail page, pre-populated from existing data
- **Delete recipe** — confirmation prompt before removing a recipe from the database
- **Empty states** — clear messaging and recovery links when no recipes match a search or a detail id is not found
- **Seeded data** — one sample recipe (`Lemon Herb Chickpea Bowl`) is included in `db.json` so the app is useful on first run

---

## Folder Structure

```
recipe-app/
├── db.json                   # JSON Server database and seed data
├── package.json              # Dependencies and npm scripts
├── documents/
│   ├── writeup.md            # This file — project narrative and design notes
│   └── source-code.md        # Annotated source code reference
└── src/
    ├── App.jsx               # Route map
    ├── main.jsx              # React root — wraps app with BrowserRouter and RecipesProvider
    ├── index.css             # Global theme variables, typography, body background
    ├── App.css               # All component and layout styles
    ├── data/
    │   └── recipeSeed.js     # Category list and empty form constants
    ├── services/
    │   └── recipesApi.js     # Fetch-based API client for JSON Server
    ├── hooks/
    │   └── useRecipes.js     # RecipesProvider context + useRecipes hook
    ├── components/
    │   ├── Layout.jsx        # Shell, header, and navigation
    │   ├── RecipeCard.jsx    # Browse-grid card
    │   └── RecipeForm.jsx    # Shared add/edit form
    └── pages/
        ├── Home.jsx          # Landing page
        ├── AddRecipe.jsx     # Add recipe page
        ├── BrowseRecipes.jsx # Browse and search page
        └── RecipeDetail.jsx  # Detail, edit, and delete page
```

---

## How to Run

1. Clone or download the repository
2. Install dependencies:
   ```
   npm install
   ```
3. Start JSON Server (API on port 3002):
   ```
   npm run server
   ```
4. In a separate terminal, start the Vite dev server:
   ```
   npm run dev
   ```
5. Open the URL shown in the terminal (e.g. `http://localhost:5173`)

---

## Skills Demonstrated

- React 19 with functional components, hooks, and Context API
- Client-side routing with React Router v7
- Async data fetching with the native Fetch API and proper loading/error state
- CRUD operations (Create, Read, Update, Delete) against a REST-style API
- Controlled forms, client-side validation, and reusable form components
- Custom hooks for shared state management
- Responsive layout with CSS Grid and CSS custom properties
- Project organisation into service, hook, component, and page layers

---

## Project Status

In progress as part of a learning curriculum. Core feature set is complete.
