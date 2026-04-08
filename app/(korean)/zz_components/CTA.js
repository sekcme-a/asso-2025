"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useParams } from "next/navigation";

export default function CTA() {
  const params = useParams();
  const isEnglish = params.lang === "en";

  // 번역 헬퍼 함수
  const t = (ko, en) => (isEnglish ? en : ko);

  return (
    <section
      className="py-24 md:py-40 bg-gray-50 px-6 relative text-center overflow-hidden"
      aria-labelledby="cta-title"
    >
      {/* 배경 디자인 요소 */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.06]"
        aria-hidden="true"
      >
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
          {/* 장식 요소 */}
          <div
            className="w-12 h-1 bg-blue-600 mx-auto mb-8 rounded-full"
            aria-hidden="true"
          />

          {/* 타이틀 */}
          <h2
            id="cta-title"
            className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tighter leading-[1.1] text-gray-900 mb-8 break-keep"
          >
            {t("생활체육으로", "Energetic Life")}{" "}
            <strong className="text-blue-600 font-black">
              {t("완성되는", "Perfected")}
            </strong>{" "}
            <br className="hidden md:block" /> {t("활기찬 일상.", "by Sports.")}
          </h2>

          <p className="text-lg md:text-xl font-bold text-gray-500 mb-12 break-keep leading-relaxed">
            {t(
              "대한생활체육회는 당신의 가장 가까운 곳에서",
              "KSFAA designs healthy changes and new energy",
            )}{" "}
            <br className="hidden md:block" />
            {t(
              "건강한 변화와 새로운 에너지를 설계합니다.",
              "right by your side at every moment.",
            )}
          </p>

          {/* 버튼 영역 */}
          <div className="flex flex-col sm:flex-row justify-center gap-6 items-center">
            <Link
              href={isEnglish ? "/en/contact" : "/contact"}
              title={t(
                "대한생활체육회 가입 및 서비스 문의하기",
                "Contact for membership and services",
              )}
              className="w-full sm:w-auto px-10 py-4 bg-blue-600 text-white rounded-full font-black text-lg hover:bg-gray-900 transition-all shadow-xl shadow-blue-100 hover:shadow-none"
            >
              {t("문의하기", "Contact Us")}
            </Link>
            <Link
              href={isEnglish ? "/en/group/nation" : "/group/nation"}
              title={t("대한생활체육회 단체 소개 보기", "View About KSFAA")}
              className="group text-base font-black text-gray-900 flex items-center gap-2 hover:text-blue-600 transition-colors"
            >
              {t("단체 소개 더보기", "Learn More About Us")}
              <span
                className="group-hover:translate-x-1 transition-transform"
                aria-hidden="true"
              >
                →
              </span>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
