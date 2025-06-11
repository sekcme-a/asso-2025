"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Buttons from "./Buttons";
import { createBrowserSupabaseClient } from "@/utils/supabase/client";

const LoginPc = () => {
  const supabase = createBrowserSupabaseClient();
  const [userId, setUserId] = useState(null);
  const [userName, setUserName] = useState("");
  const [isSubscriber, setIsSubscriber] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      const { data: sessionData } = await supabase.auth.getSession();
      const userId = sessionData?.session?.user?.id ?? null;
      setUserId(userId);

      if (userId) {
        const { data } = await supabase
          .from("subscribers")
          .select()
          .eq("user_id", userId)
          .single();
        if (data) setIsSubscriber(true);

        const { data: userData } = await supabase
          .from("profiles")
          .select("name")
          .eq("id", userId)
          .single();
        if (userData) setUserName(userData.name ?? "");
      }

      setIsLoading(false);
    };

    fetchUserData();
  }, [supabase]);

  if (isLoading) return null; // 또는 로딩 스피너 등

  return (
    <div
      className="bg-[#f6f6f6] border-blue-800
        border-[2px] rounded-lg px-5 py-5 shadow-2xl text-center
        hidden md:block
      "
    >
      <div className="">
        <div className="flex justify-center">
          <div className="w-[40%] aspect-[1/1] relative ">
            <Image
              src="/images/logo-circle.png"
              alt="대한생활체육회 로고"
              fill
            />
          </div>
        </div>

        {!userId ? (
          <h3 className="text-2xl font-bold w-64 mt-5">
            대한생활체육회 정회원
          </h3>
        ) : (
          <h3 className="text-xl font-bold w-64 mt-5">
            안녕하세요, <strong className="text-2xl">{userName}</strong> 님
          </h3>
        )}
        <h3 className="font-medium leading-tight mt-3">
          대한생활체육회의 정회원이 되어
          <br />
          여러가지 혜택을 받아보세요!
        </h3>
      </div>
      <Buttons size="small" isUser={userId} />
    </div>
  );
};

export default LoginPc;
