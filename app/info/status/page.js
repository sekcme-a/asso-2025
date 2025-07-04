import Layout from "@/components/Layout";
import { createMetadata } from "@/utils/metadata";
import { createServerSupabaseClient } from "@/utils/supabase/server";
import Image from "next/image";

export async function generateMetadata() {
  return createMetadata({
    title: "임원현황",
    description: "현재 대한생활체육회의 임원현황을 소개드립니다.",
    url: "/info/status",
  });
}

const Status = async () => {
  const supabase = await createServerSupabaseClient();

  const { data: positionData } = await supabase
    .from("page_settings")
    .select("data")
    .eq("type", "info_status_group")
    .single();

  const positions = positionData.data;

  const statusList = await Promise.all(
    positions
      .map(async (position) => {
        if (position) {
          const { data } = await supabase
            .from("page_settings")
            .select("data")
            .eq("type", `info_status_position_${position.id}`)
            .single();

          if (data) {
            return { position: position.text, members: data.data };
          }
        }
      })
      .filter(Boolean)
  );

  return (
    <Layout category="status" groupText="체육회소개" title="임원현황">
      <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-3 gap-y-8">
        {statusList.map((position) =>
          position?.members?.map((member, index) => (
            <li
              key={index}
              className="border-[1px] border-gray-300 rounded-md overflow-hidden"
            >
              <div className="text-center py-2 bg-blue-800 text-white">
                <p className="font-semibold text-lg">{position.position}</p>
              </div>
              <div className="flex py-2 px-2 flex-col lg:flex-row items-center gap-3">
                <div className="w-[25%] min-w-24 max-h-28 aspect-square relative mr-2 ">
                  <Image
                    src={member.images[0]}
                    alt={member.name}
                    fill
                    objectFit="cover"
                    className="object-cover rounded-md"
                  />
                </div>
                <div className="flex flex-1 w-full">
                  <div className="mr-4 font-semibold ">
                    <p className="">성명</p>
                    <p className="">프로필</p>
                  </div>
                  <div className="flex-1 whitespace-pre-line">
                    <p>{member.name}</p>
                    <p className="leading-snug">{member.profile}</p>
                  </div>
                </div>
              </div>
            </li>
          ))
        )}
      </ul>
    </Layout>
  );
};

export default Status;
