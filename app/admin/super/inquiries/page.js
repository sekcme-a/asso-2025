"use client";

import { useEffect, useState } from "react";
import { createBrowserSupabaseClient } from "@/utils/supabase/client";
import Link from "next/link";

export default function InquiryListPage() {
  const supabase = createBrowserSupabaseClient();
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchInquiries() {
      const { data, error } = await supabase
        .from("inquiries")
        .select("*")
        .order("created_at", { ascending: false });

      console.log(error);
      if (!error) setInquiries(data);
      setLoading(false);
    }
    fetchInquiries();
  }, [supabase]);

  if (loading)
    return <div className="p-20 text-center font-black">로딩 중...</div>;

  return (
    <div className="max-w-6xl mx-auto p-8 mt-20">
      <header className="mb-10 flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-black text-gray-900 tracking-tighter">
            문의 관리
          </h1>
          <p className="text-sm font-bold text-gray-500 mt-1">
            고객의 소중한 문의 내용을 확인하세요.
          </p>
        </div>
        <span className="bg-blue-50 text-blue-600 px-4 py-2 rounded-xl text-xs font-black">
          전체 문의: {inquiries.length}건
        </span>
      </header>

      <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50/50 border-b border-gray-50">
              <th className="p-6 text-[11px] font-black text-gray-400 uppercase tracking-widest">
                날짜
              </th>
              <th className="p-6 text-[11px] font-black text-gray-400 uppercase tracking-widest">
                이름
              </th>
              <th className="p-6 text-[11px] font-black text-gray-400 uppercase tracking-widest">
                제목
              </th>
              <th className="p-6 text-[11px] font-black text-gray-400 uppercase tracking-widest text-right">
                상세보기
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {inquiries.map((item) => (
              <tr
                key={item.id}
                className="hover:bg-blue-50/30 transition-colors group"
              >
                <td className="p-6 text-sm font-bold text-gray-400 font-mono">
                  {new Date(item.created_at).toLocaleDateString()}
                </td>
                <td className="p-6 text-sm font-black text-gray-900">
                  {item.name}
                </td>
                <td className="p-6 text-sm font-bold text-gray-700">
                  <Link
                    href={`/admin/inquiries/${item.id}`}
                    className="hover:text-blue-600 transition-colors"
                  >
                    {item.title}
                  </Link>
                </td>
                <td className="p-6 text-right">
                  <Link
                    href={`/admin/super/inquiries/${item.id}`}
                    className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-gray-50 text-gray-400 group-hover:bg-blue-600 group-hover:text-white transition-all"
                  >
                    →
                  </Link>
                </td>
              </tr>
            ))}
            {inquiries.length === 0 && (
              <tr>
                <td
                  colSpan={4}
                  className="p-20 text-center text-sm font-bold text-gray-400"
                >
                  접수된 문의가 없습니다.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
