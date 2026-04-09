"use client";

import { useState, useEffect } from "react";
import Script from "next/script";
import { createBrowserSupabaseClient } from "@/utils/supabase/client";

export default function MyProfilePage() {
  const supabase = createBrowserSupabaseClient();

  // 로딩 및 상태 관리
  const [loading, setLoading] = useState(true);
  const [isEdit, setIsEdit] = useState(false);
  const [updating, setUpdating] = useState(false);

  // 프로필 데이터 상태
  const [profile, setProfile] = useState({
    name: "",
    birth_date: "",
    phone: "",
    address: "",
    address_detail: "",
    zonecode: "",
    email: "",
  });

  // 신청 내역 및 소속 단체 상태
  const [applications, setApplications] = useState([]);
  const [memberships, setMemberships] = useState([]);

  // 데이터 통합 페칭
  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user) {
        // 1. 프로필 정보 가져오기
        const { data: profileData } = await supabase
          .from("profiles")
          .select(
            "name, birth_date, phone, address, address_detail, zonecode, email",
          )
          .eq("id", user.id)
          .single();

        if (profileData) {
          setProfile({
            ...profileData,
            birth_date: profileData.birth_date || "",
          });
        }

        // 2. 선수 등록 신청 내역 (member_applications)
        // status가 'pending'이거나 'rejected'인 것 위주로 표시
        const { data: appData } = await supabase
          .from("member_applications")
          .select(
            `
            id, 
            status, 
            role, 
            applied_at,
            organizations ( name, logo_url )
          `,
          )
          .eq("user_id", user.id)
          .order("applied_at", { ascending: false });

        setApplications(appData || []);

        // 3. 현재 소속된 단체 (org_members)
        const { data: memData } = await supabase
          .from("org_members")
          .select(
            `
            id, 
            role, 
            joined_at,
            organizations ( name, logo_url )
          `,
          )
          .eq("user_id", user.id)
          .order("joined_at", { ascending: false });

        setMemberships(memData || []);
      }
      setLoading(false);
    }
    fetchData();
  }, [supabase]);

  // 다음 주소 API 핸들러
  const handleAddressSearch = () => {
    if (!window.daum) return;
    new window.daum.Postcode({
      oncomplete: function (data) {
        setProfile((prev) => ({
          ...prev,
          address: data.address,
          zonecode: data.zonecode,
          address_detail: "",
        }));
      },
    }).open();
  };

  // 프로필 업데이트 함수
  async function updateProfile() {
    setUpdating(true);
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      alert("로그인이 필요합니다.");
      setUpdating(false);
      return;
    }

    const { error } = await supabase.from("profiles").upsert({
      id: user.id,
      ...profile,
      birth_date: profile.birth_date === "" ? null : profile.birth_date,
    });

    if (!error) {
      alert("프로필이 성공적으로 수정되었습니다.");
      setIsEdit(false);
    } else {
      console.error(error);
      alert("저장 중 오류가 발생했습니다.");
    }
    setUpdating(false);
  }

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f4f7f9]">
        <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );

  return (
    <main className="min-h-screen bg-[#f4f7f9] py-12 md:py-24 px-4 mt-16 font-sans">
      <Script
        src="//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js"
        strategy="lazyOnload"
      />

      <div className="max-w-6xl mx-auto">
        {/* 헤더 섹션 */}
        <header className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6 px-4">
          <div className="space-y-2">
            <h1 className="text-4xl font-black tracking-tighter text-gray-900">
              마이페이지
            </h1>
            <p className="text-sm font-bold text-gray-500">
              회원님의 정보를 안전하게 보호하고 최신 상태로 유지합니다.
            </p>
          </div>
          <div className="flex gap-2">
            {!isEdit ? (
              <button
                onClick={() => setIsEdit(true)}
                className="group flex items-center gap-2 px-8 py-3 bg-gray-950 text-white rounded-2xl text-sm font-black transition-all hover:bg-blue-600 shadow-xl shadow-gray-200"
              >
                정보 수정하기
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                  className="group-hover:rotate-12 transition-transform"
                >
                  <path d="M12 20h9M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
                </svg>
              </button>
            ) : (
              <button
                onClick={() => setIsEdit(false)}
                className="px-6 py-3 bg-white border border-gray-200 text-gray-400 rounded-2xl text-sm font-black hover:text-gray-900 transition-all"
              >
                수정 취소
              </button>
            )}
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* 왼쪽 사이드바: 프로필 요약 카드 */}
          <aside className="lg:col-span-4 space-y-6">
            <div className="bg-white rounded-[2.5rem] border border-gray-100 p-10 shadow-sm text-center">
              <div className="w-24 h-24 bg-blue-50 text-blue-600 rounded-[2rem] flex items-center justify-center text-3xl font-black mx-auto mb-6 border-4 border-white shadow-lg">
                {profile.name?.charAt(0) || "U"}
              </div>
              <h2 className="text-2xl font-black text-gray-900 mb-1">
                {profile.name || "회원님"}
              </h2>
              <span className="text-sm  text-gray-900">
                {profile.email || "이메일 정보가 없습니다."}
              </span>
              <p className="text-sm font-bold text-gray-600 mt-1 mb-8 tracking-wide">
                {memberships.length > 0 ? "등록 선수" : "일반 회원"} | Active
              </p>

              <div className="grid grid-cols-2 gap-4 pt-8 border-t border-gray-50">
                <div className="text-center">
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">
                    소속 단체
                  </p>
                  <p className="text-sm font-black text-blue-600">
                    {memberships.length}개
                  </p>
                </div>
                <div className="text-center border-l border-gray-50">
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">
                    신청 중
                  </p>
                  <p className="text-sm font-black text-amber-500">
                    {applications.filter((a) => a.status === "pending").length}
                    건
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-blue-600 rounded-[2rem] p-8 text-white shadow-xl shadow-blue-100">
              <h3 className="text-lg font-black mb-2 leading-tight">
                생활체육인 혜택
              </h3>
              <p className="text-xs font-bold opacity-80 leading-relaxed break-keep">
                회원님은 현재 모든 협력업체 및 시설에서 할인 혜택을 받으실 수
                있습니다.
              </p>
            </div>
          </aside>

          {/* 오른쪽: 상세 정보 및 히스토리 */}
          <section className="lg:col-span-8 space-y-8">
            {/* 1. 기본 인적사항 섹션 */}
            <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm p-8 md:p-12 space-y-12">
              <div className="space-y-8">
                <div className="flex items-center gap-3">
                  <span className="w-1.5 h-6 bg-blue-600 rounded-full" />
                  <h3 className="text-lg font-black text-gray-950 uppercase tracking-tighter">
                    기본 정보
                  </h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest ml-1">
                      Full Name
                    </label>
                    {isEdit ? (
                      <input
                        type="text"
                        value={profile.name}
                        onChange={(e) =>
                          setProfile({ ...profile, name: e.target.value })
                        }
                        className="w-full bg-gray-50 border-none rounded-2xl px-5 py-4 font-bold text-sm focus:ring-2 ring-blue-100 outline-none"
                      />
                    ) : (
                      <div className="bg-gray-50/50 rounded-2xl px-6 py-4 text-[15px] font-black text-gray-900">
                        {profile.name || "미입력"}
                      </div>
                    )}
                  </div>
                  <div className="space-y-2">
                    <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest ml-1">
                      Birth Date
                    </label>
                    {isEdit ? (
                      <input
                        type="date"
                        value={profile.birth_date}
                        onChange={(e) =>
                          setProfile({ ...profile, birth_date: e.target.value })
                        }
                        className="w-full bg-gray-50 border-none rounded-2xl px-5 py-4 font-bold text-sm outline-none focus:ring-2 ring-blue-100"
                      />
                    ) : (
                      <div className="bg-gray-50/50 rounded-2xl px-6 py-4 text-[15px] font-black text-gray-900">
                        {profile.birth_date
                          ? new Date(profile.birth_date).toLocaleDateString(
                              "ko-KR",
                              {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                              },
                            )
                          : "미입력"}
                      </div>
                    )}
                  </div>
                </div>

                <div className="space-y-6 pt-4">
                  <div className="space-y-2">
                    <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest ml-1">
                      Phone Number
                    </label>
                    {isEdit ? (
                      <input
                        type="tel"
                        value={profile.phone}
                        onChange={(e) =>
                          setProfile({ ...profile, phone: e.target.value })
                        }
                        className="w-full bg-gray-50 border-none rounded-2xl px-5 py-4 font-bold text-sm outline-none focus:ring-2 ring-blue-100"
                        placeholder="010-0000-0000"
                      />
                    ) : (
                      <div className="bg-gray-50/50 rounded-2xl px-6 py-4 text-[15px] font-black text-gray-900 font-mono">
                        {profile.phone || "미입력"}
                      </div>
                    )}
                  </div>

                  <div className="space-y-2">
                    <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest ml-1">
                      Home Address
                    </label>
                    {isEdit ? (
                      <div className="space-y-3">
                        <div className="flex gap-2">
                          <input
                            type="text"
                            readOnly
                            value={profile.zonecode}
                            className="w-32 bg-gray-50 border-none rounded-2xl px-5 py-4 font-bold text-sm text-gray-400"
                            placeholder="우편번호"
                          />
                          <button
                            onClick={handleAddressSearch}
                            className="px-6 py-4 bg-gray-950 text-white rounded-2xl text-xs font-black hover:bg-blue-600 transition-colors shadow-lg shadow-gray-100"
                          >
                            주소 검색
                          </button>
                        </div>
                        <input
                          type="text"
                          readOnly
                          value={profile.address}
                          className="w-full bg-gray-50 border-none rounded-2xl px-5 py-4 font-bold text-sm text-gray-400"
                          placeholder="주소를 선택해주세요"
                        />
                        <input
                          type="text"
                          value={profile.address_detail}
                          onChange={(e) =>
                            setProfile({
                              ...profile,
                              address_detail: e.target.value,
                            })
                          }
                          className="w-full bg-white border-2 border-gray-50 focus:border-blue-600 rounded-2xl px-5 py-4 font-bold text-sm outline-none transition-all"
                          placeholder="상세 주소를 입력해주세요"
                        />
                      </div>
                    ) : (
                      <div className="bg-gray-50/50 rounded-2xl px-6 py-4 space-y-1">
                        <span className="text-[10px] font-black text-blue-600 font-mono tracking-widest">
                          [{profile.zonecode || "00000"}]
                        </span>
                        <p className="text-[15px] font-black text-gray-900 leading-relaxed">
                          {profile.address || "미입력된 주소입니다."}{" "}
                          {profile.address_detail}
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                {isEdit && (
                  <button
                    disabled={updating}
                    onClick={updateProfile}
                    className="w-full py-4 bg-blue-600 text-white rounded-[1.5rem] font-black shadow-xl shadow-blue-100 hover:bg-blue-700 transition-all transform active:scale-[0.98] disabled:opacity-50"
                  >
                    {updating ? "데이터 저장 중..." : "변경된 프로필 저장하기"}
                  </button>
                )}
              </div>
            </div>

            {/* 2. 나의 소속 및 신청 현황 섹션 (새로 추가됨) */}
            <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden">
              <div className="p-8 md:p-12 space-y-12">
                {/* 2-1. 현재 소속 단체 */}
                <div className="space-y-6">
                  <div className="flex items-center gap-3">
                    <span className="w-1.5 h-6 bg-green-500 rounded-full" />
                    <h3 className="text-lg font-black text-gray-950 uppercase tracking-tighter">
                      나의 소속 단체
                    </h3>
                  </div>

                  {memberships.length > 0 ? (
                    <div className="grid grid-cols-1 gap-4">
                      {memberships.map((mem) => (
                        <div
                          key={mem.id}
                          className="flex items-center justify-between p-5 bg-gray-50 rounded-3xl border border-gray-100 transition-all hover:bg-white hover:shadow-md"
                        >
                          <div className="flex items-center gap-4">
                            <img
                              src={
                                mem.organizations?.logo_url ||
                                "/images/logo-circle.png"
                              }
                              className="w-12 h-12 rounded-full border-2 border-white shadow-sm object-contain bg-white"
                              alt="org_logo"
                            />
                            <div>
                              <p className="font-black text-gray-900">
                                {mem.organizations?.name}
                              </p>
                              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                                가입일:{" "}
                                {new Date(mem.joined_at).toLocaleDateString()}
                              </p>
                            </div>
                          </div>
                          <span className="px-4 py-1.5 bg-green-100 text-green-700 text-[11px] font-black rounded-xl">
                            {mem.role}
                          </span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="py-12 text-center bg-gray-50 rounded-[2rem] border-2 border-dashed border-gray-200">
                      <p className="text-sm font-bold text-gray-400">
                        현재 소속된 단체가 없습니다.
                      </p>
                    </div>
                  )}
                </div>

                {/* 2-2. 신청 진행 현황 */}
                <div className="space-y-6 border-t border-gray-50 pt-12">
                  <div className="flex items-center gap-3">
                    <span className="w-1.5 h-6 bg-amber-500 rounded-full" />
                    <h3 className="text-lg font-black text-gray-950 uppercase tracking-tighter">
                      선수 등록 신청 현황
                    </h3>
                  </div>

                  {applications.length > 0 ? (
                    <div className="grid grid-cols-1 gap-4">
                      {applications.map((app) => (
                        <div
                          key={app.id}
                          className="flex items-center justify-between p-5 bg-white rounded-3xl border border-gray-100 shadow-sm"
                        >
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 flex items-center justify-center bg-gray-50 rounded-full font-black text-gray-300 text-xl">
                              {app.organizations?.name?.charAt(0)}
                            </div>
                            <div>
                              <p className="font-black text-gray-900">
                                {app.organizations?.name}
                              </p>
                              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                                신청일:{" "}
                                {new Date(app.applied_at).toLocaleDateString()}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            <span className="text-[10px] font-black text-gray-400 mr-2 uppercase tracking-widest">
                              {app.role}
                            </span>
                            {app.status === "pending" ? (
                              <span className="px-4 py-1.5 bg-amber-50 text-amber-600 text-[11px] font-black rounded-xl">
                                승인 대기
                              </span>
                            ) : app.status === "rejected" ? (
                              <span className="px-4 py-1.5 bg-red-50 text-red-600 text-[11px] font-black rounded-xl">
                                신청 거절
                              </span>
                            ) : (
                              <span className="px-4 py-1.5 bg-gray-100 text-gray-600 text-[11px] font-black rounded-xl">
                                승인 완료
                              </span>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="py-12 text-center bg-gray-50 rounded-[2rem] border-2 border-dashed border-gray-200">
                      <p className="text-sm font-bold text-gray-400">
                        신청 진행 중인 내역이 없습니다.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
