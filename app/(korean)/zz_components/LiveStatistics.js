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

// 숫자 카운팅 컴포넌트
function Counter({ value, duration = 1.25 }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  // 숫자만 추출 (2.5M -> 2.5, 50+ -> 50)
  const numericValue = parseFloat(value.replace(/[^0-9.]/g, ""));
  const suffix = value.replace(/[0-9.]/g, "");

  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => {
    // 소수점이 있으면 한자리까지, 없으면 정수로 표시
    return numericValue % 1 === 0
      ? Math.floor(latest).toLocaleString()
      : latest.toFixed(1);
  });

  useEffect(() => {
    if (isInView) {
      const controls = animate(count, numericValue, {
        duration: duration,
        ease: "easeOut",
      });
      return controls.stop;
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
    <section className="py-18 lg:py-28 bg-white px-6">
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

          {/* 지표 영역 */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6">
            {stats.map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="p-8 lg:p-12 bg-gray-50 rounded-[2.5rem] lg:rounded-[3rem] border border-gray-100 hover:border-blue-200 transition-colors group"
              >
                <p className="text-xs lg:text-sm font-black text-gray-800 mb-3 lg:mb-4 tracking-widest uppercase opacity-70 group-hover:opacity-100 transition-opacity">
                  {stat.label}
                </p>
                {/* 숫자가 올라가는 애니메이션 적용 부분 */}
                <p className="text-4xl lg:text-5xl font-black text-blue-700 mb-1 lg:mb-2 tracking-tighter">
                  <Counter value={stat.value} />
                  {/* 접미사(+, M 등) 처리 */}
                  {stat.value.replace(/[0-9.]/g, "")}
                </p>
                <p className="text-[10px] lg:text-xs font-bold text-gray-500 uppercase tracking-widest leading-tight">
                  {stat.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
