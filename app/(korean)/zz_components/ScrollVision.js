"use client";
import { motion } from "framer-motion";
import { useParams } from "next/navigation";
import React from "react";

// 무한 루프 텍스트 컴포넌트
// aria-hidden을 추가하여 검색 엔진이 반복되는 동일 텍스트를 중복 수집하지 않게 방어합니다.
const RollingText = ({ children, direction = "left" }) => {
  const initialX = direction === "left" ? "0%" : "-50%";
  const animateX = direction === "left" ? "-50%" : "0%";

  return (
    <div className="relative w-full overflow-hidden select-none">
      <motion.div
        initial={{ x: initialX }}
        animate={{ x: animateX }}
        transition={{
          duration: 50,
          ease: "linear",
          repeat: Infinity,
        }}
        className="flex whitespace-nowrap w-max min-w-full items-center"
      >
        {/* 첫 번째 요소만 인덱싱 허용, 나머지는 디자인용으로 처리 */}
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="flex-shrink-0 px-10 md:px-20"
            aria-hidden={i !== 1}
          >
            {children}
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default function ScrollVision() {
  const params = useParams();
  const isEnglish = params.lang === "en";
  const t = (ko, en) => (isEnglish ? en : ko);
  return (
    // section에 의미 있는 id나 aria-label을 부여하면 좋습니다.
    <section
      className="py-20 md:py-32 lg:py-48 bg-white overflow-hidden"
      aria-labelledby="vision-title"
    >
      <div className="flex flex-col gap-10 md:gap-12 lg:gap-14">
        {/* 첫 번째 줄: 장식적 요소이므로 h3 정도로 위계 조정 */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <RollingText direction="left">
            <h3 className="text-[10vw] md:text-[8vw] font-black tracking-tighter leading-none uppercase text-gray-200 italic">
              Active <span className="text-blue-600">Korea</span> Every{" "}
              <span className="text-blue-400/50">Day</span>
            </h3>
          </RollingText>
        </motion.div>

        {/* 중앙 텍스트: 이 컴포넌트의 핵심 키워드 구역 */}
        <div className="max-w-7xl mx-auto px-6 w-full text-center py-4 md:py-8">
          <motion.p
            id="vision-title"
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="text-xl md:text-3xl lg:text-4xl font-black text-gray-900 break-keep leading-[1.5] md:leading-[1.7] tracking-tighter"
          >
            {t("대한생활체육회는", "KSFAA believes that")} <br />
            {/* SEO 핵심: 강조하고 싶은 키워드에 strong 부여 (디자인 영향 X) */}
            <motion.span
              initial={{ backgroundSize: "0% 100%" }}
              whileInView={{ backgroundSize: "100% 100%" }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="text-blue-600 underline decoration-[3px] md:decoration-[6px] underline-offset-[6px] md:underline-offset-[10px]"
            >
              <strong className="font-inherit">
                {t("스포츠가 최고의 복지", "Sports is the best welfare")}
              </strong>
            </motion.span>
            {t("라는 신념 아래,", " for all citizens,")} <br />
            {t(
              "전 국민의 건강한 삶과 복지 증진에 기여합니다.",
              "contributing to a healthier and happier life.",
            )}
          </motion.p>
        </div>

        {/* 두 번째 줄: 기관 공식 명칭 포함 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <RollingText direction="right">
            <h3 className="text-[10vw] md:text-[8vw] font-black tracking-tighter leading-none uppercase text-gray-900">
              Korea Sports <span className="text-blue-600 italic">For</span> All{" "}
              <span className="text-gray-400">Athletic Association</span>
            </h3>
          </RollingText>
        </motion.div>
      </div>
    </section>
  );
}
