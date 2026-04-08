"use client";
import { useParams } from "next/navigation";
import {
  motion,
  useMotionValue,
  useTransform,
  animate,
  useInView,
} from "framer-motion";
import { useEffect, useRef } from "react";
function Counter({ value, duration = 1.25 }) {
  const ref = useRef(null);
  // 마진을 제거하거나 작게 조정하여 모바일 대응
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  const numericValue = parseFloat(value.replace(/[^0-9.]/g, "")) || 0;

  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => {
    // 소수점이 있는 경우와 없는 경우를 구분하여 포맷팅
    if (numericValue % 1 === 0) {
      return Math.floor(latest).toLocaleString();
    }
    return latest.toFixed(1);
  });

  useEffect(() => {
    if (isInView) {
      const controls = animate(count, numericValue, {
        duration: duration,
        ease: "easeOut",
      });
      return () => controls.stop(); // 리턴 방식 수정
    }
  }, [isInView, numericValue, count, duration]);

  return <motion.span ref={ref}>{rounded}</motion.span>;
}
export default function LiverStatistics() {
  const params = useParams();
  const isEnglish = params.lang === "en";
  const t = (ko, en) => (isEnglish ? en : ko);

  const stats = [
    {
      label: t("전국 체육회", "National Associations"),
      value: "15",
      desc: t("전국 체육회 현황", "Regional Councils"),
    },
    {
      label: t("종목 협회", "Sports Federations"),
      value: "50+",
      desc: t("50개 이상의 종목", "Across Various Sports"),
    },
    {
      label: t("생활체육인", "Active Members"),
      value: "2.5M",
      desc: t("250만의 생활체육인", "Registered Participants"),
    },
    {
      label: t("국제 체육회", "International"),
      value: "12",
      desc: t("12개의 국제체육회", "Global Networks"),
    },
  ];

  return (
    // section에 명확한 역할을 부여하기 위해 aria-label 추가
    <section
      className="py-18 lg:py-28 bg-white px-6"
      aria-label={t("대한생활체육회 주요 통계 지표", "KSFAA Key Statistics")}
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* 텍스트 영역 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-8 lg:space-y-12"
          >
            {/* 통계 섹션의 부제목이므로 h2를 유지하되, 전체 페이지 흐름에 맞춰 h3 사용 (HomeTop이 h1이므로) */}
            <h3 className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tighter leading-[1.15] lg:leading-[1.1] text-gray-900 break-keep">
              {t("숫자로 증명하는", "Proving with Numbers")} <br />
              <span className="text-blue-700 italic">
                {t("생활체육의 힘.", "The Power of Sport.")}
              </span>
            </h3>
            <p className="text-lg md:text-xl font-bold text-gray-400 leading-relaxed break-keep">
              {t(
                "전국 17개 시도, 200여 개 시군구에서 매일 수만 명의 국민이 대한생활체육회와 함께 건강한 변화를 만들어가고 있습니다.",
                "In 17 provinces and over 200 municipalities across the country, tens of thousands of citizens are creating healthy changes every day with the KSFAA.",
              )}
            </p>
          </motion.div>

          {/* 지표 영역: 통계 목록임을 명시하기 위해 dl(Description List) 사용 고려 가능하나 디자인 유지를 위해 div 구조 유지하며 Role 부여 */}
          <div
            className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6"
            role="list"
          >
            {stats.map((stat, i) => (
              <motion.article
                key={i}
                role="listitem"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="p-8 lg:p-12 bg-gray-50 rounded-[2.5rem] lg:rounded-[3rem] border border-gray-100 hover:border-blue-200 transition-colors group"
              >
                {/* 시각적인 label을 강조하기 위해 strong 사용 */}
                <h4 className="text-xs lg:text-sm font-black text-gray-800 mb-3 lg:mb-4 tracking-widest uppercase opacity-70 group-hover:opacity-100 transition-opacity">
                  {stat.label}
                </h4>

                {/* 숫자는 가장 중요한 정보이므로 강조. 단, 카운팅 중에도 검색 로봇은 최종값을 읽어야 함 */}
                <p className="text-4xl lg:text-5xl font-black text-blue-700 mb-1 lg:mb-2 tracking-tighter">
                  <strong className="font-black">
                    <Counter value={stat.value} />
                    {/* 접미사 처리 */}
                    {stat.value.replace(/[0-9.]/g, "")}
                  </strong>
                </p>

                {/* 보충 설명에도 적절한 의미 부여 */}
                <p className="text-[10px] lg:text-xs font-bold text-gray-500 uppercase tracking-widest leading-tight">
                  <span className="sr-only">{stat.label}: </span>
                  {stat.desc}
                </p>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
