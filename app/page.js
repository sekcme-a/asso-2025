import Navbar from "@/components/Navbar";
import Header from "./components/Header";
import MainTopics from "./components/MainTopics";
import GoTo from "./components/GoTo";
import Video from "./components/Video";
import Footer from "@/components/Footer";
import Notices from "./components/Notices";
import PhotoZone from "./components/PhotoZone";
import VideoZone from "./components/VideoZone";
import Partners from "./components/Partners";
import Image from "next/image";
import BannerZone from "./components/BannerZone";
export default function Home() {
  return (
    <>
      <Navbar />
      <main className="z-0">
        <Header />
        <div className="px-5 md:px-7 lg:px-10 xl:px-24">
          <MainTopics />
        </div>
        <Video />
        {/* <div className="px-5 md:px-24">
          <MainTopics />
        </div> */}
        <div className="px-5 md:px-7 lg:px-10 xl:px-24 bg-gray-100">
          <Notices />
        </div>
        <div className="px-5 md:px-7 lg:px-10 xl:px-24 ">
          <BannerZone />
        </div>
        <div className="px-5 md:px-7 lg:px-10 xl:px-24 md:mb-20">
          <PhotoZone />
          <VideoZone />
        </div>
        <Partners />
      </main>
      <Footer />
    </>
  );
}
