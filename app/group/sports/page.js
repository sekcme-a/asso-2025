import Layout from "@/components/Layout";
import GroupList from "../GroupList";
import { createMetadata } from "@/utils/metadata";

export async function generateMetadata() {
  return createMetadata({
    title: "종목별 운영현황",
    description: "대한생활체육회의 종목별 운영현황을 소개합니다.",
    url: "/group/sports",
  });
}

const Group = () => {
  return (
    <Layout category="sports" groupText="단체소개" title="종목별 운영현황">
      <GroupList type="sports" />
    </Layout>
  );
};

export default Group;
