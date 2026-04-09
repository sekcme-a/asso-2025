"use client";

import { useState } from "react";
import { createBrowserSupabaseClient } from "@/utils/supabase/client";
import SubHero from "../info/components/SubHero";
import { useParams } from "next/navigation";

export default function ContactPage() {
  const supabase = createBrowserSupabaseClient();
  const params = useParams();
  const isEnglish = params.lang === "en";

  // 번역 헬퍼 함수
  const t = (ko, en) => (isEnglish ? en : ko);

  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    name: "",
    phone: "",
    email: "",
    content: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 이메일을 제외한 필수 항목 체크 (번역된 메시지 적용)
    if (
      !formData.title ||
      !formData.name ||
      !formData.phone ||
      !formData.content
    ) {
      alert(
        t(
          "이메일을 제외한 모든 항목은 필수 입력입니다.",
          "All fields except email are required.",
        ),
      );
      return;
    }

    setLoading(true);

    const { error } = await supabase.from("inquiries").insert([formData]);

    if (error) {
      console.error(error);
      alert(
        t(
          "문의 전송 중 오류가 발생했습니다. 다시 시도해 주세요.",
          "An error occurred while sending your inquiry. Please try again.",
        ),
      );
    } else {
      alert(
        t(
          "문의가 성공적으로 접수되었습니다. 곧 연락드리겠습니다!",
          "Your inquiry has been successfully submitted. We will contact you soon!",
        ),
      );
      // 폼 초기화
      setFormData({
        title: "",
        name: "",
        phone: "",
        email: "",
        content: "",
      });
    }
    setLoading(false);
  };

  return (
    <>
      <SubHero
        breadcrumb={[
          t("체육단체", "Sports Organizations"),
          t("문의하기", "Contact Us"),
        ]}
        title={t("문의하기", "Contact Us")}
        subTitle={
          <>
            {t(
              "궁금한 사항이나 문의사항이 있으시면 언제든지 문의해 주세요.",
              "If you have any questions or inquiries, please feel free to contact us anytime.",
            )}
            <br />
            <strong className="font-bold text-gray-950">
              {t(
                "빠르고 친절하게 답변드리겠습니다.",
                "We will respond quickly and kindly.",
              )}
            </strong>
          </>
        }
      />
      <div className="min-h-screen bg-gray-50 py-20 px-4 pt-20">
        <div className="max-w-3xl mx-auto">
          {/* 헤더 섹션 */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-black text-gray-900 tracking-tight mb-4 uppercase">
              Contact Us
            </h1>
            <p className="text-gray-500 font-medium">
              {t(
                "궁금하신 점이나 건의사항을 남겨주시면 정성껏 답변해 드리겠습니다.",
                "If you leave any questions or suggestions, we will answer them sincerely.",
              )}
            </p>
          </div>

          {/* 문의 폼 카드 */}
          <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-xl p-8 md:p-12">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* 성함 */}
                <div className="space-y-2">
                  <label className="text-xs font-black text-gray-600 uppercase tracking-widest ml-1">
                    {t("성함", "Name")} <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder={t("홍길동", "Your Name")}
                    className="w-full bg-gray-50 border-none rounded-2xl px-5 py-4 font-bold text-sm focus:ring-2 ring-blue-100 outline-none transition-all"
                    required
                  />
                </div>

                {/* 연락처 */}
                <div className="space-y-2">
                  <label className="text-xs font-black text-gray-600 uppercase tracking-widest ml-1">
                    {t("연락처", "Phone")}{" "}
                    <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="010-0000-0000"
                    className="w-full bg-gray-50 border-none rounded-2xl px-5 py-4 font-bold text-sm focus:ring-2 ring-blue-100 outline-none transition-all"
                    required
                  />
                </div>
              </div>

              {/* 이메일 (선택항목) */}
              <div className="space-y-2">
                <label className="text-xs font-black text-gray-600 uppercase tracking-widest ml-1">
                  {t("이메일 주소", "Email Address")}
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="example@mail.com"
                  className="w-full bg-gray-50 border-none rounded-2xl px-5 py-4 font-bold text-sm focus:ring-2 ring-blue-100 outline-none transition-all"
                />
              </div>

              {/* 제목 */}
              <div className="space-y-2">
                <label className="text-xs font-black text-gray-600 uppercase tracking-widest ml-1">
                  {t("제목", "Subject")} <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder={t(
                    "문의 제목을 입력해 주세요",
                    "Please enter the subject",
                  )}
                  className="w-full bg-gray-50 border-none rounded-2xl px-5 py-4 font-bold text-sm focus:ring-2 ring-blue-100 outline-none transition-all"
                  required
                />
              </div>

              {/* 내용 */}
              <div className="space-y-2">
                <label className="text-xs font-black text-gray-600 uppercase tracking-widest ml-1">
                  {t("내용", "Message")} <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="content"
                  rows={6}
                  value={formData.content}
                  onChange={handleChange}
                  placeholder={t(
                    "상세한 문의 내용을 입력해 주세요",
                    "Please enter detailed inquiry details",
                  )}
                  className="w-full bg-gray-50 border-none rounded-2xl px-5 py-4 font-bold text-sm focus:ring-2 ring-blue-100 outline-none transition-all resize-none"
                  required
                />
              </div>

              {/* 전송 버튼 */}
              <div className="pt-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-5 bg-gray-950 text-white rounded-[1.5rem] font-black shadow-xl shadow-gray-200 hover:bg-blue-600 transition-all transform active:scale-[0.98] disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>
                      {t("문의하기 전송", "Send Inquiry")}
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="3"
                      >
                        <path d="M5 12h14m-7-7l7 7-7 7" />
                      </svg>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>

          {/* 푸터 안내 */}
          <p className="mt-8 text-center text-xs text-gray-600 font-bold tracking-tight">
            {t(
              "접수된 문의는 평일 기준 48시간 이내에 기재해주신 연락처로 답변을 드립니다.",
              "Inquiries will be answered within 48 hours (on weekdays) to the contact information you provided.",
            )}
          </p>
        </div>
      </div>
    </>
  );
}
