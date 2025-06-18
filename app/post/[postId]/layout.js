import HeadBanner from "@/app/notice/[category]/[page]/components/HeadBanner";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

const PostLayout = ({ children, params }) => {
  const { category } = params;

  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </>
  );
};
export default PostLayout;
