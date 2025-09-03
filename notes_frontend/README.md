# Notes Frontend (Next.js)

Modern and minimalistic notes application UI with:
- User authentication (login/register)
- Create, edit, delete notes
- List and search notes
- Sidebar for navigation, main content editor, header with actions

## Tech
- Next.js (App Router)
- TypeScript
- Tailwind CSS (v4) utilities
- Client-side REST calls to backend

## Environment
Create `.env.local` with:
```
NEXT_PUBLIC_API_BASE_URL=http://localhost:8000
```
See `.env.example` for reference.

## Scripts
- `npm run dev` — start dev server
- `npm run build` — build
- `npm start` — production start
- `npm run lint` — lint

## Backend API Contract (expected)
- POST `/auth/login` {email, password} -> {id, email, token}
- POST `/auth/register` {email, password} -> {id, email, token}
- GET `/auth/me` (Bearer token) -> {id, email}
- GET `/notes?q=query` -> Note[]
- GET `/notes/:id` -> Note
- POST `/notes` {title, content} -> Note
- PUT `/notes/:id` {title, content} -> Note
- DELETE `/notes/:id` -> {success: true}

A `Note` object:
```
{id: string, title: string, content: string, created_at: string, updated_at: string}
```

## UI Structure
- Header: app title, New Note, auth actions
- Sidebar: search input, notes list
- Main: note editor (title, content) with Save/Delete

## Colors (Light theme)
- primary: #2563eb
- secondary: #64748b
- accent: #fbbf24
