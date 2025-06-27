import HeadBanner from "@/app/notice/[category]/[page]/components/HeadBanner";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { generateMetadata } from "./metadata";

export { generateMetadata };

const PostLayout = ({ children, params }) => {
  const { category } = params;

  return (
    <>
      <Navbar />
      <main className="mb-20">{children}</main>
      <Footer />
    </>
  );
};
export default PostLayout;
