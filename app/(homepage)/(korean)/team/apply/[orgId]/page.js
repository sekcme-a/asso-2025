"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { createBrowserSupabaseClient } from "@/utils/supabase/client";

export default function MemberApplyPage() {
  const { orgId } = useParams();
  const router = useRouter();
  const supabase = createBrowserSupabaseClient();

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [profile, setProfile] = useState(null);
  const [agreed, setAgreed] = useState(false);

  const [formData, setFormData] = useState({
    role: "일반회원",
    message: "",
  });

  const roles = ["일반회원", "선수", "지도자", "심판", "선수관리담당자"];

  useEffect(() => {
    fetchUserData();
  }, []);

  async function fetchUserData() {
    setLoading(true);
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      alert("로그인 세션이 만료되었습니다.");
      router.push("/login");
      return;
    }

    const { data: profileData, error } = await supabase
      .from("profiles")
      .select("name, birth_date, phone, address, address_detail, zonecode")
      .eq("id", user.id)
      .single();

    if (error) {
      alert("프로필 정보를 불러올 수 없습니다. 프로필을 먼저 설정해주세요.");
      router.push("/mypage");
    } else {
      setProfile(profileData);
    }
    setLoading(false);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!agreed) {
      alert("개인정보 수집 및 이용에 동의해주세요.");
      return;
    }

    setSubmitting(true);
    const {
      data: { user },
    } = await supabase.auth.getUser();

    // --- 중복 신청 확인 로직 추가 ---
    const { data: existingApp, error: checkError } = await supabase
      .from("member_applications")
      .select("status")
      .eq("org_id", orgId)
      .eq("user_id", user.id)
      .eq("role", formData.role)
      .or("status.eq.pending,status.eq.approved");

    if (existingApp && existingApp.length > 0) {
      const status = existingApp[0].status;
      if (status === "pending") {
        alert(
          `이미 해당 단체에 '${formData.role}'로 신청하여 승인 대기 중입니다.`,
        );
      } else {
        alert(`이미 해당 단체에 '${formData.role}'로 등록되어 있습니다.`);
      }
      setSubmitting(false);
      return;
    }
    // ----------------------------

    const { error } = await supabase.from("member_applications").insert({
      org_id: orgId,
      user_id: user.id,
      role: formData.role,
      message: formData.message,
      status: "pending",
    });

    if (error) {
      alert("신청 중 오류가 발생했습니다: " + error.message);
      console.log(error);
    } else {
      alert("신청이 완료되었습니다. 단체 승인을 기다려주세요.");
      router.push(`/team/${orgId}`);
    }
    setSubmitting(false);
  };

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );

  return (
    <div className="min-h-screen bg-[#f8f9fa] pt-32 pb-24 px-6 mt-10">
      <div className="max-w-3xl mx-auto">
        <header className="mb-12">
          <h1 className="text-3xl font-black text-gray-900 tracking-tighter uppercase">
            경기인 등록 신청
          </h1>
          <p className="text-sm font-bold text-gray-600 mt-2">
            단체의 구성원이 되기 위한 신청 정보를 입력해주세요.
          </p>
        </header>

        <form onSubmit={handleSubmit} className="space-y-8">
          <section className="bg-white rounded-[2rem] p-8 shadow-sm border border-gray-100">
            <h2 className="text-lg font-black text-gray-900 mb-4">
              개인정보 수집 및 이용 동의
            </h2>
            <div className="bg-gray-50 rounded-xl p-5 h-40 overflow-y-auto text-xs text-gray-500 font-medium leading-relaxed mb-4">
              본인은 대한생활체육회 및 해당 가맹단체의 경기인 등록을 위해 다음과
              같이 개인정보를 수집 및 이용함에 동의합니다.
              <br />
              <br />
              1. 수집항목: 성명, 생년월일, 연락처, 주소 등 프로필 정보
              <br />
              2. 수집목적: 경기인 등록 관리, 대회 참가 자격 확인, 활동 기록 관리
              <br />
              3. 보유기간: 회원 탈퇴 시 또는 목적 달성 후 즉시 파기
            </div>
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
                className="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-sm font-bold text-gray-700">
                위 내용을 확인했으며, 이에 동의합니다.
              </span>
            </label>
          </section>

          <section className="bg-white rounded-[2rem] p-8 shadow-sm border border-gray-100">
            <div className="flex justify-between items-start mb-6">
              <h2 className="text-lg font-black text-gray-900">
                기본 정보 확인
              </h2>
              <button
                type="button"
                onClick={() => router.push("/profile")}
                className="text-[11px] font-black text-blue-600 bg-blue-50 px-4 py-2 rounded-xl hover:bg-blue-100 transition-colors flex items-center gap-2"
              >
                정보 수정하기
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2.5}
                  stroke="currentColor"
                  className="w-3 h-3"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                  />
                </svg>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <InfoField label="이름" value={profile?.name} />
              <InfoField
                label="생년월일"
                value={
                  profile?.birth_date ? profile.birth_date.split("T")[0] : null
                }
              />
              <InfoField label="연락처" value={profile?.phone} />
              <InfoField label="우편번호" value={profile?.zonecode} />
              <div className="md:col-span-2">
                <InfoField
                  label="주소"
                  value={
                    profile?.address
                      ? `${profile.address} ${profile.address_detail || ""}`
                      : null
                  }
                />
              </div>
            </div>
            <p className="mt-6 text-[11px] text-gray-900 font-bold">
              * 위 정보가 올바르지 않은 경우 버튼을 눌러 프로필을 먼저
              업데이트해주세요.
            </p>
          </section>

          <section className="bg-white rounded-[2rem] p-8 shadow-sm border border-gray-100 space-y-6">
            <h2 className="text-lg font-black text-gray-900 mb-2">
              추가 정보 입력
            </h2>

            <div className="space-y-3">
              <label className="text-[12px] font-black text-gray-600 uppercase tracking-widest ml-1">
                신청 역할
              </label>
              <div className="flex flex-wrap gap-3">
                {roles.map((role) => (
                  <button
                    key={role}
                    type="button"
                    onClick={() => setFormData({ ...formData, role })}
                    className={`px-6 py-3 rounded-xl font-bold text-sm transition-all ${
                      formData.role === role
                        ? "bg-gray-900 text-white shadow-lg"
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    }`}
                  >
                    {role}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-[12px] font-black text-gray-600 uppercase tracking-widest ml-1">
                전달 메시지 (선택)
              </label>
              <textarea
                rows="4"
                value={formData.message}
                onChange={(e) =>
                  setFormData({ ...formData, message: e.target.value })
                }
                placeholder="경력 사항이나 단체에 전할 메시지를 입력해주세요."
                className="w-full bg-gray-50 border-none rounded-2xl px-5 py-4 font-bold text-sm outline-none focus:ring-2 ring-blue-100 transition-all resize-none"
              />
            </div>
          </section>

          <div className="flex gap-4">
            <button
              type="button"
              onClick={() => router.back()}
              className="flex-1 py-5 bg-gray-100 text-gray-500 rounded-2xl font-black hover:bg-gray-200 transition-colors"
            >
              취소
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="flex-[2] py-5 bg-blue-600 text-white rounded-2xl font-black shadow-xl shadow-blue-100 hover:bg-blue-700 transition-all disabled:bg-blue-300"
            >
              {submitting ? "처리 중..." : "신청서 제출하기"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function InfoField({ label, value }) {
  return (
    <div className="space-y-1">
      <span className="text-[12px] font-black text-gray-600 uppercase tracking-widest ml-1">
        {label}
      </span>
      <div className="w-full bg-gray-50 rounded-xl px-5 py-3 font-bold text-gray-700 border border-gray-50 min-h-[48px] flex items-center">
        {value || (
          <span className="text-gray-300 font-medium italic">정보 없음</span>
        )}
      </div>
    </div>
  );
}
