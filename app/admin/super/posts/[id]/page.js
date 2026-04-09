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
import { Quill } from "react-quill-new";

// SSR 방지 에디터 로드
const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });

export default function PostEditor({ post = null }) {
  const supabase = createBrowserSupabaseClient();
  const router = useRouter();

  const [isSaving, setIsSaving] = useState(false);
  const quillRef = useRef();

  // 폼 상태 관리
  const [form, setForm] = useState({
    title: post?.title || "",
    title_en: post?.title_en || "",
    category: post?.category || "anouncement",
    post: post?.post || "", // 국문 (Rich Text)
    post_en: post?.post_en || "", // 영문 (Plain Text)
  });

  // 파일 관리 상태
  const [files, setFiles] = useState(post?.files || []); // 화면 표시용 (File객체 또는 기존파일객체)
  const [prevFiles, setPrevFiles] = useState(post?.files || []); // 수정 전 파일 목록
  const [prevImages, setPrevImages] = useState(
    post ? extractImagePathsFromHtml(post.post) : [],
  );

  // 이미지 삽입 핸들러 (Base64로 먼저 삽입)
  const handleImageInsert = async () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.onchange = async () => {
      const file = input.files[0];
      if (!file) return;

      const compressed =
        file.size > 2 * 1024 * 1024
          ? await imageCompression(file, {
              maxSizeMB: 2,
              maxWidthOrHeight: 1920,
            })
          : file;

      const reader = new FileReader();
      reader.onload = () => {
        const editor = quillRef.current.getEditor();
        const range = editor.getSelection(true);
        editor.insertEmbed(range.index, "image", reader.result);
        editor.setSelection(range.index + 1);
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

  const handleSave = async () => {
    try {
      setIsSaving(true);
      const editor = quillRef.current.getEditor();
      let html = editor.root.innerHTML;

      let realPostId = post?.id;

      // 1. 신규 게시글일 경우 ID 선발급 (임시 저장)
      if (!realPostId) {
        const { data, error } = await supabase
          .from("posts")
          .insert({ title: "(임시)", category: form.category })
          .select("id")
          .single();
        if (error) throw new Error("게시글 생성 실패");
        realPostId = data.id;
      }

      // 2. 본문 내 Base64 이미지 처리
      const base64Regex = /<img src="data:image\/[^;]+;base64[^"]+"[^>]*>/g;
      const imgTagMatches = html.match(base64Regex) || [];
      const uploadedImagePaths = [];

      for (const tag of imgTagMatches) {
        const srcMatch = tag.match(/src=\"([^\"]+)\"/);
        if (!srcMatch) continue;
        const base64Data = srcMatch[1];
        const blob = await (await fetch(base64Data)).blob();
        const file = new File([blob], `img_${Date.now()}.png`, {
          type: blob.type,
        });

        const { url, path } = await uploadFile(file, "images", realPostId);
        uploadedImagePaths.push(path);
        html = html.replace(base64Data, url);
      }

      // 3. 본문 내 삭제된 이미지 Storage에서 제거
      const currentImages = extractImagePathsFromHtml(html);
      const unusedImages = prevImages.filter((p) => !currentImages.includes(p));
      if (unusedImages.length) await deleteFiles(unusedImages);

      // 4. 첨부 파일 처리 (새로 추가된 File 객체만 업로드)
      const onlyNewFiles = files.filter((f) => f instanceof File);
      const existingKeptFiles = files.filter((f) => !(f instanceof File));

      const newlyUploaded = [];
      for (const file of onlyNewFiles) {
        const uploaded = await uploadFile(file, "files", realPostId);
        newlyUploaded.push(uploaded);
      }

      const finalFiles = [...existingKeptFiles, ...newlyUploaded];

      // 5. 제거된 첨부파일 Storage에서 삭제
      const prevPaths = prevFiles.map((f) => f.path);
      const currentPaths = finalFiles.map((f) => f.path);
      const unusedFiles = prevPaths.filter((p) => !currentPaths.includes(p));
      if (unusedFiles.length) await deleteFiles(unusedFiles);

      // 6. 최종 DB 업데이트
      const { error } = await supabase
        .from("posts")
        .update({
          title: form.title,
          title_en: form.title_en,
          category: form.category,
          post: html,
          post_en: form.post_en,
          files: finalFiles,
        })
        .eq("id", realPostId);

      if (error) throw error;

      alert("성공적으로 저장되었습니다.");
      router.push("/admin/posts");
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
        <button
          onClick={() => router.back()}
          className="text-gray-400 font-bold text-sm"
        >
          취소
        </button>
      </header>

      {/* 카테고리 선택 */}
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

      {/* 제목 입력 (KR / EN) */}
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

      {/* 국문 에디터 */}
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

      {/* 영문 텍스트 */}
      <div className="space-y-2">
        <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest">
          Content (EN - Plain Text)
        </label>
        <textarea
          rows={6}
          value={form.post_en}
          onChange={(e) => setForm({ ...form, post_en: e.target.value })}
          className="w-full p-6 bg-gray-50 rounded-2xl font-medium border-none outline-none focus:ring-2 ring-indigo-50 resize-none"
          placeholder="English content..."
        />
      </div>

      {/* 첨부 파일 관리 */}
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

      {/* 저장 버튼 */}
      <button
        onClick={handleSave}
        disabled={isSaving}
        className="w-full py-4 bg-indigo-600 text-white rounded-2xl font-black text-lg shadow-lg shadow-indigo-100 hover:bg-indigo-700 disabled:bg-gray-200 transition-all"
      >
        {isSaving ? "처리 중..." : "게시글 저장하기"}
      </button>

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
