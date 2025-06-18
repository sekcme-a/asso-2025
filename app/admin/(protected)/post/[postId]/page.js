"use client";

import PostEditor from "@/components/PostEditor";
import { createBrowserSupabaseClient } from "@/utils/supabase/client";
import { TextField } from "@mui/material";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { useState } from "react";
import Loader from "../../components/Loader";

const Post = () => {
  const supabase = createBrowserSupabaseClient();
  const { postId } = useParams();
  const searchParams = useSearchParams();
  const [category, setCategory] = useState(
    searchParams.get("category") || "공지사항"
  );

  const router = useRouter();
  const [loading, setLoading] = useState(true);

  const [post, setPost] = useState(null);

  useEffect(() => {
    if (postId === "new") {
      setLoading(false);
      return;
    }
    fetchData();
  }, [postId]);
  const fetchData = async () => {
    try {
      const { data: post, error } = await supabase
        .from("posts")
        .select("*")
        .eq("id", postId)
        .single();

      if (error) throw error;
      if (post) {
        setPost(post);
        setCategory(post.category);
      }
    } catch (error) {
      // console.error("Error fetching post:", error);
      // alert("해당 게시글이 삭제되었거나 존재하지 않습니다.", error.message);
      // router.back();
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loader />;
  return (
    <div className="p-10">
      <PostEditor post={post} category={category} />
    </div>
  );
};

export default Post;
