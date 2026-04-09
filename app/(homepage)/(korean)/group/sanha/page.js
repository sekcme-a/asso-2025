import { createServerSupabaseClient } from "@/utils/supabase/server";
import GroupList from "../GroupList";
import { createMetadata } from "@/utils/metadata";

export const metadata = createMetadata({
  title: "산하단체",
  description: "대한생활체육회와 함께하는 산하단체를 소개합니다.",
  url: "/group/sanha",
});

export default async function Nation() {
  const supabase = await createServerSupabaseClient();

  const { data: pageData } = await supabase
    .from("page_settings")
    .select("data")
    .eq("type", `group_sanha`)
    .single();

  const groups = pageData?.data || [];
  return <GroupList type="sanha" groups={groups} />;
}
