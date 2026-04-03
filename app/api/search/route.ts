import { NextRequest, NextResponse } from "next/server";

const API_BASE = "https://developers.google.com/knowledge/v1alpha";

export async function GET(request: NextRequest) {
  const query = request.nextUrl.searchParams.get("query");

  if (!query || query.trim().length === 0) {
    return NextResponse.json({ error: "Query is required" }, { status: 400 });
  }

  const apiKey = process.env.DEVELOPERKNOWLEDGE_API_KEY;
  if (!apiKey || apiKey === "YOUR_API_KEY_HERE") {
    return NextResponse.json(
      { error: "API key not configured" },
      { status: 500 }
    );
  }

  const url = new URL(`${API_BASE}/documents:searchDocumentChunks`);
  url.searchParams.set("query", query.trim());
  url.searchParams.set("pageSize", "10");
  url.searchParams.set("key", apiKey);

  try {
    const res = await fetch(url.toString());

    if (!res.ok) {
      const errorBody = await res.text();
      console.error("API error:", res.status, errorBody);
      return NextResponse.json(
        { error: "Failed to fetch results from Google" },
        { status: res.status }
      );
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (err) {
    console.error("Fetch error:", err);
    return NextResponse.json(
      { error: "Failed to connect to the API" },
      { status: 502 }
    );
  }
}
