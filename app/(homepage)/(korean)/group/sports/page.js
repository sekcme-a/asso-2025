import { createServerSupabaseClient } from "@/utils/supabase/server";
import GroupList from "../GroupList";
import { createMetadata } from "@/utils/metadata";

export const metadata = createMetadata({
  title: "종목별 운영현황",
  description: "대한생활체육회의 종목별 운영현황을 소개합니다.",
  url: "/group/sports",
});

export default async function Nation() {
  const supabase = await createServerSupabaseClient();

  const { data: pageData } = await supabase
    .from("page_settings")
    .select("data")
    .eq("type", `group_sports`)
    .single();

  const groups = pageData?.data || [];
  return <GroupList type="sports" groups={groups} />;
}
