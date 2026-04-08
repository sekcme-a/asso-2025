"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  // 스크롤 감지 로직
  // useEffect(() => {
  //   const handleScroll = () => {
  //     setScrolled(window.scrollY > 20);
  //   };
  //   window.addEventListener("scroll", handleScroll);
  //   return () => window.removeEventListener("scroll", handleScroll);
  // }, []);

  const isEnglish = pathname.startsWith("/en");
  const lang = isEnglish ? "EN" : "KO";

  const toggleLanguage = (targetLang) => {
    if (targetLang === "EN") {
      if (!isEnglish) {
        const newPath = pathname === "/" ? "/en" : `/en${pathname}`;
        router.push(newPath);
      }
    } else {
      if (isEnglish) {
        const newPath = pathname.replace(/^\/en/, "") || "/";
        router.push(newPath);
      }
    }
    setIsOpen(false);
  };

  const t = (ko, en) => (isEnglish ? en : ko);
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
      title: t("알림마당", "News & Notice"),
      subMenu: [
        { name: t("공지사항", "Announcements"), href: "/notice/anouncement" },
        { name: t("언론보도", "Press Release"), href: "/notice/media" },
        { name: t("포토갤러리", "Photo Gallery"), href: "/notice/photo" },
        { name: t("동영상갤러리", "Video Gallery"), href: "/notice/video" },
        {
          name: t("대회/행사일정", "Event Schedule"),
          href: "/notice/schedule",
        },
        { name: t("자료실", "Archive"), href: "/notice/reference" },
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
    // nav 태그에 주요 내비게이션임을 명시
    <nav
      aria-label={t("주요 메뉴", "Main Navigation")}
      className={`fixed w-full z-[100] bg-white transition-all duration-300 ease-in-out ${scrolled ? "shadow-lg" : "border-b border-gray-200"}`}
    >
      {/* Top Utility Bar */}
      <div
        className={`hidden lg:block bg-gray-50 border-b border-gray-100 transition-all duration-300 ease-in-out overflow-hidden ${scrolled ? "h-0 opacity-0 border-none" : "h-10 opacity-100"}`}
      >
        <div className="max-w-7xl mx-auto px-6 h-10 flex justify-end items-center gap-6 text-[12px] font-medium text-gray-500">
          <Link
            href={getHref("/login")}
            className="hover:text-blue-600 transition-colors"
          >
            {t("로그인", "Login")}
          </Link>
          <div
            className="flex items-center gap-2"
            role="group"
            aria-label={t("언어 선택", "Language Selection")}
          >
            <button
              onClick={() => toggleLanguage("KO")}
              aria-pressed={lang === "KO"}
              className={
                lang === "KO"
                  ? "text-blue-600 font-bold"
                  : "hover:text-gray-800"
              }
            >
              KOR
            </button>
            <span className="w-[1px] h-3 bg-gray-300" aria-hidden="true"></span>
            <button
              onClick={() => toggleLanguage("EN")}
              aria-pressed={lang === "EN"}
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
        <div
          className={`flex justify-between items-center transition-all duration-300 ease-in-out h-20`}
        >
          {/* Logo */}
          <Link
            href={isEnglish ? "/en" : "/"}
            className="flex items-center gap-3 group"
            title={t("대한생활체육회 홈", "KSFAA Home")}
          >
            <div
              className={`relative transition-all duration-300 w-[180px] h-[60px]`}
            >
              <Image
                src="/images/logo.png"
                alt="대한생활체육회 (Korea Sports For All Athletic Association)"
                fill
                className="object-contain"
                priority
              />
            </div>
          </Link>

          {/* Desktop Menu - 목록 구조로 변경하여 SEO 강화 */}
          <ul className="hidden lg:flex items-center gap-2 h-full">
            {menuItems.map((menu) => (
              <li
                key={menu.title}
                className="group relative h-full flex items-center"
              >
                <button
                  aria-expanded="false"
                  aria-haspopup="true"
                  className={`px-5 font-semibold transition-colors duration-300 text-[16px] text-gray-700 group-hover:text-blue-700`}
                >
                  {menu.title}
                </button>

                {/* Dropdown Panel - 시맨틱한 ul/li 구조 */}
                <ul
                  className={`absolute left-1/2 -translate-x-1/2 w-48 bg-white border border-gray-100 shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform group-hover:translate-y-0 translate-y-2 py-2 rounded-b-xl ${scrolled ? "top-[64px]" : "top-[80px]"}`}
                >
                  {menu.subMenu.map((sub) => (
                    <li key={sub.name}>
                      <Link
                        href={getHref(sub.href)}
                        className="block px-6 py-2.5 text-[14px] text-gray-600 hover:bg-blue-50 hover:text-blue-700 transition-colors"
                      >
                        {sub.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>

          {/* Mobile Toggle */}
          <button
            className="lg:hidden p-2"
            onClick={() => setIsOpen(!isOpen)}
            aria-label={t("메뉴 열기/닫기", "Toggle Menu")}
            aria-expanded={isOpen}
          >
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
            <Link
              href={getHref("/login")}
              className="text-gray-600"
              onClick={() => setIsOpen(false)}
            >
              {t("로그인", "Login")}
            </Link>
            <button
              onClick={() => toggleLanguage(isEnglish ? "KO" : "EN")}
              className="text-blue-600 border border-blue-600 px-4 py-1 rounded-full"
            >
              {isEnglish ? "한국어" : "English"}
            </button>
          </div>
          <div role="menu">
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
        </div>
      )}
    </nav>
  );
}
