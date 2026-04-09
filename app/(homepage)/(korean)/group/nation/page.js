import { createServerSupabaseClient } from "@/utils/supabase/server";
import GroupList from "../GroupList";
import { createMetadata } from "@/utils/metadata";

export const metadata = createMetadata({
  title: "전국체육회현황",
  description: "대한생활체육회의 전국체육회현황입니다",
  url: "/group/nation",
});

export default async function Nation() {
  const supabase = await createServerSupabaseClient();

  const { data } = await supabase
    .from("organizations")
    .select("id, name, leader, logo_url, description")
    .eq("type", `nation`);

  return <GroupList type="nation" groups={data} />;
}
