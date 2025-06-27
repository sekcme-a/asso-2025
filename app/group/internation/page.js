import Layout from "@/components/Layout";
import GroupList from "../GroupList";
import { createMetadata } from "@/utils/metadata";

export async function generateMetadata() {
  return createMetadata({
    title: "국제체육회현황",
    description: "대한생활체육회의 국제체육회현황을 소개합니다.",
    url: "/group/internation",
  });
}

const Group = () => {
  return (
    <Layout category="internation" groupText="단체소개" title="국제체육회현황">
      <GroupList type="internation" />
    </Layout>
  );
};

export default Group;
