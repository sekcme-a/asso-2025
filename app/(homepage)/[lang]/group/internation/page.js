import { createServerSupabaseClient } from "@/utils/supabase/server";
import GroupList from "@/app/(homepage)/(korean)/group/GroupList";
import { createMetadata } from "@/utils/metadata";
export const metadata = createMetadata({
  title: "International Organizations",
  description:
    "Introduction to the international sports organizations affiliated with KSFAA.",
  url: "/en/group/internation",
});
export default async function Nation() {
  const supabase = await createServerSupabaseClient();

  const { data } = await supabase
    .from("organizations")
    .select("id, name_en, leader, logo_url, description_en")
    .eq("type", `internation`);

  return <GroupList type="internation" groups={data} />;
}
