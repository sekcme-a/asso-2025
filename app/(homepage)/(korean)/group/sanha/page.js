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

  const { data } = await supabase
    .from("organizations")
    .select("id, name, leader, logo_url, description")
    .eq("type", `sanha`);
  return <GroupList type="sanha" groups={data} />;
}
