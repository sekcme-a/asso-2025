import { createServerSupabaseClient } from "@/utils/supabase/server";

const DATA = {
  NAME: `대한생활체육회`,
  DESCRIPTION: `국민의 건강과 행복의 장을 여는 대한생활체육회. 국민생활체육의 권장, 발전을 목표로 하고 있습니다.`,
  URL: `https://www.xn--vk1by6xrzecngs4l6obxj.com`,
};

export async function generateMetadata({ params }) {
  const supabase = await createServerSupabaseClient();
  const { data } = await supabase
    .from("posts")
    .select("title, post")
    .eq("id", params.postId)
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
          url: `${DATA.URL}/images/og_logo.png`,
          width: 1200,
          height: 630,
          alt: `${DATA.NAME} 대표 이미지`,
        },
      ],
    },
    twitter: {
      title: data.title,
      description: `${data.title} ${plainText}`.slice(0, 100),
      images: [`${DATA.URL}/images/og_logo.png`],
    },
  };
}
