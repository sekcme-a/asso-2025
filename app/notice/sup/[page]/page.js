import PostList from "@/components/PostList";
import { createMetadata } from "@/utils/metadata";

export async function generateMetadata({ params }) {
  return createMetadata({
    title: "후원확인",
    description: `후원확인 - 대한생활체육회 후원 목록입니다.`,
    url: `/notice/sup/1`,
  });
}

const Sup = ({ params, searchParams }) => {
  const { category, page } = params;
  const { search } = searchParams;

  return (
    <>
      <PostList category="support" page={page} search={search} pageSize={12} />
    </>
  );
};

export default Sup;
