"use client";
import React from "react";
import { motion } from "framer-motion";
import SubHero from "../components/SubHero";
import { useParams } from "next/navigation";

export default function PurposePage() {
  const params = useParams();
  const isEnglish = params.lang === "en";

  // 번역 헬퍼 함수
  const t = (ko, en) => (isEnglish ? en : ko);

  const purposes = [
    {
      id: "01",
      title: t("스포츠 클럽 육성", "Fostering Sports Clubs"),
      text: t(
        "생활체육 내외의 스포츠 클럽 활동 지원·육성",
        "Supporting and Fostering Sports Club Activities",
      ),
      desc: t(
        "지역 자생적 클럽이 뿌리내릴 수 있는 행정적 기틀을 마련합니다.",
        "Establishing an administrative foundation for self-sustaining local clubs.",
      ),
    },
    {
      id: "02",
      title: t("단위 클럽 지원", "Supporting Unit Clubs"),
      text: t(
        "전국 각 생활체육단위 스포츠클럽 활동지원 육성",
        "Supporting Regional Sports Club Activities Nationwide",
      ),
      desc: t(
        "기초 단위 클럽의 지속 가능한 운영 프로그램을 제공합니다.",
        "Providing sustainable operation programs for local unit clubs.",
      ),
    },
    {
      id: "03",
      title: t("공식 대회 개최", "Hosting Official Competitions"),
      text: t(
        "생활체육 스포츠 클럽 리그 및 각종 공식대회 개최",
        "Hosting Sports Club Leagues and Official Competitions",
      ),
      desc: t(
        "체계적인 리그 시스템을 통해 동호인들의 성취감을 고취합니다.",
        "Inspiring a sense of achievement through a systematic league system.",
      ),
    },
    {
      id: "04",
      title: t("1인 1기 캠페인", "1-Person 1-Skill Campaign"),
      text: t(
        "전국 생활인 및 동호인 1인 1기 참여 운동 전개",
        "Promoting Participation in the 'One Skill per Person' Movement",
      ),
      desc: t(
        "모든 국민이 자신만의 특화 종목을 가질 수 있도록 독려합니다.",
        "Encouraging all citizens to have their own specialized sport.",
      ),
    },
    {
      id: "05",
      title: t("전문 인력 양성", "Training Professional Talent"),
      text: t(
        "생활체육 스포츠 전문지도자 및 심판 양성교육",
        "Training for Sports Instructors and Referees",
      ),
      desc: t(
        "공신력 있는 교육으로 생활체육의 질적 수준을 높입니다.",
        "Improving the quality of sports through credible educational programs.",
      ),
    },
    {
      id: "06",
      title: t("시설 및 인프라", "Facilities and Infrastructure"),
      text: t(
        "체육시설 위탁운영 및 연수원 운영, 지도자 파견",
        "Entrusted Operation of Facilities and Dispatching Instructors",
      ),
      desc: t(
        "적재적소에 전문 인력을 배치하여 인프라를 확장합니다.",
        "Expanding infrastructure by deploying professionals in the right places.",
      ),
    },
    {
      id: "07",
      title: t("회원 권익 증진", "Enhancing Member Welfare"),
      text: t(
        "회원 권익 향상을 위한 회원카드 발급 및 복리증진",
        "Issuing Member Cards and Improving Welfare Benefits",
      ),
      desc: t(
        "전용 혜택 시스템으로 회원의 소속감과 권익을 보호합니다.",
        "Protecting member rights and belonging through a dedicated benefit system.",
      ),
    },
    {
      id: "08",
      title: t("자격 행정 관리", "Administrative Qualification Management"),
      text: t(
        "생활체육행정사 및 종목별 자격제도 관리 운영",
        "Managing Qualification Systems for Sports Administration",
      ),
      desc: t(
        "엄격한 자격 관리를 통해 행정의 전문성과 신뢰를 확보합니다.",
        "Ensuring professionalism and trust through strict qualification management.",
      ),
    },
    {
      id: "09",
      title: t("글로벌 네트워크", "Global Network"),
      text: t(
        "생활체육 육성을 위한 국제적 영향력 행사",
        "Exercising International Influence to Foster Sports",
      ),
      desc: t(
        "해외 사례 교류를 통해 한국형 모델을 세계에 알립니다.",
        "Promoting the Korean model globally through international exchange.",
      ),
    },
  ];

  return (
    <>
      <SubHero
        breadcrumb={[t("체육회 소개", "About Us"), t("설립 목적", "Purpose")]}
        title={t("설립 목적", "Purpose of Establishment")}
        subTitle={
          <>
            {t("대한생활체육회는", "The KSFAA")} <br />
            <strong className="font-bold text-gray-950">
              {t(
                "국민의 건강한 삶을 최우선 가치로",
                "places the highest value on the healthy lives of the people",
              )}
            </strong>{" "}
            {t(
              "두고 9가지 핵심 사업을 추진합니다.",
              "and promotes nine core initiatives.",
            )}
          </>
        }
      />
      <section
        className="relative py-32 px-6 overflow-hidden bg-[#f4f4f6]"
        aria-labelledby="purpose-heading"
      >
        {/* --- BACKGROUND DESIGN (수정 없음) --- */}
        <div
          className="absolute inset-0 opacity-[0.15] [background-image:radial-gradient(#4f46e5_1px,transparent_1px)] [background-size:40px_40px] pointer-events-none"
          aria-hidden="true"
        />
        <div
          className="absolute top-[-10%] left-[-5%] w-[800px] h-[800px] bg-blue-100/30 rounded-full blur-[160px] pointer-events-none"
          aria-hidden="true"
        />
        <div
          className="absolute bottom-[-5%] right-[-5%] w-[600px] h-[600px] bg-white rounded-full blur-[120px] pointer-events-none"
          aria-hidden="true"
        />

        <div className="max-w-6xl mx-auto relative z-10">
          {/* HEADER AREA: 시맨틱 구조 보강 */}
          <header className="mb-24 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
            <div className="space-y-4">
              <p className="text-[10px] font-black tracking-[0.5em] text-blue-600 uppercase">
                Mission Statement
              </p>
              <h2
                id="purpose-heading"
                className="text-4xl md:text-5xl font-black tracking-tighter text-gray-900 leading-tight"
              >
                {t("더 건강한 내일을 위한", "For a Healthier Tomorrow,")} <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-500 italic">
                  {t("9가지 약속", "9 Commitments")}
                </span>
              </h2>
            </div>
            <div
              className="h-[1px] flex-1 bg-gray-200 mx-10 hidden lg:block mb-4 opacity-50"
              aria-hidden="true"
            />
            <p className="text-sm font-bold text-gray-400 max-w-[240px] leading-relaxed break-keep">
              {t(
                "스포츠를 통한 복지 실현,",
                "Realizing welfare through sports,",
              )}{" "}
              <br />
              {t(
                "그 중심에 대한생활체육회가 있습니다.",
                "at the heart of it lies the KSFAA.",
              )}
            </p>
          </header>

          {/* COMPACT INDEX LIST: 각 항목을 article로 감싸 독립적인 정보임을 명시 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {purposes.map((item, index) => (
              <motion.article
                key={index}
                whileHover={{ x: 10 }}
                className="group flex flex-col p-8 bg-white/60 backdrop-blur-sm border border-white hover:border-blue-600/20 rounded-[2rem] transition-all duration-300 shadow-sm hover:shadow-[0_20px_40px_rgba(0,0,0,0.03)]"
              >
                <div className="flex items-start gap-6">
                  <div className="space-y-3 shrink-0">
                    <span
                      className="text-[11px] font-black text-blue-600 tracking-widest"
                      aria-hidden="true"
                    >
                      {item.id}
                    </span>
                    <div className="w-6 h-6 rounded-full bg-blue-50 flex items-center justify-center">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-600 group-hover:scale-150 transition-transform" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    {/* h3를 사용하여 각 목적의 타이틀 강조 */}
                    <h3 className="text-[17px] font-black text-gray-900 tracking-tight leading-snug break-keep">
                      <span className="sr-only">{item.id}.</span> {item.text}
                    </h3>
                    <p className="text-[13px] font-bold text-gray-400 leading-relaxed break-keep group-hover:text-gray-500 transition-colors">
                      {item.desc}
                    </p>
                  </div>
                </div>
              </motion.article>
            ))}

            {/* 마지막 가이드 카드 */}
            <footer className="p-8 bg-blue-600 rounded-[2rem] flex flex-col justify-between overflow-hidden relative shadow-xl shadow-blue-200">
              <div className="relative z-10 text-white font-black text-xl md:text-2xl tracking-tighter break-keep">
                {t("함께 건강한 사회를", "We are waiting for you")} <br />
                {t(
                  "만들어갈 당신을 기다립니다.",
                  "to build a healthy society together.",
                )}
              </div>
              <div className="relative z-10 mt-6 flex justify-end">
                <span className="text-[10px] font-black tracking-widest text-white/50 border-t border-white/20 pt-4 w-full text-right uppercase italic">
                  Korea Sports For All
                </span>
              </div>
              <div
                className="absolute top-0 right-0 w-32 h-32 bg-white blur-[60px] opacity-20"
                aria-hidden="true"
              />
            </footer>
          </div>
        </div>
      </section>
    </>
  );
}
