import { createServerSupabaseClient } from "@/utils/supabase/server";

import NewsClient from "./NewsClient";
import { DEFAULT_TOPICS } from "./default_topics";

const MagazineNews = async () => {
  const supabase = await createServerSupabaseClient();

  const { data } = await supabase
    .from("page_settings")
    .select("*")
    .eq("type", "main_event")
    .maybeSingle();

  if (!data) return null;
  const blocks = [...data.data, ...DEFAULT_TOPICS].slice(0, 4); // 최대 4개까지 표시

  // 데이터가 없을 경우를 대비해 렌더링 방지
  if (!blocks || blocks.length === 0) return null;

  return <NewsClient blocks={blocks} />;
};

export default MagazineNews;
