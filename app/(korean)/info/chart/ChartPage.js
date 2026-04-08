"use client";
import React from "react";
import { motion } from "framer-motion";
import { CHART } from "./chart";
import SubHero from "../components/SubHero";
import { useParams } from "next/navigation";

export default function ChartPage() {
  const params = useParams();
  const isEnglish = params.lang === "en";

  // 번역 헬퍼 함수
  const t = (ko, en) => (isEnglish ? en : ko);

  // 중복된 직함을 제거하고 언어에 맞는 텍스트 반환
  const getUniquePositions = (members) => {
    return Array.from(
      new Set(members.map((m) => (isEnglish ? m.detailEn : m.detail))),
    );
  };

  return (
    <main>
      <SubHero
        breadcrumb={[
          t("체육회 소개", "About Us"),
          t("중앙 조직도", "Organization Chart"),
        ]}
        title={t("중앙 조직도", "Organization Chart")}
        subTitle={
          <>
            {t(
              "체계적인 조직망을 통해",
              "Through a systematic organizational network,",
            )}{" "}
            <br />
            <strong className="font-bold text-gray-950">
              {t(
                "생활체육의 새로운 표준을 만듭니다.",
                "we set new standards for sports for all.",
              )}
            </strong>
          </>
        }
      />
      <section className="relative py-32 px-6 bg-[#f2f2f4] min-h-screen overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03] bg-[url('/images/noise.png')] pointer-events-none" />
        <div className="absolute inset-0 [background-image:linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] [background-size:60px_60px] pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="mb-24 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-[2px] bg-gray-900" />
              <span className="text-[12px] font-black text-gray-900 tracking-[0.3em] uppercase">
                {t("대한생활체육회 조직도", "KSFAA Organization Chart")}
              </span>
            </div>
            <h1 className="text-5xl md:text-6xl font-black tracking-tighter text-gray-900">
              {t("중앙", "Central")}{" "}
              <span className="text-blue-600 italic">
                {t("조직체계", "Structure")}
              </span>
            </h1>
          </div>

          <div className="space-y-12">
            {CHART.map((floor, floorIndex) => (
              <div key={floorIndex}>
                {floor.all ? (
                  <div className="w-full">
                    {floor.all.map((section, idx) => (
                      <OrgCard
                        key={idx}
                        section={section}
                        isEnglish={isEnglish}
                        uniquePositions={getUniquePositions(section.members)}
                        isFullWidth
                      />
                    ))}
                  </div>
                ) : (
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="space-y-6">
                      {floor.left?.map((section, idx) => (
                        <OrgCard
                          key={idx}
                          section={section}
                          isEnglish={isEnglish}
                          uniquePositions={getUniquePositions(section.members)}
                        />
                      ))}
                    </div>
                    <div className="space-y-6">
                      {floor.center?.map((section, idx) => (
                        <OrgCard
                          key={idx}
                          section={section}
                          isEnglish={isEnglish}
                          uniquePositions={getUniquePositions(section.members)}
                          isHighlight
                        />
                      ))}
                    </div>
                    <div className="space-y-6">
                      {floor.right?.map((section, idx) => (
                        <OrgCard
                          key={idx}
                          section={section}
                          isEnglish={isEnglish}
                          uniquePositions={getUniquePositions(section.members)}
                        />
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

function OrgCard({
  section,
  uniquePositions,
  isEnglish,
  isHighlight = false,
  isFullWidth = false,
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={`relative p-8 rounded-[1.5rem] border-2 transition-all duration-300
        ${
          isHighlight
            ? "bg-gray-900 border-gray-900 shadow-xl"
            : "bg-white border-gray-200 shadow-sm hover:border-blue-600"
        }`}
    >
      <div className="flex items-center justify-between mb-6 border-b pb-4 border-gray-100/10">
        <h3
          className={`text-sm font-black tracking-widest uppercase ${isHighlight ? "text-blue-400" : "text-blue-600"}`}
        >
          {isEnglish ? section.positionEn : section.position}
        </h3>
        {isHighlight && (
          <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
        )}
      </div>

      <div
        className={`grid gap-x-6 gap-y-3 ${isFullWidth ? "grid-cols-2 md:grid-cols-4 lg:grid-cols-5" : "grid-cols-1"}`}
      >
        {uniquePositions.map((pos, pIdx) => (
          <div key={pIdx} className="flex items-center gap-3 group">
            <div
              className={`w-1.5 h-1.5 shrink-0 rotate-45 ${isHighlight ? "bg-white/20" : "bg-gray-200"}`}
            />
            <p
              className={`text-[14px] font-black tracking-tight leading-none ${isHighlight ? "text-white" : "text-gray-900"}`}
            >
              {pos}
            </p>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
