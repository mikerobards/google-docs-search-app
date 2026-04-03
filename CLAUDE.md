# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Build & Dev Commands

- `npm run dev` — start dev server
- `npm run build` — production build
- `npm run start` — serve production build
- `npm run lint` — run ESLint (no args needed, uses flat config)

## Architecture

Next.js 16 app (App Router) with React 19, TypeScript, and Tailwind CSS v4.

**Frontend:** `app/page.tsx` is a client component (`"use client"`) providing a search UI that queries the backend API route.

**Backend:** `app/api/search/route.ts` proxies search requests to the Google Developer Knowledge API (`https://developers.google.com/knowledge/v1alpha`). Requires `DEVELOPERKNOWLEDGE_API_KEY` environment variable.

**Styling:** Tailwind CSS v4 via PostCSS (configured in `postcss.config.mjs`). No separate Tailwind config file — v4 uses CSS-based configuration.

## Key Details

- Path alias `@/*` maps to project root
- No test framework is configured yet
- No `.env` file is committed; the API key must be set via `DEVELOPERKNOWLEDGE_API_KEY` env var
