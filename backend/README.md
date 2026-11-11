# ChatGPT Clone – Backend

## Setup
1. `npm install`
2. Run `sql/schema.sql` in MySQL (Workbench, or `mysql -u root -p < sql/schema.sql`).
3. Copy `.env.example` to `.env`, fill in your DB password and `GEMINI_API_KEY`
   (free key: https://aistudio.google.com/apikey).
4. `npm run dev` → http://localhost:3777

## Endpoints
- `GET  /api/chat/conversations`
- `POST /api/chat/conversations`  body: `{ "question": "What is a closure in JavaScript?" }`

## Frontend
Put the frontend folder next to this one, then `npm install && npm run dev` inside it.
It already points to `http://localhost:3777/api`.
