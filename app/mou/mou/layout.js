import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

const InfoLayout = ({ children }) => {
  return (
    <>
      <Navbar />
      <main className="mb-20">{children}</main>
      <Footer />
    </>
  );
};

export default InfoLayout;
