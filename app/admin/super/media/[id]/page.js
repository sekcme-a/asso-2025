"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { createBrowserSupabaseClient } from "@/utils/supabase/client";

export default function MediaEditPage() {
  const supabase = createBrowserSupabaseClient();
  const router = useRouter();
  const params = useParams();
  const isNew = params.id === "new";

  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    news_title: "",
    news_title_en: "",
    press_name: "",
    press_name_en: "",
    news_url: "",
  });

  useEffect(() => {
    if (!isNew) fetchMedia();
  }, [params.id]);

  async function fetchMedia() {
    const { data, error } = await supabase
      .from("medias")
      .select("*")
      .eq("id", params.id)
      .single();
    if (data) setForm(data);
  }

  // --- Gemini 번역 도우미 기능 추가 ---
  const handleGeminiTranslation = () => {
    if (!form.news_title || !form.press_name) {
      alert("한국어 제목과 언론사명을 먼저 입력해주세요.");
      return;
    }

    const prompt = `다음 뉴스 정보를 영어로 번역해줘. 결과는 반드시 "Press Name: [언론사영문명]", "News Title: [제목영문명]" 형식으로만 출력해줘.\n\n언론사명: ${form.press_name}\n뉴스제목: ${form.news_title}`;

    // 클립보드 복사
    navigator.clipboard.writeText(prompt).then(() => {
      // 제미나이 새 창 열기
      window.open("https://gemini.google.com/app", "_blank");
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const { error } = isNew
      ? await supabase.from("medias").insert([form])
      : await supabase.from("medias").update(form).eq("id", params.id);

    if (error) {
      alert("오류 발생: " + error.message);
    } else {
      alert(isNew ? "등록되었습니다." : "수정되었습니다.");
      router.push("/admin/super/medias");
    }
    setLoading(false);
  };

  const handleDelete = async () => {
    if (!confirm("정말 삭제하시겠습니까?")) return;
    const { error } = await supabase
      .from("medias")
      .delete()
      .eq("id", params.id);
    if (!error) {
      alert("삭제되었습니다.");
      router.push("/admin/super/media");
    }
  };

  return (
    <div className="min-h-screen bg-[#f8f9fa] pt-10 pb-20 px-4 mt-20">
      <div className="max-w-4xl mx-auto">
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-black text-gray-900 tracking-tight">
            {isNew ? "새 미디어 보도 등록" : "보도 내용 수정"}
          </h1>
          <div className="flex gap-3">
            {/* Gemini 번역 버튼 추가 */}
            <button
              type="button"
              onClick={handleGeminiTranslation}
              className="flex items-center gap-2 px-4 py-2 bg-white border border-indigo-100 text-indigo-600 rounded-xl font-bold text-sm hover:bg-indigo-50 transition-all shadow-sm"
            >
              <span className="text-lg">✨</span> Gemini 번역 도움받기
            </button>
            <button
              onClick={() => router.back()}
              className="text-gray-400 font-bold text-sm hover:text-gray-600 transition-colors"
            >
              취소
            </button>
          </div>
        </header>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="bg-white rounded-[2.5rem] p-6 sm:p-10 border border-gray-100 shadow-sm space-y-8">
            {/* 언론사명 (KR / EN) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[11px] font-black text-indigo-500 uppercase tracking-widest ml-1">
                  Press Name (KR)
                </label>
                <input
                  required
                  type="text"
                  value={form.press_name}
                  onChange={(e) =>
                    setForm({ ...form, press_name: e.target.value })
                  }
                  placeholder="언론사 이름"
                  className="w-full bg-gray-50 border-none rounded-2xl px-6 py-4 font-bold outline-none focus:ring-2 ring-indigo-50"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest ml-1">
                  Press Name (EN)
                </label>
                <input
                  type="text"
                  value={form.press_name_en}
                  onChange={(e) =>
                    setForm({ ...form, press_name_en: e.target.value })
                  }
                  placeholder="Press Name in English"
                  className="w-full bg-gray-50 border-none rounded-2xl px-6 py-4 font-bold outline-none focus:ring-2 ring-indigo-50"
                />
              </div>
            </div>

            {/* 뉴스 제목 (KR / EN) */}
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-[11px] font-black text-indigo-500 uppercase tracking-widest ml-1">
                  News Title (KR)
                </label>
                <input
                  required
                  type="text"
                  value={form.news_title}
                  onChange={(e) =>
                    setForm({ ...form, news_title: e.target.value })
                  }
                  placeholder="보도 제목을 입력하세요"
                  className="w-full bg-gray-50 border-none rounded-2xl px-6 py-4 font-bold text-lg outline-none focus:ring-2 ring-indigo-50"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest ml-1">
                  News Title (EN)
                </label>
                <input
                  type="text"
                  value={form.news_title_en}
                  onChange={(e) =>
                    setForm({ ...form, news_title_en: e.target.value })
                  }
                  placeholder="News Title in English"
                  className="w-full bg-gray-50 border-none rounded-2xl px-6 py-4 font-bold text-lg outline-none focus:ring-2 ring-indigo-50"
                />
              </div>
            </div>

            {/* 뉴스 URL */}
            <div className="space-y-2 pt-4 border-t">
              <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest ml-1">
                News URL (Link)
              </label>
              <input
                required
                type="url"
                value={form.news_url}
                onChange={(e) => setForm({ ...form, news_url: e.target.value })}
                placeholder="https://example.com/news/123"
                className="w-full bg-gray-50 border-none rounded-2xl px-6 py-4 font-medium text-blue-600 outline-none focus:ring-2 ring-indigo-50"
              />
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <button
              type="submit"
              disabled={loading}
              className="w-full py-5 bg-gray-900 text-white rounded-[2rem] font-black text-lg shadow-xl hover:bg-indigo-600 transition-all active:scale-[0.98] disabled:bg-gray-200"
            >
              {loading
                ? "저장 중..."
                : isNew
                  ? "새 보도 등록하기"
                  : "수정 내용 저장하기"}
            </button>

            {!isNew && (
              <button
                type="button"
                onClick={handleDelete}
                className="w-full py-4 bg-white text-red-500 border border-red-50 rounded-[2rem] font-black hover:bg-red-50 transition-all"
              >
                이 보도 삭제하기
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
