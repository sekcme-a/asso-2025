"use client";

import { useState, useEffect, useCallback } from "react";
import { useParams } from "next/navigation";
import { createBrowserSupabaseClient } from "@/utils/supabase/client";
export default function OrgAuthManagementPage() {
  const { orgId } = useParams();
  const supabase = createBrowserSupabaseClient();

  const [loading, setLoading] = useState(true);
  const [orgName, setOrgName] = useState("");
  const [applications, setApplications] = useState([]);
  const [currentAdmins, setCurrentAdmins] = useState([]);

  const fetchAuthData = useCallback(async () => {
    setLoading(true);
    console.log(orgId);
    // 1. 단체 이름 정보
    const { data: orgData } = await supabase
      .from("organizations")
      .select("name")
      .eq("id", orgId)
      .single();
    if (orgData) setOrgName(orgData.name);

    // 2. 권한 신청 목록 조회 (profiles 테이블 Join)
    const { data: appData, error } = await supabase
      .from("org_applications")
      .select(
        `
        id, 
        user_id, 
        status, 
        applied_at,
        profiles:user_id (name, phone)
      `,
      )
      .eq("org_id", orgId)
      .eq("status", "pending");
    // 3. 현재 관리자 목록 조회 (profiles 테이블 Join)
    const { data: adminData } = await supabase
      .from("org_admins")
      .select(
        `
        id, 
        user_id, 
        created_at,
        profiles:user_id (name, phone)
      `,
      )
      .eq("org_id", orgId);

    setApplications(appData || []);
    setCurrentAdmins(adminData || []);
    setLoading(false);
  }, [orgId, supabase]);

  useEffect(() => {
    fetchAuthData();
  }, [fetchAuthData]);

  // 승인/거절/해임 핸들러는 이전과 동일 (fetchAuthData 재실행으로 갱신)
  const handleApprove = async (app) => {
    if (
      !confirm(
        `${app.profiles?.name || "이 사용자"}를 관리자로 승인하시겠습니까?`,
      )
    )
      return;
    const { error: adminError } = await supabase
      .from("org_admins")
      .insert({ org_id: orgId, user_id: app.user_id });
    if (adminError) return alert("승인 처리 중 오류가 발생했습니다.");
    await supabase
      .from("org_applications")
      .update({ status: "approved" })
      .eq("id", app.id);
    alert("승인이 완료되었습니다.");
    fetchAuthData();
  };

  const handleReject = async (appId) => {
    if (!confirm("이 신청을 거절하시겠습니까?")) return;
    const { error } = await supabase
      .from("org_applications")
      .update({ status: "rejected" })
      .eq("id", appId);
    if (!error) {
      alert("거절 처리되었습니다.");
      fetchAuthData();
    }
  };

  const handleRemoveAdmin = async (adminId, name) => {
    if (!confirm(`${name || "해당 관리자"}의 권한을 박탈하시겠습니까?`)) return;
    const { error } = await supabase
      .from("org_admins")
      .delete()
      .eq("id", adminId);
    if (!error) {
      alert("권한이 해제되었습니다.");
      fetchAuthData();
    }
  };

  return (
    <div className="min-h-screen bg-[#f8f9fa]">
      <main className="max-w-6xl mx-auto pt-32 pb-20 px-6 font-sans">
        <header className="mb-12">
          <h1 className="text-4xl font-black text-gray-900 tracking-tighter">
            {orgName || "단체"} 권한 관리
          </h1>
          <p className="text-sm font-bold text-gray-400 mt-2">
            관리자 신청 승인 및 기존 권한자를 관리합니다.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* 왼쪽: 신청 대기 목록 */}
          <section className="space-y-6">
            <h2 className="text-xl font-black text-gray-900 px-2 flex items-center gap-2">
              신청 대기{" "}
              <span className="text-blue-600 text-sm">
                {applications.length}
              </span>
            </h2>

            <div className="bg-white rounded-[2rem] border border-gray-100 shadow-sm overflow-hidden">
              {applications.length > 0 ? (
                <div className="divide-y divide-gray-50">
                  {applications.map((app) => (
                    <div
                      key={app.id}
                      className="p-6 flex items-center justify-between hover:bg-gray-50/50 transition-colors"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <p className="text-[15px] font-black text-gray-900">
                            {app.profiles?.name || "이름 없음"}
                          </p>
                          <span className="text-[10px] font-bold text-gray-300">
                            ID: {app.user_id.split("-")[0]}
                          </span>
                        </div>
                        <p className="text-xs font-bold text-blue-600 font-mono">
                          {app.profiles?.phone || "연락처 미등록"}
                        </p>
                        <p className="text-[11px] font-bold text-gray-400 uppercase">
                          {new Date(app.applied_at).toLocaleDateString()} 신청
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleApprove(app)}
                          className="px-4 py-2 bg-blue-600 text-white text-xs font-black rounded-xl hover:bg-blue-700 transition-all"
                        >
                          승인
                        </button>
                        <button
                          onClick={() => handleReject(app.id)}
                          className="px-4 py-2 bg-gray-100 text-gray-400 text-xs font-black rounded-xl hover:text-red-500 transition-all"
                        >
                          거절
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="py-20 text-center text-gray-300 font-bold text-sm">
                  대기 중인 신청이 없습니다.
                </div>
              )}
            </div>
          </section>

          {/* 오른쪽: 현재 관리자 명단 */}
          <section className="space-y-6">
            <h2 className="text-xl font-black text-gray-900 px-2 flex items-center gap-2">
              현재 관리자{" "}
              <span className="text-gray-400 text-sm">
                {currentAdmins.length}
              </span>
            </h2>

            <div className="bg-white rounded-[2rem] border border-gray-100 shadow-sm overflow-hidden">
              {currentAdmins.length > 0 ? (
                <div className="divide-y divide-gray-50">
                  {currentAdmins.map((admin) => (
                    <div
                      key={admin.id}
                      className="p-6 flex items-center justify-between group"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center text-sm font-black text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-all">
                          {admin.profiles?.name?.charAt(0) || "A"}
                        </div>
                        <div>
                          <p className="text-[15px] font-black text-gray-900">
                            {admin.profiles?.name || "이름 없음"}
                          </p>
                          <p className="text-xs font-bold text-gray-400 font-mono">
                            {admin.profiles?.phone || "연락처 미등록"}
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={() =>
                          handleRemoveAdmin(admin.id, admin.profiles?.name)
                        }
                        className="opacity-0 group-hover:opacity-100 px-4 py-2 text-xs font-black text-red-400 hover:text-red-600 transition-all"
                      >
                        권한 해제
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="py-20 text-center text-gray-300 font-bold text-sm">
                  등록된 관리자가 없습니다.
                </div>
              )}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
