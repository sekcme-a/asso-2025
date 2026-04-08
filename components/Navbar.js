"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  // URL이 /en으로 시작하면 영어 모드로 판별
  const isEnglish = pathname.startsWith("/en");
  const lang = isEnglish ? "EN" : "KO";

  // 언어 전환 로직: 기존 한국어 경로는 보존하고 /en만 붙였다 뗐다 합니다.
  const toggleLanguage = (targetLang) => {
    if (targetLang === "EN") {
      if (!isEnglish) {
        // 한국어 -> 영어: 현재 경로 앞에 /en 추가 (단, 홈 / 인 경우 /en 으로 이동)
        const newPath = pathname === "/" ? "/en" : `/en${pathname}`;
        router.push(newPath);
      }
    } else {
      if (isEnglish) {
        // 영어 -> 한국어: 앞의 /en 제거
        const newPath = pathname.replace(/^\/en/, "") || "/";
        router.push(newPath);
      }
    }
    setIsOpen(false);
  };

  // 텍스트 번역 헬퍼
  const t = (ko, en) => (isEnglish ? en : ko);

  // 메뉴 클릭 시 이동할 경로를 생성하는 함수
  const getHref = (path) => (isEnglish ? `/en${path}` : path);

  const menuItems = [
    {
      title: t("체육회 소개", "About"),
      subMenu: [
        { name: t("총재 인사말", "Greetings"), href: "/info/greet" },
        { name: t("설립목적", "Purpose"), href: "/info/purpose" },
        { name: t("중앙조직도", "Organization"), href: "/info/chart" },
        { name: t("임원현황", "Officers"), href: "/info/status" },
        { name: t("오시는 길", "Location"), href: "/info/location" },
      ],
    },
    {
      title: t("단체 소개", "Organizations"),
      subMenu: [
        {
          name: t("전국 체육회 현황", "National Organizations"),
          href: "/group/nation",
        },
        {
          name: t("국제 체육회 현황", "International Organizations"),
          href: "/group/internation",
        },
        {
          name: t("종목별 운영현황", "Sports by Discipline"),
          href: "/group/sports",
        },
        {
          name: t("산하단체", "Affiliated Organizations"),
          href: "/group/sanha",
        },
      ],
    },
    {
      title: t("알림마당", "News & Notice"), // 혹은 Information Center
      subMenu: [
        { name: t("공지사항", "Announcements"), href: "/notice/anouncement" }, // 공적인 알림
        { name: t("언론보도", "Press Release"), href: "/notice/media" }, // 미디어 보도 자료

        { name: t("포토갤러리", "Photo Gallery"), href: "/notice/photo" },
        { name: t("동영상갤러리", "Video Gallery"), href: "/notice/video" },
        {
          name: t("대회/행사일정", "Event Schedule"),
          href: "/notice/schedule",
        }, // 일정 관리
        { name: t("자료실", "Archive"), href: "/notice/reference" }, // 혹은 Resources
      ],
    },
    {
      title: t("협력업체", "Partners"),
      subMenu: [
        { name: t("협력업체 현황", "Partners List"), href: "/mou/mou" },
      ],
    },
    {
      title: t("후원안내", "Sponsorship"),
      subMenu: [
        { name: t("후원안내", "Sponsorship Guide"), href: "/support" },
        {
          name: t("후원확인", "Sponsorship Verification"),
          href: "/notice/sup",
        },
      ],
    },
  ];

  return (
    <nav className="fixed w-full z-[100] bg-white border-b border-gray-200">
      {/* Top Utility Bar */}
      <div className="hidden lg:block bg-gray-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 h-10 flex justify-end items-center gap-6 text-[12px] font-medium text-gray-500">
          <Link
            href={getHref("/login")}
            className="hover:text-blue-600 transition-colors"
          >
            {t("로그인", "Login")}
          </Link>
          <div className="flex items-center gap-2">
            <button
              onClick={() => toggleLanguage("KO")}
              className={
                lang === "KO"
                  ? "text-blue-600 font-bold"
                  : "hover:text-gray-800"
              }
            >
              KOR
            </button>
            <span className="w-[1px] h-3 bg-gray-300"></span>
            <button
              onClick={() => toggleLanguage("EN")}
              className={
                lang === "EN"
                  ? "text-blue-600 font-bold"
                  : "hover:text-gray-800"
              }
            >
              ENG
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link
            href={isEnglish ? "/en" : "/"}
            className="flex items-center gap-3"
          >
            <div className="w-9 h-9 bg-blue-700 rounded-lg flex items-center justify-center text-white font-bold italic text-xl">
              K
            </div>
            <div className="flex flex-col leading-tight">
              <span className="text-lg font-extrabold tracking-tight text-gray-900">
                {t("대한", "")}
                <span className="text-blue-700">{t("생활체육회", "KSA")}</span>
              </span>
              <span className="text-[10px] text-gray-400 font-medium uppercase tracking-widest">
                Korea Sports Association
              </span>
            </div>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center gap-2 h-full">
            {menuItems.map((menu) => (
              <div
                key={menu.title}
                className="group relative h-full flex items-center"
              >
                <button className="px-5 text-[16px] font-semibold text-gray-700 group-hover:text-blue-700 transition-colors">
                  {menu.title}
                </button>

                {/* Dropdown Panel */}
                <div className="absolute top-full left-1/2 -translate-x-1/2 w-48 bg-white border border-gray-100 shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform group-hover:translate-y-0 translate-y-2 py-2 rounded-b-xl">
                  {menu.subMenu.map((sub) => (
                    <Link
                      key={sub.name}
                      href={getHref(sub.href)}
                      className="block px-6 py-2.5 text-[14px] text-gray-600 hover:bg-blue-50 hover:text-blue-700 transition-colors"
                    >
                      {sub.name}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Mobile Toggle */}
          <button className="lg:hidden p-2" onClick={() => setIsOpen(!isOpen)}>
            <div
              className={`w-6 h-0.5 bg-gray-900 transition-all ${isOpen ? "rotate-45 translate-y-1.5" : "mb-1.5"}`}
            />
            <div
              className={`w-6 h-0.5 bg-gray-900 transition-all ${isOpen ? "-rotate-45" : ""}`}
            />
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div className="lg:hidden bg-white border-t border-gray-100 overflow-y-auto max-h-[calc(100vh-80px)]">
          <div className="p-6 bg-gray-100 flex justify-between items-center text-sm font-medium">
            <Link href={getHref("/login")} className="text-gray-600">
              {t("로그인", "Login")}
            </Link>
            <button
              onClick={() => toggleLanguage(isEnglish ? "KO" : "EN")}
              className="text-blue-600 border border-blue-600 px-4 py-1 rounded-full"
            >
              {isEnglish ? "한국어" : "English"}
            </button>
          </div>
          {menuItems.map((menu) => (
            <div
              key={menu.title}
              className="border-b border-gray-50 last:border-none"
            >
              <div className="px-6 py-4 bg-gray-50 font-bold text-gray-900">
                {menu.title}
              </div>
              <div className="grid grid-cols-2 gap-2 p-4">
                {menu.subMenu.map((sub) => (
                  <Link
                    key={sub.name}
                    href={getHref(sub.href)}
                    onClick={() => setIsOpen(false)}
                    className="px-3 py-2 text-[14px] text-gray-600 active:text-blue-700"
                  >
                    • {sub.name}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </nav>
  );
}
