"use client"; // 클라이언트 기능을 사용하기 위해 추가

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { createBrowserSupabaseClient } from "@/utils/supabase/client";
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({ children }) {
  const router = useRouter();
  const pathname = usePathname();
  const supabase = createBrowserSupabaseClient();
  const [checkingAuth, setCheckingAuth] = useState(true);

  useEffect(() => {
    const checkUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      // 로그인이 안 되어 있고, 현재 페이지가 로그인 페이지가 아닐 경우
      if (!user && pathname !== "/login") {
        alert("로그인이 필요한 서비스입니다. 로그인 페이지로 이동합니다.");
        router.push("/login");
      } else {
        setCheckingAuth(false);
      }
    };

    checkUser();
  }, [pathname, router, supabase]);

  return (
    <html
      lang="ko"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {/* 체크 중일 때는 빈 화면이나 로딩 스피너를 보여주어 깜빡임을 방지합니다 */}
        {checkingAuth && pathname !== "/login" ? (
          <div className="flex h-screen items-center justify-center">
            <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : (
          <main>{children}</main>
        )}
      </body>
    </html>
  );
}
