import HomeTop from "./zz_components/HomeTop";
import LiverStatistics from "./zz_components/LiveStatistics";
import ScrollVision from "./zz_components/ScrollVision";
import WellenessGrid from "./zz_components/WellnessGrid";
import CTA from "./zz_components/CTA";
import MagazineNews from "./zz_components/MagazineNews";
import PhotoGallery from "./zz_components/PhotoGallery";
import VideoGalleryClient from "./zz_components/VideoGallery/VideoGalleryClient";
import VideoGallery from "./zz_components/VideoGallery";
import MainBoardFeed from "./zz_components/MainBoardFeed";
import Footer from "@/components/Footer";

export default function Home({ params }) {
  return (
    <div className="min-h-screen">
      <HomeTop />
      <ScrollVision />

      <LiverStatistics />

      <WellenessGrid />
      <MagazineNews />

      <MainBoardFeed params={params} />
      <PhotoGallery />
      <VideoGallery />
      <CTA />
    </div>
  );
}
