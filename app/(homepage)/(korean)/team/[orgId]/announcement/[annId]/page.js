"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { createBrowserSupabaseClient } from "@/utils/supabase/client";
import ArticleContent from "@/app/(homepage)/(korean)/post/[postId]/ArticleContent";

export default function AnnouncementDetailPage() {
  const { orgId, annId } = useParams();
  const router = useRouter();
  const supabase = createBrowserSupabaseClient();

  const [announcement, setAnnouncement] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (annId) {
      fetchAnnouncement();
    }
  }, [annId]);

  async function fetchAnnouncement() {
    setLoading(true);

    // 1. 공지사항 상세 정보 가져오기
    const { data, error } = await supabase
      .from("announcements")
      .select("*")
      .eq("id", annId)
      .single();

    if (error || !data) {
      alert("공지사항을 찾을 수 없습니다.");
      router.push(`/team/${orgId}`);
      return;
    }

    setAnnouncement(data);
    setLoading(false);

    // 2. 조회수 증가 (Update)
    await supabase
      .from("announcements")
      .update({ view_count: data.view_count + 1 })
      .eq("id", annId);
  }

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );

  return (
    <div className="min-h-screen bg-[#f8f9fa] pt-32 pb-24 px-6 mt-10">
      <div className="max-w-4xl mx-auto">
        {/* 상단 내비게이션 / 뒤로가기 */}
        <button
          onClick={() => router.push(`/team/${orgId}`)}
          className="group flex items-center gap-2 text-gray-400 hover:text-gray-900 font-bold mb-8 transition-colors"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2.5}
            stroke="currentColor"
            className="w-4 h-4 group-hover:-translate-x-1 transition-transform"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
            />
          </svg>
          목록으로 돌아가기
        </button>

        <article className="bg-white rounded-[2.5rem] shadow-sm border border-gray-100 overflow-hidden">
          {/* 헤더 섹션 */}
          <header className="p-8 md:p-12 border-b border-gray-50 bg-gray-50/30">
            <div className="flex items-center gap-3 mb-4">
              {announcement.is_pinned && (
                <span className="bg-red-50 text-red-500 text-[10px] font-black px-2.5 py-1 rounded-md uppercase tracking-wider">
                  Important
                </span>
              )}
              <span className="text-[10px] font-black text-blue-600 bg-blue-50 px-2.5 py-1 rounded-md uppercase tracking-wider">
                Notice
              </span>
            </div>

            <h1 className="text-3xl md:text-4xl font-black text-gray-900 leading-tight tracking-tighter mb-6">
              {announcement.title}
            </h1>

            <div className="flex flex-wrap items-center gap-6 text-sm font-bold text-gray-400">
              <div className="flex items-center gap-2">
                <span className="text-[10px] uppercase text-gray-300">
                  Date
                </span>
                <span className="text-gray-600">
                  {new Date(announcement.created_at).toLocaleDateString()}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] uppercase text-gray-300">
                  Views
                </span>
                <span className="text-gray-600">{announcement.view_count}</span>
              </div>
            </div>
          </header>

          {/* 본문 섹션 */}
          <div className="p-8 md:p-12">
            <div className="article-content-wrapper relative">
              <ArticleContent html={announcement.content} />
            </div>
          </div>

          {/* 푸터 섹션 */}
          <footer className="px-8 py-6 bg-gray-50/50 border-t border-gray-50 flex justify-end">
            <button
              onClick={() => router.push(`/team/${orgId}`)}
              className="px-6 py-2.5 bg-white border border-gray-200 text-gray-500 font-bold rounded-xl hover:bg-gray-100 transition-colors text-sm"
            >
              목록보기
            </button>
          </footer>
        </article>
      </div>
    </div>
  );
}
