"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function VideoGalleryClient({ posts }) {
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
              영상 갤러리
            </h2>
            <p className="text-gray-400 font-bold text-sm md:text-base">
              대한생활체육회의 활동을 영상으로 만나보세요.
            </p>
          </motion.div>

          <Link
            href="/video"
            className="text-xs font-black tracking-widest text-gray-900 hover:text-blue-600 transition-colors uppercase group"
          >
            View All{" "}
            <span className="inline-block transition-transform group-hover:translate-x-1">
              +
            </span>
          </Link>
        </div>

        {/* VIDEO GRID */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {posts?.map((item) => (
            <motion.div key={item.id} variants={itemVariants}>
              <Link href={`/video/${item.id}`} className="group block">
                {/* Thumbnail Frame */}
                <div className="relative aspect-video rounded-[1.5rem] md:rounded-[2rem] overflow-hidden bg-black mb-6 shadow-lg">
                  <img
                    src={item.thumbnail}
                    alt={item.title}
                    loading="lazy"
                    className="w-full h-full object-cover opacity-80 transition-all duration-700 group-hover:scale-110 group-hover:opacity-100"
                  />

                  {/* Play Button Overlay: 비디오 정체성 강조 */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-14 h-14 bg-white/20 backdrop-blur-md border border-white/30 rounded-full flex items-center justify-center transition-transform duration-300 group-hover:scale-110 group-hover:bg-blue-600 group-hover:border-blue-500">
                      <svg
                        className="w-6 h-6 text-white fill-current translate-x-0.5"
                        viewBox="0 0 24 24"
                      >
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                  </div>

                  {/* <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-black/50 backdrop-blur-md rounded-full text-[10px] font-black text-white shadow-sm border border-white/20 uppercase">
                      Video
                    </span>
                  </div> */}
                </div>

                {/* Text Area */}
                <div className="space-y-2">
                  <p className="text-[11px] font-bold text-gray-400 tracking-widest uppercase">
                    {formatDate(item.created_at)}
                  </p>
                  <h3 className="text-lg md:text-xl font-black text-gray-900 leading-tight break-keep group-hover:text-blue-600 transition-colors line-clamp-2">
                    {item.title}
                  </h3>
                  <div className="pt-2">
                    <div className="w-0 group-hover:w-full h-0.5 bg-blue-600 transition-all duration-500 opacity-50" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}

          {posts?.length === 0 && (
            <div className="col-span-full py-32 text-center">
              <p className="text-gray-300 font-black text-xl">
                등록된 영상이 없습니다.
              </p>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
