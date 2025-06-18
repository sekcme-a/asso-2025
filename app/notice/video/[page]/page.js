import HeadBanner from "../../[category]/[page]/components/HeadBanner";
import PcLeftNavbar from "@/components/PcLeftNavbar";
import PostList from "@/components/PostList";

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
