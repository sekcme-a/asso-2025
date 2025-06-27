import Layout from "@/components/Layout";
import MouList from "./MouList";
import { createMetadata } from "@/utils/metadata";

export async function generateMetadata() {
  return createMetadata({
    title: "협력기관",
    description: "대한생활체육회와 협력하고있는 기관들을 소개합니다.",
    url: "/mou/mou",
  });
}

const Mou = () => {
  return (
    <Layout category="mou" groupText="협력기관" title="협력기관">
      <MouList />
    </Layout>
  );
};

export default Mou;
