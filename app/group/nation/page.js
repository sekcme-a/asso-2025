import Layout from "@/components/Layout";
import GroupList from "../GroupList";
import { createMetadata } from "@/utils/metadata";

export async function generateMetadata() {
  return createMetadata({
    title: "전국체육회현황",
    description: "대한생활체육회의 전국체육회현황입니다",
    url: "/group/nation",
  });
}

const Group = () => {
  return (
    <Layout category="nation" groupText="단체소개" title="전국체육회현황">
      <GroupList type="nation" />
    </Layout>
  );
};

export default Group;
