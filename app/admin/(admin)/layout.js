"use client"; // 훅 사용을 위해 추가

import { usePathname } from "next/navigation";
import AdminNavbar from "./components/Navbar";

export default function RootLayout({ children }) {
  const pathname = usePathname();

  // navbar를 숨길 경로 설정
  const hideNavbar = pathname === "/admin/hallway";

  return (
    <>
      {!hideNavbar && <AdminNavbar />}
      {children}
    </>
  );
}
