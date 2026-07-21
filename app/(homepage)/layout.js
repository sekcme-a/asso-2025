import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

import metadata from "../metadata";
import ScrollToTop from "@/components/ScrollToTop";
import PopupModal from "@/components/PopupModal"; // 팝업 컴포넌트 불러오기

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export { metadata };
export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <meta
          name="naver-site-verification"
          content="c551c54c615fa8b95537e7834e49aa0c067c9978"
        />
        <meta
          name="google-site-verification"
          content="h0jRizviYwbetdIjDK5dX1iXSEiLWvRJ_JqBAnc7nfg"
        />
      </head>
      <body className="min-h-full flex flex-col">
        <Navbar />{" "}
        <main>
          {children}
          <ScrollToTop />
        </main>
        <Footer />
        <PopupModal /> {/* 여기에 팝업 컴포넌트 추가 */}
      </body>
    </html>
  );
}