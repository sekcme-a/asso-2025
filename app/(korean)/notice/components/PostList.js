import Link from "next/link";
import { format } from "date-fns";
import { createServerSupabaseClient } from "@/utils/supabase/server";

const PostList = async ({
  category,
  title,
  baseUrl = "/notice",
  searchParams,
  itemsPerPage = 10,
  lang,
}) => {
  const supabase = await createServerSupabaseClient();

  const sParams = await searchParams;
  const isEnglish = lang === "en";
  const t = (ko, en) => (isEnglish ? en : ko);

  const page = Number(sParams.page) || 1;
  const search = sParams.search || "";
  const from = (page - 1) * itemsPerPage;
  const to = from + itemsPerPage - 1;

  // 1. 데이터 쿼리
  let query = supabase
    .from("posts")
    .select("id, title, title_en, created_at, category", { count: "exact" })
    .eq("category", category);

  if (search) {
    // 영문 모드일 경우 제목 검색 시 title_en 컬럼도 함께 검색할 수 있도록 확장 가능
    query = query.or(`title.ilike.%${search}%,post.ilike.%${search}%`);
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

  const getQueryString = (p) => {
    const sp = new URLSearchParams();
    if (p > 1) sp.set("page", p);
    if (search) sp.set("search", search);
    const qs = sp.toString();
    return qs ? `?${qs}` : "";
  };

  return (
    <div className="max-w-5xl mx-auto relative z-10">
      {/* HEADER */}
      <header className="mb-16 pb-10 border-b-2 border-gray-950 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-2">
          <h1 className="text-4xl md:text-5xl font-black tracking-tighter text-gray-950">
            {title}
          </h1>
        </div>

        <form className="flex justify-end w-full md:w-auto">
          <div className="relative w-full md:w-72 group">
            <input
              type="text"
              name="search"
              placeholder={t("검색어를 입력하세요", "Search...")}
              defaultValue={search}
              className="w-full bg-[#fbfbfd] border border-gray-100 rounded-2xl py-3.5 px-6 text-sm font-bold focus:outline-none focus:border-blue-600/30 transition-all"
            />
            <button
              type="submit"
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-600 transition-colors"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="11" cy="11" r="8" />
                <path d="M21 21l-4.35-4.35" />
              </svg>
            </button>
          </div>
        </form>
      </header>

      {/* LIST */}
      <div className="border-t border-gray-100">
        {posts?.length > 0 ? (
          posts.map((post) => (
            <Link
              key={post.id}
              href={`${baseUrl}/${post.id}`}
              className="group flex flex-col md:flex-row md:items-center gap-4 md:gap-12 py-8 border-b border-gray-100 hover:bg-gray-50/50 transition-all px-4 rounded-xl"
            >
              <div className="shrink-0 flex flex-col items-start md:items-center w-20">
                <span className="text-[10px] font-black text-blue-600 tracking-widest uppercase mb-1">
                  {t("DATE", "DATE")}
                </span>
                <span className="text-[13px] font-black text-gray-400 group-hover:text-gray-900 transition-colors">
                  {format(new Date(post.created_at), "yyyy.MM.dd")}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <h2 className="text-xl font-black text-gray-950 tracking-tighter group-hover:text-blue-600 transition-colors truncate">
                  {isEnglish ? post.title_en || post.title : post.title}
                </h2>
              </div>
              <div className="hidden md:block opacity-0 group-hover:opacity-100 transition-all translate-x-[-10px] group-hover:translate-x-0">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-blue-600"
                >
                  <path d="M5 12H19M19 12L12 5M19 12L12 19" />
                </svg>
              </div>
            </Link>
          ))
        ) : (
          <div className="py-32 text-center">
            <p className="text-sm font-bold text-gray-400">
              {t("등록된 게시물이 없습니다.", "No posts registered.")}
            </p>
          </div>
        )}
      </div>

      {/* PAGINATION */}
      {totalPages > 1 && (
        <div className="mt-20 flex justify-center items-center gap-2">
          <Link
            href={getQueryString(Math.max(1, page - 1))}
            className={`w-10 h-10 flex items-center justify-center rounded-xl border border-gray-100 text-gray-400 hover:bg-gray-50 transition-colors ${page === 1 ? "pointer-events-none opacity-30" : ""}`}
          >
            <svg
              width="18"
              height="18"
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
                className={`w-10 h-10 flex items-center justify-center rounded-xl text-xs font-black transition-all ${pageNum === page ? "bg-gray-950 text-white shadow-lg shadow-gray-200" : "text-gray-400 hover:bg-gray-50 border border-transparent hover:border-gray-100"}`}
              >
                {pageNum}
              </Link>
            ))}
          </div>
          <Link
            href={getQueryString(Math.min(totalPages, page + 1))}
            className={`w-10 h-10 flex items-center justify-center rounded-xl border border-gray-100 text-gray-400 hover:bg-gray-50 transition-colors ${page === totalPages ? "pointer-events-none opacity-30" : ""}`}
          >
            <svg
              width="18"
              height="18"
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
  );
};

export default PostList;
