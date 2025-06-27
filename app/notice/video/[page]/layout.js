import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HeadBanner from "../../[category]/[page]/components/HeadBanner";
import PcLeftNavbar from "@/components/PcLeftNavbar";

const NoticeLayout = ({ children, params, searchParams }) => {
  const { category, page } = params;

  return (
    <>
      <Navbar />
      <main className="mb-20">
        <div key={category}>
          <HeadBanner category="video" />
        </div>
        <div className="flex px-3 md:px-5 lg:px-10 xl:px-32 mt-9">
          <section className="w-48 hidden md:block">
            <PcLeftNavbar group="알림마당" category="video" />
          </section>
          <section className="flex-1 md:ml-10">{children}</section>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default NoticeLayout;
