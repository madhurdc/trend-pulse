---
description: Step-by-step workflow to build the TrendPulse news dashboard from plan.md
---

# TrendPulse Build Workflow

## Phase 1 — Project Setup

1. **Initialize the project** using Vite + React (or Next.js if preferred):
   ```
   npx -y create-vite@latest ./ --template react
   ```
   // turbo

2. **Install backend dependencies** in a `server/` directory:
   ```
   mkdir server && cd server && npm init -y && npm install express cors dotenv axios
   ```

3. **Create `.env`** in the project root with the following keys:
   ```
   NEWS_API_KEY=<your-api-key>
   PORT=5000
   ```

4. **Set up project folder structure:**
   ```
   trendpulse/
   ├── server/
   │   ├── index.js          # Express entry point
   │   ├── routes/
   │   │   └── news.js       # News API routes
   │   ├── services/
   │   │   └── newsService.js # External API integration
   │   ├── data/
   │   │   └── mockData.json  # Fallback demo data
   │   └── .env
   ├── src/                   # React frontend
   │   ├── components/
   │   │   ├── Header.jsx
   │   │   ├── CategoryFilter.jsx
   │   │   ├── SearchBar.jsx
   │   │   ├── NewsCard.jsx
   │   │   ├── NewsGrid.jsx
   │   │   ├── TrendingSection.jsx
   │   │   ├── LoadingSpinner.jsx
   │   │   └── ErrorMessage.jsx
   │   ├── pages/
   │   │   └── Dashboard.jsx
   │   ├── hooks/
   │   │   └── useNews.js
   │   ├── App.jsx
   │   └── main.jsx
   ├── public/
   ├── package.json
   └── vite.config.js
   ```

---

## Phase 2 — Backend Development

5. **Create Express server** (`server/index.js`):
   - Import express, cors, dotenv
   - Set up middleware (CORS, JSON parsing)
   - Mount news routes at `/api`
   - Start server on `PORT` from env

6. **Build news routes** (`server/routes/news.js`):
   - `GET /api/news` — return all latest articles
   - `GET /api/news?category=technology` — return filtered articles
   - `GET /api/search?q=keyword` — return search results

7. **Implement news service** (`server/services/newsService.js`):
   - Integrate with NewsAPI (or GNews)
   - Normalize responses to the standard article format:
     ```json
     {
       "id": "unique-id",
       "title": "...",
       "description": "...",
       "source": "...",
       "category": "technology",
       "published_at": "2026-02-24T...",
       "image_url": "https://...",
       "article_url": "https://..."
     }
     ```
   - Handle API errors and rate limits
   - Fall back to `mockData.json` when API is unavailable

8. **Create mock data** (`server/data/mockData.json`):
   - 15–20 sample articles across all categories
   - Realistic titles, descriptions, dates, and placeholder images

9. **Test backend** by starting the server and hitting each endpoint:
   ```
   cd server && node index.js
   ```
   // turbo
   Then verify with:
   ```
   curl http://localhost:5000/api/news
   curl http://localhost:5000/api/news?category=technology
   curl http://localhost:5000/api/search?q=AI
   ```

---

## Phase 3 — Frontend Core UI

10. **Install frontend dependencies:**
    ```
    npm install axios
    ```
    // turbo

11. **Build `Header.jsx`** — app name "TrendPulse", navigation bar, optional dark mode toggle slot.

12. **Build `CategoryFilter.jsx`** — row of filter buttons:
    - All, Technology, Finance, Startups, Business, AI/Innovation, General
    - Active state styling
    - Calls parent handler on click (no page reload)

13. **Build `SearchBar.jsx`** — input field with search icon, debounced onChange handler.

14. **Build `NewsCard.jsx`** — displays one article:
    - Thumbnail image (with fallback)
    - Title, source name, publication date
    - Short description (truncated)
    - Click → opens `article_url` in new tab

15. **Build `NewsGrid.jsx`** — responsive grid of `NewsCard` components.

16. **Build `TrendingSection.jsx`** — highlights top 3–5 articles prominently (hero cards or carousel).

17. **Build `LoadingSpinner.jsx`** and **`ErrorMessage.jsx`** — reusable status components.

---

## Phase 4 — Frontend Features & Logic

18. **Create `useNews.js` custom hook:**
    - State: `articles`, `loading`, `error`, `category`, `searchQuery`
    - Fetch from backend API on mount and when filters change
    - Expose filter/search handlers

19. **Assemble `Dashboard.jsx`:**
    - Compose Header, CategoryFilter, SearchBar, TrendingSection, NewsGrid
    - Wire up `useNews` hook to all components

20. **Wire up `App.jsx`:**
    - Render Dashboard as main page
    - (Optional) add routing for article detail page

21. **Configure Vite proxy** in `vite.config.js` to forward `/api` requests to `http://localhost:5000`.

22. **Test frontend** by running dev server:
    ```
    npm run dev
    ```
    Verify: news loads, filtering works, search returns results, cards link correctly.

---

## Phase 5 — Responsive Design & Polish

23. **Add responsive CSS:**
    - Mobile: single-column card layout
    - Tablet: 2-column grid
    - Desktop: 3–4 column grid
    - Smooth scrolling, accessible contrast, readable typography

24. **Handle edge cases:**
    - Broken/missing images → show placeholder
    - Empty search results → friendly message
    - API failure → display error component with retry action

25. **Add micro-animations:**
    - Card hover effects (scale, shadow)
    - Smooth filter transitions
    - Loading skeleton or spinner

---

## Phase 6 — Optional Stretch Features

26. **Dark mode toggle** — CSS variables + toggle in Header
27. **Bookmark/save articles** — local storage persistence
28. **Pagination or infinite scroll** — "Load more" button or scroll listener
29. **Trending keywords visualization** — tag cloud or bar chart
30. **AI-generated summaries** — call an LLM API for article summaries

---

## Phase 7 — Testing & Deployment

31. **Full local test:**
    - Start backend: `cd server && node index.js`
    - Start frontend: `npm run dev`
    - Test: news loading, category filter, search, responsive layout, external links, mock data fallback

32. **Production build:**
    ```
    npm run build
    ```
    // turbo

33. **Configure for Render deployment:**
    - Add `render.yaml` or configure via dashboard
    - Set environment variables on Render
    - Deploy backend as a Web Service, frontend as a Static Site

34. **Write `README.md`** with:
    - Project overview
    - Tech stack
    - Setup & run instructions
    - Environment variable documentation
    - Deployment guide
