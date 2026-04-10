"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { createBrowserSupabaseClient } from "@/utils/supabase/client";
import PostEditor from "./PostEditor";

export default function PostEditPage() {
  const params = useParams();
  const id = params.id;
  const isNew = id === "new"; // URL이 /admin/super/posts/new 인 경우

  const supabase = createBrowserSupabaseClient();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(!isNew);

  useEffect(() => {
    // 수정 페이지일 경우에만 기존 데이터를 불러옵니다.
    if (!isNew) {
      fetchPost();
    }
  }, [id]);

  async function fetchPost() {
    try {
      const { data, error } = await supabase
        .from("posts")
        .select("*")
        .eq("id", id)
        .single();

      if (error) throw error;
      setPost(data);
    } catch (error) {
      console.error("데이터 로드 실패:", error.message);
      alert("게시글을 불러올 수 없습니다.");
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-gray-500 font-bold animate-pulse">
          데이터 로딩 중...
        </p>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen py-10">
      <div className="max-w-5xl mx-auto px-4">
        {/* PostEditor 컴포넌트 사용 */}
        {/* 신규 작성이면 post는 null, 수정이면 불러온 데이터가 전달됨 */}
        <PostEditor post={post} />
      </div>
    </div>
  );
}
