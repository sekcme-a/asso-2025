"use client";

import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";

export default function NewsClient({ blocks }) {
  const params = useParams();
  const isEnglish = params.lang === "en";

  // 다국어 처리 헬퍼 함수
  const t = (ko, en) => (isEnglish ? en : ko);

  // 각 아이템의 언어별 제목/본문 선택
  const getTitle = (item) =>
    isEnglish && item.title_en ? item.title_en : item.title;
  const getContent = (item) =>
    isEnglish && item.content_en ? item.content_en : item.content;

  const featuredNews = blocks?.[0] || { title: "", content: "", images: [] };
  const sideNews = blocks?.slice(1, 4) || [];

  const fadeInUp = {
    initial: { opacity: 0, y: 15 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.5 },
  };

  return (
    <section
      className="py-12 lg:py-16 mb-12 bg-gray-900 text-white mx-4 rounded-[2rem] lg:rounded-[3.5rem] mt-8 shadow-xl overflow-hidden"
      aria-labelledby="news-heading"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        {/* HEADER */}
        <div className="flex justify-between items-end mb-8 lg:mb-10 border-b border-white/5 pb-5">
          <motion.div {...fadeInUp}>
            <p className="text-blue-500 font-black text-[10px] tracking-[0.2em] uppercase mb-1">
              {t("주요 소식", "Press Release")}
            </p>
            <h2
              id="news-heading"
              className="text-2xl lg:text-3xl font-black tracking-tight"
            >
              {t("협회 소식", "LATEST NEWS")}
            </h2>
          </motion.div>

          <Link
            href={isEnglish ? "/en/notice/anouncement" : "/notice/anouncement"}
            title={t("전체 소식 보기", "See all news")}
            className="group flex items-center gap-2 text-[11px] font-bold text-gray-200 hover:text-white transition-colors"
          >
            {t("전체보기", "SEE ALL")}
            <span
              className="w-5 h-5 rounded-full border border-gray-600 flex items-center justify-center group-hover:border-white transition-all text-[8px]"
              aria-hidden="true"
            >
              →
            </span>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* 1. 메인 뉴스 (Featured Article) */}
          <motion.article {...fadeInUp} className="lg:col-span-7 group">
            <Link
              href={featuredNews.url || "#"}
              title={getTitle(featuredNews)}
              className="relative block h-[300px] lg:h-[420px] rounded-[1.5rem] overflow-hidden"
            >
              <Image
                src={featuredNews.images?.[0] || "/images/og_logo.png"}
                alt={getTitle(featuredNews) || "Latest News Image"}
                fill
                priority
                className="object-contain transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />

              <div className="absolute bottom-6 left-6 right-6">
                <strong className="bg-blue-600 px-2 py-0.5 rounded text-[9px] font-black uppercase mb-3 inline-block">
                  {t("주요 소식", "Top Stories")}
                </strong>
                <h3 className="text-xl lg:text-2xl font-black leading-tight break-keep group-hover:text-blue-400 transition-colors">
                  {getTitle(featuredNews)}
                </h3>
                <p className="mt-2 text-gray-200 text-xs lg:text-sm line-clamp-1 font-medium opacity-80">
                  {getContent(featuredNews)}
                </p>
              </div>
            </Link>
          </motion.article>

          {/* 2. 우측 리스트 (News List) */}
          <div
            className="lg:col-span-5 flex flex-col justify-between divide-y divide-white/5"
            role="list"
          >
            {sideNews.map((news, i) => (
              <motion.article
                key={i}
                role="listitem"
                initial={{ opacity: 0, x: 10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
              >
                <Link
                  href={news.url || "#"}
                  title={getTitle(news)}
                  className="group block py-5 lg:py-6 first:pt-0 last:pb-0"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <p className="text-blue-500 text-[10px] font-black mb-1 uppercase tracking-widest">
                        {t("공지", "Notice")}
                      </p>
                      <h4 className="text-base lg:text-lg font-bold group-hover:text-blue-400 transition-colors line-clamp-1 break-keep">
                        {getTitle(news)}
                      </h4>
                      <p className="mt-1 text-gray-400 text-sm line-clamp-2 font-medium">
                        {getContent(news)}
                      </p>
                    </div>
                    <div
                      className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-blue-600 transition-all"
                      aria-hidden="true"
                    >
                      <span className="text-[10px] group-hover:translate-x-0.5 transition-transform">
                        →
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
