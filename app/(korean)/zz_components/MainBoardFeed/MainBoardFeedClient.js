"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";

// 1. BoardItem: 개별 항목 다국어 처리
const BoardItem = ({ item, type, isNew, formatDate, index, t, isEnglish }) => {
  // 1. 조건에 따른 속성 설정
  const isMedia = type === "media";

  // 미디어일 경우 외부 링크(item.url 등), 아닐 경우 상세 페이지 경로
  const href = isMedia
    ? item.news_url || ""
    : isEnglish
      ? `/en/post/${item.id}`
      : `/post/${item.id}`;

  // 외부 링크용 속성 (새창 열기 및 보안 설정)
  const externalProps = isMedia
    ? { target: "_blank", rel: "noopener noreferrer" }
    : {};

  return (
    <motion.article
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      role="listitem"
    >
      <Link
        href={href}
        {...externalProps}
        title={
          isEnglish
            ? `View details of ${item.title_en || item.title}`
            : `${item.title} 상세 보기`
        }
        className="group block py-4 md:py-5 first:pt-0"
      >
        {isNew && (
          <strong className="text-[11px] font-bold text-blue-600 mb-1.5 tracking-widest uppercase block">
            New
          </strong>
        )}
        <h4 className="text-lg font-black line-clamp-2 text-gray-800 group-hover:text-blue-600 transition-colors leading-snug break-keep">
          {isMedia
            ? isEnglish
              ? item.news_title_en || item.news_title
              : item.news_title
            : isEnglish
              ? item.title_en || item.title
              : item.title}
        </h4>
        <time
          dateTime={item.created_at}
          className="mt-2.5 text-xs font-medium text-gray-500 block"
        >
          {formatDate(item.created_at)}
        </time>
      </Link>
    </motion.article>
  );
};

// 2. BoardColumn: 섹션 타이틀 및 링크 다국어화
const BoardColumn = ({
  title,
  type,
  items,
  t,
  checkIfNew,
  formatDate,
  columnIndex,
  isEnglish,
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
        href={isEnglish ? `/en/notice/${type}` : `/notice/${type}`}
        title={isEnglish ? `${title} ${t.viewAll}` : `${title} ${t.viewAll}`}
        className="text-xs font-bold text-gray-700 hover:text-blue-600 transition-colors tracking-[0.15em]"
      >
        {t.viewAll}
      </Link>
    </div>
    <div className="divide-y divide-gray-100" role="list">
      {items.map((item, i) => (
        <BoardItem
          key={item.id}
          item={item}
          type={type}
          isNew={checkIfNew(item.created_at)}
          formatDate={formatDate}
          index={i}
          t={t}
          isEnglish={isEnglish}
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

  const t = {
    notice: isEnglish ? "Notice" : "공지사항",
    press: isEnglish ? "Press" : "언론보도",
    archive: isEnglish ? "Archive" : "자료실",
    viewAll: isEnglish ? "VIEW ALL" : "전체보기",
    update: isEnglish ? "NEWS" : "뉴스",
    latest: isEnglish ? "LATEST" : "대한생활체육회",
  };

  return (
    <section
      className="py-12 md:py-18 bg-white px-6"
      aria-labelledby="board-feed-title"
    >
      <div className="max-w-7xl mx-auto">
        {/* HEADER */}
        <div className="mb-12 md:mb-16">
          <motion.h3
            id="board-feed-title"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-black tracking-tighter text-gray-900 mb-5 uppercase"
          >
            {t.latest} <span className="text-blue-600">{t.update}</span>
          </motion.h3>
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: 80 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="h-1.5 bg-blue-600 rounded-full"
            aria-hidden="true"
          />
        </div>

        {/* BOARD GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 md:gap-20">
          <BoardColumn
            title={t.notice}
            type="anouncement"
            items={boardData.notice}
            t={t}
            checkIfNew={checkIfNew}
            formatDate={formatDate}
            columnIndex={0}
            isEnglish={isEnglish}
          />
          <BoardColumn
            title={t.press}
            type="media"
            items={boardData.press}
            t={t}
            checkIfNew={checkIfNew}
            formatDate={formatDate}
            columnIndex={1}
            isEnglish={isEnglish}
          />
          <BoardColumn
            title={t.archive}
            type="reference"
            items={boardData.archive}
            t={t}
            checkIfNew={checkIfNew}
            formatDate={formatDate}
            columnIndex={2}
            isEnglish={isEnglish}
          />
        </div>
      </div>
    </section>
  );
}
