"use client";

import React, { useState, useRef, useEffect, useMemo } from "react";
import dynamic from "next/dynamic";
import imageCompression from "browser-image-compression";
import { useRouter } from "next/navigation";
import {
  uploadFile,
  deleteFiles,
  extractImagePathsFromHtml,
} from "./lib/storageUtils";
import { createBrowserSupabaseClient } from "@/utils/supabase/client";
import "react-quill-new/dist/quill.snow.css";

// SSR 방지 에디터 로드
const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });

export default function PostEditor({ post = null }) {
  const supabase = createBrowserSupabaseClient();
  const router = useRouter();

  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const quillRef = useRef();

  // 폼 상태 관리
  const [form, setForm] = useState({
    title: post?.title || "",
    title_en: post?.title_en || "",
    category: post?.category || "anouncement",
    post: post?.post || "", // 국문 (Rich Text)
    post_en: post?.post_en || "", // 영문 (Plain Text)
    is_main: post?.is_main || false, // 메인 노출 여부 추가
  });

  // 파일 관리 상태
  const [files, setFiles] = useState(post?.files || []);
  const [prevFiles, setPrevFiles] = useState(post?.files || []);
  const [prevImages, setPrevImages] = useState(
    post ? extractImagePathsFromHtml(post.post) : [],
  );

  // Gemini 번역 도우미 함수 추가
  const handleGeminiTranslation = () => {
    const editor = quillRef.current?.getEditor();
    if (!editor) return;

    const htmlContent = editor.root.innerHTML;

    if (!form.title || htmlContent === "<p><br></p>") {
      alert("한국어 제목과 본문을 먼저 작성해주세요.");
      return;
    }

    const prompt = `
당신은 전문 번역가입니다. 아래의 한국어 게시글 정보를 영어로 번역해주세요.

[지시사항]
1. 제목(Title)을 영어로 번역하세요.
2. 본문(Content HTML)의 경우, HTML 태그 구조는 절대 건드리지 마세요. 
3. 태그 내부의 텍스트(문구)들만 자연스러운 영어로 번역하세요.
4. 결과물은 반드시 아래 형식을 지켜서 출력하세요.
   - Title EN: [번역된 제목]
   - Content EN: [번역된 HTML]

[게시글 정보]
제목: ${form.title}
본문 HTML: ${htmlContent}
    `.trim();

    navigator.clipboard.writeText(prompt).then(() => {
      window.open("https://gemini.google.com/app", "_blank");
    });
  };

  // 이미지 압축 공통 함수
  const compressImage = async (file) => {
    const options = {
      maxSizeMB: 0.8,
      maxWidthOrHeight: 1920,
      useWebWorker: true,
    };
    try {
      return await imageCompression(file, options);
    } catch (error) {
      console.error("Compression error:", error);
      return file;
    }
  };

  // 이미지 삽입 핸들러
  const handleImageInsert = async () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.onchange = async () => {
      const file = input.files[0];
      if (!file) return;

      setIsSaving(true);
      const compressed = await compressImage(file);

      const reader = new FileReader();
      reader.onload = () => {
        const editor = quillRef.current.getEditor();
        const range = editor.getSelection(true);
        editor.insertEmbed(range.index, "image", reader.result);
        editor.setSelection(range.index + 1);
        setIsSaving(false);
      };
      reader.readAsDataURL(compressed);
    };
    input.click();
  };

  const modules = useMemo(
    () => ({
      toolbar: {
        container: [
          [{ header: [1, 2, 3, false] }],
          ["bold", "italic", "underline", "strike"],
          [{ list: "ordered" }, { list: "bullet" }],
          ["link", "image", "video"],
          ["clean"],
        ],
        handlers: { image: handleImageInsert },
      },
    }),
    [],
  );

  const handleDelete = async () => {
    if (!post?.id) return;
    if (
      !confirm(
        "정말로 이 게시글을 삭제하시겠습니까? 첨부된 파일과 이미지도 모두 삭제됩니다.",
      )
    )
      return;

    try {
      setIsDeleting(true);
      const currentImages = extractImagePathsFromHtml(post.post);
      const currentFiles = post.files?.map((f) => f.path) || [];
      const allPaths = [...currentImages, ...currentFiles];

      if (allPaths.length > 0) {
        await deleteFiles(allPaths);
      }

      const { error } = await supabase.from("posts").delete().eq("id", post.id);
      if (error) throw error;

      alert("삭제되었습니다.");
      router.push("/admin/super/posts");
    } catch (err) {
      console.error(err);
      alert("삭제 중 오류가 발생했습니다.");
    } finally {
      setIsDeleting(false);
    }
  };

  const handleSave = async () => {
    try {
      setIsSaving(true);
      const editor = quillRef.current.getEditor();
      let html = editor.root.innerHTML;
      let realPostId = post?.id;

      if (!realPostId) {
        const { data, error } = await supabase
          .from("posts")
          .insert({ title: "(임시)", category: form.category })
          .select("id")
          .single();
        if (error) throw new Error("게시글 생성 실패");
        realPostId = data.id;
      }

      const base64Regex = /<img src="data:image\/[^;]+;base64[^"]+"[^>]*>/g;
      const imgTagMatches = html.match(base64Regex) || [];

      for (const tag of imgTagMatches) {
        const srcMatch = tag.match(/src=\"([^\"]+)\"/);
        if (!srcMatch) continue;
        const base64Data = srcMatch[1];
        const blob = await (await fetch(base64Data)).blob();
        const rawFile = new File([blob], `img_${Date.now()}.png`, {
          type: blob.type,
        });
        const finalFileToUpload = await compressImage(rawFile);
        const { url, path } = await uploadFile(
          finalFileToUpload,
          "images",
          realPostId,
        );
        html = html.replace(base64Data, url);
      }

      const currentImages = extractImagePathsFromHtml(html);
      const unusedImages = prevImages.filter((p) => !currentImages.includes(p));
      if (unusedImages.length) await deleteFiles(unusedImages);

      const onlyNewFiles = files.filter((f) => f instanceof File);
      const existingKeptFiles = files.filter((f) => !(f instanceof File));
      const newlyUploaded = [];
      for (const file of onlyNewFiles) {
        const uploaded = await uploadFile(file, "files", realPostId);
        newlyUploaded.push(uploaded);
      }
      const finalFiles = [...existingKeptFiles, ...newlyUploaded];

      const prevPaths = prevFiles.map((f) => f.path);
      const currentPaths = finalFiles.map((f) => f.path);
      const unusedFiles = prevPaths.filter((p) => !currentPaths.includes(p));
      if (unusedFiles.length) await deleteFiles(unusedFiles);

      const { error } = await supabase
        .from("posts")
        .update({
          title: form.title,
          title_en: form.title_en,
          category: form.category,
          post: html,
          post_en: form.post_en,
          files: finalFiles,
          is_main: form.is_main, // DB 업데이트 항목에 추가
          created_at: new Date().toISOString(), // 이 라인이 추가되었습니다.
        })
        .eq("id", realPostId);

      if (error) throw error;
      alert("성공적으로 저장되었습니다.");
      router.push("/admin/super/posts");
    } catch (err) {
      console.error(err);
      alert("저장 중 오류가 발생했습니다.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-4 sm:p-8 space-y-6 bg-white rounded-3xl shadow-sm border mt-10">
      <header className="flex justify-between items-center border-b pb-4">
        <h1 className="text-2xl font-black text-gray-900 tracking-tight">
          {post ? "게시글 수정" : "새 게시글 작성"}
        </h1>
        <div className="flex gap-3 items-center">
          <button
            type="button"
            onClick={handleGeminiTranslation}
            className="flex items-center gap-2 px-4 py-2 bg-white border border-indigo-100 text-indigo-600 rounded-xl font-bold text-sm hover:bg-indigo-50 transition-all shadow-sm"
          >
            ✨ Gemini 번역 도움받기
          </button>
          <button
            onClick={() => router.back()}
            className="text-gray-400 font-bold text-sm"
          >
            취소
          </button>
        </div>
      </header>

      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
        <div className="flex flex-col gap-2">
          <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest">
            Category
          </label>
          <select
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
            className="w-full sm:w-64 p-3 bg-gray-50 border rounded-xl font-bold outline-none focus:ring-2 ring-indigo-100"
          >
            <option value="anouncement">공지사항</option>
            <option value="photo">포토갤러리</option>
            <option value="video">동영상갤러리</option>
            <option value="reference">자료실</option>
            <option value="support">후원확인</option>
          </select>
        </div>

        {/* 공지사항일 때만 메인 노출 선택창 표시 */}
        {form.category === "anouncement" && (
          <div className="flex items-center gap-2 pt-6">
            <input
              type="checkbox"
              id="is_main"
              checked={form.is_main}
              onChange={(e) => setForm({ ...form, is_main: e.target.checked })}
              className="w-5 h-5 accent-indigo-600 cursor-pointer"
            />
            <label
              htmlFor="is_main"
              className="text-sm font-bold text-gray-700 cursor-pointer"
            >
              메인 페이지에 노출하기
            </label>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-[11px] font-black text-indigo-500 uppercase tracking-widest">
            Title (KR)
          </label>
          <input
            type="text"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            className="w-full p-4 bg-gray-50 rounded-xl font-bold border-none outline-none focus:ring-2 ring-indigo-50"
            placeholder="한국어 제목"
          />
        </div>
        <div className="space-y-2">
          <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest">
            Title (EN)
          </label>
          <input
            type="text"
            value={form.title_en}
            onChange={(e) => setForm({ ...form, title_en: e.target.value })}
            className="w-full p-4 bg-gray-50 rounded-xl font-bold border-none outline-none focus:ring-2 ring-indigo-50"
            placeholder="English Title"
          />
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-[11px] font-black text-indigo-500 uppercase tracking-widest">
          Content (KR - Editor)
        </label>
        <div className="bg-gray-50 rounded-2xl overflow-hidden">
          <ReactQuill
            ref={quillRef}
            defaultValue={form.post}
            modules={modules}
            theme="snow"
          />
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest">
          Content (EN - Plain Text / HTML)
        </label>
        <textarea
          rows={10}
          value={form.post_en}
          onChange={(e) => setForm({ ...form, post_en: e.target.value })}
          className="w-full p-6 bg-gray-50 rounded-2xl font-mono text-sm border-none outline-none focus:ring-2 ring-indigo-50 resize-none"
          placeholder="English content with HTML tags..."
        />
      </div>

      {/* 첨부 파일 및 저장 버튼 섹션 */}
      <div className="space-y-3 pt-4 border-t">
        <div className="flex justify-between items-center">
          <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest">
            Attachments
          </label>
          <input
            type="file"
            multiple
            id="file-upload"
            className="hidden"
            onChange={(e) =>
              setFiles((prev) => [...prev, ...Array.from(e.target.files)])
            }
          />
          <label
            htmlFor="file-upload"
            className="cursor-pointer bg-indigo-50 text-indigo-600 px-4 py-2 rounded-full text-xs font-bold hover:bg-indigo-100"
          >
            + 파일 추가
          </label>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {files.map((file, idx) => (
            <div
              key={idx}
              className="flex items-center justify-between p-3 bg-white border rounded-xl shadow-sm group"
            >
              <span className="text-sm font-medium text-gray-600 truncate max-w-[80%] uppercase">
                {file.name || file.title}
              </span>
              <button
                type="button"
                onClick={() =>
                  setFiles((prev) => prev.filter((_, i) => i !== idx))
                }
                className="text-red-400 hover:text-red-600 p-1"
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
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <button
          onClick={handleSave}
          disabled={isSaving || isDeleting}
          className="w-full py-4 bg-indigo-600 text-white rounded-2xl font-black text-lg shadow-lg shadow-indigo-100 hover:bg-indigo-700 disabled:bg-gray-200 transition-all"
        >
          {isSaving ? "처리 중..." : "게시글 저장하기"}
        </button>

        {post?.id && (
          <button
            onClick={handleDelete}
            disabled={isSaving || isDeleting}
            className="w-full py-4 bg-white text-red-500 border border-red-100 rounded-2xl font-black text-lg hover:bg-red-50 disabled:opacity-50 transition-all"
          >
            {isDeleting ? "삭제 중..." : "게시글 삭제하기"}
          </button>
        )}
      </div>

      <style jsx global>{`
        .ql-toolbar {
          border: none !important;
          background: #f8f9fa !important;
          padding: 10px !important;
          border-radius: 16px 16px 0 0 !important;
          border-bottom: 1px solid #eee !important;
        }
        .ql-container {
          border: none !important;
          font-size: 16px !important;
          min-height: 300px;
        }
        .ql-editor {
          padding: 20px !important;
          line-height: 1.6;
        }
      `}</style>
    </div>
  );
}
