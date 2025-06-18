import Header from "@/app/components/Header";
import Navbar from "@/components/Navbar";
import HeadBanner from "./components/HeadBanner";
import PcLeftNavbar from "@/components/PcLeftNavbar";
import PostList from "@/components/PostList";

const Notice = ({ params, searchParams }) => {
  const { category, page } = params;
  const { search } = searchParams;

  return (
    <>
      <PostList category={category} page={page} search={search} />
    </>
  );
};

export default Notice;
