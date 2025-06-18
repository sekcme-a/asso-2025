"use client";
import { Button } from "@mui/material";
import { useRouter } from "next/navigation";

import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import ArrowBackIosNewOutlinedIcon from "@mui/icons-material/ArrowBackIosNewOutlined";
import ArrowForwardIosOutlinedIcon from "@mui/icons-material/ArrowForwardIosOutlined";
import { useEffect } from "react";
import { createBrowserSupabaseClient } from "@/utils/supabase/client";
import { useState } from "react";
const BottomNav = ({ page, category, postId }) => {
  const router = useRouter();

  const [nextPostId, setNextPostId] = useState(null);
  const [prevPostId, setPrevPostId] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    const supabase = createBrowserSupabaseClient();
    const { data } = await supabase
      .from("posts")
      .select("id")
      .eq("category", category)
      .gt("id", postId)
      .order("id", { ascending: true })
      .limit(1);
    setNextPostId(data.length > 0 ? data[0].id : null);
    const { data: prevData } = await supabase
      .from("posts")
      .select("id")
      .eq("category", category)
      .lt("id", postId)
      .order("id", { ascending: false })
      .limit(1);
    setPrevPostId(prevData.length > 0 ? prevData[0].id : null);
  };

  const handleGotoList = () => {
    if (page) router.push(`/notice/${category}/${page}`);
    else router.push(`/notice/${category}/1`);
  };

  const handleBackPostClick = () => {
    router.push(`/post/${prevPostId}?page=${page ?? 1}`);
  };

  const handleFrontPostClick = () => {
    router.push(`/post/${nextPostId}?page=${page ?? 1}`);
  };
  return (
    <div className="flex justify-between mt-5 p-5 border-t-[2px] border-t-gray-800 ">
      <Button
        onClick={handleBackPostClick}
        variant="contained"
        className="md:px-7 lg:px-15"
        disabled={!prevPostId}
        startIcon={<ArrowBackIosNewOutlinedIcon style={{ fontSize: "1rem" }} />}
        sx={{
          backgroundColor: "#6573c3", // #3f50b5보다 밝은 파란색
          "&:hover": {
            backgroundColor: "#5369b9", // hover시 약간 어두운 색
          },
        }}
      >
        이전
      </Button>

      <Button
        onClick={handleGotoList}
        variant="contained"
        className="md:px-7 lg:px-15"
        startIcon={<FormatListBulletedIcon />}
      >
        목록으로
      </Button>

      <Button
        onClick={handleFrontPostClick}
        variant="contained"
        className="md:px-7 lg:px-15"
        disabled={!nextPostId}
        endIcon={<ArrowForwardIosOutlinedIcon style={{ fontSize: "1rem" }} />}
        sx={{
          backgroundColor: "#6573c3", // #3f50b5보다 밝은 파란색
          "&:hover": {
            backgroundColor: "#5369b9", // hover시 약간 어두운 색
          },
        }}
      >
        다음
      </Button>
    </div>
  );
};

export default BottomNav;
