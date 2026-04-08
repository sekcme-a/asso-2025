import Navbar from "@/components/Navbar";
import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";
import HomeTop from "../(korean)/zz_components/HomeTop";
import LiverStatistics from "../(korean)/zz_components/LiveStatistics";
import ScrollVision from "../(korean)/zz_components/ScrollVision";
import WellenessGrid from "../(korean)/zz_components/WellnessGrid";
import CTA from "../(korean)/zz_components/CTA";
import MagazineNews from "../(korean)/zz_components/MagazineNews";
import PhotoGallery from "../(korean)/zz_components/PhotoGallery";
import VideoGallery from "../(korean)/zz_components/VideoGallery";
import MainBoardFeed from "../(korean)/zz_components/MainBoardFeed";
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
