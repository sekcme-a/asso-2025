"use client";

import React, { useState, useRef, useEffect, useMemo } from "react";
import dynamic from "next/dynamic";
import imageCompression from "browser-image-compression";
import { usePathname, useRouter } from "next/navigation";
import {
  uploadFile,
  deleteFiles,
  extractImagePathsFromHtml,
} from "./lib/storageUtils";
import { createBrowserSupabaseClient } from "@/utils/supabase/client";
import "react-quill-new/dist/quill.snow.css";
import { Quill } from "react-quill-new";
import { ImageResize } from "quill-image-resize-module-ts";
import { Button, TextField } from "@mui/material";

if (typeof window !== "undefined" && window.Quill) {
  window.Quill = Quill;
}
Quill.register("modules/ImageResize", ImageResize);

const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });

export default function PostEditor({ post = null, category }) {
  const supabase = createBrowserSupabaseClient();
  const router = useRouter();
  const pathname = usePathname();
  const postId = post?.id || null;
  const [title, setTitle] = useState(post?.title || "");
  const [files, setFiles] = useState(post?.files || []); // 업로드할 File 객체 배열
  const [prevFiles, setPrevFiles] = useState(post?.files || []); // 기존 파일 메타정보
  const [prevImages, setPrevImages] = useState(
    post ? extractImagePathsFromHtml(post.post) : []
  );

  const quillRef = useRef();

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
          ["bold", "italic", "underline", "strike", "blockquote"],
          [{ align: [] }],
          [{ size: [] }],
          [{ color: [] }, { background: [] }],
          [
            { list: "ordered" },
            { list: "bullet" },
            { indent: "-1" },
            { indent: "+1" },
          ],
          ["link", "image", "video"],
          ["clean"],
        ],
        handlers: {
          image: handleImageInsert,
        },
      },
      ImageResize: { modules: ["Resize", "DisplaySize"] },
    }),
    []
  );

  const [isSaving, setIsSaving] = useState(false);
  const handleSave = async () => {
    try {
      setIsSaving(true);
      const editor = quillRef.current.getEditor();
      let html = editor.root.innerHTML;

      const base64Regex = /<img src="data:image\/[^;]+;base64[^"]+"[^>]*>/g;
      const imgTagMatches = html.match(base64Regex) || [];
      const uploadedImagePaths = [];

      let realPostId = postId;

      if (!realPostId) {
        const { data, error } = await supabase
          .from("posts")
          .insert({ title: "(임시)", category, post: "", files: [] })
          .select("id")
          .single();
        if (error || !data?.id) {
          alert("게시글 ID 생성 실패");
          return;
        }
        realPostId = data.id;
      }

      // Base64 이미지 → Supabase 업로드
      for (const tag of imgTagMatches) {
        const srcMatch = tag.match(/src=\"([^\"]+)\"/);
        if (!srcMatch) continue;

        const base64Data = srcMatch[1];
        const blob = await (await fetch(base64Data)).blob();
        const file = new File([blob], `image_${Date.now()}.png`, {
          type: blob.type,
        });

        const { url, path } = await uploadFile(file, "images", realPostId);
        uploadedImagePaths.push(path);
        html = html.replace(base64Data, url);
      }

      // 이전 이미지와 비교하여 삭제 대상 찾기
      const currentImages = extractImagePathsFromHtml(html);
      const unusedImages = prevImages.filter(
        (path) => !currentImages.includes(path)
      );
      if (unusedImages.length) await deleteFiles(unusedImages);

      // 새로 업로드할 파일만 선별
      const onlyNewFiles = files.filter((f) => f instanceof File);

      // 업로드
      const uploadedFiles = [];
      for (const file of onlyNewFiles) {
        const uploaded = await uploadFile(file, "files", realPostId);
        uploadedFiles.push(uploaded); // { url, path, title }
      }

      // ✅ 현재 유지되는 기존 파일 정보 추출
      const existingKeptFiles = files.filter((f) => !(f instanceof File));

      // 최종 파일 목록
      const finalFiles = [...existingKeptFiles, ...uploadedFiles];

      // ✅ 삭제 대상 계산
      const prevPaths = prevFiles.map((f) => f.path);
      const currentPaths = finalFiles.map((f) => f.path);
      const unusedFiles = prevPaths.filter(
        (path) => !currentPaths.includes(path)
      );
      if (unusedFiles.length) await deleteFiles(unusedFiles);

      // Supabase 업데이트
      const updatePayload = {
        title,
        post: html,
        files: finalFiles,
      };
      if (!post) updatePayload.category = category;

      const { error } = await supabase
        .from("posts")
        .update(updatePayload)
        .eq("id", realPostId);

      if (error) {
        alert("저장 실패");
        console.error(error);
        return;
      }

      alert("저장 완료");
      setPrevImages(currentImages);
      setPrevFiles(uploadedFiles);
      setFiles([]);

      if (!post) router.replace(`/admin/post/${realPostId}`);
      else router.back();
    } catch (error) {
      console.error("저장 중 오류 발생:", error);
      alert("저장 중 오류가 발생했습니다. 다시 시도해주세요.");
    } finally {
      setIsSaving(false);
    }
  };

  const [isDeleting, setIsDeleting] = useState(false);
  const handleDelete = async () => {
    try {
      setIsDeleting(true);
      if (!post?.id) return;

      const images = extractImagePathsFromHtml(post.post);
      const filePaths = post.files?.map((f) => f.path) || [];

      await deleteFiles([...images, ...filePaths]);
      await supabase.from("posts").delete().eq("id", post.id);

      alert("삭제 완료");
      router.back();
    } catch (error) {
      console.error("삭제 중 오류 발생:", error);
      alert("삭제 중 오류가 발생했습니다. 다시 시도해주세요.");
    } finally {
      setIsDeleting(false);
    }
  };

  const handleRemoveFile = (index) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-4">
      <TextField
        label="제목"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        fullWidth
        size="small"
      />
      <ReactQuill
        ref={quillRef}
        defaultValue={post?.post || ""}
        modules={modules}
        theme="snow"
      />
      <div>
        <input
          type="file"
          multiple
          onChange={(e) =>
            setFiles((prev) => [...prev, ...Array.from(e.target.files)])
          }
        />
        <ul className="mt-2 text-sm text-gray-600">
          {files.length > 0 &&
            files.map((file, idx) => (
              <li key={idx} className="flex items-center gap-2">
                📎 {file.name ?? file.title}
                <button
                  type="button"
                  onClick={() => handleRemoveFile(idx)}
                  className="text-red-500 hover:underline"
                >
                  삭제
                </button>
              </li>
            ))}
        </ul>
      </div>
      <div className="space-x-2">
        <Button variant="contained" onClick={handleSave} disabled={isSaving}>
          {isSaving ? "저장 중..." : "저장"}
        </Button>
        {post?.id && (
          <Button
            variant="contained"
            color="error"
            onClick={handleDelete}
            disabled={isDeleting}
          >
            {isDeleting ? "삭제 중..." : "삭제"}
          </Button>
        )}
      </div>
    </div>
  );
}
