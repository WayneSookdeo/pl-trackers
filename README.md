# ⚽ Premier League Tracker

> A full-stack Premier League dashboard with AI-powered match predictions — built on a fully automated data pipeline that updates every week without any manual intervention.

🔗 **Live demo:** [nicholas-pl-tracker.netlify.app](https://nicholas-pl-tracker.netlify.app)


## Architecture

```
TheSportsDB API
      │
      ▼
┌─────────────────────────┐
│  Supabase Edge Function  │  ← Runs automatically via pg_cron
│  fetch-pl-data/index.ts  │    every Tuesday & Saturday at 9AM
└─────────────────────────┘
      │
      ├── Syncs standings
      ├── Updates finished match scores
      ├── Fetches next round fixtures
      │
      ▼
┌─────────────────────────┐
│   Supabase PostgreSQL    │  ← Stores teams, matches,
│   + Analytical Views     │    standings & predictions
└─────────────────────────┘
      │
      ├── Groq AI (Llama 3.3 70B)
      │   Generates predictions per match
      │   based on standings, form & W/D/L
      │
      ▼
┌─────────────────────────┐
│   Next.js 14 (SSR)       │  ← Server components fetch
│   Hosted on Netlify      │    data before page loads
└─────────────────────────┘
```

---

## Features

- **Live fixtures** — upcoming matchday grouped by date with kick-off times
- **AI predictions** — every fixture gets a prediction with confidence score and detailed reasoning
- **Recent results** — last 10 matches with scores, winner highlighted
- **League standings** — top 5 with form badges (W/D/L)
- **Fully automated** — cron job runs twice a week, no manual updates needed
- **SSR dashboard** — Next.js server components for fast, fresh data on every load

---

## Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | Next.js 14 (App Router), Tailwind CSS |
| Database | Supabase (PostgreSQL) |
| Pipeline | Supabase Edge Functions (Deno / TypeScript) |
| Scheduler | pg_cron (runs every Tuesday & Saturday) |
| Data Source | TheSportsDB API (free, no key required) |
| AI | Groq API — Llama 3.3 70B |
| Hosting | Netlify |

---

## Project Structure

```
pl-tracker/
├── app/
│   └── page.tsx                        # Main dashboard — server component
├── components/
│   ├── Standings.tsx                   # League table with form badges
│   ├── RecentResults.tsx               # Last 10 finished matches
│   ├── UpcomingFixtures.tsx            # Next matchday grouped by date
│   └── Predictions.tsx                 # AI predictions with confidence bars
├── lib/
│   └── supabase.ts                     # Supabase client
├── supabase/
│   └── functions/
│       └── fetch-pl-data/
│           └── index.ts                # Edge Function — full data pipeline
├── sql/
│   └── schema.sql                      # Tables, indexes, views
├── .env.example
└── .gitignore
```

---

## Database Schema

**Tables**
- `teams` — Premier League clubs with crest URLs
- `matches` — fixtures with scores, status (SCHEDULED / FINISHED), and matchday
- `standings` — league table snapshots synced each run
- `predictions` — AI predictions per match with confidence and reasoning

**Views**
- `vw_latest_standings` — most recent standing per team
- `vw_matches_with_predictions` — matches joined with their AI prediction

---

## How the Pipeline Works

Every Tuesday and Saturday the Edge Function automatically:

1. **Syncs standings** from TheSportsDB
2. **Checks the latest round** in the database dynamically — no hardcoded round numbers
3. **Updates scores** for any recently finished matches
4. **Finds the next upcoming round** by scanning ahead until it finds unplayed fixtures
5. **Generates AI predictions** for each new fixture using Groq — skips any already predicted

---

## Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/WayneSookdeo/pl-tracker.git
cd pl-tracker
npm install
```

### 2. Set up environment variables

```bash
cp .env.example .env.local
```

| Variable | Where to get it |
|----------|----------------|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase → Project Settings → API |
| `NEXT_PUBLIC_SUPABASE_KEY` | Supabase → Project Settings → API → anon public |

### 3. Set up the database

Run `sql/schema.sql` in your Supabase SQL Editor.

### 4. Deploy the Edge Function

In Supabase go to **Edge Functions → Create function**, name it `fetch-pl-data`, and paste in `supabase/functions/fetch-pl-data/index.ts`.

Add these secrets in **Project Settings → Secrets**:
- `GROQ_API_KEY` — from [console.groq.com](https://console.groq.com)

### 5. Set up the cron job

Enable `pg_cron` and `pg_net` in **Database → Extensions**, then run:

```sql
SELECT cron.schedule(
  'pl-data-sync',
  '0 9 * * 2,6',
  $$
  SELECT net.http_post(
    url := 'https://your-project.supabase.co/functions/v1/fetch-pl-data',
    headers := '{"Content-Type": "application/json", "Authorization": "Bearer YOUR_SERVICE_ROLE_KEY"}'::jsonb,
    body := '{}'::jsonb
  );
  $$
);
```

### 6. Run locally

```bash
npm run dev
```

---

## Deployment

### Netlify

1. Push repo to GitHub
2. Go to [netlify.com](https://netlify.com) → **Add new site → Import from GitHub**
3. Add environment variables in **Site settings → Environment variables**
4. Deploy

---

## Licence

MIT
