"use client";
import React from "react";
import Link from "next/link";

export default function Footer() {
  const footerMenu = [
    {
      title: "체육회 소개",
      links: [
        { name: "총재 인사말", href: "/about/greeting" },
        { name: "설립목적", href: "/about/purpose" },
        { name: "중앙조직도", href: "/about/organization" },
        { name: "임원현황", href: "/about/officers" },
        { name: "오시는 길", href: "/about/location" },
      ],
    },
    {
      title: "단체 소개",
      links: [
        { name: "전국 체육회 현황", href: "/group/national" },
        { name: "국제 체육회 현황", href: "/group/international" },
        { name: "종목별 운영현황", href: "/group/disciplines" },
        { name: "산하단체", href: "/group/subsidiaries" },
      ],
    },
    {
      title: "알림마당",
      links: [
        { name: "공지사항", href: "/notice" },
        { name: "언론보도", href: "/press" },
        { name: "포토갤러리", href: "/gallery" },
        { name: "동영상갤러리", href: "/video" },
        { name: "대회신청", href: "/apply" },
        { name: "대회/행사일정", href: "/schedule" },
        { name: "자료실", href: "/archive" },
      ],
    },
    {
      title: "협력 및 후원",
      links: [
        { name: "협력업체", href: "/partners" },
        { name: "후원안내", href: "/support/info" },
        { name: "후원확인", href: "/support/check" },
      ],
    },
  ];

  return (
    <footer className="bg-gray-900 text-white pt-24 pb-12 px-6">
      <div className="max-w-7xl mx-auto">
        {/* TOP: BRANDING & MENU GRID */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-12 mb-24">
          {/* BRAND COLUMN */}
          <div className="col-span-2 lg:col-span-1">
            <h2 className="text-2xl font-black tracking-tighter mb-6">
              대한생활체육회
              <span className="block text-xs font-bold text-blue-500 tracking-[0.3em] mt-2 uppercase">
                Korea Sports For All Athletic Association
              </span>
            </h2>
            <p className="text-gray-400 text-sm font-medium leading-relaxed break-keep mb-8">
              스포츠로 하나 되는 건강한 대한민국, <br /> 국민 모두가
              주인공입니다.
            </p>
          </div>

          {/* MENU COLUMNS */}
          {footerMenu.map((group, i) => (
            <div key={i} className="space-y-6">
              <h3 className="text-xs font-black tracking-[0.2em] text-gray-500 uppercase">
                {group.title}
              </h3>
              <ul className="space-y-4">
                {group.links.map((link, j) => (
                  <li key={j}>
                    <Link
                      href={link.href}
                      className="text-[15px] font-bold text-gray-300 hover:text-white hover:translate-x-1 transition-all inline-block"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* BOTTOM: INFO & COPYRIGHT */}
        <div className="pt-12 border-t border-white/5">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-10">
            <div className="space-y-4 text-xs font-bold text-gray-500 leading-relaxed">
              <div className="flex flex-wrap gap-x-6 gap-y-2">
                <span>
                  주소: 서울특별시 특정구 특정로 123 대한생활체육회 빌딩
                </span>
                <span>대표전화: 02-1234-5678</span>
                <span>팩스: 02-1234-5679</span>
              </div>
              {/* <div className="flex flex-wrap gap-x-6 gap-y-2">
                <Link
                  href="/privacy"
                  className="text-gray-300 hover:text-blue-500"
                >
                  개인정보처리방침
                </Link>
                <Link
                  href="/terms"
                  className="text-gray-300 hover:text-blue-500"
                >
                  이용약관
                </Link>
                <Link
                  href="/email-policy"
                  className="text-gray-300 hover:text-blue-500"
                >
                  이메일무단수집거부
                </Link>
              </div> */}
              <p className="mt-8 opacity-40 uppercase tracking-widest">
                © 2026 대한생활체육회. ALL RIGHTS RESERVED.
              </p>
            </div>

            {/* SNS & TOP BUTTON */}
            {/* <div className="flex items-center gap-4">
              <div className="flex gap-2">
                {["FB", "IG", "YT", "B"].map((sns) => (
                  <button
                    key={sns}
                    className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-[10px] font-black hover:bg-blue-600 transition-all"
                  >
                    {sns}
                  </button>
                ))}
              </div>
              <button
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                className="px-6 py-3 bg-white text-gray-900 rounded-full font-black text-xs hover:bg-blue-600 hover:text-white transition-all shadow-xl"
              >
                TOP ↑
              </button>
            </div> */}
          </div>
        </div>
      </div>
    </footer>
  );
}
