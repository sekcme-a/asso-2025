import Layout from "@/components/Layout";
import GroupList from "../GroupList";
import { createMetadata } from "@/utils/metadata";

export async function generateMetadata() {
  return createMetadata({
    title: "산하단체",
    description: "대한생활체육회와 함께하는 산하단체를 소개합니다.",
    url: "/group/sanha",
  });
}

const Group = () => {
  return (
    <Layout category="sanha" groupText="단체소개" title="산하단체">
      <GroupList type="sanha" />
    </Layout>
  );
};

export default Group;
