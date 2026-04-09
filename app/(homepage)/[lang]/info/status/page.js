import { createServerSupabaseClient } from "@/utils/supabase/server";
import StatusPage from "@/app/(homepage)/(korean)/info/status/StatusPage";
import { createMetadata } from "@/utils/metadata";

export const metadata = createMetadata({
  title: "Officers",
  description:
    "Introduction to the current status of KSFAA officers and executive members.",
  url: "/en/info/status",
});
export default async function Status() {
  const supabase = await createServerSupabaseClient();
  const { data: positionData } = await supabase
    .from("page_settings")
    .select("data")
    .eq("type", "info_status_group")
    .single();
  const positions = positionData?.data || [];

  // 2. 각 직책별 멤버 데이터 호출
  const statusList = await Promise.all(
    positions.map(async (position) => {
      if (!position) return null;
      const { data } = await supabase
        .from("page_settings")
        .select("data")
        .eq("type", `info_status_position_${position.id}`)
        .single();

      if (data) {
        return { position: position.text, members: data.data };
      }
      return null;
    }),
  );

  const filteredStatusList = statusList.filter(Boolean);
  return <StatusPage statusList={filteredStatusList} />;
}
