"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function AdminNavbar() {
  const pathname = usePathname();

  const menuItems = [
    { name: "단체 관리", href: "/admin/organizations" },
    { name: "회원 관리", href: "/admin/members" },
    { name: "콘텐츠 관리", href: "/admin/contents" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 bg-gray-950 text-white z-50 shadow-2xl">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <Link
            href="/admin"
            className="text-lg font-black tracking-tighter flex items-center gap-2"
          >
            <span className="bg-blue-600 px-2 py-0.5 rounded text-xs">
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
                    ? "bg-white/10 text-white"
                    : "text-gray-400 hover:text-white"
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
            className="text-xs font-bold text-gray-500 hover:text-white transition-colors"
          >
            사이트 바로가기
          </Link>
          <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-[10px] font-black">
            AD
          </div>
        </div>
      </div>
    </nav>
  );
}
