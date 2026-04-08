"use client";
import React from "react";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import SubHero from "../components/SubHero";
import { useParams } from "next/navigation";

const KakaoMap = dynamic(() => import("./KakaoMap"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full bg-[#fbfbfd] animate-pulse rounded-3xl" />
  ),
});

export default function LocationPage() {
  const params = useParams();
  const isEnglish = params.lang === "en";

  // 번역 헬퍼 함수
  const t = (ko, en) => (isEnglish ? en : ko);

  const LAT = 37.48305;
  const LNG = 126.87951;
  const MARKER_TEXT = t("(사)대한생활체육회", "KSFAA");

  return (
    <main>
      <SubHero
        breadcrumb={[
          t("체육회 소개", "About Us"),
          t("찾아오시는 길", "Location"),
        ]}
        title={t("찾아오시는 길", "Location")}
        subTitle={
          <>
            {t("언제나 열려있는 마음으로", "With an always open heart,")} <br />
            <strong className="font-bold text-gray-950">
              {t("여러분의 방문을 환영합니다.", "we welcome your visit.")}
            </strong>
          </>
        }
      />
      <section className="relative py-24 px-6 bg-white min-h-screen">
        {/* BACKGROUND GRID */}
        <div className="absolute inset-0 [background-image:radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:32px_32px] opacity-40 pointer-events-none" />

        <div className="max-w-6xl mx-auto relative z-10">
          {/* HEADER */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 pb-8 border-b-2 border-gray-900">
            <div className="space-y-2">
              <span className="text-[10px] font-black text-blue-600 tracking-[0.4em] uppercase font-mono">
                Location Index
              </span>
              <h1 className="text-4xl md:text-5xl font-black tracking-tighter text-gray-900">
                {t("찾아오시는 길", "Directions")}
              </h1>
            </div>
            <p className="text-sm font-bold text-gray-400 tracking-tight italic">
              Korea Sports For All Athletic Association.
            </p>
          </div>

          {/* CONTENT LAYOUT */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-stretch">
            {/* MAP AREA */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="relative"
            >
              <div className="h-full min-h-[400px]">
                <KakaoMap
                  latitude={LAT}
                  longitude={LNG}
                  markerText={MARKER_TEXT}
                />
              </div>
            </motion.div>

            {/* INFO AREA */}
            <div className="flex flex-col gap-4">
              {/* Address Card */}
              <div className="p-10 bg-[#fbfbfd] border border-gray-100 rounded-[2rem] hover:border-blue-600/30 transition-colors group">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-600" />
                  <span className="text-[10px] font-black text-gray-400 tracking-widest uppercase">
                    Office Address
                  </span>
                </div>
                <h2 className="text-2xl font-black text-gray-900 leading-tight break-keep">
                  {t(
                    "서울특별시 금천구 가산동",
                    "459-6, Gasan-dong, Geumcheon-gu,",
                  )}{" "}
                  <br />
                  {t("459-6", "Seoul, Republic of Korea")}{" "}
                  <span className="text-blue-600">
                    {t("SH드림 307호", "SH Dream #307")}
                  </span>
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Contact Card */}
                <div className="p-8 bg-[#fbfbfd] border border-gray-100 rounded-[2rem]">
                  <span className="block text-[10px] font-black text-gray-400 tracking-widest uppercase mb-4">
                    Contact
                  </span>
                  <p className="text-lg font-black text-gray-900">
                    02.2088.7508
                  </p>
                  <p className="text-[11px] font-bold text-gray-400 mt-1">
                    {t("평일 09:00 - 18:00", "Weekdays 09:00 - 18:00")}
                  </p>
                </div>

                {/* Subway Card */}
                <div className="p-8 bg-[#fbfbfd] border border-gray-100 rounded-[2rem]">
                  <span className="block text-[10px] font-black text-gray-400 tracking-widest uppercase mb-4">
                    Public Transit
                  </span>
                  <p className="text-lg font-black text-gray-900">
                    {t("가산디지털단지역", "Gasan Digital Complex Stn.")}
                  </p>
                  <p className="text-[11px] font-bold text-gray-400 mt-1">
                    {t("9번 출구 (도보 8분)", "Exit 9 (8 min walk)")}
                  </p>
                </div>
              </div>

              {/* Navigation Link */}
              <a
                href={`https://map.kakao.com/link/to/${MARKER_TEXT},${LAT},${LNG}`}
                target="_blank"
                className="mt-auto flex items-center justify-between p-10 bg-gray-900 text-white rounded-[2.5rem] hover:bg-blue-600 transition-all duration-500 group"
              >
                <div className="space-y-1">
                  <p className="text-[10px] font-black tracking-widest text-white/50 uppercase">
                    Directions
                  </p>
                  <p className="text-xl font-black">
                    {t("카카오맵 바로가기", "Open Kakao Map")}
                  </p>
                </div>
                <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-white group-hover:text-blue-600 transition-all">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M5 12H19M19 12L12 5M19 12L12 19" />
                  </svg>
                </div>
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
