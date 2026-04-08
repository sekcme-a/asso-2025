"use client";
import { useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

export default function HomeTop() {
  const params = useParams();
  const isEnglish = params.lang === "en";
  const t = (ko, en) => (isEnglish ? en : ko);

  // 텍스트 순차 등장 애니메이션
  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: "easeOut" },
  };

  return (
    <section className="relative pt-32 pb-20 md:pt-60 md:pb-40 px-6 overflow-hidden">
      {/* 배경 디자인 요소: 원래 위치/수치 절대 유지 */}
      <div className="absolute inset-0 z-0">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          // 기존 클래스 그대로 유지: -skew-x-12 translate-x-20
          className="absolute top-0 right-0 w-[80%] lg:w-[60%] h-full bg-blue-50 -skew-x-12 translate-x-20"
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 0.5, scale: 1 }}
          transition={{ duration: 1.2 }}
          // 기존 클래스 그대로 유지: blur-[80px] lg:blur-[100px]
          className="absolute bottom-0 left-0 lg:left-10 w-48 h-48 lg:w-72 lg:h-72 bg-blue-100 rounded-full blur-[80px] lg:blur-[100px] opacity-50"
        />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* 텍스트 영역 */}
          <motion.div
            initial="initial"
            animate="animate"
            variants={{
              animate: { transition: { staggerChildren: 0.12 } },
            }}
            className="lg:col-span-7 order-2 lg:order-1"
          >
            <motion.div
              variants={fadeInUp}
              className="inline-flex items-center gap-2 lg:gap-3 px-4 py-2 bg-blue-700/5 rounded-full mb-6 lg:mb-8"
            >
              <span className="w-2 h-2 bg-blue-700 rounded-full animate-pulse" />
              <span className="text-[10px] lg:text-xs font-black text-blue-700 tracking-widest uppercase break-keep">
                {t(
                  "국민의 건강과 행복의 장을 여는",
                  "Opening the door to health and happiness",
                )}
              </span>
            </motion.div>

            <motion.h1
              variants={fadeInUp}
              className="text-5xl md:text-7xl lg:text-[90px] font-black tracking-tighter leading-[1.1] lg:leading-[0.9] mb-4 lg:mb-6 text-gray-900 break-keep"
            >
              {t("대한", "")}
              <span className="text-blue-700 ">{t("생활체육회", "KSFAA")}</span>
            </motion.h1>

            <motion.h2
              variants={fadeInUp}
              className="text-lg md:text-2xl lg:text-3xl font-black tracking-tight text-gray-800 mb-8 lg:mb-10 opacity-90 leading-tight"
            >
              {t(
                "Korea Sports For All Athletic Association",
                "Korea Sports For All Athletic Association",
              )}
            </motion.h2>

            <motion.p
              variants={fadeInUp}
              className="text-base md:text-xl lg:text-2xl font-bold text-gray-400 max-w-xl leading-relaxed lg:leading-snug break-keep mb-10 lg:mb-16"
            >
              {t(
                "대한생활체육회는 모든 국민이 운동하는 대한민국을 목표로 더 건강한 내일을 설계합니다.",
                "Korea Sports For All Athletic Association designs a healthier tomorrow with the goal of a nation where everyone exercises.",
              )}
            </motion.p>

            <motion.div
              variants={fadeInUp}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Link
                href={isEnglish ? "/en/about/greeting" : "/about/greeting"}
                className="px-8 lg:px-12 py-5 lg:py-6 bg-gray-900 text-white rounded-full font-black text-base lg:text-lg hover:bg-blue-700 transition-all shadow-xl shadow-gray-200 text-center"
              >
                {t("협회소개 보기", "About Association")}
              </Link>
              <Link
                href={isEnglish ? "/en/board/notice" : "/board/notice"}
                className="px-8 lg:px-12 py-5 lg:py-6 border-2 border-gray-900 text-gray-900 rounded-full font-black text-base lg:text-lg hover:bg-gray-50 transition-all text-center"
              >
                {t("공지사항 확인", "Check Notice")}
              </Link>
            </motion.div>
          </motion.div>

          {/* 이미지 영역 */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="lg:col-span-5 relative order-1 lg:order-2"
          >
            <div className="aspect-[4/3] lg:aspect-[4/5] rounded-[2.5rem] lg:rounded-[4rem] bg-zinc-200 overflow-hidden relative shadow-2xl">
              <Image
                src="/images/home/top.webp"
                alt="스포츠 액션"
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                priority
                className="object-cover grayscale hover:grayscale-0 transition-all duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-blue-900/60 to-transparent pointer-events-none" />
              <div className="absolute bottom-8 left-8 lg:bottom-12 lg:left-12 text-white">
                <p className="text-3xl lg:text-5xl font-black italic tracking-tighter">
                  01.
                </p>
                <p className="text-sm lg:text-xl font-bold opacity-80 uppercase">
                  {t("활기찬 라이프스타일", "Active Lifestyle")}
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
