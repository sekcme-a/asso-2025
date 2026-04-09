import { createServerSupabaseClient } from "@/utils/supabase/server";
import GroupList from "../GroupList";
import { createMetadata } from "@/utils/metadata";
export const metadata = createMetadata({
  title: "Affiliated Organizations",
  description:
    "Introducing the various affiliated organizations partner with KSFAA.",
  url: "/en/group/sanha",
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
