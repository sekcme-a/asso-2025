"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createBrowserSupabaseClient } from "@/utils/supabase/client";

const SECTIONS = [
  { id: "nation", title: "전국 체육회" },
  { id: "international", title: "국제 체육회" },
  { id: "sports", title: "종목별 체육회" },
  { id: "sanha", title: "산하단체" },
];

export default function AdminHallwayPage() {
  const router = useRouter();
  const supabase = createBrowserSupabaseClient();

  const [orgs, setOrgs] = useState([]);
  const [myAdminOrgs, setMyAdminOrgs] = useState([]);
  const [myApplications, setMyApplications] = useState([]);
  const [isSuperAdmin, setIsSuperAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    setLoading(true);
    const {
      data: { user },
    } = await supabase.auth.getUser();

    const { data: orgData } = await supabase
      .from("organizations")
      .select("id, name, logo_url, type")
      .order("name", { ascending: true });

    if (user) {
      const { data: profile } = await supabase
        .from("admins")
        .select("role")
        .eq("user_id", user.id)
        .single();

      if (profile?.role === "admin") {
        setIsSuperAdmin(true);
      }

      const { data: adminData } = await supabase
        .from("org_admins")
        .select("org_id")
        .eq("user_id", user.id);

      const { data: appData } = await supabase
        .from("org_applications")
        .select("org_id, status")
        .eq("user_id", user.id);

      if (adminData) setMyAdminOrgs(adminData.map((a) => a.org_id));
      if (appData) setMyApplications(appData);
    }

    if (orgData) setOrgs(orgData);
    setLoading(false);
  }

  const handleApply = async (orgId, orgName) => {
    if (isSuperAdmin) return;
    if (!confirm(`[${orgName}] 관리 권한을 신청하시겠습니까?`)) return;

    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return alert("로그인이 필요합니다.");

    const { error } = await supabase
      .from("org_applications")
      .insert({ org_id: orgId, user_id: user.id });

    if (error) {
      if (error.code === "23505") alert("이미 신청된 단체입니다.");
      else alert("신청 중 오류가 발생했습니다.");
    } else {
      alert("신청이 완료되었습니다.");
      fetchData();
    }
  };

  const handleEntry = (orgId) => {
    if (isSuperAdmin || myAdminOrgs.includes(orgId)) {
      router.push(`/admin/organizations/${orgId}`);
    }
  };

  // 1. 검색어로 먼저 필터링
  const filteredOrgs = orgs.filter((org) =>
    org.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  // 2. 내가 관리중인 단체 (슈퍼관리자가 아닐 때만 별도 추출)
  const myManagingOrgs = isSuperAdmin
    ? []
    : filteredOrgs.filter((org) => myAdminOrgs.includes(org.id));

  // 3. 나머지 단체 (관리중인 단체 제외)
  const remainingOrgs = isSuperAdmin
    ? filteredOrgs
    : filteredOrgs.filter((org) => !myAdminOrgs.includes(org.id));

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f4f7f9]">
        <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );

  return (
    <div className="min-h-screen bg-[#f8f9fa]">
      <main className="max-w-7xl mx-auto pt-32 pb-20 px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <div className="space-y-3">
            <h1 className="text-5xl font-black text-gray-900 tracking-tighter uppercase">
              {isSuperAdmin ? "전체 단체 관리 (ADMIN)" : "단체 선택"}
            </h1>
            <p className="text-lg font-bold text-gray-400">
              {isSuperAdmin
                ? "시스템의 모든 단체를 관리합니다."
                : "관리 권한을 획득하여 단체를 운영하세요."}
            </p>
          </div>
          <input
            type="text"
            placeholder="단체 이름을 검색하세요..."
            className="w-full md:w-80 px-6 py-4 bg-white border border-gray-200 rounded-3xl shadow-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* [추가] 관리 중인 단체 섹션 - 슈퍼관리자가 아닐 때 관리중인 단체가 있으면 노출 */}
        {!isSuperAdmin && myManagingOrgs.length > 0 && (
          <div className="mb-20">
            <div className="flex items-center gap-4 mb-8">
              <div className="bg-blue-600 w-3 h-8 rounded-full" />
              <h2 className="text-3xl font-black text-gray-900">
                관리 중인 체육회
              </h2>
              <span className="text-sm font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                {myManagingOrgs.length}
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {myManagingOrgs.map((org) => renderOrgCard(org, true))}
            </div>
          </div>
        )}

        {/* 타입별 섹션 나열 */}
        {SECTIONS.map((section) => {
          const sectionOrgs = remainingOrgs.filter(
            (org) => org.type === section.id,
          );
          if (sectionOrgs.length === 0) return null;

          return (
            <div key={section.id} className="mb-20">
              <div className="flex items-center gap-4 mb-8">
                <h2 className="text-2xl font-black text-gray-800">
                  {section.title}
                </h2>
                <div className="flex-1 h-[1px] bg-gray-200" />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {sectionOrgs.map((org) => renderOrgCard(org, false))}
              </div>
            </div>
          );
        })}
      </main>
    </div>
  );

  // 카드 렌더링 함수 (중복 코드 방지)
  function renderOrgCard(org, forceAdmin = false) {
    const isAdmin = isSuperAdmin || forceAdmin || myAdminOrgs.includes(org.id);
    const application = myApplications.find((a) => a.org_id === org.id);

    return (
      <div
        key={org.id}
        onClick={() => isAdmin && handleEntry(org.id)}
        className={`group relative bg-white rounded-[2.5rem] p-8 border border-gray-100 shadow-sm transition-all flex flex-col items-center text-center 
          ${isAdmin ? "cursor-pointer hover:shadow-2xl hover:shadow-blue-100 hover:-translate-y-2" : "opacity-70"}`}
      >
        {!isAdmin && (
          <div className="absolute top-6 right-6">
            <span className="bg-amber-100 text-amber-600 text-[10px] font-black px-3 py-1 rounded-full uppercase">
              Locked
            </span>
          </div>
        )}

        <div className="relative w-32 h-32 mb-6">
          <img
            src={org.logo_url || "/images/logo-circle.png"}
            alt={org.name}
            className={`relative w-full h-full object-contain rounded-full border-4 border-white shadow-md ${!isAdmin && "grayscale"}`}
          />
        </div>

        <h3 className="text-xl font-black text-gray-900 group-hover:text-blue-600 transition-colors break-keep">
          {org.name}
        </h3>

        {isAdmin ? (
          <div className="mt-6 px-5 py-2 bg-blue-600 text-white rounded-2xl text-[11px] font-black tracking-widest uppercase">
            {isSuperAdmin ? "Master Admin →" : "관리하기 →"}
          </div>
        ) : application ? (
          <div className="mt-6 px-5 py-2 bg-gray-100 text-gray-400 rounded-2xl text-[11px] font-black">
            승인 대기 중
          </div>
        ) : (
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleApply(org.id, org.name);
            }}
            className="mt-6 px-5 py-2 bg-gray-950 text-white rounded-2xl text-sm font-black hover:bg-amber-500 transition-colors"
          >
            권한 신청
          </button>
        )}
      </div>
    );
  }
}
