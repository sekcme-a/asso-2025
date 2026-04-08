"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useParams } from "next/navigation";
import Image from "next/image";

export default function PhotoGalleryClient({ posts, lang }) {
  const params = useParams();
  const currentLang = lang || params.lang;
  const isEnglish = currentLang === "en";

  // 번역 헬퍼 함수
  const t = (ko, en) => (isEnglish ? en : ko);

  // 날짜 포맷팅 함수 (다국어 대응)
  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    if (isEnglish) {
      return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "2-digit",
      });
    }
    return date
      .toLocaleDateString("ko-KR", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      })
      .replace(/\s/g, "")
      .slice(0, -1);
  };

  // 애니메이션 변수 (Framer Motion)
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };

  return (
    <section
      className="py-12 md:py-18 bg-white px-6 border-t border-gray-100"
      aria-labelledby="gallery-title"
    >
      <div className="max-w-7xl mx-auto">
        {/* HEADER */}
        <div className="flex items-end justify-between mb-16 border-b-2 border-gray-900 pb-8">
          <motion.div
            initial={{ x: -20, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
          >
            <h3
              id="gallery-title"
              className="text-3xl md:text-5xl font-black tracking-tighter text-gray-900 mb-2"
            >
              {t("포토 갤러리", "Photo Gallery")}
            </h3>
            <p className="text-gray-400 font-bold text-sm md:text-base">
              {t(
                "대한생활체육회의 생생한 활동 기록입니다.",
                "Live records of KSFAA activities.",
              )}
            </p>
          </motion.div>

          <Link
            href={isEnglish ? "/en/notice/photo" : "/notice/photo"}
            title={t("포토 갤러리 전체보기", "View all photos")}
            className="text-xs font-black tracking-widest text-gray-900 hover:text-blue-600 transition-colors uppercase group"
          >
            {t("View All", "View All")}{" "}
            <span
              className="inline-block transition-transform group-hover:translate-x-1"
              aria-hidden="true"
            >
              +
            </span>
          </Link>
        </div>

        {/* MAGAZINE GRID */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          role="list"
        >
          {posts.map((item) => (
            <motion.article
              key={item.id}
              variants={itemVariants}
              role="listitem"
            >
              <Link
                href={isEnglish ? `/en/post/${item.id}` : `/post/${item.id}`}
                className="group block"
                title={t(
                  `${item.title} 갤러리 보기`,
                  `View gallery: ${item.title_en || item.title}`,
                )}
              >
                {/* Image Frame */}
                {/* Image Frame */}
                <div className="relative aspect-[4/3] rounded-[2rem] overflow-hidden bg-gray-50 mb-6 border border-gray-100 shadow-sm">
                  <Image
                    src={
                      item.post?.match(/<img[^>]+src="([^"]+)"/)?.[1] ??
                      "https://placehold.co/600x450?text=No+Image"
                    }
                    alt={t(
                      `${item.title} - 대한생활체육회 활동 사진`,
                      `${item.title_en || item.title} - KSFAA activity photo`,
                    )}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-white/90 backdrop-blur-md rounded-full text-[10px] font-black text-blue-600 shadow-sm border border-gray-100 uppercase">
                      Photo
                    </span>
                  </div>
                </div>

                {/* Text Area */}
                <div className="space-y-2">
                  <time
                    dateTime={item.created_at}
                    className="text-[11px] font-bold text-gray-700 tracking-widest block"
                  >
                    {formatDate(item.created_at)}
                  </time>
                  <h3 className="text-lg md:text-xl font-black text-gray-900 leading-tight break-keep group-hover:text-blue-600 transition-colors line-clamp-2">
                    {isEnglish ? item.title_en || item.title : item.title}
                  </h3>
                  <div className="pt-2" aria-hidden="true">
                    <div className="w-0 group-hover:w-12 h-1.5 bg-blue-600 transition-all duration-300 rounded-full" />
                  </div>
                </div>
              </Link>
            </motion.article>
          ))}

          {/* Empty State */}
          {posts.length === 0 && (
            <div className="col-span-full py-32 text-center">
              <p className="text-gray-300 font-black text-xl">
                {t(
                  "등록된 활동 사진이 없습니다.",
                  "No activity photos registered.",
                )}
              </p>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
