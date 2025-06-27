import HeadBanner from "../../[category]/[page]/components/HeadBanner";
import PcLeftNavbar from "@/components/PcLeftNavbar";
import PostList from "@/components/PostList";
import { createMetadata } from "@/utils/metadata";

export async function generateMetadata({ params }) {
  return createMetadata({
    title: "포토갤러리",
    description: `포토갤러리 - 대한생활체육회의 활동 포토 갤러리입니다.`,
    url: `/notice/photo/1`,
  });
}

const Photo = ({ params, searchParams }) => {
  const { category, page } = params;
  const { search } = searchParams;

  return (
    <>
      <PostList
        category="photo"
        page={page}
        search={search}
        isGallery={true}
        pageSize={12}
      />
    </>
  );
};

export default Photo;
