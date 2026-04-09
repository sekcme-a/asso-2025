import { createServerSupabaseClient } from "@/utils/supabase/server";
import PhotoGalleryClient from "./PhotoGalleryClient";

// app/page.js (또는 사용하는 경로의 page.js)
export const revalidate = 3600; // 1시간마다 캐시 갱신 (SEO 및 성능 최적화)

export default async function PhotoGallery() {
  const supabase = await createServerSupabaseClient();

  // 서버에서 데이터 직접 페칭 (SEO 친화적)
  const { data: posts, error } = await supabase
    .from("posts")
    .select("id, title, title_en, created_at, post")
    .eq("category", "photo")
    .order("created_at", { ascending: false })
    .range(0, 3);

  if (error) {
    console.error("갤러리 데이터를 불러오는데 실패했습니다:", error);
  }

  return (
    <>
      <PhotoGalleryClient posts={posts || []} />
    </>
  );
}
