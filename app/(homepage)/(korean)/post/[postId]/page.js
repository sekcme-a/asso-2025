import { createServerSupabaseClient } from "@/utils/supabase/server";
import Article from "./Article";

export async function generateMetadata({ params }) {
  const { postId } = await params;
  const supabase = await createServerSupabaseClient();
  const { data } = await supabase
    .from("posts")
    .select("title, post")
    .eq("id", postId)
    .single();

  if (!data)
    return { title: "기사 없음", description: "존재하지 않는 기사입니다." };

  const plainText = data.post.replace(/<[^>]*>/g, "").replace(/&[^;\s]+;/g, "");

  return {
    title: data.title,
    description: `${data.title} ${plainText}`.slice(0, 100),
    openGraph: {
      title: data.title,
      description: `${data.title} ${plainText}`.slice(0, 100),
      images: [
        {
          url: `/images/og_logo.png`,
          width: 1200,
          height: 630,
          alt: `대한생활체육회 대표 이미지`,
        },
      ],
    },
    twitter: {
      title: data.title,
      description: `${data.title} ${plainText}`.slice(0, 100),
      images: [`/images/og_logo.png`],
    },
  };
}

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
