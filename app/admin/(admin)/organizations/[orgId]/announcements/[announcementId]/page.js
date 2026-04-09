"use client";

import { useState, useEffect, useMemo } from "react";
import { useParams, useRouter } from "next/navigation";
import { createBrowserSupabaseClient } from "@/utils/supabase/client";
import dynamic from "next/dynamic";
import "react-quill-new/dist/quill.snow.css";

// React-Quill은 SSR을 지원하지 않으므로 dynamic import 사용
const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });

export default function AnnouncementEditPage() {
  const { orgId, announcementId } = useParams();
  const isNew = announcementId === "new";
  const router = useRouter();
  const supabase = createBrowserSupabaseClient();

  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isPinned, setIsPinned] = useState(false);

  useEffect(() => {
    if (!isNew) {
      fetchDetail();
    }
  }, [announcementId]);

  async function fetchDetail() {
    const { data } = await supabase
      .from("announcements")
      .select("*")
      .eq("id", announcementId)
      .single();
    if (data) {
      setTitle(data.title);
      setContent(data.content);
      setIsPinned(data.is_pinned);
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const payload = {
      org_id: orgId,
      title,
      content,
      is_pinned: isPinned,
      updated_at: new Date().toISOString(),
    };

    const { error } = isNew
      ? await supabase.from("announcements").insert(payload)
      : await supabase
          .from("announcements")
          .update(payload)
          .eq("id", announcementId);

    if (error) {
      alert("오류가 발생했습니다: " + error.message);
    } else {
      alert(isNew ? "공지사항이 등록되었습니다." : "수정되었습니다.");
      router.push(`/admin/organizations/${orgId}/announcements`);
    }
    setLoading(false);
  };

  // Quill 에디터 설정
  const modules = useMemo(
    () => ({
      toolbar: [
        [{ header: [1, 2, false] }],
        ["bold", "italic", "underline", "strike", "blockquote"],
        [
          { list: "ordered" },
          { list: "bullet" },
          { indent: "-1" },
          { indent: "+1" },
        ],
        ["link", "image"],
        ["clean"],
      ],
    }),
    [],
  );

  return (
    <div className="min-h-screen bg-[#f8f9fa] pt-12 pb-24 px-6  mt-20">
      <div className="max-w-4xl mx-auto">
        <header className="mb-10 flex items-center justify-between">
          <h1 className="text-3xl font-black text-gray-900 tracking-tighter">
            {isNew ? "새 공지사항 작성" : "공지사항 수정"}
          </h1>
          <button
            onClick={() => router.back()}
            className="text-sm font-bold text-gray-400"
          >
            취소하고 나가기
          </button>
        </header>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="bg-white rounded-[2.5rem] p-10 border border-gray-100 shadow-sm space-y-6">
            {/* 상단 고정 체크박스 */}
            <label className="flex items-center gap-3 cursor-pointer group w-max">
              <input
                type="checkbox"
                checked={isPinned}
                onChange={(e) => setIsPinned(e.target.checked)}
                className="w-5 h-5 rounded-lg border-2 border-gray-200 text-blue-600 focus:ring-0 transition-all"
              />
              <span className="text-sm font-black text-gray-400 group-hover:text-gray-900 transition-colors">
                이 공지사항을 상단에 고정합니다.
              </span>
            </label>

            {/* 제목 입력 */}
            <div className="space-y-2">
              <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest ml-1">
                Title
              </label>
              <input
                required
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="제목을 입력하세요"
                className="w-full bg-gray-50 border-none rounded-2xl px-6 py-4 font-bold text-lg outline-none focus:ring-2 ring-blue-100"
              />
            </div>

            {/* 에디터 */}
            <div className="space-y-2">
              <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest ml-1">
                Content
              </label>
              <div className="quill-container overflow-hidden rounded-3xl border-none bg-gray-50">
                <ReactQuill
                  theme="snow"
                  value={content}
                  onChange={setContent}
                  modules={modules}
                  className="min-h-[400px] font-bold"
                />
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-gray-900 text-white rounded-[2rem] font-black  hover:bg-blue-600 transition-all shadow-xl shadow-gray-200 disabled:bg-gray-200"
          >
            {loading
              ? "저장 중..."
              : isNew
                ? "공지사항 등록하기"
                : "수정 내용 저장하기"}
          </button>
        </form>
      </div>

      <style jsx global>{`
        .ql-container {
          font-family: inherit !important;
          font-size: 16px !important;
        }
        .ql-toolbar {
          border: none !important;
          background: #f1f3f5 !important;
          padding: 12px !important;
          border-radius: 20px 20px 0 0 !important;
        }
        .ql-container {
          border: none !important;
        }
        .ql-editor {
          min-height: 400px;
          padding: 30px !important;
        }
        .ql-editor.ql-blank::before {
          color: #adb5bd !important;
          font-style: normal !important;
        }
      `}</style>
    </div>
  );
}
