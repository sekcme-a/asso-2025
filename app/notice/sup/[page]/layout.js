import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HeadBanner from "../../[category]/[page]/components/HeadBanner";
import PcLeftNavbar from "@/components/PcLeftNavbar";

const SupLayout = ({ children, params, searchParams }) => {
  const { category, page } = params;

  return (
    <>
      <Navbar />
      <main className="mb-20">
        <div key={category}>
          <HeadBanner category="photo" />
        </div>
        <div className="flex px-3 md:px-5 lg:px-10 xl:px-32 mt-9">
          <section className="w-48 hidden md:block">
            <PcLeftNavbar group="후원안내" category="sup" />
          </section>
          <section className="flex-1 md:ml-10">{children}</section>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default SupLayout;
