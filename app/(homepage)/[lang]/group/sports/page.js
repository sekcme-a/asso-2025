import { createServerSupabaseClient } from "@/utils/supabase/server";
import GroupList from "@/app/(homepage)/(korean)/group/GroupList";
import { createMetadata } from "@/utils/metadata";

export const metadata = createMetadata({
  title: "Sports by Discipline",
  description:
    "Introduction to the operational status of various sports disciplines managed by KSFAA.",
  url: "/en/group/sports",
});

export default async function Nation() {
  const supabase = await createServerSupabaseClient();

  const { data } = await supabase
    .from("organizations")
    .select("id, name_en, leader, logo_url, description_en")
    .eq("type", `sports`);

  return <GroupList type="sports" groups={data} />;
}
