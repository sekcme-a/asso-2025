// components/layouts/IntroPageLayout.jsx
import HeadBanner from "@/app/notice/[category]/[page]/components/HeadBanner";
import PcLeftNavbar from "@/components/PcLeftNavbar";

const Layout = ({ category, groupText, title, children }) => {
  return (
    <>
      <HeadBanner category={category} groupText={groupText} />
      <div className="flex px-5 lg:px-10 xl:px-32 mt-9">
        <section className="w-48 hidden md:block">
          <PcLeftNavbar group={groupText} category={category} />
        </section>
        <section className="flex-1 md:ml-10">
          <div className="border-l-4 md:border-l-6 border-l-blue-800 pl-3">
            <h1 className="text-2xl md:text-3xl font-bold mb-10 leading-none">
              {title}
            </h1>
          </div>
          {children}
        </section>
      </div>
    </>
  );
};

export default Layout;
