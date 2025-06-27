"use client";

import { useState } from "react";
import { Button, TextField, Typography, Alert, Collapse } from "@mui/material";
import { createBrowserSupabaseClient } from "@/utils/supabase/client";

const FindPw = () => {
  const supabase = createBrowserSupabaseClient();

  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const handleFindPw = async () => {
    setError("");
    setSuccessMsg("");

    if (!phone) {
      setError("전화번호를 입력해주세요.");
      return;
    }

    const cleanPhone = phone.replace(/[^0-9]/g, "");

    if (!/^010\d{7,8}$/.test(cleanPhone)) {
      setError("올바른 전화번호 형식입니다. 예: 01012345678");
      return;
    }

    setLoading(true);

    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .select("email")
      .eq("phone", cleanPhone)
      .limit(1)
      .single();

    if (profileError || !profile?.email) {
      setError("해당 전화번호로 등록된 사용자를 찾을 수 없습니다.");
      setLoading(false);
      return;
    }

    const email = profile.email;

    const { error: resetError } = await supabase.auth.resetPasswordForEmail(
      email,
      {
        redirectTo: `${window.location.origin}/auth/reset-pw`,
      }
    );

    if (resetError) {
      console.error(resetError);
      setError("메일 전송 중 오류가 발생했습니다. 다시 시도해주세요.");
    } else {
      setSuccessMsg(
        `비밀번호 재설정 메일이 ${email} 주소로 전송되었습니다. 메일함을 확인해주세요.`
      );
    }

    setLoading(false);
  };

  return (
    <div className="flex items-center justify-center w-[100vw] h-[100dvh] md:bg-[rgb(240,240,240)]">
      <div className="max-w-md p-6 md:shadow-2xl rounded bg-white w-full">
        <Typography variant="h5" className="mb-6 font-bold text-center">
          비밀번호 찾기
        </Typography>

        <p>회원가입 시 등록한 전화번호를 입력해주세요.</p>
        <p>연결된 이메일로 비밀번호 재설정 링크를 보내드립니다.</p>

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
          label="전화번호"
          name="phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value.replace(/[^0-9\-]/g, ""))}
          placeholder="010-1234-5678"
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
