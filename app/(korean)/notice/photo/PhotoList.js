import React from "react";
import Link from "next/link";
import { createServerSupabaseClient } from "@/utils/supabase/server";

export default async function PhotoList({ searchParams, lang }) {
  const supabase = await createServerSupabaseClient();

  // Next.js 비동기 searchParams 대응
  const params = await searchParams;
  const page = Number(params.page) || 1;
  const search = params.search || ""; // 검색어 추출
  const itemsPerPage = 12;
  const from = (page - 1) * itemsPerPage;
  const to = from + itemsPerPage - 1;

  const isEnglish = lang === "en";
  const t = (ko, en) => (isEnglish ? en : ko);

  // 1. 검색 조건을 포함한 데이터 호출
  let query = supabase
    .from("posts")
    .select("id, title, title_en, created_at, post", { count: "exact" })
    .eq("category", "photo");

  if (search) {
    // 제목(국문/영문) 및 본문 내용 검색
    query = query.or(
      `title.ilike.%${search}%,title_en.ilike.%${search}%,post.ilike.%${search}%`,
    );
  }

  const { data: posts, count } = await query
    .order("created_at", { ascending: false })
    .range(from, to);

  // 2. 페이지네이션 계산
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

  return (
    <main className="min-h-screen bg-white py-10 md:py-20 px-6">
      <div className="max-w-7xl mx-auto">
        {/* SEARCH BAR SECTION */}
        <div className="flex justify-center mb-16 md:mb-24">
          <form className="relative w-full max-w-2xl group">
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
              >
                <circle cx="11" cy="11" r="8" />
                <path d="M21 21l-4.35-4.35" />
              </svg>
            </div>
            <input
              type="text"
              name="search"
              defaultValue={search}
              placeholder={t("활동 사진 검색하기...", "Search gallery...")}
              className="w-full bg-[#fbfbfd] border border-gray-200 rounded-[2rem] py-5 pl-16 pr-8 text-base font-bold text-gray-950 placeholder:text-gray-500 focus:outline-none focus:bg-white focus:ring-4 focus:ring-blue-600/5 focus:border-blue-600/20 transition-all shadow-sm"
            />
          </form>
        </div>

        {/* PHOTO GRID */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16">
          {posts && posts.length > 0 ? (
            posts.map((item) => {
              const thumbnail =
                item.post.match(/<img[^>]+src="([^"]+)"/)?.[1] ??
                "https://placehold.co/600x450?text=No+Image";

              return (
                <div key={item.id} className="group">
                  <Link
                    href={
                      isEnglish ? `/en/post/${item.id}` : `/post/${item.id}`
                    }
                    className="block"
                  >
                    <div className="relative aspect-[4/3] rounded-[2.5rem] overflow-hidden bg-gray-50 mb-6 border border-gray-100 shadow-sm transition-all duration-500 group-hover:shadow-2xl group-hover:shadow-blue-100 group-hover:-translate-y-2">
                      <img
                        src={thumbnail}
                        alt={item.title}
                        loading="lazy"
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                    </div>

                    <div className="space-y-2 px-2">
                      <p className="text-[11px] font-bold text-gray-300 font-mono tracking-tighter uppercase">
                        {formatDate(item.created_at)}
                      </p>
                      <h2 className="text-lg md:text-xl font-black text-gray-950 leading-[1.3] break-keep group-hover:text-blue-600 transition-colors line-clamp-2">
                        {isEnglish ? item.title_en || item.title : item.title}
                      </h2>
                      <div className="pt-3">
                        <div className="w-0 group-hover:w-12 h-1.5 bg-blue-600 transition-all duration-500 rounded-full" />
                      </div>
                    </div>
                  </Link>
                </div>
              );
            })
          ) : (
            <div className="col-span-full py-40 text-center bg-[#fbfbfd] rounded-[3rem] border border-dashed border-gray-200">
              <p className="text-gray-300 font-black text-xl tracking-widest uppercase">
                {search
                  ? t(
                      `"${search}"에 대한 검색 결과가 없습니다.`,
                      `No results for "${search}"`,
                    )
                  : t("등록된 활동 사진이 없습니다.", "No photos found.")}
              </p>
            </div>
          )}
        </section>

        {/* PAGINATION */}
        {totalPages > 1 && (
          <div className="mt-24 flex justify-center items-center gap-2">
            <Link
              href={getQueryString(Math.max(1, page - 1))}
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
                  className={`w-12 h-12 flex items-center justify-center rounded-2xl text-sm font-black transition-all ${pageNum === page ? "bg-gray-950 text-white shadow-xl shadow-gray-200 scale-110" : "text-gray-400 hover:bg-gray-50"}`}
                >
                  {pageNum}
                </Link>
              ))}
            </div>
            <Link
              href={getQueryString(Math.min(totalPages, page + 1))}
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
              >
                <path d="M9 18l6-6-6-6" />
              </svg>
            </Link>
          </div>
        )}
      </div>
    </main>
  );
}
