import { NextResponse } from "next/server";

export function GET() {
  const content = `
User-agent: *
Allow: /
Disallow: /admin

Sitemap: https://www.xn--vk1by6xrzecngs4l6obxj.com/sitemap.xml
  `.trim();

  return new NextResponse(content, {
    headers: {
      "Content-Type": "text/plain",
    },
  });
}
