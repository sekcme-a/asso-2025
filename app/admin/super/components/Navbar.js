"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function AdminNavbar() {
  const pathname = usePathname();

  const menuItems = [
    { name: "단체 관리", href: "/admin/super/organizations" },
    { name: "게시물 관리", href: "/admin/super/posts" },
    { name: "보도자료 관리", href: "/admin/super/media" },
    { name: "문의 관리", href: "/admin/super/inquiries" },
  ];

  return (
    // 배경을 bg-white로, 텍스트 기본색을 bg-gray-900으로 변경했습니다.
    <nav className="fixed top-0 left-0 right-0 bg-white text-gray-900 z-50 shadow-sm border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <Link
            href="/admin"
            className="text-lg font-black tracking-tighter flex items-center gap-2"
          >
            <span className="bg-blue-600 px-2 py-0.5 rounded text-xs text-white">
              ADMIN
            </span>
            대한생활체육회
          </Link>

          <div className="hidden md:flex items-center gap-1">
            {menuItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${
                  pathname === item.href
                    ? "bg-blue-50 text-blue-600" // 활성화 시 연한 파란색 배경에 파란 글씨
                    : "text-gray-500 hover:text-gray-900 hover:bg-gray-50" // 비활성 시 회색 글씨
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-4">
          <Link
            href="/"
            className="text-xs font-bold text-gray-400 hover:text-gray-900 transition-colors"
          >
            사이트 바로가기
          </Link>
          <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-[10px] font-black text-white">
            AD
          </div>
        </div>
      </div>
    </nav>
  );
}
