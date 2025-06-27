"use client";

import { createBrowserSupabaseClient } from "@/utils/supabase/client";
import { Button } from "@mui/material";
import { useRouter } from "next/navigation";
import { useState } from "react";

const Buttons = ({ size, isUser }) => {
  const router = useRouter();
  const [isLogingOut, setIsLogingOut] = useState(false);

  const handleLoginOut = async () => {
    const supabase = createBrowserSupabaseClient();

    if (isUser) {
      setIsLogingOut(true);
      await supabase.auth.signOut();
      setIsLogingOut(false);
      // router.replace(router.asPath);
      window.location.reload();
    } else router.push("/auth/login");
  };
  return (
    <div className="mt-5 md:mt-7">
      {/* <Button
        variant="contained"
        fullWidth
        className="font-bold"
        sx={{
          backgroundColor: "#6573c3", // #3f50b5보다 밝은 파란색
          "&:hover": {
            backgroundColor: "#5369b9", // hover시 약간 어두운 색
          },
        }}
        size={size}
      >
        정회원 혜택 보러가기
      </Button> */}
      <Button
        variant="contained"
        fullWidth
        className="mt-2 font-bold"
        onClick={handleLoginOut}
        size={size}
        disabled={isLogingOut}
      >
        {isUser ? "로그아웃" : isLogingOut ? "로그아웃 중" : "로그인"}
      </Button>
    </div>
  );
};

export default Buttons;
