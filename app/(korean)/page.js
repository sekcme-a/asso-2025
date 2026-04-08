import Navbar from "@/components/Navbar";
import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";
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

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />

      <HomeTop />
      <ScrollVision />

      <LiverStatistics />

      <WellenessGrid />
      <MagazineNews />

      <MainBoardFeed />
      <PhotoGallery />
      <VideoGallery />
      <CTA />
      <Footer />
    </main>
  );
}
