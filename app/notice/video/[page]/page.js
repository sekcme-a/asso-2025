import HeadBanner from "../../[category]/[page]/components/HeadBanner";
import PcLeftNavbar from "@/components/PcLeftNavbar";
import PostList from "@/components/PostList";
import { createMetadata } from "@/utils/metadata";

export async function generateMetadata({ params }) {
  return createMetadata({
    title: "동영상갤러리",
    description: `동영상갤러리 - 대한생활체육회의 활동 영상자료 모음입니다.`,
    url: `/notice/video/1`,
  });
}

const Video = ({ params, searchParams }) => {
  const { category, page } = params;
  const { search } = searchParams;

  return (
    <>
      <PostList
        category="video"
        page={page}
        search={search}
        isGallery={true}
        pageSize={12}
      />
    </>
  );
};

export default Video;
