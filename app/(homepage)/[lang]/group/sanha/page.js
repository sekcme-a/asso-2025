import { createServerSupabaseClient } from "@/utils/supabase/server";
import GroupList from "@/app/(homepage)/(korean)/group/GroupList";
import { createMetadata } from "@/utils/metadata";
export const metadata = createMetadata({
  title: "Affiliated Organizations",
  description:
    "Introducing the various affiliated organizations partner with KSFAA.",
  url: "/en/group/sanha",
});
export default async function Nation() {
  const supabase = await createServerSupabaseClient();
  const { data } = await supabase
    .from("organizations")
    .select("id, name_en, leader, logo_url, description_en")
    .eq("type", `sanha`);

  return <GroupList type="sanha" groups={data} />;
}
