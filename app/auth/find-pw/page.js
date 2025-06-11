"use client";

import { useState } from "react";
import { Button, TextField, Typography, Alert, Collapse } from "@mui/material";
import { createBrowserSupabaseClient } from "@/utils/supabase/client";

const FindPw = () => {
  const supabase = createBrowserSupabaseClient();

  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const handleFindPw = async () => {
    setError("");
    setSuccessMsg("");

    if (!email) {
      setError("이메일을 입력해주세요.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("올바른 이메일 형식을 입력해주세요.");
      return;
    }

    setLoading(true);
    // const { data, error } = await supabase.auth.signInWithOtp({
    //   email: email,
    //   options: {
    //     shouldCreateUser: false,
    //     // emailRedirectTo:"exp://192.168.0.21:8081/--/(auth)/resetpw/setpw",
    //   },
    // });
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/auth/reset-pw`, // 사용자가 재설정할 페이지
    });

    if (error) {
      setError("메일 전송 중 오류가 발생했습니다. 다시 시도해주세요.");
      console.error(error);
    } else {
      setSuccessMsg(
        "비밀번호 재설정 메일이 전송되었습니다. 메일함을 확인해주세요."
      );
    }

    setLoading(false);
  };

  return (
    <div className="flex items-center justify-center w-[100vw] h-[100dvh] md:bg-[rgb(240,240,240)] ">
      <div className="max-w-md p-6 md:shadow-2xl rounded bg-white w-full">
        <Typography variant="h5" className="mb-6 font-bold text-center">
          비밀번호 찾기
        </Typography>

        <p>비밀번호를 찾고자 하는 이메일을 입력해주세요.</p>
        <p>비밀번호 재설정을 위한 이메일을 보내드리겠습니다.</p>

        <Collapse in={!!error}>
          <Alert
            severity="error"
            className="mt-4 mb-2"
            onClose={() => setError("")}
          >
            {error}
          </Alert>
        </Collapse>
        <Collapse in={!!successMsg}>
          <Alert
            severity="success"
            className="mt-4 mb-2"
            onClose={() => setSuccessMsg("")}
          >
            {successMsg}
          </Alert>
        </Collapse>

        <TextField
          fullWidth
          label="이메일"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mt-5 mb-5"
          size="small"
        />
        <Button
          variant="contained"
          fullWidth
          onClick={handleFindPw}
          disabled={loading}
          className="bg-blue-600 hover:bg-blue-700"
        >
          {loading ? "전송 중..." : "비밀번호 재설정 메일 받기"}
        </Button>
      </div>
    </div>
  );
};

export default FindPw;
