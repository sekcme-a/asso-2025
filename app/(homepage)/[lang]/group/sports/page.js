import { createServerSupabaseClient } from "@/utils/supabase/server";
import GroupList from "../GroupList";
import { createMetadata } from "@/utils/metadata";

export const metadata = createMetadata({
  title: "Sports by Discipline",
  description:
    "Introduction to the operational status of various sports disciplines managed by KSFAA.",
  url: "/en/group/sports",
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
