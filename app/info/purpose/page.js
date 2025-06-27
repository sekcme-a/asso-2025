import HeadBanner from "@/app/notice/[category]/[page]/components/HeadBanner";
import Layout from "@/components/Layout";
import { createMetadata } from "@/utils/metadata";
import { createServerSupabaseClient } from "@/utils/supabase/server";
import Image from "next/image";

export async function generateMetadata() {
  return createMetadata({
    title: "설립목적",
    description:
      "대한생활체육회의 설립목적을 소개합니다 - 스포츠가 최고의 국민건강 복지다.",
    url: "/info/purpose",
  });
}

const Purpose = async () => {
  const supabase = await createServerSupabaseClient();

  const { data } = await supabase
    .from("page_settings")
    .select("data")
    .eq("type", "info_purpose")
    .single();

  return (
    <Layout category="purpose" groupText="체육회소개" title="설립목적">
      <div
        className="flex items-center 
      gap-5 py-3 px-2 md:px-5
      border-[2px] border-gray-200
      break-keep text-center md:text-start 
      RESPONSIVE flex-col md:flex-row
      "
      >
        <div className="w-[10%] min-w-32 aspect-square relative">
          <Image
            src="/images/logo-circle.png"
            alt="대한생활체육회 로고"
            fill
            objectFit="contain"
          />
        </div>
        <div>
          <h2>
            대한생활체육회는 스포츠가 최고의 국민건강 복지라는 신념 아래,
            생활체육 활성화를 통해 국민 건강과 복리 증진에 기여하고자 다음의
            목적 사업을 운영하고 있습니다.
          </h2>
        </div>
      </div>

      <ul className="mt-5">
        {data?.data?.map((item, index) => (
          <li
            key={index}
            className="border-[1px] border-gray-300 rounded-md
        py-3 px-4 md:px-5 my-3 
        font-semibold md:text-lg flex break-keep leading-snug
        transition-all duration-300 ease-in-out
        hover:bg-blue-600 hover:text-white hover:border-blue-800 hover:shadow-md hover:-translate-y-1
        cursor-default
      "
          >
            <span className="mr-1">{index + 1}.</span>
            <p>{item.text}</p>
          </li>
        ))}
      </ul>
    </Layout>
  );
};

export default Purpose;
