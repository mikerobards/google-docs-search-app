# Google Cloud Docs Search

A web app for searching Google Cloud documentation using the [Developer Knowledge API](https://developers.google.com/knowledge). Built with Next.js, React, and Tailwind CSS.

## Prerequisites

- Node.js 18+
- A Google Developer Knowledge API key

## Setup

1. Clone the repository:

   ```bash
   git clone https://github.com/mikerobards/google-docs-search-app.git
   cd google-docs-search-app
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env.local` file in the project root with your API key:

   ```
   DEVELOPERKNOWLEDGE_API_KEY=your_api_key_here
   ```

4. Start the development server:

   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## How It Works

Enter a question or topic in the search bar (e.g., "How do I create a BigQuery dataset?") and the app returns relevant chunks from Google Cloud's official documentation, with links to the full docs.

The frontend sends queries to a Next.js API route (`/api/search`), which proxies requests to the Google Developer Knowledge API and returns matching document chunks.

## Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start development server |
| `npm run build` | Create production build |
| `npm run start` | Serve production build |
| `npm run lint` | Run ESLint |

## Tech Stack

- [Next.js](https://nextjs.org) 16 (App Router)
- [React](https://react.dev) 19
- [Tailwind CSS](https://tailwindcss.com) v4
- [TypeScript](https://www.typescriptlang.org)
