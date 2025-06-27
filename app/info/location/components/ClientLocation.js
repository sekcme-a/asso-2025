"use client";
import Layout from "@/components/Layout";
import dynamic from "next/dynamic";

const KakaoMap = dynamic(() => import("./KakaoMap"), {
  ssr: false,
});

export default function ClientLocation() {
  const LAT = 37.48305; // 위도
  const LNG = 126.87951; // 경도
  const MARKER_TEXT = "(사)대한생활체육회";
  // 서울특별시 금천구 가산동 459-6 SH드림 307호
  // 가산디지털단지역 9번 출구에서 330m도보 8분
  return (
    <Layout category="location" groupText="체육회소개" title="오시는 길">
      <section className="mb-8">
        <KakaoMap latitude={LAT} longitude={LNG} markerText={MARKER_TEXT} />
      </section>

      <section className=" text-gray-800 text-[1.05rem]">
        <p className="font-bold tex">Address.</p>
        <h2>서울특별시 금천구 가산동 459-6 SH드림 307호</h2>
        <p className="font-bold mt-3">Tel.</p>
        <h3>02-2088-7508</h3>
        <p className="font-bold mt-3">지하철 이용 시</p>
        <h3>가산디지털단지역 9번 출구에서 330m도보 8분</h3>
      </section>
    </Layout>
  );
}
