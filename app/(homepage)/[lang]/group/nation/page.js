import { createServerSupabaseClient } from "@/utils/supabase/server";
import GroupList from "../GroupList";
import { createMetadata } from "@/utils/metadata";
export const metadata = createMetadata({
  title: "National Organizations",
  description:
    "Status and information of KSFAA's national sports organizations across Korea.",
  url: "/en/group/nation",
});
export default async function Nation() {
  const supabase = await createServerSupabaseClient();

  const { data: pageData } = await supabase
    .from("page_settings")
    .select("data")
    .eq("type", `group_nation`)
    .single();

  const groups = pageData?.data || [];
  return <GroupList type="nation" groups={groups} />;
}
