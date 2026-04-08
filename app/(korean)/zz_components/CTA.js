"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function CTA() {
  return (
    // py-80(약 320px) -> py-32(약 128px)로 대폭 축소하여 부담 감소
    <section className="py-24 md:py-40 bg-gray-50 px-6 relative text-center overflow-hidden">
      {/* 배경 텍스트 크기 조절: 30vw -> 15vw로 줄여 은은한 디테일로 변경 */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.06]">
        <span className="text-[15vw] font-black italic tracking-tighter select-none text-black">
          KSFAA
        </span>
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          {/* 장식 요소 크기 최적화 */}
          <div className="w-12 h-1 bg-blue-600 mx-auto mb-8 rounded-full" />

          {/* 타이틀 크기: 120px -> 72px급(text-7xl)으로 조정하여 가독성 향상 */}
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tighter leading-[1.1] text-gray-900 mb-8 break-keep">
            생활체육으로 <span className="text-blue-600">완성되는</span>{" "}
            <br className="hidden md:block" /> 활기찬 일상.
          </h2>

          {/* 본문 크기 및 간격 최적화 */}
          <p className="text-lg md:text-xl font-bold text-gray-500 mb-12 break-keep leading-relaxed">
            대한생활체육회는 당신의 가장 가까운 곳에서{" "}
            <br className="hidden md:block" />
            건강한 변화와 새로운 에너지를 설계합니다.
          </p>

          {/* 버튼 영역: 과한 패딩(py-8)과 폰트(text-2xl)를 실용적인 사이즈로 조정 */}
          <div className="flex flex-col sm:flex-row justify-center gap-6 items-center">
            <Link
              href="/join"
              className="w-full sm:w-auto px-10 py-4 bg-blue-600 text-white rounded-full font-black text-lg hover:bg-gray-900 transition-all shadow-xl shadow-blue-100 hover:shadow-none"
            >
              문의하기
            </Link>
            <Link
              href="/about"
              className="group text-base font-black text-gray-900 flex items-center gap-2 hover:text-blue-600 transition-colors"
            >
              체육회 소개 더보기
              <span className="group-hover:translate-x-1 transition-transform">
                →
              </span>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
