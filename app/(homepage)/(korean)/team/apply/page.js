"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { createBrowserSupabaseClient } from "@/utils/supabase/client";

export default function OrganizationSelectionPage() {
  const supabase = createBrowserSupabaseClient();
  const [organizations, setOrganizations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState(""); // 검색어 상태 추가

  const DEFAULT_LOGO = "/images/logo-circle.png";

  useEffect(() => {
    async function fetchOrganizations() {
      setLoading(true);
      const { data, error } = await supabase
        .from("organizations")
        .select("id, name, logo_url")
        .order("name", { ascending: true });

      if (!error) setOrganizations(data || []);
      setLoading(false);
    }
    fetchOrganizations();
  }, [supabase]);

  // 검색 로직: 검색어에 따라 실시간으로 필터링된 리스트 생성
  const filteredOrgs = useMemo(() => {
    return organizations.filter((org) =>
      org.name.toLowerCase().includes(searchTerm.toLowerCase()),
    );
  }, [searchTerm, organizations]);

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
            단체 선택
          </h1>
          <p className="text-sm font-bold text-gray-400">
            총 <span className="text-blue-600">{organizations.length}</span>개의
            단체가 함께하고 있습니다.
          </p>
        </header>

        {/* 검색바 섹션 */}
        <div className="max-w-md mx-auto mb-16 relative">
          <div className="relative group">
            <input
              type="text"
              placeholder="단체명을 입력하여 검색하세요"
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
            {searchTerm && (
              <button
                onClick={() => setSearchTerm("")}
                className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 font-bold text-xs"
              >
                초기화
              </button>
            )}
          </div>
          {searchTerm && (
            <p className="text-center mt-4 text-xs font-bold text-blue-500 animate-pulse">
              '{searchTerm}' 검색 결과: {filteredOrgs.length}건
            </p>
          )}
        </div>

        {/* 원형 아이콘 그리드 */}
        <div className="flex flex-wrap justify-center gap-x-6 gap-y-10">
          {filteredOrgs.length > 0 ? (
            filteredOrgs.map((org) => (
              <Link
                key={org.id}
                href={`/team/${org.id}`}
                className="group flex flex-col items-center w-24 sm:w-28 transition-all duration-300"
              >
                <div className="relative w-20 h-20 sm:w-24 sm:h-24 bg-white rounded-full border-2 border-gray-100 p-1 shadow-sm group-hover:border-blue-500 group-hover:shadow-md transition-all duration-300 overflow-hidden">
                  <div className="w-full h-full rounded-full overflow-hidden bg-gray-50 flex items-center justify-center">
                    <img
                      src={org.logo_url || DEFAULT_LOGO}
                      alt={org.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      onError={(e) => {
                        e.target.src = DEFAULT_LOGO;
                      }}
                    />
                  </div>
                </div>
                <span className="mt-3 text-[11px] sm:text-xs font-bold text-gray-500 text-center line-clamp-2 leading-tight group-hover:text-blue-600 transition-colors">
                  {org.name}
                </span>
              </Link>
            ))
          ) : (
            <div className="w-full py-20 text-center">
              <p className="text-gray-300 font-black text-lg">
                검색 결과와 일치하는 단체가 없습니다.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
