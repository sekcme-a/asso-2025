"use client";
import React from "react";
import Link from "next/link";
import { useParams } from "next/navigation";

export default function SupportPage() {
  const params = useParams();
  const isEnglish = params.lang === "en";

  // 번역 헬퍼 함수
  const t = (ko, en) => (isEnglish ? en : ko);

  return (
    <main className="min-h-screen bg-[#f8f9fa] py-24 px-6 mt-20">
      <div className="max-w-5xl mx-auto">
        {/* 1. HEADER: 기부금 단체 명시 및 비전 */}
        <header className="text-center mb-20 space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 border border-blue-100 rounded-full">
            <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
            <span className="text-[11px] font-black text-blue-700 uppercase tracking-widest">
              {t(
                "지정기부금단체 안내",
                "Designated Donation Organization Guide",
              )}
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black leading-[1.1] text-gray-950 break-keep">
            {t("생활체육의 미래,", "The Future of Sports,")} <br />
            {t("당신의 후원으로 시작됩니다.", "Starts with Your Support.")}
          </h1>
          <p className="max-w-2xl mx-auto text-gray-500 font-bold leading-relaxed break-keep">
            {t(
              "대한생활체육회는",
              "Korea Sports For All Athletic Association is a",
            )}{" "}
            <span className="text-gray-950 border-b-2 border-blue-200">
              {t(
                "기획재정부 지정기부금단체",
                "MOEF-Designated Donation Organization",
              )}
            </span>
            {t(
              "로서, 보내주신 소중한 후원금에 대해 다음과 같은 세제 혜택을 제공합니다.",
              ", providing the following tax benefits for your valuable donations.",
            )}
          </p>
        </header>

        {/* 2. TAX BENEFITS: 세제 혜택 내용 */}
        <section className="mb-24">
          <div className="flex items-center gap-3 mb-10">
            <h2 className="text-2xl font-black text-gray-950 tracking-tight">
              {t("세제 혜택 안내", "Tax Benefits")}
            </h2>
            <div className="h-px flex-1 bg-gray-100" />
            <span className="text-[10px] font-bold text-gray-300 uppercase tracking-widest font-mono">
              Tax Incentives
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* 개인/개인사업자 */}
            <div className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300">
              <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 mb-6 font-black text-xl">
                01
              </div>
              <h3 className="text-lg font-black text-gray-950 mb-4">
                {t("개인 및 사업자", "Individuals & Business Owners")}
              </h3>
              <p className="text-sm font-bold text-gray-500 leading-relaxed break-keep">
                {t(
                  "소득금액 한도 내 지출 시",
                  "Donations within income limits are eligible for a",
                )}{" "}
                <span className="text-blue-600 font-black">
                  {t("15% 세액 공제", "15% tax credit")}
                </span>
                {t(
                  "를 받을 수 있습니다. (3천만원 초과분은 25%)",
                  ". (25% for amounts exceeding 30 million KRW)",
                )}
              </p>
            </div>

            {/* 법인 */}
            <div className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300">
              <div className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center text-gray-400 mb-6 font-black text-xl">
                02
              </div>
              <h3 className="text-lg font-black text-gray-950 mb-4">
                {t("법인 기업", "Corporations")}
              </h3>
              <p className="text-sm font-bold text-gray-500 leading-relaxed break-keep">
                {t(
                  "법인세법에 의거하여, 한도 내에서 지출한",
                  "According to the Corporate Tax Act,",
                )}{" "}
                <span className="text-gray-950 font-black">
                  {t(
                    "기부금 전액을 비용으로 인정",
                    "full donation amounts within limits are deductible",
                  )}
                </span>
                {t("받을 수 있습니다.", " as expenses.")}
              </p>
            </div>

            {/* 상속재산 */}
            <div className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300">
              <div className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center text-gray-400 mb-6 font-black text-xl">
                03
              </div>
              <h3 className="text-lg font-black text-gray-950 mb-4">
                {t("상속 재산", "Inherited Property")}
              </h3>
              <p className="text-sm font-bold text-gray-500 leading-relaxed break-keep">
                {t(
                  "출연한 재산 가액 전액에 대해",
                  "The total value of donated property is eligible for an",
                )}{" "}
                <span className="text-gray-950 font-black">
                  {t("상속세 비과세", "inheritance tax exemption")}
                </span>{" "}
                {t(
                  "혜택이 적용됩니다. (신고 기한 내 출연 시)",
                  "benefits. (When donated within the filing period)",
                )}
              </p>
            </div>
          </div>
          <p className="mt-6 text-[11px] font-bold text-gray-300 text-center uppercase tracking-widest">
            {t(
              "참조: 소득세법 제34조, 제52조 / 상속·증여세법 제16조",
              "Ref: Income Tax Act Art. 34, 52 / Inheritance & Gift Tax Act Art. 16",
            )}
          </p>
        </section>

        {/* 3. PROCESS: 후원 참여 절차 */}
        <section className="mb-24 bg-gray-950 rounded-[3rem] p-10 md:p-16 text-white overflow-hidden relative">
          <div className="relative z-10">
            <h2 className="text-2xl md:text-3xl font-black tracking-tighter mb-12">
              {t("후원 참여 절차", "Donation Process")}
            </h2>

            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {[
                {
                  step: "01",
                  title: t("후원신청", "Apply"),
                  desc: t("CMS / 무통장", "CMS / Bank Transfer"),
                },
                {
                  step: "02",
                  title: t("입금확인", "Confirm"),
                  desc: t("사사무처 확인", "Office Verification"),
                },
                {
                  step: "03",
                  title: t("입금처리", "Processing"),
                  desc: t("데이터 전산화", "Data Digitization"),
                },
                {
                  step: "04",
                  title: t("영수증발급", "Receipt"),
                  desc: t("국세청 연동", "NTS Integration"),
                },
                {
                  step: "05",
                  title: t("기부자예우", "Donor Care"),
                  desc: t("감사 서신 등", "Thank-you Letter"),
                },
              ].map((item, idx) => (
                <div key={idx} className="relative group">
                  <div className="mb-4 text-blue-500 font-mono font-black text-xs tracking-widest">
                    {item.step}
                  </div>
                  <h4 className="text-lg font-black mb-1">{item.title}</h4>
                  <p className="text-[11px] font-bold text-gray-300 uppercase">
                    {item.desc}
                  </p>
                  {idx < 4 && (
                    <div className="hidden md:block absolute top-1/2 -right-2 w-4 h-[2px] bg-gray-800" />
                  )}
                </div>
              ))}
            </div>
          </div>
          <div className="absolute -bottom-10 -right-10 text-[120px] font-black text-white/5 select-none pointer-events-none tracking-tighter">
            PROCESS
          </div>
        </section>

        {/* 4. PAYMENT METHODS: 구체적 입금 방법 */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* CMS 자동이체 */}
          <div className="bg-white p-10 rounded-[2.5rem] border border-gray-100 shadow-sm relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 transition-transform">
              <svg
                width="40"
                height="40"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
              >
                <path d="M21 12V7a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h7" />
                <path d="M16 19h6" />
                <path d="M19 16l3 3-3 3" />
                <circle cx="8" cy="12" r="3" />
              </svg>
            </div>
            <h3 className="text-xl font-black text-gray-950 mb-4">
              {t("자동이체 (CMS)", "Automatic Transfer (CMS)")}
            </h3>
            <p className="text-sm font-bold text-gray-500 leading-relaxed break-keep">
              {t(
                "기부자 명의 국내 은행계좌에서 지정금액을 지정된 날짜에 매월 자동 출금하는 가장 편리한 방법입니다.",
                "The most convenient way to automatically withdraw a designated amount from your domestic bank account every month on a set date.",
              )}
            </p>
          </div>

          {/* 무통장 입금 */}
          <div className="bg-blue-600 p-10 rounded-[2.5rem] text-white shadow-xl shadow-blue-100 relative overflow-hidden group">
            <h3 className="text-xl font-black mb-4">
              {t("무통장 입금", "Bank Transfer")}
            </h3>
            <div className="space-y-4">
              <div className="bg-white/10 p-5 rounded-2xl backdrop-blur-sm border border-white/10">
                <p className="text-[11px] font-black text-blue-200 uppercase tracking-[0.2em] mb-1">
                  Account Information
                </p>
                <p className="text-lg font-black tracking-tight">
                  NH Bank 351-1216-0057-53
                </p>
                <p className="text-[13px] font-bold opacity-80">
                  {t(
                    "예금주: (사)대한생활체육회",
                    "Account Holder: Korea Sports For All",
                  )}
                </p>
              </div>
              <p className="text-[12px] font-bold leading-relaxed opacity-90 break-keep">
                {t(
                  "* 입금 후 협회 사무처로 성함과 연락처를 알려주시면 기부금 영수증 발급을 도와드립니다.",
                  "* Please notify the office of your name and contact info after transfer for receipt issuance.",
                )}
              </p>
            </div>
          </div>
        </section>

        {/* 5. CTA: 하단 문의 */}
        <footer className="mt-24 py-12 border-t border-gray-100 flex flex-col items-center gap-6">
          <p className="text-[13px] font-bold text-gray-400">
            {t(
              "후원 관련 문의가 있으신가요?",
              "Have any questions about donations?",
            )}
          </p>
          <div className="flex gap-4">
            <a
              href="tel:02-2088-7508"
              className="px-8 py-4 bg-white border border-gray-200 rounded-2xl font-black text-sm tracking-widest hover:border-gray-950 transition-all shadow-sm"
            >
              {t("전화 문의", "CALL CENTER")}
            </a>
            <Link
              href={isEnglish ? "/en/contact" : "/contact"}
              className="px-8 py-4 bg-gray-950 text-white rounded-2xl font-black text-sm tracking-widest hover:bg-blue-600 transition-all shadow-xl shadow-gray-200"
            >
              {t("문의하기", "SEND INQUIRY")}
            </Link>
          </div>
        </footer>
      </div>
    </main>
  );
}
