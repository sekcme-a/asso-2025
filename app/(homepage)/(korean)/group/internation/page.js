import { createServerSupabaseClient } from "@/utils/supabase/server";
import GroupList from "../GroupList";
import { createMetadata } from "@/utils/metadata";

export const metadata = createMetadata({
  title: "국제체육회현황",
  description: "대한생활체육회의 국제체육회현황을 소개합니다.",
  url: "/group/internation",
});

export default async function Nation() {
  const supabase = await createServerSupabaseClient();

  const { data: pageData } = await supabase
    .from("page_settings")
    .select("data")
    .eq("type", `group_internation`)
    .single();

  const groups = pageData?.data || [];
  return <GroupList type="internation" groups={groups} />;
}
