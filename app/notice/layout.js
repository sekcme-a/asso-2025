import Navbar from "@/components/Navbar";
import HeadBanner from "./[category]/[page]/components/HeadBanner";
import Footer from "@/components/Footer";

const NoticeLayout = ({ children, params, searchParams }) => {
  const { category, page } = params;

  return (
    <>
      <Navbar />
      <main>
        <HeadBanner category={category} />
        {children}
      </main>
      <Footer />
    </>
  );
};

export default NoticeLayout;
