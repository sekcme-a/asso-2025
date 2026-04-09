"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { createBrowserSupabaseClient } from "@/utils/supabase/client";
import Link from "next/link";

export default function OrganizationDetailPage() {
  const { orgId } = useParams();
  const router = useRouter();
  const supabase = createBrowserSupabaseClient();

  const [org, setOrg] = useState(null);
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [myApplications, setMyApplications] = useState([]); // 내 신청 내역 상태 추가

  useEffect(() => {
    if (orgId) {
      fetchOrgData();
    }
  }, [orgId]);

  async function fetchOrgData() {
    setLoading(true);

    const {
      data: { user },
    } = await supabase.auth.getUser();

    // 1. 단체 정보 가져오기
    const { data: orgData } = await supabase
      .from("organizations")
      .select("*")
      .eq("id", orgId)
      .single();

    // 2. 공지사항 가져오기
    const { data: annData } = await supabase
      .from("announcements")
      .select("*")
      .eq("org_id", orgId)
      .order("is_pinned", { ascending: false })
      .order("created_at", { ascending: false });

    // 3. 내 신청 내역 가져오기 (추가)
    if (user) {
      const { data: applyData } = await supabase
        .from("member_applications")
        .select("*")
        .eq("org_id", orgId)
        .eq("user_id", user.id)
        .order("applied_at", { ascending: false });

      setMyApplications(applyData || []);
    }

    if (orgData) setOrg(orgData);
    if (annData) setAnnouncements(annData);

    setLoading(false);
  }

  // 경기인 신청 클릭 핸들러
  const handleApplyClick = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      alert("로그인이 필요한 서비스입니다. 로그인 후 이용해주세요.");
      return;
    }

    const { data: profile } = await supabase
      .from("profiles")
      .select("name, birth_date, phone")
      .eq("id", user.id)
      .single();

    if (!profile?.name || !profile?.birth_date || !profile?.phone) {
      if (
        confirm(
          "이름, 생년월일, 연락처는 필수 입력 사항입니다.\n마이페이지로 이동하여 정보를 입력하시겠습니까?",
        )
      ) {
        router.push("/profile");
      }
      return;
    }

    router.push(`/team/apply/${orgId}`);
  };

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );

  if (!org)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="font-bold text-gray-400">단체를 찾을 수 없습니다.</p>
      </div>
    );

  return (
    <div className="min-h-screen bg-[#f8f9fa] pt-28 pb-20 px-6 mt-10">
      <div className="max-w-5xl mx-auto space-y-12">
        <div className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-sm border border-gray-100 overflow-hidden relative">
          <div className="flex flex-col md:flex-row gap-10 items-center md:items-start">
            <div className="w-40 h-40 relative bg-gray-50 rounded-[2rem] border border-gray-100 flex-shrink-0 overflow-hidden">
              <img
                src={org.logo_url || "/images/logo-circle.png"}
                alt={org.name}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="flex-1 space-y-8 text-center md:text-left">
              <div>
                <span className="text-blue-600 font-black text-xs uppercase tracking-widest bg-blue-50 px-3 py-1 rounded-full">
                  {org.location || "지역 정보 없음"}
                </span>
                <h1 className="text-4xl font-black text-gray-900 mt-3 tracking-tighter">
                  {org.name}
                </h1>
                <p className="text-gray-800 font-bold  mt-5 leading-relaxed whitespace-pre-wrap">
                  {org.description || "등록된 소개 내용이 없습니다."}
                </p>
                {org.etc && (
                  <div className="mt-6 text-left">
                    <p className="text-sm  text-gray-800 leading-relaxed whitespace-pre-wrap">
                      {org.etc}
                    </p>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-6 border-t border-gray-100">
                <div className="flex items-center gap-3">
                  <span className="w-20 font-black text-gray-700 uppercase text-sm">
                    회장
                  </span>
                  <span className=" text-gray-700">{org.leader || "미정"}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="w-20 font-black text-gray-700 uppercase text-sm">
                    연락처
                  </span>
                  <span className=" text-gray-700">
                    {org.contact || "정보 없음"}
                  </span>
                </div>
              </div>

              {/* 신청 버튼 및 내 신청 현황 내역 */}
              <div className="pt-4 flex flex-col items-center md:items-start gap-4">
                <button
                  onClick={handleApplyClick}
                  className="bg-blue-600 text-white font-black px-8 py-2 rounded-2xl shadow-lg shadow-blue-100 hover:bg-blue-700 transition-all active:scale-95"
                >
                  경기인 신청하기
                </button>

                {/* 내 신청 현황 리스트 */}
                {myApplications.length > 0 && (
                  <div className="w-full max-w-sm space-y-2 mt-2">
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">
                      내 신청 현황
                    </p>
                    {myApplications.map((app) => (
                      <div
                        key={app.id}
                        className="flex items-center justify-between bg-gray-50 px-4 py-3 rounded-xl border border-gray-100"
                      >
                        <div className="flex flex-col items-start">
                          <span className="text-xs font-black text-gray-700">
                            {app.role}
                          </span>
                          <span className="text-[10px] text-gray-400 font-bold">
                            {new Date(app.applied_at).toLocaleDateString()}
                          </span>
                        </div>
                        <span
                          className={`text-[10px] font-black px-2 py-1 rounded-md uppercase ${
                            app.status === "approved"
                              ? "bg-green-100 text-green-600"
                              : app.status === "rejected"
                                ? "bg-red-100 text-red-600"
                                : "bg-yellow-100 text-yellow-600"
                          }`}
                        >
                          {app.status === "pending"
                            ? "대기중"
                            : app.status === "approved"
                              ? "승인완료"
                              : "거절됨"}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* --- 공지사항 섹션 --- */}
        <div className="space-y-6">
          <div className="flex items-center justify-between px-4">
            <h2 className="text-2xl font-black text-gray-900 tracking-tight flex items-center gap-3">
              공지사항
              <span className="text-sm font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-md">
                {announcements.length}
              </span>
            </h2>
          </div>

          <div className="bg-white rounded-[2rem] shadow-sm border border-gray-100 overflow-hidden">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50/50 border-b border-gray-50">
                  <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest w-20 text-center">
                    No
                  </th>
                  <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">
                    Title
                  </th>
                  <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest w-32 text-center">
                    Date
                  </th>
                  <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest w-20 text-center">
                    Views
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {announcements.length > 0 ? (
                  announcements.map((ann, index) => (
                    <tr
                      key={ann.id}
                      className="group hover:bg-gray-50/50 transition-colors cursor-pointer"
                      onClick={() =>
                        router.push(`/team/${orgId}/announcement/${ann.id}`)
                      }
                    >
                      <td className="px-6 py-5 text-center">
                        {ann.is_pinned ? (
                          <span className="bg-red-50 text-red-500 text-[10px] font-black px-2 py-1 rounded-md uppercase">
                            Pin
                          </span>
                        ) : (
                          <span className="text-sm font-bold text-gray-300">
                            {announcements.length - index}
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-5">
                        <p className="font-bold text-gray-800 group-hover:text-blue-600 transition-colors line-clamp-1">
                          {ann.title}
                        </p>
                      </td>
                      <td className="px-6 py-5 text-center text-sm font-bold text-gray-400">
                        {new Date(ann.created_at).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-5 text-center text-sm font-bold text-gray-400">
                        {ann.view_count}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="4"
                      className="px-6 py-20 text-center text-gray-300 font-bold"
                    >
                      등록된 공지사항이 없습니다.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
