import { NextResponse } from "next/server";

const MINUTES_PDF_URL =
  "https://fbzmzvhuutzwcnspotzj.supabase.co/storage/v1/object/public/Books/minutes_from_roundtable.pdf";

/**
 * Downloads the Minutes from the Roundtable PDF as an attachment.
 * Forces the browser to save the file rather than displaying it inline in a tab.
 */
export async function GET() {
  try {
    const upstream = await fetch(MINUTES_PDF_URL);

    if (!upstream.ok) {
      return new NextResponse("Failed to fetch document", { status: upstream.status });
    }

    const headers = new Headers();
    headers.set("Content-Type", "application/pdf");
    headers.set(
      "Content-Disposition",
      'attachment; filename="minutes_from_roundtable.pdf"'
    );
    const contentLength = upstream.headers.get("content-length");
    if (contentLength) {
      headers.set("Content-Length", contentLength);
    }
    headers.set("Cache-Control", "public, max-age=86400, s-maxage=604800");

    return new Response(upstream.body, {
      status: 200,
      headers,
    });
  } catch (error) {
    console.error("PDF download proxy error:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
