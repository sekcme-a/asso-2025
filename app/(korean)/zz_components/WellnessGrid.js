"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";

export default function WellnessGrid() {
  const params = useParams();
  const isEnglish = params.lang === "en";
  const t = (ko, en) => (isEnglish ? en : ko);
  const getHref = (path) => (isEnglish ? `/en${path}` : path);

  // 공통 등장 애니메이션 정의
  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-100px" },
    transition: { duration: 0.7, ease: "easeOut" },
  };

  return (
    <section
      className="py-18 lg:py-28 bg-gray-50 px-6"
      aria-label={t(
        "대한생활체육회 주요 가치 및 인프라",
        "KSFAA Key Values and Infrastructure",
      )}
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Big Card: 메인 가치 전달 구역 */}
          <motion.article
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="md:col-span-12 lg:col-span-8 group relative aspect-[4/5] sm:aspect-[16/9] lg:aspect-auto lg:h-[550px] rounded-[2rem] md:rounded-[2.5rem] overflow-hidden bg-zinc-900 shadow-xl"
          >
            <img
              src="/images/home/wellness.webp"
              // SEO 최적화: 이미지에 구체적인 설명 부여
              alt={t(
                "생활체육을 통해 건강한 삶을 누리는 국민들",
                "People enjoying a healthy life through sports",
              )}
              className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-1000"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-blue-900/90 via-blue-900/20 to-transparent" />

            <div className="absolute bottom-6 left-6 right-6 md:bottom-10 md:left-10 md:right-10">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
              >
                {/* SEO 최적화: h3 유지 및 strong 활용으로 강조 */}
                <h3 className="text-2xl md:text-4xl lg:text-5xl font-black text-white tracking-tighter leading-[1.2] break-keep mb-5">
                  {t("생활체육으로", "Through Sports,")} <br />
                  {t("국민", "Enhancing")}{" "}
                  <strong className="italic text-blue-400 font-black">
                    {t("건강·복지", "Health & Welfare")}
                  </strong>
                  {t("를 증진하다.", "for All Citizens.")}
                </h3>

                <Link
                  href={getHref("/about/greet")}
                  // SEO 최적화: 링크의 목적을 명확히 함
                  title={t(
                    "대한생활체육회 총재 인사말 페이지로 이동",
                    "Go to the President’s Message page",
                  )}
                  className="inline-block px-7 py-3.5 bg-white text-gray-900 rounded-full font-black text-sm hover:bg-blue-600 hover:text-white transition-all text-center"
                >
                  {t("총재 인사말 바로가기", "View President’s Message")}
                </Link>
              </motion.div>
            </div>
          </motion.article>

          {/* Small Cards Column */}
          <div className="md:col-span-12 lg:col-span-4 grid grid-cols-1 md:grid-cols-2 lg:flex lg:flex-col gap-6">
            {/* 카드 1: 인프라 정보 */}
            <motion.article
              {...fadeInUp}
              transition={{ ...fadeInUp.transition, delay: 0.2 }}
              className="p-7 md:p-8 lg:p-10 bg-white rounded-[2rem] md:rounded-[2.5rem] border border-gray-100 shadow-lg hover:shadow-blue-100 transition-all flex flex-col justify-between group"
            >
              <div
                className="w-12 h-12 lg:w-14 lg:h-14 bg-blue-50 rounded-xl flex items-center justify-center text-xl lg:text-2xl group-hover:bg-blue-600 group-hover:rotate-12 transition-all"
                aria-hidden="true"
              >
                🏅
              </div>

              <div className="mt-6 lg:mt-0">
                <h4 className="text-lg lg:text-xl font-black text-gray-900 mb-2">
                  {t("전국 단위 인프라", "National Infrastructure")}
                </h4>

                <p className="text-xs lg:text-sm text-gray-400 font-medium leading-relaxed break-keep">
                  {t(
                    "17개 시도 체육회와 연계하여 어디서든 전문 스포츠 케어를 지원합니다.",
                    "In connection with 17 provincial sports councils, we support professional sports care anywhere.",
                  )}
                </p>
              </div>
            </motion.article>

            {/* 카드 2: 현황 정보 */}
            <motion.article
              {...fadeInUp}
              transition={{ ...fadeInUp.transition, delay: 0.4 }}
              className="p-7 md:p-8 lg:p-10 bg-gray-900 rounded-[2rem] md:rounded-[2.5rem] shadow-lg flex flex-col justify-between group overflow-hidden relative"
            >
              {/* 디자인용 배경 텍스트는 로봇이 읽지 않도록 처리 */}
              <div
                className="absolute -right-4 -top-4 text-[6rem] lg:text-[8rem] font-black text-white/5 italic select-none pointer-events-none"
                aria-hidden="true"
              >
                K
              </div>

              <div className="relative z-10 h-full flex flex-col justify-between">
                <div>
                  <h4 className="text-lg lg:text-xl font-black text-white mb-2">
                    {t("전국체육회현황", "National Councils Status")}
                  </h4>

                  <p className="text-xs lg:text-sm text-white/50 font-medium leading-relaxed break-keep">
                    {t(
                      "전국의 체육회 정보를 확인하고 활기찬 생활을 시작하세요.",
                      "Explore sports council information across Korea and start an active lifestyle.",
                    )}
                  </p>
                </div>

                <Link
                  href={getHref("/group/nation")}
                  title={t(
                    "전국체육회 현황 상세 보기",
                    "View details of national sports councils status",
                  )}
                  className="inline-block mt-5 text-blue-400 font-black tracking-widest text-[10px] border-b border-blue-400 pb-1 self-start hover:text-white hover:border-white transition-colors"
                >
                  {t("자세히 보기", "LEARN MORE")}
                </Link>
              </div>
            </motion.article>
          </div>
        </div>
      </div>
    </section>
  );
}
