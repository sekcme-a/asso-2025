import { createServerSupabaseClient } from "@/utils/supabase/server";
import GroupList from "@/app/(homepage)/(korean)/group/GroupList";
import { createMetadata } from "@/utils/metadata";
export const metadata = createMetadata({
  title: "National Organizations",
  description:
    "Status and information of KSFAA's national sports organizations across Korea.",
  url: "/en/group/nation",
});
export default async function Nation() {
  const supabase = await createServerSupabaseClient();

  const { data } = await supabase
    .from("organizations")
    .select("id, name_en, leader, logo_url, description_en")
    .eq("type", `nation`);

  return <GroupList type="nation" groups={data} />;
}
