"use client";

import { createBrowserSupabaseClient } from "@/utils/supabase/client";
import {
  TextField,
  Button,
  Typography,
  IconButton,
  InputAdornment,
  Collapse,
  Alert,
} from "@mui/material";
import { useState } from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useRouter } from "next/navigation";

const ResetPw = () => {
  const supabase = createBrowserSupabaseClient();
  // const searchParams = useSearchParams();
  const router = useRouter();
  const [form, setForm] = useState({
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

  const handleError = (message) => {
    // alert(message);
    setError(message);
  };
  const handlePwUpdate = async () => {
    setError("");
    const { password, confirmPassword } = form;

    if (password.length < 6) {
      handleError("비밀번호는 6자리 이상이어야 합니다.");
      return;
    }

    if (password !== confirmPassword) {
      handleError("비밀번호와 비밀번호 재확인이 일치하지 않습니다.");
      return;
    }
    const { data, error } = await supabase.auth.updateUser({
      password: password,
    });

    if (error) {
      handleError(error.message);
      return;
    }

    alert("비밀번호가 재설정되었습니다. 해당 아이디로 로그인합니다.");
    router.replace("/");
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <div className="flex items-center justify-center w-[100vw] h-[100dvh] md:bg-[rgb(240,240,240)] ">
      <div className="max-w-md p-6 md:shadow-2xl rounded bg-white">
        <Typography variant="h5" className="mb-6 font-bold text-center">
          비밀번호 재설정
        </Typography>

        <p>새로운 비밀번호를 입력해주세요.</p>

        <TextField
          fullWidth
          size="small"
          label="비밀번호"
          name="password"
          type={passwordVisible ? "text" : "password"}
          value={form.password}
          onChange={handleChange}
          className="mb-4 mt-4"
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
          size="small"
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

        <Collapse in={!!error}>
          <Alert severity="error" sx={{ mb: 1 }} onClose={() => setError("")}>
            {error}
          </Alert>
        </Collapse>

        <Button
          variant="contained"
          fullWidth
          onClick={handlePwUpdate}
          className="bg-blue-600 hover:bg-blue-700"
        >
          비밀번호 변경
        </Button>
      </div>
    </div>
  );
};

export default ResetPw;
