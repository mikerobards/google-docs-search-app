"use client";

import { useState, FormEvent } from "react";

interface DocumentChunk {
  content?: string;
  parent?: string;
  title?: string;
  url?: string;
}

interface SearchResponse {
  documentChunks?: DocumentChunk[];
  error?: string;
}

export default function Home() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<DocumentChunk[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [searched, setSearched] = useState(false);

  async function handleSearch(e: FormEvent) {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    setError("");
    setResults([]);
    setSearched(true);

    try {
      const res = await fetch(`/api/search?query=${encodeURIComponent(query.trim())}`);
      const data: SearchResponse = await res.json();

      if (!res.ok) {
        setError(data.error || "Something went wrong");
        return;
      }

      setResults(data.documentChunks || []);
    } catch {
      setError("Failed to connect to the server");
    } finally {
      setLoading(false);
    }
  }

  function getDocUrl(chunk: DocumentChunk): string | null {
    if (chunk.url) return chunk.url;
    if (chunk.parent) {
      const id = chunk.parent.replace("documents/", "");
      return `https://cloud.google.com/docs/${id}`;
    }
    return null;
  }

  function getTitle(chunk: DocumentChunk): string {
    if (chunk.title) return chunk.title;
    if (chunk.parent) return chunk.parent.replace("documents/", "").replaceAll("/", " > ");
    return "Documentation";
  }

  return (
    <div className="flex flex-col flex-1 items-center bg-zinc-50 font-sans dark:bg-zinc-950">
      <main className="w-full max-w-3xl px-6 py-16 flex flex-col gap-10">
        {/* Header */}
        <div className="text-center flex flex-col gap-3">
          <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
            Google Cloud Docs Search
          </h1>
          <p className="text-zinc-500 dark:text-zinc-400">
            Ask a question about Google Cloud and get answers from the official documentation.
          </p>
        </div>

        {/* Search form */}
        <form onSubmit={handleSearch} className="flex gap-3">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="e.g. How do I create a BigQuery dataset?"
            className="flex-1 rounded-lg border border-zinc-300 bg-white px-4 py-3 text-zinc-900 placeholder-zinc-400 shadow-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 dark:placeholder-zinc-500 dark:focus:border-blue-400"
          />
          <button
            type="submit"
            disabled={loading || !query.trim()}
            className="rounded-lg bg-blue-600 px-6 py-3 font-medium text-white shadow-sm transition-colors hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed dark:bg-blue-500 dark:hover:bg-blue-600"
          >
            {loading ? "Searching..." : "Search"}
          </button>
        </form>

        {/* Error */}
        {error && (
          <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-red-700 dark:border-red-800 dark:bg-red-950 dark:text-red-400">
            {error}
          </div>
        )}

        {/* Loading */}
        {loading && (
          <div className="flex justify-center py-12">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-zinc-300 border-t-blue-600 dark:border-zinc-700 dark:border-t-blue-400" />
          </div>
        )}

        {/* Results */}
        {!loading && results.length > 0 && (
          <div className="flex flex-col gap-4">
            <p className="text-sm text-zinc-500 dark:text-zinc-400">
              {results.length} result{results.length !== 1 ? "s" : ""} found
            </p>
            {results.map((chunk, i) => {
              const url = getDocUrl(chunk);
              return (
                <div
                  key={i}
                  className="rounded-lg border border-zinc-200 bg-white p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-900"
                >
                  <h2 className="mb-2 text-lg font-semibold text-zinc-900 dark:text-zinc-100">
                    {getTitle(chunk)}
                  </h2>
                  {chunk.content && (
                    <p className="mb-3 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400 line-clamp-4">
                      {chunk.content}
                    </p>
                  )}
                  {url && (
                    <a
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-sm font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
                    >
                      View documentation &rarr;
                    </a>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* Empty state */}
        {!loading && searched && results.length === 0 && !error && (
          <p className="text-center text-zinc-500 dark:text-zinc-400 py-12">
            No results found. Try a different query.
          </p>
        )}
      </main>
    </div>
  );
}
