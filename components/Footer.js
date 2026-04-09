"use client";

import React from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import Image from "next/image";

export default function Footer() {
  const params = useParams();
  const isEnglish = params.lang === "en";

  // 번역 헬퍼 함수
  const t = (ko, en) => (isEnglish ? en : ko);

  // 다국어 메뉴 데이터 생략 (기존과 동일)
  const footerMenu = [
    /* ... 기존 메뉴 데이터 ... */
    {
      title: t("체육회 소개", "About KSFAA"),
      links: [
        { name: t("총재 인사말", "President's Message"), href: "/info/greet" },
        { name: t("설립목적", "Mission & Purpose"), href: "/info/purpose" },
        { name: t("중앙조직도", "Organization"), href: "/info/chart" },
        { name: t("임원현황", "Officers"), href: "/info/status" },
        { name: t("오시는 길", "Location"), href: "/info/location" },
      ],
    },
    {
      title: t("단체 소개", "Our Groups"),
      links: [
        {
          name: t("전국 체육회 현황", "National Status"),
          href: "/group/nation",
        },
        {
          name: t("국제 체육회 현황", "International Status"),
          href: "/group/internation",
        },
        { name: t("종목별 운영현황", "Disciplines"), href: "/group/sports" },
        { name: t("산하단체", "Subsidiaries"), href: "/group/sanha" },
      ],
    },
    {
      title: t("알림마당", "Notice Board"),
      links: [
        { name: t("공지사항", "Notice"), href: "/notice/anouncement" },
        { name: t("언론보도", "Press"), href: "/notice/media" },
        { name: t("포토갤러리", "Photo Gallery"), href: "/notice/photo" },
        { name: t("동영상갤러리", "Video Gallery"), href: "/notice/video" },
        { name: t("대회/행사일정", "Schedule"), href: "/notice/schedule" },
        { name: t("자료실", "Archive"), href: "/notice/reference" },
      ],
    },
    {
      title: t("협력 및 후원", "Partnership"),
      links: [
        { name: t("협력업체", "Partners"), href: "/mou/mou" },
        { name: t("후원안내", "Sponsorship Info"), href: "/support" },
        { name: t("후원확인", "Check Donation"), href: "/notice/sup" },
      ],
    },
  ];

  return (
    <footer className="bg-gray-900 text-white pt-24 pb-12 px-6">
      <div className="max-w-7xl mx-auto">
        {/* TOP: BRANDING & MENU GRID */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-12 mb-24">
          <div className="col-span-2 lg:col-span-1">
            <div className="relative w-[180px] h-[60px] mb-6 ">
              <Image
                src="/images/logo_white.png"
                alt={t("대한생활체육회", "KSFAA")}
                fill
                className="object-contain"
              />
            </div>
            <p className="text-gray-400 text-sm font-medium leading-relaxed break-keep mb-8">
              {t(
                "스포츠로 하나 되는 건강한 대한민국, 국민 모두가 주인공입니다.",
                "A healthy Korea united through sports, where every citizen is a protagonist.",
              )}
            </p>
          </div>

          {footerMenu.map((group, i) => (
            <nav key={i} className="space-y-4" aria-label={group.title}>
              <h3 className="text-xs font-black tracking-[0.2em] text-gray-500 uppercase">
                {group.title}
              </h3>
              <ul className="space-y-2">
                {group.links.map((link, j) => (
                  <li key={j}>
                    <Link
                      href={isEnglish ? `/en${link.href}` : link.href}
                      className="text-[15px] font-bold text-gray-300 hover:text-white hover:translate-x-1 transition-all inline-block"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        {/* BOTTOM: INFO & COPYRIGHT */}
        <div className="pt-4 border-t border-white/5">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-10">
            <address className="not-italic space-y-4 text-xs font-bold text-gray-500 leading-relaxed">
              <div className="flex flex-wrap gap-x-6 gap-y-2">
                <span>
                  {t(
                    "주소: 서울특별시 금천구 가산동 459-6 SH드림 307호",
                    "Address: Room 307, SH Dream, 459-6 Gasan-dong, Geumcheon-gu, Seoul, South Korea",
                  )}
                </span>
                <span>
                  {t("대표전화", "Tel")}:{" "}
                  <a href="tel:02-2088-7508" className="hover:text-gray-300">
                    02-2088-7508
                  </a>
                </span>
              </div>

              <div className="pt-4">
                <p className="opacity-40 uppercase tracking-widest">
                  © 2026 {t("대한생활체육회", "KSFAA")}. ALL RIGHTS RESERVED.
                </p>
              </div>
            </address>

            {/* 관리자 페이지 이동 버튼 추가 */}
            <div className="flex items-center gap-4">
              <Link
                href="/admin/hallway"
                className="text-[10px] font-black uppercase tracking-widest text-gray-500 border border-gray-700 px-4 py-2 rounded-lg hover:bg-white hover:text-gray-900 hover:border-white transition-all"
              >
                {t("체육회 관리페이지", "Admin Console")}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
