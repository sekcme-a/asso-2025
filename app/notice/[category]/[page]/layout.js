import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HeadBanner from "./components/HeadBanner";
import PcLeftNavbar from "@/components/PcLeftNavbar";
import { NAVBAR_ITEM } from "@/data/navbar";
import { createMetadata } from "@/utils/metadata";

export async function generateMetadata({ params }) {
  const { category } = params;
  const noticeGroup = NAVBAR_ITEM.find((group) => group.text === "알림마당");
  const noticeGroupItems = noticeGroup?.items || [];
  const sortedItems = [
    ...noticeGroupItems.filter((item) =>
      item.link.split("/").includes(category)
    ),
    ...noticeGroupItems.filter(
      (item) => !item.link.split("/").includes(category)
    ),
  ];
  return createMetadata({
    title: sortedItems[0].text,
    description: `대한생활체육회의 모든 ${sortedItems[0].text}를 확인해보세요.`,
    url: `/notice/${category}/1`,
  });
}

const NoticeLayout = ({ children, params, searchParams }) => {
  const { category, page } = params;

  return (
    <>
      <Navbar />
      <main className="mb-20">
        <div key={category}>
          <HeadBanner category={category} />
        </div>
        <div className="flex px-5 md:px-5 lg:px-10 xl:px-32 mt-9">
          <section className="w-48 hidden md:block">
            <PcLeftNavbar group="알림마당" category={category} />
          </section>
          <section className="flex-1 md:ml-10">{children}</section>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default NoticeLayout;
