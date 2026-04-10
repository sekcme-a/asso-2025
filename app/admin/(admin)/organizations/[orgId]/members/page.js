"use client";

import { useState, useEffect, useCallback } from "react";
import { useParams } from "next/navigation";
import { createBrowserSupabaseClient } from "@/utils/supabase/client";

export default function MemberManagementPage() {
  const { orgId } = useParams();
  const supabase = createBrowserSupabaseClient();

  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("전체"); // 전체, 회원, 선수, 지도자, 심판, 선수관리담당자
  const [applications, setApplications] = useState([]);
  const [members, setMembers] = useState([]);

  const roles = [
    "전체",
    "일반회원",
    "선수",
    "지도자",
    "심판",
    "선수관리담당자",
  ];

  const fetchData = useCallback(async () => {
    setLoading(true);

    // 1. 신청 대기 목록 가져오기 (Profiles 조인) - *로 모든 필드(message 포함) 가져옴
    const { data: appData } = await supabase
      .from("member_applications")
      .select(`*, profiles:user_id(name, phone)`)
      .eq("org_id", orgId)
      .eq("status", "pending")
      .order("applied_at", { ascending: false });

    // 2. 승인된 멤버 목록 가져오기
    let memberQuery = supabase
      .from("org_members")
      .select(`*, profiles:user_id(name, phone)`)
      .eq("org_id", orgId);

    if (activeTab !== "전체") {
      memberQuery = memberQuery.eq("role", activeTab);
    }

    const { data: memData } = await memberQuery.order("joined_at", {
      ascending: false,
    });

    setApplications(appData || []);
    setMembers(memData || []);
    setLoading(false);
  }, [orgId, activeTab, supabase]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // 승인 처리
  const handleApprove = async (app) => {
    if (
      !confirm(`${app.profiles?.name}님을 ${app.role}(으)로 승인하시겠습니까?`)
    )
      return;

    // 멤버 테이블 추가 및 신청 상태 변경
    const { error: memError } = await supabase
      .from("org_members")
      .insert({ org_id: orgId, user_id: app.user_id, role: app.role });

    if (memError) return alert("승인 처리 중 오류가 발생했습니다.");

    await supabase
      .from("member_applications")
      .update({ status: "approved" })
      .eq("id", app.id);
    fetchData();
  };

  // 거절 처리
  const handleReject = async (appId) => {
    if (!confirm("이 신청을 거절하시겠습니까?")) return;
    await supabase
      .from("member_applications")
      .update({ status: "rejected" })
      .eq("id", appId);
    fetchData();
  };

  return (
    <div className="min-h-screen bg-[#f8f9fa] pt-12 pb-24 px-6 mt-20">
      <div className="max-w-6xl mx-auto">
        <header className="mb-10">
          <h1 className="text-4xl font-black text-gray-900 tracking-tighter uppercase">
            회원 관리
          </h1>
          <p className="text-sm font-bold text-gray-400 mt-2">
            경기인 신청 승인 및 등록된 회원 명단을 관리합니다.
          </p>
        </header>

        {/* 신청 대기 섹션 (pending이 있을 때만 노출) */}
        {applications.length > 0 && (
          <section className="mb-16">
            <h2 className="text-xl font-black text-gray-900 mb-6 flex items-center gap-2">
              신청 대기{" "}
              <span className="bg-blue-600 text-white text-[10px] px-2 py-0.5 rounded-full">
                {applications.length}
              </span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {applications.map((app) => (
                <div
                  key={app.id}
                  className="bg-white border border-blue-100 rounded-[2rem] p-6 flex items-center justify-between shadow-sm shadow-blue-50"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center font-black text-blue-600 text-xs text-center leading-tight shrink-0">
                      {app.role.replace("선수관리담당자", "관리")}
                    </div>
                    <div>
                      <p className="text-[15px] font-black text-gray-900">
                        {app.profiles?.name}
                      </p>
                      <p className="text-xs font-bold text-gray-400">
                        {app.profiles?.phone || "연락처 미등록"}
                      </p>
                      {/* 신청 메시지 표시 추가 */}
                      {app.message && (
                        <p className="text-[11px] font-bold text-blue-500 mt-1 bg-blue-50/50 px-2 py-0.5 rounded-lg inline-block">
                          {app.message}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleApprove(app)}
                      className="px-5 py-2.5 bg-blue-600 text-white text-xs font-black rounded-xl hover:bg-blue-700 transition-all"
                    >
                      승인
                    </button>
                    <button
                      onClick={() => handleReject(app.id)}
                      className="px-5 py-2.5 bg-gray-100 text-gray-400 text-xs font-black rounded-xl hover:text-red-500 transition-all"
                    >
                      거절
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* 필터 탭 */}
        <div className="flex gap-2 mb-8 overflow-x-auto pb-2 scrollbar-hide">
          {roles.map((role) => (
            <button
              key={role}
              onClick={() => setActiveTab(role)}
              className={`px-6 py-3 rounded-2xl text-xs font-black transition-all whitespace-nowrap ${
                activeTab === role
                  ? "bg-gray-900 text-white shadow-lg shadow-gray-200"
                  : "bg-white text-gray-400 hover:text-gray-900 border border-gray-100"
              }`}
            >
              {role}
            </button>
          ))}
        </div>

        {/* 멤버 목록 테이블 */}
        <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-50/50 border-b border-gray-50 text-[10px] font-black text-gray-400 uppercase tracking-widest">
                <th className="px-8 py-5">이름</th>
                <th className="px-8 py-5">역할</th>
                <th className="px-8 py-5">연락처</th>
                <th className="px-8 py-5">가입일</th>
                <th className="px-8 py-5 text-right">상태</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {members.map((member) => (
                <tr
                  key={member.id}
                  className="group hover:bg-gray-50/30 transition-colors"
                >
                  <td className="px-8 py-6">
                    <p className="font-black text-gray-900">
                      {member.profiles?.name}
                    </p>
                  </td>
                  <td className="px-8 py-6">
                    <span
                      className={`text-[10px] font-black px-2 py-1 rounded-md ${
                        member.role === "선수"
                          ? "bg-orange-50 text-orange-600"
                          : member.role === "지도자"
                            ? "bg-purple-50 text-purple-600"
                            : member.role === "심판"
                              ? "bg-green-50 text-green-600"
                              : "bg-gray-100 text-gray-500"
                      }`}
                    >
                      {member.role}
                    </span>
                  </td>
                  <td className="px-8 py-6 text-sm font-bold text-gray-500 font-mono">
                    {member.profiles?.phone}
                  </td>
                  <td className="px-8 py-6 text-xs font-bold text-gray-400">
                    {new Date(member.joined_at).toLocaleDateString()}
                  </td>
                  <td className="px-8 py-6 text-right">
                    <span className="text-[10px] font-black text-blue-500 uppercase tracking-tighter">
                      Active Member
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {members.length === 0 && !loading && (
            <div className="py-32 text-center text-gray-300 font-bold">
              해당 카테고리에 회원이 없습니다.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
