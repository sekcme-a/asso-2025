import { createServerSupabaseClient } from "@/utils/supabase/server";
import GroupList from "../GroupList";
import { createMetadata } from "@/utils/metadata";
export const metadata = createMetadata({
  title: "International Organizations",
  description:
    "Introduction to the international sports organizations affiliated with KSFAA.",
  url: "/en/group/internation",
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
