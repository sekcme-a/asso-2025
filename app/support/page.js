import Layout from "@/components/Layout";
import { createMetadata } from "@/utils/metadata";
import Image from "next/image";

export async function generateMetadata() {
  return createMetadata({
    title: "후원안내",
    description:
      "대한생활체육회는 기획재정부 지정기부금단체로서 기부금은 지정기부금에 해당되어 세제상의 혜택을 받을 수 있습니다.",
    url: "/support",
  });
}

const Support = () => {
  return (
    <Layout category="support" groupText="후원안내" title="후원안내">
      <h2 className="font-semibold md:text-lg">
        대한생활체육회는 기획재정부 지정기부금단체로서 생활체육의 발전을 위해
        기부해주신 기부금은 지정기부금에 해당되어 다음과 같은 세제상의 혜택을
        받을 수 있습니다.
      </h2>

      <h3 className="mt-10 text-lg font-bold text-blue-800">세제혜택절차</h3>
      <div className="h-[3px] w-10 bg-blue-700 mt-1" />
      <div className="lg:w-[80%]">
        <Image
          src="/images/support/support1.png"
          alt="세제혜택절차"
          width={0}
          height={0}
          sizes="100vw"
          style={{ width: "100%", height: "auto" }}
        />
      </div>
      <h3 className="mt-10 text-lg font-bold text-blue-800">후원참여방법</h3>
      <div className="h-[3px] w-10 bg-blue-700 mt-1" />
      <div className="lg:w-[80%] mt-10">
        <Image
          src="/images/support/support2.png"
          alt="세제혜택절차"
          width={0}
          height={0}
          sizes="100vw"
          style={{ width: "100%", height: "auto" }}
        />
      </div>
    </Layout>
  );
};

export default Support;
