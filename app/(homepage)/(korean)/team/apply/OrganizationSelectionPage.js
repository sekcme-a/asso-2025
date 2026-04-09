"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { createBrowserSupabaseClient } from "@/utils/supabase/client";

// 섹션 정의 상수
const SECTIONS = [
  { id: "nation", ko: "전국 체육회", en: "National Sports Council" },
  {
    id: "internation",
    ko: "국제 체육회",
    en: "International Sports Council",
  },
  { id: "sports", ko: "종목별 체육회", en: "Sports-specific Organizations" },
  { id: "sanha", ko: "산하단체", en: "Affiliated Organizations" },
];

export default function OrganizationSelectionPage() {
  const params = useParams();
  const isEnglish = params.lang === "en";
  const supabase = createBrowserSupabaseClient();

  const [organizations, setOrganizations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const DEFAULT_LOGO = "/images/logo-circle.png";

  const t = (ko, en) => (isEnglish ? en : ko);

  useEffect(() => {
    async function fetchOrganizations() {
      setLoading(true);
      // [수정] type 컬럼 추가 호출
      const { data, error } = await supabase
        .from("organizations")
        .select("id, name, name_en, logo_url, type")
        .order("name", { ascending: true });

      if (!error) setOrganizations(data || []);
      setLoading(false);
    }
    fetchOrganizations();
  }, [supabase]);

  // 검색 로직
  const filteredOrgs = useMemo(() => {
    return organizations.filter((org) => {
      const targetName = org.name?.toLowerCase() || "";
      const targetNameEn = org.name_en?.toLowerCase() || "";
      const search = searchTerm.toLowerCase();
      return targetName.includes(search) || targetNameEn.includes(search);
    });
  }, [searchTerm, organizations]);

  // [추가] 타입별로 그룹화된 데이터 계산
  const groupedOrgs = useMemo(() => {
    return SECTIONS.map((section) => ({
      ...section,
      orgs: filteredOrgs.filter((org) => org.type === section.id),
    })).filter((section) => section.orgs.length > 0); // 단체가 있는 섹션만 표시
  }, [filteredOrgs]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white pt-32 pb-24 px-6 mt-20">
      <div className="max-w-7xl mx-auto">
        {/* 헤더 섹션 */}
        <header className="mb-12 text-center">
          <h1 className="text-3xl font-black text-gray-900 tracking-tighter uppercase mb-2">
            {t("단체 선택", "Select Organization")}
          </h1>
          <p className="text-sm font-bold text-gray-400">
            {t("총", "A total of")}{" "}
            <span className="text-blue-600">{organizations.length}</span>
            {t("개의 단체가 함께하고 있습니다.", " organizations are with us.")}
          </p>
        </header>

        {/* 검색바 섹션 */}
        <div className="max-w-md mx-auto mb-20 relative">
          <div className="relative group">
            <input
              type="text"
              placeholder={t(
                "단체명을 입력하여 검색하세요",
                "Search by organization name",
              )}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-gray-50 border-2 border-gray-100 rounded-2xl px-6 py-4 pl-14 font-bold text-sm outline-none focus:border-blue-500 focus:bg-white transition-all shadow-sm"
            />
            <svg
              className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-blue-500 transition-colors"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2.5"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>

        {/* 섹션별 그리드 나열 */}
        {groupedOrgs.length > 0 ? (
          groupedOrgs.map((section) => (
            <div key={section.id} className="mb-20">
              {/* 섹션 타이틀 */}
              <div className="flex items-center gap-4 mb-10">
                <h2 className="text-xl font-black text-gray-900 whitespace-nowrap">
                  {t(section.ko, section.en)}
                </h2>
                <div className="h-[1px] w-full bg-gray-100" />
                <span className="text-xs font-bold text-blue-500 bg-blue-50 px-3 py-1 rounded-full">
                  {section.orgs.length}
                </span>
              </div>

              {/* 원형 아이콘 그리드 */}
              <div className="flex flex-wrap justify-start gap-x-6 gap-y-10">
                {section.orgs.map((org) => (
                  <Link
                    key={org.id}
                    href={isEnglish ? `/en/team/${org.id}` : `/team/${org.id}`}
                    className="group flex flex-col items-center w-24 sm:w-28 transition-all duration-300"
                  >
                    <div className="relative w-20 h-20 sm:w-24 sm:h-24 bg-white rounded-full border-2 border-gray-100 p-1 shadow-sm group-hover:border-blue-500 group-hover:shadow-md transition-all duration-300 overflow-hidden">
                      <div className="w-full h-full rounded-full overflow-hidden bg-gray-50 flex items-center justify-center">
                        <img
                          src={org.logo_url || DEFAULT_LOGO}
                          alt={isEnglish ? org.name_en || org.name : org.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          onError={(e) => {
                            e.target.src = DEFAULT_LOGO;
                          }}
                        />
                      </div>
                    </div>
                    <span className="mt-3 text-sm sm:text-sm font-bold text-gray-900 text-center line-clamp-2 leading-tight group-hover:text-blue-600 transition-colors">
                      {isEnglish ? org.name_en || org.name : org.name}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          ))
        ) : (
          <div className="w-full py-20 text-center">
            <p className="text-gray-300 font-black text-lg">
              {t(
                "검색 결과와 일치하는 단체가 없습니다.",
                "No organizations match your search.",
              )}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
