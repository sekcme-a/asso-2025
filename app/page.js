import Navbar from "@/components/Navbar";
import Header from "./components/Header";
import MainTopics from "./components/MainTopics";
import GoTo from "./components/GoTo";
import Video from "./components/Video";
import Footer from "@/components/Footer";
export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Header />
        <div className="px-5 md:px-24">
          <GoTo />
        </div>
        <Video />
        <div className="px-5 md:px-24">
          <MainTopics />
        </div>
      </main>
      <Footer />
    </>
  );
}
