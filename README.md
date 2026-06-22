# Digital Wedding Invitation

A modern full-stack digital wedding invitation website built with **Next.js**, **TypeScript**, **Tailwind CSS**, **Supabase**, **Telegram Bot API**, **GitHub Actions**, and **Vercel**.

The project includes an elegant invitation landing page, RSVP form, guestbook, admin dashboard, Telegram RSVP notifications, and automated CI/CD deployment.

## Live Demo

Production URL:

```text
https://digital-wedding-invitation-omega.vercel.app/
```

## Features

### Public Wedding Invitation

* Elegant animated hero section
* Countdown to event date
* Event details section
* Love story timeline
* Couple slideshow
* FAQ section
* Guest photo upload link
* Background music player
* Floating bottom navigation
* Mobile-first responsive layout

### Bottom Sheet Actions

* Location with Google Maps and Waze links
* RSVP form
* Money gift / bank details
* Guestbook wishes
* Contact information

### RSVP System

* RSVP form validation
* Attendance status: attending / not attending
* Pax count selection
* Phone number validation
* Data stored in Supabase
* Telegram notification on new RSVP
* RSVP totals included in Telegram message

### Guestbook System

* Guests can submit wishes
* Messages stored in Supabase
* Visible guestbook messages displayed publicly
* Admin can hide or show guestbook messages

### Admin Dashboard

* Password-protected admin page
* RSVP summary cards
* Guestbook summary
* Search RSVP records
* Filter RSVP by attendance status
* RSVP pagination
* Search guestbook messages
* Filter guestbook by visible / hidden
* Guestbook pagination
* Guestbook moderation
* Auto-sync dashboard data

### CI/CD

* GitHub Actions CI workflow
* Runs dependency installation, linting, and production build
* Vercel deployment connected to GitHub
* Automatic deployment from the main branch

## Tech Stack

* **Framework:** Next.js
* **Language:** TypeScript
* **Styling:** Tailwind CSS
* **Animation:** Motion
* **Database:** Supabase
* **Notification:** Telegram Bot API
* **Forms:** React state + validation
* **Icons:** Lucide React
* **CI:** GitHub Actions
* **Deployment:** Vercel

## Project Structure

```text
src/
  app/
    admin/
      page.tsx
    api/
      admin/
        dashboard/
          route.ts
      rsvp/
        route.ts
    globals.css
    layout.tsx
    page.tsx

  components/
    bottom-sheets/
    sections/
    shared/

  config/
    faq.config.ts
    gallery.config.ts
    timeline.config.ts
    wedding.config.ts

  lib/
    calendar.ts
    telegram.ts
    supabase/
      client.ts
      server.ts

  types/
    wedding.ts
```

## Environment Variables

Create a `.env.local` file in the project root.

```env
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
ADMIN_PASSWORD=
TELEGRAM_RSVP_BOT_TOKEN=
TELEGRAM_RSVP_CHAT_ID=
```

### Notes

* `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` are used by the client.
* `SUPABASE_SERVICE_ROLE_KEY` is used only on the server.
* `ADMIN_PASSWORD` protects the admin dashboard.
* `TELEGRAM_RSVP_BOT_TOKEN` and `TELEGRAM_RSVP_CHAT_ID` are used for Telegram RSVP notifications.
* Never commit `.env.local` to GitHub.

## Supabase Tables

### `rsvps`

Stores guest RSVP submissions.

Main fields:

```text
id
name
phone
attendance_status
pax_count
message
created_at
```

### `guestbook_messages`

Stores guest wishes.

Main fields:

```text
id
name
message
is_visible
created_at
```

## Getting Started

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Open the app:

```text
http://localhost:3000
```

## Available Scripts

```bash
npm run dev
```

Runs the development server.

```bash
npm run lint
```

Runs ESLint checks.

```bash
npm run build
```

Creates a production build.

```bash
npm ci
```

Installs dependencies based on `package-lock.json`. Used in CI.

## CI Workflow

This project includes a GitHub Actions workflow:

```text
.github/workflows/ci.yml
```

The workflow runs on:

* Push to `main`
* Pull request to `main`

It performs:

```bash
npm ci
npm run lint
npm run build
```

## Deployment

The project is deployed on Vercel.

Deployment flow:

```text
Push to GitHub main branch
→ GitHub Actions CI runs
→ Vercel builds and deploys
→ Production site is updated
```

## Key Learning Outcomes

This project demonstrates:

* Building a full-stack Next.js application
* Structuring a scalable frontend project
* Managing reusable UI components
* Creating server-side API routes
* Integrating Supabase database operations
* Using server-only environment variables
* Sending Telegram Bot API notifications
* Building an admin dashboard
* Implementing search, filtering, and pagination
* Setting up GitHub Actions CI
* Deploying with Vercel CD

## Future Improvements

* Supabase Storage upload for guest photos
* Separate Telegram notification for guestbook messages
* Admin export to CSV
* RSVP edit/update flow
* Better authentication for admin dashboard
* Custom short link or custom domain
* Analytics for invitation visits

## Author

Built by Raja Muhammad Hanif Bin Raja Rizal Iskandar.
