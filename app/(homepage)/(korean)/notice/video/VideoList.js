import React from "react";
import Link from "next/link";
import { createServerSupabaseClient } from "@/utils/supabase/server";
import * as motion from "framer-motion/client";

export default async function VideoList({ searchParams, lang }) {
  const supabase = await createServerSupabaseClient();

  const params = await searchParams;
  const page = Number(params.page) || 1;
  const search = params.search || "";
  const itemsPerPage = 12;
  const from = (page - 1) * itemsPerPage;
  const to = from + itemsPerPage - 1;

  const isEnglish = lang === "en";
  const t = (ko, en) => (isEnglish ? en : ko);

  // 1. 영상 데이터 호출
  let query = supabase
    .from("posts")
    .select("id, title, title_en, created_at, post", { count: "exact" })
    .eq("category", "video");

  if (search) {
    query = query.or(
      `title.ilike.%${search}%,title_en.ilike.%${search}%,post.ilike.%${search}%`,
    );
  }

  const { data: posts, count } = await query
    .order("created_at", { ascending: false })
    .range(from, to);

  const totalPages = Math.ceil((count || 0) / itemsPerPage);
  const maxDisplayPages = 5;
  let startPage = Math.max(1, page - Math.floor(maxDisplayPages / 2));
  let endPage = Math.min(totalPages, startPage + maxDisplayPages - 1);
  if (endPage - startPage + 1 < maxDisplayPages) {
    startPage = Math.max(1, endPage - maxDisplayPages + 1);
  }

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
      .replace(/\.$/, "");
  };

  const getQueryString = (p) => {
    const sp = new URLSearchParams();
    if (p > 1) sp.set("page", p);
    if (search) sp.set("search", search);
    const qs = sp.toString();
    return qs ? `?${qs}` : "";
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };

  return (
    <div className="py-10 md:py-20 px-6">
      <div className="max-w-7xl mx-auto">
        {/* SEARCH BAR SECTION: role="search" 추가 */}
        <section
          className="flex justify-center mb-16 md:mb-24"
          aria-label={t("영상 검색", "Search Videos")}
        >
          <form className="relative w-full max-w-2xl group" role="search">
            <label htmlFor="video-search" className="sr-only">
              {t("영상 검색어 입력", "Search Videos")}
            </label>
            <div className="absolute inset-y-0 left-6 flex items-center pointer-events-none">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-gray-300 group-focus-within:text-blue-600 transition-colors"
                aria-hidden="true"
              >
                <circle cx="11" cy="11" r="8" />
                <path d="M21 21l-4.35-4.35" />
              </svg>
            </div>
            <input
              id="video-search"
              type="text"
              name="search"
              defaultValue={search}
              placeholder={t("영상 검색하기...", "Search videos...")}
              className="w-full bg-[#fbfbfd] border border-gray-200 rounded-[2rem] py-5 pl-16 pr-8 text-base font-bold text-gray-950 placeholder:text-gray-500 focus:outline-none focus:bg-white focus:ring-4 focus:ring-blue-600/5 focus:border-blue-600/20 transition-all shadow-sm"
            />
          </form>
        </section>

        {/* VIDEO GRID: 리스트 의미론적 구조 강화 */}
        <motion.section
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          role="list"
        >
          {posts && posts.length > 0 ? (
            posts.map((item) => {
              const iframeMatch = item.post.match(/src="([^"]+)"/);
              let videoId = null;

              if (iframeMatch) {
                const src = iframeMatch[1];
                const match = src.match(/\/embed\/([^?\s/]+)/);
                if (match) videoId = match[1];
              }

              const thumbnail = videoId
                ? `https://img.youtube.com/vi/${videoId}/mqdefault.jpg`
                : "https://placehold.co/600x338?text=Video+Thumbnail";

              const videoTitle = isEnglish
                ? item.title_en || item.title
                : item.title;

              return (
                <motion.article
                  key={item.id}
                  variants={itemVariants}
                  role="listitem"
                >
                  <Link
                    href={
                      isEnglish ? `/en/post/${item.id}` : `/post/${item.id}`
                    }
                    className="group block"
                    title={`${videoTitle} ${t("영상 시청하기", "Watch Video")}`}
                  >
                    {/* Thumbnail Frame */}
                    <div className="relative aspect-video rounded-[1.5rem] md:rounded-[2rem] overflow-hidden bg-black mb-6 shadow-lg border border-gray-100 transition-all duration-500 group-hover:shadow-2xl group-hover:shadow-blue-100 group-hover:-translate-y-2">
                      <img
                        src={thumbnail}
                        alt={videoTitle}
                        loading="lazy"
                        className="w-full h-full object-cover opacity-80 transition-all duration-700 group-hover:scale-110 group-hover:opacity-100"
                      />
                      <div
                        className="absolute inset-0 flex items-center justify-center"
                        aria-hidden="true"
                      >
                        <div className="w-14 h-14 bg-white/20 backdrop-blur-md border border-white/30 rounded-full flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:bg-blue-600 group-hover:border-blue-500 shadow-xl">
                          <svg
                            className="w-6 h-6 text-white fill-current translate-x-0.5"
                            viewBox="0 0 24 24"
                          >
                            <path d="M8 5v14l11-7z" />
                          </svg>
                        </div>
                      </div>
                    </div>

                    {/* Text Area */}
                    <div className="space-y-2 px-2">
                      <time
                        dateTime={new Date(item.created_at).toISOString()}
                        className="text-[11px] font-bold text-gray-400 tracking-widest uppercase font-mono block"
                      >
                        {formatDate(item.created_at)}
                      </time>
                      {/* 상위 h1을 고려한 h2/h3 위계 조정 */}
                      <h3 className="text-lg md:text-xl font-black text-gray-950 leading-tight break-keep group-hover:text-blue-600 transition-colors line-clamp-2">
                        {videoTitle}
                      </h3>
                      <div className="pt-2" aria-hidden="true">
                        <div className="w-0 group-hover:w-full h-0.5 bg-blue-600 transition-all duration-500 opacity-50 rounded-full" />
                      </div>
                    </div>
                  </Link>
                </motion.article>
              );
            })
          ) : (
            <div className="col-span-full py-40 text-center bg-[#fbfbfd] rounded-[3rem] border border-dashed border-gray-200">
              <p className="text-gray-300 font-black text-xl tracking-widest uppercase">
                {search
                  ? t(
                      `"${search}"에 대한 영상 결과가 없습니다.`,
                      `No videos for "${search}"`,
                    )
                  : t("등록된 영상이 없습니다.", "No videos found.")}
              </p>
            </div>
          )}
        </motion.section>

        {/* PAGINATION: nav 태그 및 레이블링 강화 */}
        {totalPages > 1 && (
          <nav
            className="mt-24 flex justify-center items-center gap-2"
            aria-label={t("페이지 선택", "Pagination Navigation")}
          >
            <Link
              href={getQueryString(Math.max(1, page - 1))}
              aria-label={t("이전 페이지", "Previous Page")}
              className={`w-12 h-12 flex items-center justify-center rounded-2xl border border-gray-100 text-gray-400 hover:bg-gray-50 transition-all ${page === 1 ? "pointer-events-none opacity-20" : ""}`}
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </Link>
            <div className="flex items-center gap-2">
              {Array.from(
                { length: endPage - startPage + 1 },
                (_, i) => startPage + i,
              ).map((pageNum) => (
                <Link
                  key={pageNum}
                  href={getQueryString(pageNum)}
                  aria-current={pageNum === page ? "page" : undefined}
                  className={`w-12 h-12 flex items-center justify-center rounded-2xl text-sm font-black transition-all ${pageNum === page ? "bg-gray-950 text-white shadow-xl shadow-gray-200 scale-110" : "text-gray-400 hover:bg-gray-50"}`}
                >
                  {pageNum}
                </Link>
              ))}
            </div>
            <Link
              href={getQueryString(Math.min(totalPages, page + 1))}
              aria-label={t("다음 페이지", "Next Page")}
              className={`w-12 h-12 flex items-center justify-center rounded-2xl border border-gray-100 text-gray-400 hover:bg-gray-50 transition-all ${page === totalPages ? "pointer-events-none opacity-20" : ""}`}
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M9 18l6-6-6-6" />
              </svg>
            </Link>
          </nav>
        )}
      </div>
    </div>
  );
}
