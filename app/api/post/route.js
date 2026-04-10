import { NextResponse } from "next/server";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const url = searchParams.get("url");
  const name = searchParams.get("name");

  if (!url || !name) {
    return NextResponse.json({ error: "Missing url or name" }, { status: 400 });
  }

  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error("File fetch failed");

    const contentType =
      response.headers.get("content-type") || "application/octet-stream";
    const buffer = await response.arrayBuffer();

    return new Response(Buffer.from(buffer), {
      status: 200,
      headers: {
        "Content-Type": contentType,
        "Content-Disposition": `attachment; filename*=UTF-8''${encodeURIComponent(
          name
        )}`,
      },
    });
  } catch (err) {
    console.error("Download proxy error:", err);
    return NextResponse.json({ error: "Download failed" }, { status: 500 });
  }
}
