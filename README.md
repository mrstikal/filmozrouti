# Filmožrouti

A small Nuxt app for browsing **Movies**, **TV Shows**, and **People** using the **TMDB API**.

> This product uses the TMDB API but is not endorsed or certified by TMDB.

---

# See it live: https://filmozrouti.vercel.app/

## Features

- **Movies**
    - Browse (discover) with **genre** + **sorting**
    - Search
    - Movie detail with cast, overview, and recommendations

- **TV Shows**
    - Browse (discover) with **genre** + **sorting**
    - Search
    - TV show detail with cast, overview, recommendations, and basic technical info

- **People**
    - Popular people list + search
    - Person detail with **bio** and **combined filmography** (movies + TV)

- **Responsive UI**
    - Mobile hamburger navigation
    - Tailwind-based layout

---

## Tech Stack

### App
- **Nuxt 4** / **Vue 3** (TypeScript)
- **Pinia** for state management
- **Tailwind CSS v4**
- **@nuxt/ui**
- **floating-vue** (tooltips)
- **@nuxt/icon**, **@nuxt/image**
- **@nuxt/a11y**

### Tooling & Quality
- **ESLint** (+ `eslint-plugin-vue`)
- **Vitest** (unit tests + coverage)
- **@playwright/test** (E2E tests)
- **happy-dom** (DOM environment for tests)

---

## Requirements

- **Node.js** (LTS recommended)
- **npm** (this repo uses `package-lock.json`)

---

## Getting Started

### 1) Install dependencies

    npm install

### 2) Get a TMDB API token (TMDB_API_TOKEN)

This project authenticates against TMDB using a **v4 Read Access Token (Bearer token)**.

Steps:

1. Create a TMDB account and sign in:
   - https://www.themoviedb.org/signup
   - https://www.themoviedb.org/login

2. Go to your account **Settings** and open the **API** section:
   - https://www.themoviedb.org/settings/api

3. If you don’t have API access yet, request an API key / accept the terms (TMDB will guide you through a short form).

4. In the API area, find and copy your **API Read Access Token (v4 auth)**.
   - It is a long string used like: `Authorization: Bearer <token>`

Important:
- Do **not** use the “API Key (v3 auth)” here.
- Do **not** commit the token to git.

### 3) Configure environment variables

Create a `.env` file in the project root:

    TMDB_API_TOKEN=<YOUR_TMDB_V4_READ_ACCESS_TOKEN>

### 4) Start the dev server

    npm run dev

The app will be available at:
- http://localhost:3000

---

## Scripts

### Development

    npm run dev

### Build & Preview

    npm run build
    npm run preview

### Tests

    npm run test
    npm run test:watch
    npm run test:coverage
    npm run test:unit
    npm run test:nuxt
    npm run test:e2e
    npm run test:e2e:ui

---

## Project Structure (high level)

- `app/pages/`
    - `/movies`, `/movies/[id]`
    - `/tv`, `/tv/[id]`
    - `/people`, `/people/[id]`
- `server/api/`
    - Server-side TMDB proxy routes (keeps the API token off the client)
- `app/components/`, `app/composables/`, `app/utils/`
    - UI, data fetching helpers, and small utilities

---

## API Notes

This project calls TMDB through Nuxt server routes (Nitro) and forwards requests using:

- `Authorization: Bearer <TMDB_API_TOKEN>`

This keeps the token out of browser network requests.

---

## License

MIT
