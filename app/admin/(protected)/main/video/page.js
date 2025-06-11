"use client";

import { createBrowserSupabaseClient } from "@/utils/supabase/client";
import { Button, TextField } from "@mui/material";
import { useEffect } from "react";
import { useState } from "react";

const Video = () => {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    try {
      const supabase = createBrowserSupabaseClient();
      const { data, error } = await supabase
        .from("page_settings")
        .select("data")
        .eq("type", "main_video")
        .single();

      if (error) {
        console.error("비디오 URL 조회 실패:", error);
      } else {
        setUrl(data?.data?.url || "");
      }
    } catch (error) {
      console.error("비디오 URL 조회 중 오류 발생:", error);
    }
  };

  const handleSave = async () => {
    if (!url) {
      alert("비디오 URL을 입력해주세요.");
      return;
    }

    setLoading(true);
    try {
      const supabase = createBrowserSupabaseClient();
      const { error } = await supabase
        .from("page_settings")
        .update({ type: "main_video", data: { url: url } })
        .eq("type", "main_video");
      if (error) throw error;
      alert("비디오 URL이 저장되었습니다.");
    } catch (error) {
      console.error("비디오 URL 저장 실패:", error);
      alert("비디오 URL 저장에 실패했습니다.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-10 ">
      <TextField
        label="비디오 URL"
        variant="outlined"
        fullWidth
        size="small"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        style={{ marginBottom: "20px" }}
        helperText="비디오 URL을 입력하세요. 예: https://www.youtube.com/watch?v=example"
      />
      <Button
        variant="contained"
        color="primary"
        onClick={handleSave}
        disabled={loading}
        fullWidth
      >
        {loading ? "저장 중..." : "저장"}
      </Button>
    </div>
  );
};

export default Video;
