"use client";

import { createBrowserSupabaseClient } from "@/utils/supabase/client";
import React, { useEffect, useState } from "react";
import ReactPlayer from "react-player/lazy";

const Video = () => {
  const INITIAL_URL = "https://www.youtube.com/watch?v=-Gh3OUIO2WA";
  const [url, setUrl] = useState(INITIAL_URL);
  const [mute, setMute] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    const supabase = createBrowserSupabaseClient();
    const { data, error } = await supabase
      .from("page_settings")
      .select("data")
      .eq("type", "main_video")
      .maybeSingle();

    if (
      data &&
      data?.data?.url?.includes("https") &&
      data?.data?.url !== INITIAL_URL
    ) {
      setUrl(data.data.url);
    }
  };

  const onMouseEnter = () => {
    setMute(false);
  };

  const onMouseLeave = () => {
    setMute(true);
  };

  return (
    <section
      aria-label="대한생활체육회 소개 영상"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className="
        w-full overflow-hidden flex justify-center items-center
        border-t-2 border-b-2 cursor-pointer transition-all duration-1000
        h-[250px] hover:h-[500px]
      "
    >
      <ReactPlayer
        url={url}
        playing={true}
        muted={mute}
        controls
        light={false}
        pip={false}
        width="100%" // 이렇게 prop으로 전달해야 반영됨
        height="500px" // 마찬가지로 여기도 prop으로
        loop={true}
        className="!z-[1] !cursor-pointer"
      />
    </section>
  );
};

export default Video;
