"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

const NoArticle = () => {
  const router = useRouter();

  useEffect(() => {
    alert("존재하지 않거나 삭제된 게시물입니다.");
    router.back();
  }, []);

  return (
    <p className="w-[100vw] text-center mt-10">
      존재하지 않거나 삭제된 게시물입니다.
    </p>
  );
};

export default NoArticle;
