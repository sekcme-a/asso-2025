import { createServerSupabaseClient } from "@/utils/supabase/server";

export async function GET() {
  const supabase = await createServerSupabaseClient();
  const baseUrl = "https://www.xn--vk1by6xrzecngs4l6obxj.com";
  const today = "2025-06-27T00:00:00Z";

  const staticURLs = [
    {
      loc: baseUrl,
      lastmod: today,
      changefreq: "weekly",
      priority: "1.0",
    },
    {
      loc: `${baseUrl}/info/greet`,
      lastmod: today,
      changefreq: "monthly",
      priority: "0.9",
    },
    {
      loc: `${baseUrl}/info/purpose`,
      lastmod: today,
      changefreq: "monthly",
      priority: "0.9",
    },
    {
      loc: `${baseUrl}/info/chart`,
      lastmod: today,
      changefreq: "monthly",
      priority: "0.8",
    },
    {
      loc: `${baseUrl}/info/status`,
      lastmod: today,
      changefreq: "monthly",
      priority: "0.8",
    },
    {
      loc: `${baseUrl}/info/location`,
      lastmod: today,
      changefreq: "monthly",
      priority: "0.8",
    },
    {
      loc: `${baseUrl}/group/nation`,
      lastmod: today,
      changefreq: "monthly",
      priority: "0.7",
    },
    {
      loc: `${baseUrl}/group/internation`,
      lastmod: today,
      changefreq: "monthly",
      priority: "0.7",
    },
    {
      loc: `${baseUrl}/group/sports`,
      lastmod: today,
      changefreq: "monthly",
      priority: "0.7",
    },
    {
      loc: `${baseUrl}/group/sanha`,
      lastmod: today,
      changefreq: "monthly",
      priority: "0.7",
    },
    {
      loc: `${baseUrl}/notice/anouncement/1`,
      lastmod: today,
      changefreq: "daily",
      priority: "0.8",
    },
    {
      loc: `${baseUrl}/notice/media/1`,
      lastmod: today,
      changefreq: "daily",
      priority: "0.8",
    },
    {
      loc: `${baseUrl}/notice/photo/1`,
      lastmod: today,
      changefreq: "weekly",
      priority: "0.7",
    },
    {
      loc: `${baseUrl}/notice/video/1`,
      lastmod: today,
      changefreq: "weekly",
      priority: "0.7",
    },
    {
      loc: `${baseUrl}/notice/apply/1`,
      lastmod: today,
      changefreq: "monthly",
      priority: "0.6",
    },
    {
      loc: `${baseUrl}/notice/schedule/1`,
      lastmod: today,
      changefreq: "weekly",
      priority: "0.7",
    },
    {
      loc: `${baseUrl}/notice/reference/1`,
      lastmod: today,
      changefreq: "monthly",
      priority: "0.6",
    },
    {
      loc: `${baseUrl}/notice/sup/1`,
      lastmod: today,
      changefreq: "monthly",
      priority: "0.6",
    },
    {
      loc: `${baseUrl}/mou/mou`,
      lastmod: today,
      changefreq: "yearly",
      priority: "0.6",
    },
    {
      loc: `${baseUrl}/support`,
      lastmod: today,
      changefreq: "monthly",
      priority: "0.7",
    },
  ];

  const { data: posts } = await supabase.from("posts").select("id, created_at");

  const postURLs =
    posts?.map((post) => ({
      loc: `${baseUrl}/post/${post.id}`,
      lastmod: new Date(post.created_at).toISOString(),
      changefreq: "yearly",
      priority: "0.5",
    })) || [];

  const urls = [...staticURLs, ...postURLs]
    .map((url) => {
      return `
     <url>
       <loc>${url.loc}</loc>
       <lastmod>${url.lastmod}</lastmod>
       ${url.changefreq ? `<changefreq>${url.changefreq}</changefreq>` : ""}
       <priority>${url.priority}</priority>
     </url>
   `;
    })
    .join("");

  const xml = `
    <?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${urls}
    </urlset>
  `.trim();

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml",
    },
  });
}
