import { createServerSupabaseClient } from "@/utils/supabase/server";
import VideoGalleryClient from "./VideoGalleryClient";

// app/page.js (또는 사용하는 경로의 page.js)
export const revalidate = 3600; // 1시간마다 캐시 갱신 (SEO 및 성능 최적화)

export default async function VideoGallery() {
  const supabase = await createServerSupabaseClient();

  // 서버에서 데이터 직접 페칭 (SEO 친화적)
  const { data: posts, error } = await supabase
    .from("posts")
    .select("id, title, title_en, created_at, post")
    .eq("category", "video")
    .order("created_at", { ascending: false })
    .range(0, 3);

  if (error) {
    console.error("갤러리 데이터를 불러오는데 실패했습니다:", error);
  }
  // 유튜브 썸네일 추출 로직
  const formattedPosts = (posts || []).map((item) => {
    const iframeMatch = item.post.match(/src="([^"]+)"/);
    let videoId = null;

    if (iframeMatch) {
      const src = iframeMatch[1];
      const match = src.match(/\/embed\/([^?\s/]+)/);
      if (match) videoId = match[1];
    }

    return {
      ...item,
      // 유튜브 고화질 썸네일 주소 생성 (mqdefault 또는 hqdefault)
      thumbnail: videoId
        ? `https://img.youtube.com/vi/${videoId}/mqdefault.jpg`
        : "https://placehold.co/600x450?text=No+Video",
    };
  });

  return (
    <>
      <VideoGalleryClient posts={formattedPosts} />
    </>
  );
}
