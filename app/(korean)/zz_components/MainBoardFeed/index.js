import { createServerSupabaseClient } from "@/utils/supabase/server";
import MainBoardFeedClient from "./MainBoardFeedClient";

export const revalidate = 600; // 10분마다 갱신

export default async function Page() {
  const supabase = await createServerSupabaseClient();
  // 3개 카테고리 데이터를 병렬로 가져오기
  const [noticeRes, pressRes, archiveRes] = await Promise.all([
    supabase
      .from("posts")
      .select("id, title, created_at")
      .eq("category", "anouncement")
      .order("created_at", { ascending: false })
      .range(0, 2),
    supabase
      .from("posts")
      .select("id, title, created_at")
      .eq("category", "media")
      .order("created_at", { ascending: false })
      .range(0, 1),
    supabase
      .from("posts")
      .select("id, title, created_at")
      .eq("category", "reference")
      .order("created_at", { ascending: false })
      .range(0, 1),
  ]);

  const boardData = {
    notice: noticeRes.data || [],
    press: pressRes.data || [],
    archive: archiveRes.data || [],
  };

  return <MainBoardFeedClient boardData={boardData} />;
}
