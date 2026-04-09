"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createBrowserSupabaseClient } from "@/utils/supabase/client";

export default function AdminHallwayPage() {
  const router = useRouter();
  const supabase = createBrowserSupabaseClient();

  const [orgs, setOrgs] = useState([]);
  const [myAdminOrgs, setMyAdminOrgs] = useState([]);
  const [myApplications, setMyApplications] = useState([]);
  const [isSuperAdmin, setIsSuperAdmin] = useState(false); // [추가] 슈퍼 관리자 여부
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

    // 1. 전체 단체 목록
    const { data: orgData } = await supabase
      .from("organizations")
      .select("id, name, logo_url")
      .order("name", { ascending: true });

    if (user) {
      // [추가] 2. 현재 유저의 Role 확인 (profiles 테이블에 role이 있다고 가정)
      const { data: profile } = await supabase
        .from("admins") // 또는 'admins' 테이블
        .select("role")
        .eq("user_id", user.id)
        .single();

      if (profile?.role === "admin") {
        setIsSuperAdmin(true);
      }

      // 3. 내가 관리자인 단체 조회 (일반 관리자용)
      const { data: adminData } = await supabase
        .from("org_admins")
        .select("org_id")
        .eq("user_id", user.id);

      // 4. 내가 신청 중인 내역 조회
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

  // 관리 권한 신청 함수
  const handleApply = async (orgId, orgName) => {
    // 슈퍼 관리자는 신청할 필요가 없음
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
      alert("신청이 완료되었습니다. 관리자의 승인을 기다려주세요.");
      fetchData();
    }
  };

  const handleEntry = (orgId) => {
    // [수정] 슈퍼 관리자이거나 관리 권한이 있으면 입장 가능
    if (isSuperAdmin || myAdminOrgs.includes(orgId)) {
      router.push(`/admin/organizations/${orgId}`);
    }
  };

  const filteredOrgs = orgs.filter((org) =>
    org.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

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
                ? "모든 단체에 대한 관리 권한이 있습니다."
                : "관리 권한이 있는 단체만 접근 가능합니다."}
            </p>
          </div>
          {/* 검색창 생략 */}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredOrgs.map((org) => {
            // [수정] 슈퍼 관리자면 무조건 isAdmin을 true로 판정
            const isAdmin = isSuperAdmin || myAdminOrgs.includes(org.id);
            const application = myApplications.find((a) => a.org_id === org.id);

            return (
              <div
                key={org.id}
                onClick={() => isAdmin && handleEntry(org.id)}
                className={`group relative bg-white rounded-[2.5rem] p-8 border border-gray-100 shadow-sm transition-all flex flex-col items-center text-center 
                  ${isAdmin ? "cursor-pointer hover:shadow-2xl hover:shadow-blue-100 hover:-translate-y-2" : "opacity-70"}`}
              >
                {/* [수정] 슈퍼 관리자는 Locked 배지를 보이지 않음 */}
                {!isAdmin && (
                  <div className="absolute top-6 right-6">
                    <span className="bg-amber-100 text-amber-600 text-[10px] font-black px-3 py-1 rounded-full uppercase">
                      Locked
                    </span>
                  </div>
                )}

                {/* ... 로고 및 이름 영역 동일 ... */}
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
                  <div className="mt-6 px-5 py-2 bg-blue-600 text-white rounded-2xl text-[11px] font-black tracking-widest">
                    {isSuperAdmin ? "마스터 관리 →" : "단체 관리 →"}
                  </div>
                ) : application ? (
                  <div className="mt-6 px-5 py-2 bg-gray-100 text-gray-400 rounded-2xl text-[11px] font-black">
                    승인 대기 중...
                  </div>
                ) : (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleApply(org.id, org.name);
                    }}
                    className="mt-6 px-5 py-2 bg-gray-950 text-white rounded-2xl text-sm font-black hover:bg-amber-500 transition-colors"
                  >
                    관리 권한 신청
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
}
