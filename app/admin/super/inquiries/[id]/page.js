"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { createBrowserSupabaseClient } from "@/utils/supabase/client";

export default function InquiryDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const supabase = createBrowserSupabaseClient();
  const [inquiry, setInquiry] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchInquiry() {
      const { data, error } = await supabase
        .from("inquiries")
        .select("*")
        .eq("id", id)
        .single();

      if (error) {
        alert("데이터를 불러올 수 없습니다.");
        router.push("/admin/inquiries");
      } else {
        setInquiry(data);
      }
      setLoading(false);
    }
    fetchInquiry();
  }, [id, supabase, router]);

  const handleDelete = async () => {
    if (!confirm("이 문의 내역을 삭제하시겠습니까?")) return;
    const { error } = await supabase.from("inquiries").delete().eq("id", id);
    if (!error) {
      alert("삭제되었습니다.");
      router.push("/admin/inquiries");
    }
  };

  if (loading)
    return <div className="p-20 text-center font-black">로딩 중...</div>;
  if (!inquiry) return null;

  return (
    <div className="max-w-4xl mx-auto p-8 mt-20">
      <button
        onClick={() => router.back()}
        className="mb-6 text-xs font-black text-gray-400 hover:text-gray-900 transition-colors flex items-center gap-2"
      >
        ← 목록으로 돌아가기
      </button>

      <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden">
        {/* 상단 섹션 */}
        <div className="p-10 border-b border-gray-50 bg-gray-50/30">
          <div className="flex justify-between items-start mb-6">
            <span className="bg-blue-600 text-white px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest">
              Inquiry Detail
            </span>
            <span className="text-sm font-bold text-gray-400 font-mono">
              {new Date(inquiry.created_at).toLocaleString()}
            </span>
          </div>
          <h1 className="text-3xl font-black text-gray-900 leading-tight break-keep">
            {inquiry.title}
          </h1>
        </div>

        {/* 정보 섹션 */}
        <div className="p-10 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-1">
            <p className="text-[11px] font-black text-gray-400 uppercase tracking-widest">
              Name
            </p>
            <p className="text-lg font-black text-gray-900">{inquiry.name}</p>
          </div>
          <div className="space-y-1">
            <p className="text-[11px] font-black text-gray-400 uppercase tracking-widest">
              Phone
            </p>
            <p className="text-lg font-black text-gray-900 font-mono">
              {inquiry.phone}
            </p>
          </div>
          <div className="space-y-1">
            <p className="text-[11px] font-black text-gray-400 uppercase tracking-widest">
              Email
            </p>
            <p className="text-lg font-black text-gray-900 font-mono">
              {inquiry.email || "N/A"}
            </p>
          </div>
        </div>

        {/* 본문 섹션 */}
        <div className="p-10 bg-white pt-0">
          <div className="bg-gray-50 rounded-3xl p-8 min-h-[200px]">
            <p className="text-[11px] font-black text-gray-400 uppercase tracking-widest mb-4">
              Content
            </p>
            <div className="text-gray-800 leading-relaxed font-medium whitespace-pre-wrap">
              {inquiry.content}
            </div>
          </div>
        </div>

        {/* 푸터 버튼 */}
        <div className="p-8 bg-gray-50/50 flex justify-end gap-3">
          <button
            onClick={handleDelete}
            className="px-6 py-3 bg-white text-red-500 border border-red-100 rounded-2xl text-sm font-black hover:bg-red-50 transition-all"
          >
            삭제하기
          </button>
          <a
            href={`mailto:${inquiry.email}`}
            className="px-8 py-3 bg-gray-950 text-white rounded-2xl text-sm font-black hover:bg-blue-600 transition-all shadow-lg shadow-gray-200"
          >
            이메일 답장하기
          </a>
        </div>
      </div>
    </div>
  );
}
