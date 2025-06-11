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
      <div className="flex px-3 md:px-32 mt-9">
        <section className="w-48 hidden md:block">
          <PcLeftNavbar group="알림마당" category={category} />
        </section>
        <section className="flex-1 md:ml-10">
          <PostList category={category} page={page} search={search} />
        </section>
      </div>
    </>
  );
};

export default Notice;
