"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { createBrowserSupabaseClient } from "@/utils/supabase/client";

export default function AnnouncementListPage() {
  const { orgId } = useParams();
  const supabase = createBrowserSupabaseClient();
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAnnouncements();
  }, [orgId]);

  async function fetchAnnouncements() {
    setLoading(true);
    const { data } = await supabase
      .from("announcements")
      .select("*")
      .eq("org_id", orgId)
      .order("is_pinned", { ascending: false })
      .order("created_at", { ascending: false });

    if (data) setList(data);
    setLoading(false);
  }

  const handleDelete = async (id) => {
    if (!confirm("정말 삭제하시겠습니까?")) return;
    const { error } = await supabase
      .from("announcements")
      .delete()
      .eq("id", id);
    if (!error) fetchAnnouncements();
  };

  return (
    <div className="min-h-screen bg-[#f8f9fa] pt-12 pb-24 px-6 mt-20">
      <div className="max-w-5xl mx-auto">
        <header className="flex justify-between items-end mb-10">
          <div>
            <h1 className="text-4xl font-black text-gray-900 tracking-tighter uppercase">
              Announcements
            </h1>
            <p className="text-sm font-bold text-gray-400 mt-2">
              단체의 중요한 소식과 공지사항을 관리합니다.
            </p>
          </div>
          <Link
            href={`/admin/organizations/${orgId}/announcements/new`}
            className="bg-gray-900 text-white px-8 py-4 rounded-2xl font-black text-sm hover:bg-blue-600 transition-all shadow-xl shadow-gray-200"
          >
            + 새 공지 작성
          </Link>
        </header>

        <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-50/50 border-b border-gray-50 text-[11px] font-black text-gray-400 uppercase tracking-widest">
                <th className="px-8 py-5 w-20">번호</th>
                <th className="px-8 py-5">제목</th>
                <th className="px-8 py-5 w-32">작성일</th>
                <th className="px-8 py-5 w-32 text-right">관리</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {list.map((item, idx) => (
                <tr
                  key={item.id}
                  className="hover:bg-gray-50/30 transition-colors group"
                >
                  <td className="px-8 py-6 text-sm font-bold text-gray-400">
                    {item.is_pinned ? (
                      <span className="text-blue-600 font-black">PIN</span>
                    ) : (
                      list.length - idx
                    )}
                  </td>
                  <td className="px-8 py-6">
                    <Link
                      href={`/admin/organizations/${orgId}/announcements/${item.id}`}
                      className="font-black text-gray-900 hover:text-blue-600"
                    >
                      {item.title}
                    </Link>
                  </td>
                  <td className="px-8 py-6 text-xs font-bold text-gray-400">
                    {new Date(item.created_at).toLocaleDateString()}
                  </td>
                  <td className="px-8 py-6 text-right space-x-3">
                    <Link
                      href={`/admin/organizations/${orgId}/announcements/${item.id}`}
                      className="text-sm font-black text-gray-900 hover:text-blue-600"
                    >
                      수정
                    </Link>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="text-sm font-black text-red-300 hover:text-red-500"
                    >
                      삭제
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {list.length === 0 && !loading && (
            <div className="py-32 text-center text-gray-300 font-bold">
              등록된 공지사항이 없습니다.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
