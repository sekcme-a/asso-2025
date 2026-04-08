import { createServerSupabaseClient } from "@/utils/supabase/server";
import Link from "next/link";
import { format } from "date-fns";

export default async function MediaList({ searchParams, lang }) {
  const supabase = await createServerSupabaseClient();

  const params = await searchParams;
  const isEnglish = lang === "en";
  const t = (ko, en) => (isEnglish ? en : ko);

  const page = Number(params.page) || 1;
  const search = params.search || "";
  const itemsPerPage = 12;
  const from = (page - 1) * itemsPerPage;
  const to = from + itemsPerPage - 1;

  // title_en, press_en 컬럼이 있다고 가정하고 쿼리에 추가
  let query = supabase
    .from("medias")
    .select(
      "id, news_title, news_title_en, press_name, press_name_en, news_url, created_at",
      {
        count: "exact",
      },
    );

  if (search) {
    query = query.or(
      `news_title.ilike.%${search}%,press_name.ilike.%${search}%`,
    );
  }

  const { data: news, count } = await query
    .order("created_at", { ascending: false })
    .range(from, to);

  const totalPages = Math.ceil((count || 0) / itemsPerPage);

  // --- 페이지네이션 로직 유지 ---
  const getPageNumbers = () => {
    const pageLimit = 5;
    const pages = [];

    if (totalPages <= pageLimit) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      let start = Math.max(1, page - Math.floor(pageLimit / 2));
      let end = Math.min(totalPages, start + pageLimit - 1);

      if (end === totalPages) {
        start = Math.max(1, totalPages - pageLimit + 1);
      }

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }
    }
    return pages;
  };

  const pageNumbers = getPageNumbers();

  return (
    <main className="min-h-screen bg-[#f8f9fa] py-20 px-6">
      <div className="max-w-5xl mx-auto">
        {/* HEADER 영역 */}
        <header className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b-[3px] border-gray-950">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
              <span className="text-[10px] font-black text-blue-600 tracking-[0.4em] uppercase font-mono">
                Press Release
              </span>
            </div>
            <div className="flex gap-1">
              <h1 className="text-4xl font-black tracking-tight text-gray-950">
                {t("언론보도", "Media")}
              </h1>
              <div className="flex items-end gap-1.5 ml-5">
                <span className="text-[13px] font-bold text-gray-500">
                  {t("총", "Total")}
                </span>
                <span className="text-lg font-black text-blue-600 font-mono">
                  {count?.toLocaleString() || 0}
                </span>
                <span className="text-[13px] font-bold text-gray-500">
                  {t("개의 언론보도", "Articles")}
                </span>

                {search && (
                  <span className="ml-2 px-2 py-0.5 bg-gray-100 text-[10px] font-bold text-gray-400 rounded-md">
                    {t("검색 결과", "Search Results")}
                  </span>
                )}
              </div>
            </div>
          </div>
          <form className="relative w-full md:w-72">
            <input
              type="text"
              name="search"
              defaultValue={search}
              placeholder={t(
                "뉴스 제목 또는 언론사 검색",
                "Search title or press",
              )}
              className="w-full bg-white border border-gray-200 rounded-lg py-2.5 px-4 text-sm font-bold focus:outline-none focus:border-blue-600 transition-all shadow-sm"
            />
          </form>
        </header>

        {/* NEWS LIST 영역 */}
        <div className="flex flex-col gap-3">
          {news?.length > 0 ? (
            news.map((item) => (
              <a
                key={item.id}
                href={item.news_url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col md:flex-row md:items-center gap-4 md:gap-8 p-6 bg-white border border-gray-100 rounded-2xl hover:border-blue-600/30 hover:shadow-xl hover:shadow-gray-200/40 transition-all duration-300"
              >
                <div className="flex items-center md:flex-col md:items-start gap-3 md:gap-1 shrink-0 w-28">
                  <span className="text-[11px] font-black text-gray-300 font-mono tracking-tighter">
                    {format(new Date(item.created_at), "yyyy.MM.dd")}
                  </span>
                  <span className="text-[12px] font-black text-blue-600 tracking-tight truncate w-full">
                    {isEnglish
                      ? item.press_name_en || item.press_name
                      : item.press_name}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <h2 className="text-lg font-bold text-gray-950 group-hover:text-blue-600 leading-snug break-keep transition-colors">
                    {isEnglish
                      ? item.news_title_en || item.news_title
                      : item.news_title}
                  </h2>
                </div>
                <div className="flex items-center justify-end md:justify-center">
                  <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-gray-50 text-gray-400 group-hover:bg-gray-950 group-hover:text-white transition-all duration-300">
                    <span className="text-[9px] font-black uppercase tracking-widest hidden md:inline">
                      Read Full
                    </span>
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3" />
                    </svg>
                  </div>
                </div>
              </a>
            ))
          ) : (
            <div className="py-32 text-center bg-white border border-dashed border-gray-200 rounded-2xl">
              <p className="text-sm font-black text-gray-300 tracking-widest uppercase">
                {t("검색 결과가 없습니다", "No Articles Found")}
              </p>
            </div>
          )}
        </div>

        {/* PAGINATION */}
        {totalPages > 1 && (
          <div className="mt-12 flex justify-center items-center gap-2">
            <Link
              href={`?page=${Math.max(1, page - 1)}&search=${search}`}
              className={`w-9 h-9 flex items-center justify-center rounded-lg border transition-all ${
                page === 1
                  ? "opacity-30 pointer-events-none"
                  : "hover:border-gray-950"
              }`}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
              >
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </Link>

            {pageNumbers[0] > 1 && (
              <Link
                href={`?page=1&search=${search}`}
                className="w-9 h-9 flex items-center justify-center rounded-lg text-xs font-black border border-gray-100 text-gray-400 hover:text-gray-950"
              >
                1..
              </Link>
            )}

            {pageNumbers.map((p) => (
              <Link
                key={p}
                href={`?page=${p}&search=${search}`}
                className={`w-9 h-9 flex items-center justify-center rounded-lg text-xs font-black transition-all ${
                  page === p
                    ? "bg-gray-950 text-white shadow-lg"
                    : "bg-white border border-gray-100 text-gray-400 hover:text-gray-950 hover:border-gray-400"
                }`}
              >
                {p}
              </Link>
            ))}

            {pageNumbers[pageNumbers.length - 1] < totalPages && (
              <Link
                href={`?page=${totalPages}&search=${search}`}
                className="w-9 h-9 flex items-center justify-center rounded-lg text-xs font-black border border-gray-100 text-gray-400 hover:text-gray-950"
              >
                ..{totalPages}
              </Link>
            )}

            <Link
              href={`?page=${Math.min(totalPages, page + 1)}&search=${search}`}
              className={`w-9 h-9 flex items-center justify-center rounded-lg border transition-all ${
                page === totalPages
                  ? "opacity-30 pointer-events-none"
                  : "hover:border-gray-950"
              }`}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
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
