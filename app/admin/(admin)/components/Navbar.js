"use client";

import Link from "next/link";
import { useParams, usePathname } from "next/navigation";

export default function AdminNavbar() {
  const pathname = usePathname();
  const { orgId } = useParams();

  const menuItems = [
    { name: "단체소개 관리", href: `/admin/organizations/${orgId}` },
    { name: "회원 관리", href: `/admin/organizations/${orgId}/members` },
    {
      name: "공지사항 관리",
      href: `/admin/organizations/${orgId}/announcements`,
    },

    { name: "대회 관리", href: `/admin/organizations/${orgId}/tournaments` },
    { name: "관리자 관리", href: `/admin/organizations/${orgId}/auth` },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 bg-gray-950 text-white z-50 shadow-2xl">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <div
            href="/admin/"
            className="text-lg font-black tracking-tighter flex items-center gap-2"
          >
            대한생활체육회 관리
          </div>

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
