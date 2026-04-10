import { createServerSupabaseClient } from "@/utils/supabase/server";
import NewsClient from "./NewsClient";
import { DEFAULT_TOPICS } from "./default_topics";

// HTML 본문에서 첫 번째 이미지 경로를 추출하는 헬퍼 함수
const extractFirstImage = (html) => {
  if (!html) return "/images/og_logo.png";
  const match = html.match(/<img [^>]*src="([^"]+)"[^>]*>/);
  return match ? match[1] : "/images/og_logo.png";
};

// HTML 태그를 제거하고 텍스트만 추출하는 헬퍼 함수
const stripHtml = (html) => {
  if (!html) return "";
  return html.replace(/<[^>]*>?/gm, "").trim();
};

const MagazineNews = async () => {
  const supabase = await createServerSupabaseClient();

  // 1. DB에서 is_main이 true인 게시물 최신순으로 최대 4개 조회
  const { data: dbPosts } = await supabase
    .from("posts")
    .select("*")
    .eq("is_main", true)
    .order("created_at", { ascending: false })
    .limit(4);

  // 2. DB 데이터를 NewsClient에서 사용할 수 있는 형식으로 변환
  const formattedDbPosts = (dbPosts || []).map((post) => ({
    title: post.title,
    title_en: post.title_en,
    content: stripHtml(post.post).slice(0, 120), // 본문 요약
    content_en: stripHtml(post.post_en).slice(0, 120), // 영문 본문 요약
    images: [extractFirstImage(post.post)],
    url: `/post/${post.id}`, // 실제 게시글 상세 경로
    isDbData: true,
  }));

  // 3. DB 데이터와 기본 데이터를 합침 (DB 데이터가 우선순위를 가짐)
  // 부족한 개수만큼만 DEFAULT_TOPICS에서 채워 총 4개 유지
  const blocks = [...formattedDbPosts, ...DEFAULT_TOPICS].slice(0, 4);

  if (!blocks || blocks.length === 0) return null;

  return <NewsClient blocks={blocks} />;
};

export default MagazineNews;
