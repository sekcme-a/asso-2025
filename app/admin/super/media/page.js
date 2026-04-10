"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { createBrowserSupabaseClient } from "@/utils/supabase/client";

export default function MediaListPage() {
  const supabase = createBrowserSupabaseClient();
  const [medias, setMedias] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchMedias = useCallback(async () => {
    setLoading(true);
    try {
      let query = supabase.from("medias").select("*");
      if (searchTerm) {
        query = query.or(
          `news_title.ilike.%${searchTerm}%,press_name.ilike.%${searchTerm}%`,
        );
      }
      const { data, error } = await query.order("created_at", {
        ascending: false,
      });
      if (error) throw error;
      setMedias(data || []);
    } catch (error) {
      console.error(error.message);
    } finally {
      setLoading(false);
    }
  }, [searchTerm, supabase]);

  useEffect(() => {
    fetchMedias();
  }, [fetchMedias]);

  const deleteMedia = async (id) => {
    if (!confirm("정말 삭제하시겠습니까?")) return;
    const { error } = await supabase.from("medias").delete().eq("id", id);
    if (error) alert("삭제 실패");
    else fetchMedias();
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 mt-20">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-black text-gray-900 tracking-tight">
            미디어 보도 관리
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            총{" "}
            <span className="text-indigo-600 font-semibold">
              {medias.length}
            </span>
            개의 보도 자료
          </p>
        </div>
        <Link
          href="/admin/super/media/new"
          className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 transition-all shadow-lg active:scale-95"
        >
          새 보도 등록
        </Link>
      </div>

      <div className="relative mb-6">
        <input
          type="text"
          placeholder="뉴스 제목 또는 언론사 검색..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-11 pr-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all shadow-sm"
        />
        <svg
          className="w-5 h-5 text-gray-400 absolute left-4 top-3.5"
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

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        {/* 데스크탑 뷰 */}
        <div className="hidden md:block">
          <table className="w-full text-left border-collapse">
            <thead className="bg-gray-50 text-gray-400 text-[11px] uppercase font-black tracking-widest">
              <tr>
                <th className="px-6 py-4">언론사</th>
                <th className="px-6 py-4">보도 제목</th>
                <th className="px-6 py-4">작성일</th>
                <th className="px-6 py-4 text-right">관리</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {medias.map((item) => (
                <tr
                  key={item.id}
                  className="hover:bg-indigo-50/30 transition-colors"
                >
                  <td className="px-6 py-4 font-bold text-gray-700">
                    {item.press_name}
                  </td>
                  <td className="px-6 py-4">
                    <p className="font-semibold text-gray-900">
                      {item.news_title}
                    </p>
                    <p className="text-xs text-gray-400 mt-1 truncate max-w-xs">
                      {item.news_url}
                    </p>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-400">
                    {new Date(item.created_at).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 text-right space-x-4">
                    <Link
                      href={`/admin/super/media/${item.id}`}
                      className="text-indigo-600 hover:text-indigo-800 font-bold text-sm"
                    >
                      수정
                    </Link>
                    <button
                      onClick={() => deleteMedia(item.id)}
                      className="text-red-400 hover:text-red-600 font-bold text-sm"
                    >
                      삭제
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* 모바일 뷰 */}
        <div className="md:hidden divide-y divide-gray-100">
          {medias.map((item) => (
            <div key={item.id} className="p-5 space-y-2">
              <div className="flex justify-between items-center text-xs text-gray-400">
                <span className="font-black text-indigo-500">
                  {item.press_name}
                </span>
                <span>{new Date(item.created_at).toLocaleDateString()}</span>
              </div>
              <h3 className="font-bold text-gray-900">{item.news_title}</h3>
              <div className="flex justify-end gap-4 pt-2">
                <Link
                  href={`/admin/super/media/${item.id}`}
                  className="text-sm font-bold text-gray-600"
                >
                  수정
                </Link>
                <button
                  onClick={() => deleteMedia(item.id)}
                  className="text-sm font-bold text-red-500"
                >
                  삭제
                </button>
              </div>
            </div>
          ))}
        </div>

        {loading && (
          <div className="p-20 text-center animate-pulse text-gray-400 font-bold">
            로딩 중...
          </div>
        )}
        {!loading && medias.length === 0 && (
          <div className="p-20 text-center text-gray-400">
            데이터가 없습니다.
          </div>
        )}
      </div>
    </div>
  );
}
