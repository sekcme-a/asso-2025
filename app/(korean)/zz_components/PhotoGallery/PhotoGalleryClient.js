"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function PhotoGalleryClient({ posts }) {
  // 날짜 포맷팅 함수
  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
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
    <section className="py-12 md:py-18 bg-white px-6 border-t border-gray-100">
      <div className="max-w-7xl mx-auto">
        {/* HEADER */}
        <div className="flex items-end justify-between mb-16 border-b-2 border-gray-900 pb-8">
          <motion.div
            initial={{ x: -20, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-5xl font-black tracking-tighter text-gray-900 mb-2">
              포토 갤러리
            </h2>
            <p className="text-gray-400 font-bold text-sm md:text-base">
              대한생활체육회의 생생한 활동 기록입니다.
            </p>
          </motion.div>

          <Link
            href="/gallery"
            className="text-xs font-black tracking-widest text-gray-900 hover:text-blue-600 transition-colors uppercase group"
          >
            View All{" "}
            <span className="inline-block transition-transform group-hover:translate-x-1">
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
        >
          {posts.map((item) => (
            <motion.div key={item.id} variants={itemVariants}>
              <Link href={`/gallery/${item.id}`} className="group block">
                {/* Image Frame: object-cover로 어떤 비율의 이미지든 대응 */}
                <div className="relative aspect-[4/3] rounded-[2rem] overflow-hidden bg-gray-50 mb-6 border border-gray-100 shadow-sm">
                  <img
                    src={
                      item.post.match(/<img[^>]+src="([^"]+)"/)?.[1] ??
                      "https://placehold.co/600x450?text=No+Image"
                    }
                    alt={item.title}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-white/90 backdrop-blur-md rounded-full text-[10px] font-black text-blue-600 shadow-sm border border-gray-100 uppercase">
                      Photo
                    </span>
                  </div>
                </div>

                {/* Text Area */}
                <div className="space-y-2">
                  <p className="text-[11px] font-bold text-gray-700 tracking-widest">
                    {formatDate(item.created_at)}
                  </p>
                  <h3 className="text-lg md:text-xl font-black text-gray-900 leading-tight break-keep group-hover:text-blue-600 transition-colors line-clamp-2">
                    {item.title}
                  </h3>
                  <div className="pt-2">
                    <div className="w-0 group-hover:w-12 h-1.5 bg-blue-600 transition-all duration-300 rounded-full" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}

          {/* Empty State */}
          {posts.length === 0 && (
            <div className="col-span-full py-32 text-center">
              <p className="text-gray-300 font-black text-xl">
                등록된 활동 사진이 없습니다.
              </p>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
