"use client";

import { useState } from "react";
import {
  TextField,
  Button,
  Typography,
  IconButton,
  InputAdornment,
  Collapse,
  Alert,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { createBrowserSupabaseClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";

export default function SignUpPage() {
  const supabase = createBrowserSupabaseClient();
  const router = useRouter();

  const [form, setForm] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    name: "",
    birth: "",
    phone: "",
  });
  const [error, setError] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleError = (message) => {
    // alert(message);
    setError(message);
  };

  const handleRegister = async () => {
    setError("");
    const { email, password, confirmPassword, name, birth, phone } = form;

    // === ✅ 필수 입력 검증 ===
    if (!email || !password || !confirmPassword || !name || !birth || !phone) {
      handleError("모든 항목을 입력해주세요.");
      return;
    }

    if (password.length < 6) {
      handleError("비밀번호는 6자리 이상이어야 합니다.");
      return;
    }

    if (password !== confirmPassword) {
      handleError("비밀번호와 비밀번호 재확인이 일치하지 않습니다.");
      return;
    }

    const birthRegex = /^[0-9]{6}$/;
    if (!birthRegex.test(birth)) {
      handleError("생년월일은 숫자 6자리 (예: 830520) 형식이어야 합니다.");
      return;
    }

    const yy = parseInt(birth.slice(0, 2), 10);
    const mm = parseInt(birth.slice(2, 4), 10);
    const dd = parseInt(birth.slice(4, 6), 10);

    let fullYear;
    if (yy >= 0 && yy <= 49) {
      fullYear = 2000 + yy;
    } else if (yy >= 50 && yy <= 99) {
      fullYear = 1900 + yy;
    } else {
      handleError("올바르지 않은 생년월일입니다.");
      return;
    }

    const date = new Date(fullYear, mm - 1, dd);
    if (
      isNaN(date.getTime()) ||
      date.getFullYear() !== fullYear ||
      date.getMonth() !== mm - 1 ||
      date.getDate() !== dd
    ) {
      handleError("생년월일이 올바른 날짜가 아닙니다.");
      return;
    }

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: undefined,
        data: { name, birth, phone },
      },
    });

    if (error) {
      handleError(error.message);
      return;
    }

    const user = data?.user;
    if (!user) {
      handleError("회원가입 후 사용자 정보를 가져오지 못했습니다.");
      return;
    }

    const { error: profileError } = await supabase.from("profiles").insert([
      {
        id: user.id,
        email,
        name,
        phone,
        birth,
      },
    ]);

    if (profileError) {
      handleError(`회원 정보 저장 오류: ${profileError.message}`);
      return;
    }

    alert("회원가입이 완료되었습니다.");
    router.push("/");
  };

  return (
    <div className="flex items-center justify-center w-[100vw] h-[100dvh] md:bg-[rgb(240,240,240)] ">
      <div className="max-w-md p-6 md:shadow-2xl rounded bg-white">
        <Typography variant="h5" className="mb-6 font-bold text-center">
          회원가입
        </Typography>

        <TextField
          fullWidth
          label="이메일"
          name="email"
          value={form.email}
          onChange={handleChange}
        />
        <p className="text-sm mt-0.5">*실제 사용중인 이메일을 입력해주세요.</p>
        <p className="text-xs leading-tight mb-4">
          *비밀번호 분실 시 해당 이메일로 비밀번호를 찾을 수 있습니다.
        </p>

        <TextField
          fullWidth
          label="비밀번호"
          name="password"
          type={passwordVisible ? "text" : "password"}
          value={form.password}
          onChange={handleChange}
          className="mb-4"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => setPasswordVisible(!passwordVisible)}
                  edge="end"
                >
                  {passwordVisible ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        <TextField
          fullWidth
          label="비밀번호 재확인"
          name="confirmPassword"
          type={confirmPasswordVisible ? "text" : "password"}
          value={form.confirmPassword}
          onChange={handleChange}
          className="mb-4"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() =>
                    setConfirmPasswordVisible(!confirmPasswordVisible)
                  }
                  edge="end"
                >
                  {confirmPasswordVisible ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        <TextField
          fullWidth
          label="이름"
          name="name"
          value={form.name}
          onChange={handleChange}
          className="mb-4"
        />
        <TextField
          fullWidth
          label="전화번호"
          name="phone"
          value={form.phone}
          onChange={handleChange}
          placeholder="01012345678"
        />
        <p className="text-sm mt-0.5 mb-4">
          *전화번호를 통해 모든 회원 서비스가 제공됩니다.
        </p>
        <TextField
          fullWidth
          label="생년월일 (예: 830520)"
          name="birth"
          value={form.birth}
          onChange={handleChange}
          className="mb-6"
        />

        <Collapse in={!!error}>
          <Alert severity="error" sx={{ mb: 1 }} onClose={() => setError("")}>
            {error}
          </Alert>
        </Collapse>

        <Button
          variant="contained"
          fullWidth
          onClick={handleRegister}
          className="bg-blue-600 hover:bg-blue-700"
        >
          가입하기
        </Button>
      </div>
    </div>
  );
}
