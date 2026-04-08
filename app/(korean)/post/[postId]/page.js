import { createServerSupabaseClient } from "@/utils/supabase/server";
import Article from "./Article";

export default async function Post({ params }) {
  const { postId, lang } = await params;
  const isEnglish = lang === "en";

  // 번역 헬퍼 함수
  const t = (ko, en) => (isEnglish ? en : ko);

  const supabase = await createServerSupabaseClient();
  const { data: post, error } = await supabase
    .from("posts")
    .select("*")
    .eq("id", postId)
    .single();

  return (
    <div className="mt-10 md:mt-20">
      <Article post={post} lang={lang} />
    </div>
  );
}
