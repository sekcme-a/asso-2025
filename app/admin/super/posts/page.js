"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { createBrowserSupabaseClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";

const CATEGORIES = [
  { key: "all", label: "전체" },
  { key: "anouncement", label: "공지사항" },
  { key: "photo", label: "포토" },
  { key: "video", label: "동영상" },
  { key: "reference", label: "자료실" },
  { key: "support", label: "후원" },
];

export default function PostListPage() {
  const router = useRouter();
  const supabase = createBrowserSupabaseClient();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const itemsPerPage = 10;

  const fetchPosts = useCallback(async () => {
    setLoading(true);
    try {
      let query = supabase
        .from("posts")
        .select("*", { count: "exact" })
        .neq("category", "media");
      if (selectedCategory !== "all")
        query = query.eq("category", selectedCategory);
      if (searchTerm) query = query.ilike("title", `%${searchTerm}%`);

      const from = (currentPage - 1) * itemsPerPage;
      const to = from + itemsPerPage - 1;

      const { data, error, count } = await query
        .order("created_at", { ascending: false })
        .range(from, to);

      if (error) throw error;
      setPosts(data || []);
      setTotalCount(count || 0);
    } catch (error) {
      console.error(error.message);
    } finally {
      setLoading(false);
    }
  }, [selectedCategory, searchTerm, currentPage, supabase]);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  const handleFilterChange = (type, value) => {
    if (type === "category") setSelectedCategory(value);
    if (type === "search") setSearchTerm(value);
    setCurrentPage(1);
  };

  const deletePost = async (id) => {
    if (!confirm("정말 삭제하시겠습니까?")) return;
    const { error } = await supabase.from("posts").delete().eq("id", id);
    if (error) alert("삭제 실패");
    else fetchPosts();
  };

  const totalPages = Math.ceil(totalCount / itemsPerPage);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 mt-20">
      {/* 헤더 섹션: 모바일에서 상하 배치, 데스크탑에서 좌우 배치 */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">
            콘텐츠 관리
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            총{" "}
            <span className="text-indigo-600 font-semibold">{totalCount}</span>
            개의 게시글
          </p>
        </div>
        <Link
          href="/admin/super/posts/new"
          className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 bg-indigo-600 text-white font-semibold rounded-xl hover:bg-indigo-700 transition-all shadow-md active:scale-95"
        >
          <svg
            className="w-5 h-5 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 4v16m8-8H4"
            />
          </svg>
          새 글 작성
        </Link>
      </div>

      {/* 필터 & 검색: 가로 스크롤 대응 */}
      <div className="space-y-4 mb-6">
        <div className="flex overflow-x-auto pb-2 gap-2 no-scrollbar">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.key}
              onClick={() => handleFilterChange("category", cat.key)}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all border ${
                selectedCategory === cat.key
                  ? "bg-indigo-600 text-white border-indigo-600 shadow-sm"
                  : "bg-white text-gray-600 border-gray-200 hover:border-indigo-300"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <div className="relative group">
          <input
            type="text"
            placeholder="제목 검색..."
            value={searchTerm}
            onChange={(e) => handleFilterChange("search", e.target.value)}
            className="w-full pl-11 pr-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all shadow-sm"
          />
          <svg
            className="w-5 h-5 text-gray-400 absolute left-4 top-3.5 group-focus-within:text-indigo-500 transition-colors"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
      </div>

      {/* 목록 섹션 */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        {/* 1. Desktop Table (md 이상에서만 노출) */}
        <div className="hidden md:block">
          <table className="w-full text-left border-collapse">
            <thead className="bg-gray-50 text-gray-500 text-xs uppercase font-bold tracking-wider">
              <tr>
                <th className="px-6 py-4">카테고리</th>
                <th className="px-6 py-4">제목</th>
                <th className="px-6 py-4">날짜</th>
                <th className="px-6 py-4 text-right">작업</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {!loading &&
                posts.map((post) => (
                  <tr
                    key={post.id}
                    onClick={() => router.push(`/admin/super/posts/${post.id}`)}
                    className="hover:bg-indigo-50/30 transition-colors cursor-pointer"
                  >
                    <td className="px-6 py-4 text-sm font-medium text-indigo-600">
                      {CATEGORIES.find((c) => c.key === post.category)?.label}
                    </td>
                    <td className="px-6 py-4 font-medium text-gray-800">
                      {post.title}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-400">
                      {new Date(post.created_at).toLocaleDateString()}
                    </td>
                    {/* <td className="px-6 py-4 text-right space-x-4">
                      <Link
                        href={`/admin/super/posts/${post.id}`}
                        className="text-gray-600 hover:text-indigo-600 font-semibold text-sm"
                      >
                        수정
                      </Link>
                      <button
                        onClick={() => deletePost(post.id)}
                        className="text-red-400 hover:text-red-600 font-semibold text-sm"
                      >
                        삭제
                      </button>
                    </td> */}
                  </tr>
                ))}
            </tbody>
          </table>
        </div>

        {/* 2. Mobile Cards (md 미만에서 노출) */}
        <div className="md:hidden divide-y divide-gray-100">
          {!loading &&
            posts.map((post) => (
              <div
                key={post.id}
                className="p-5 flex flex-col gap-3 active:bg-gray-50"
                onClick={() => router.push(`/admin/super/posts/${post.id}`)}
              >
                <div className="flex justify-between items-start">
                  <span className="px-2 py-1 bg-indigo-50 text-indigo-700 text-[10px] font-bold rounded uppercase">
                    {CATEGORIES.find((c) => c.key === post.category)?.label}
                  </span>
                  <span className="text-xs text-gray-400">
                    {new Date(post.created_at).toLocaleDateString()}
                  </span>
                </div>
                <h3 className="font-bold text-gray-900 leading-snug">
                  {post.title}
                </h3>
                {/* <div className="flex justify-end gap-4 mt-2 border-t pt-3 border-gray-50">
                  <Link
                    href={`/admin/posts/${post.id}`}
                    className="flex items-center text-sm text-gray-600 font-medium"
                  >
                    수정
                  </Link>
                  <button
                    onClick={() => deletePost(post.id)}
                    className="flex items-center text-sm text-red-500 font-medium"
                  >
                    삭제
                  </button>
                </div> */}
              </div>
            ))}
        </div>

        {/* Loading / Empty State */}
        {loading && (
          <div className="p-20 text-center text-gray-400 animate-pulse">
            데이터 로딩 중...
          </div>
        )}
        {!loading && posts.length === 0 && (
          <div className="p-20 text-center text-gray-400 font-medium">
            등록된 게시글이 없습니다.
          </div>
        )}
      </div>

      {/* Pagination: 반응형 버튼 */}
      {totalPages > 1 && (
        <div className="mt-8 flex items-center justify-center gap-2">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((prev) => prev - 1)}
            className="p-2 rounded-lg border border-gray-200 bg-white disabled:opacity-30"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>

          <div className="flex items-center gap-1 font-medium">
            <span className="text-indigo-600">{currentPage}</span>
            <span className="text-gray-400">/</span>
            <span className="text-gray-600">{totalPages}</span>
          </div>

          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((prev) => prev + 1)}
            className="p-2 rounded-lg border border-gray-200 bg-white disabled:opacity-30"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
}
