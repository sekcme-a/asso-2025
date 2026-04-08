"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";

// 1. BoardItem: 개별 아이템이 위로 살짝 떠오르며 나타남
const BoardItem = ({ item, type, isNew, formatDate, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay: index * 0.1, duration: 0.5 }}
  >
    <Link
      href={`/${type}/${item.id}`}
      className="group block py-4 md:py-5 first:pt-0"
    >
      {isNew && (
        <p className="text-[11px] font-bold text-blue-600 mb-1.5 tracking-widest uppercase">
          New
        </p>
      )}
      <h4 className="text-lg font-black line-clamp-2 text-gray-800 group-hover:text-blue-600 transition-colors leading-snug break-keep">
        {item.title}
      </h4>
      <p className="mt-2.5 text-xs font-medium text-gray-500">
        {formatDate(item.created_at)}
      </p>
    </Link>
  </motion.div>
);

// 2. BoardColumn: 컬럼 자체가 순차적으로 나타남
const BoardColumn = ({
  title,
  type,
  items,
  t,
  checkIfNew,
  formatDate,
  columnIndex,
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay: columnIndex * 0.2, duration: 0.6 }}
    className="space-y-6 md:space-y-8"
  >
    <div className="flex items-center justify-between border-b-2 border-gray-900 pb-3">
      <h3 className="text-xl font-black tracking-widest text-gray-900 uppercase">
        {title}
      </h3>
      <Link
        href={`/${type}`}
        className="text-xs font-bold text-gray-700 hover:text-blue-600 transition-colors tracking-[0.15em]"
      >
        {t.viewAll}
      </Link>
    </div>
    <div className="divide-y divide-gray-100">
      {items.map((item, i) => (
        <BoardItem
          key={item.id}
          item={item}
          type={type}
          isNew={checkIfNew(item.created_at)}
          formatDate={formatDate}
          index={i} // 아이템 순서에 따른 딜레이용
        />
      ))}
    </div>
  </motion.div>
);

export default function MainBoardFeedClient({ boardData, lang }) {
  const isEnglish = lang === "en";

  const checkIfNew = (dateString) => {
    if (!dateString) return false;
    const postDate = new Date(dateString);
    const now = new Date();
    const diffInDays =
      (now.getTime() - postDate.getTime()) / (1000 * 60 * 60 * 24);
    return diffInDays <= 7;
  };

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date
      .toLocaleDateString(isEnglish ? "en-US" : "ko-KR", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      })
      .replace(/\s/g, "")
      .slice(0, -1);
  };

  const t = {
    notice: isEnglish ? "Notice" : "공지사항",
    press: isEnglish ? "Press" : "언론보도",
    archive: isEnglish ? "Archive" : "자료실",
    viewAll: isEnglish ? "VIEW ALL" : "전체보기",
    update: isEnglish ? "NEWS" : "뉴스",
    latest: isEnglish ? "LATEST" : "대한생활체육회",
  };

  return (
    <section className="py-12 md:py-18 bg-white px-6">
      <div className="max-w-7xl mx-auto">
        {/* HEADER: 제목과 바 애니메이션 */}
        <div className="mb-12 md:mb-16">
          <motion.h2
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-black tracking-tighter text-gray-900 mb-5 uppercase"
          >
            {t.latest} <span className="text-blue-600">{t.update}</span>
          </motion.h2>
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: 80 }} // w-20 = 80px
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="h-1.5 bg-blue-600 rounded-full"
          />
        </div>

        {/* BOARD GRID: 컬럼별 인덱스 부여 */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 md:gap-20">
          <BoardColumn
            title={t.notice}
            type="notice"
            items={boardData.notice}
            t={t}
            checkIfNew={checkIfNew}
            formatDate={formatDate}
            columnIndex={0}
          />
          <BoardColumn
            title={t.press}
            type="press"
            items={boardData.press}
            t={t}
            checkIfNew={checkIfNew}
            formatDate={formatDate}
            columnIndex={1}
          />
          <BoardColumn
            title={t.archive}
            type="archive"
            items={boardData.archive}
            t={t}
            checkIfNew={checkIfNew}
            formatDate={formatDate}
            columnIndex={2}
          />
        </div>
      </div>
    </section>
  );
}
