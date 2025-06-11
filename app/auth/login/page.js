// "use client";

// import { useEffect, useState } from "react";
// import {
//   TextField,
//   Button,
//   Typography,
//   IconButton,
//   InputAdornment,
// } from "@mui/material";
// import { createBrowserSupabaseClient } from "@/utils/supabase/client";
// import { useRouter } from "next/navigation";
// import { Visibility, VisibilityOff } from "@mui/icons-material";
// import Image from "next/image";
// import { useAuth } from "@/app/providers/AuthProvider";

// export default function LoginPage() {
//   const { user } = useAuth();
//   const supabase = createBrowserSupabaseClient();
//   const router = useRouter();

//   const [form, setForm] = useState({
//     email: "",
//     password: "",
//   });
//   const [error, setError] = useState("");
//   const [passwordVisible, setPasswordVisible] = useState(false);

//   useEffect(() => {
//     console.log(user);
//     if (user) {
//       alert("이미 로그인된 상태입니다.");
//       router.push("/");
//     }
//   }, [user]);

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleError = (message) => {
//     alert(message);
//     setError(message);
//   };
//   const handleLogin = async (e) => {
//     e.preventDefault(); // form submit의 기본 동작 막기

//     const { email, password } = form;
//     const { error } = await supabase.auth.signInWithPassword({
//       email,
//       password,
//     });

//     if (error) {
//       handleError(error.message);
//     } else {
//       router.push("/"); // 예시 리디렉션 경로
//     }
//   };

//   return (
//     <div className="flex items-center justify-center w-[100vw] h-[100dvh] md:bg-[rgb(240,240,240)] ">
//       <div className="max-w-md p-6 md:shadow-2xl rounded bg-white">
//         <div className="flex justify-center items-center mb-7">
//           <div className="w-[70%] aspect-[3/1] relative">
//             <Image src="/images/logo.png" alt="대생체 로고" fill />
//           </div>
//         </div>
//         <p className="font-bold mb-4 text-xl">회원 로그인</p>

//         {/* 👇 form 태그로 감싸고 onSubmit 연결 */}
//         <form onSubmit={handleLogin}>
//           <TextField
//             fullWidth
//             label="이메일"
//             name="email"
//             value={form.email}
//             onChange={handleChange}
//           />

//           <TextField
//             fullWidth
//             label="비밀번호"
//             name="password"
//             type={passwordVisible ? "text" : "password"}
//             value={form.password}
//             onChange={handleChange}
//             className="mb-5 mt-6"
//             InputProps={{
//               endAdornment: (
//                 <InputAdornment position="end">
//                   <IconButton
//                     onClick={() => setPasswordVisible(!passwordVisible)}
//                     edge="end"
//                   >
//                     {passwordVisible ? <VisibilityOff /> : <Visibility />}
//                   </IconButton>
//                 </InputAdornment>
//               ),
//             }}
//           />

//           <Button
//             variant="contained"
//             fullWidth
//             type="submit" // 👈 Enter 키로 동작하게 하려면 꼭 필요함
//             className="bg-blue-600 hover:bg-blue-700"
//           >
//             로그인
//           </Button>
//         </form>

//         <p className="text-sm text-center mt-5 font-semibold mb-1">
//           아직 회원이 아니신가요? 회원가입하고 여러가지 혜택을 받아보세요!
//         </p>
//         <Button
//           variant="contained"
//           fullWidth
//           onClick={() => router.push("/auth/sign-in")}
//           className="mt-0"
//         >
//           회원가입
//         </Button>

//         {error && (
//           <Typography className="text-red-600 mt-1 text-center font-semibold text-sm">
//             {error}
//           </Typography>
//         )}
//       </div>
//     </div>
//   );
// }

"use client";

import { useEffect, useState } from "react";
import {
  TextField,
  Button,
  Typography,
  IconButton,
  InputAdornment,
  Alert,
  Collapse,
} from "@mui/material";
import { createBrowserSupabaseClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import Image from "next/image";
import { useAuth } from "@/app/providers/AuthProvider";

export default function LoginPage() {
  const { user } = useAuth();
  const supabase = createBrowserSupabaseClient();
  const router = useRouter();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleError = (message) => {
    setError(message);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const { email, password } = form;

    // 유효성 검사
    if (!email || !password) {
      handleError("이메일과 비밀번호를 모두 입력해주세요.");
      setLoading(false);
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      handleError("올바른 이메일 형식을 입력해주세요.");
      setLoading(false);
      return;
    }

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        switch (error.message) {
          case "Invalid login credentials":
            handleError("이메일 또는 비밀번호가 일치하지 않습니다.");
            break;
          case "Email not confirmed":
            handleError(
              "이메일 인증이 완료되지 않았습니다. 메일을 확인해주세요."
            );
            break;
          default:
            handleError("로그인 중 오류가 발생했습니다: " + error.message);
        }
      } else {
        router.push("/");
      }
    } catch (err) {
      handleError(
        "예상치 못한 오류가 발생했습니다. 잠시 후 다시 시도해주세요."
      );
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center w-[100vw] h-[100dvh] md:bg-[rgb(240,240,240)] ">
      <div className="max-w-md p-6 md:shadow-2xl rounded bg-white w-full">
        <div className="flex justify-center items-center mb-7">
          <div className="w-[70%] aspect-[3/1] relative">
            <Image src="/images/logo.png" alt="대생체 로고" fill />
          </div>
        </div>

        <Typography variant="h6" fontWeight="bold" gutterBottom>
          회원 로그인
        </Typography>

        <Collapse in={!!error}>
          <Alert severity="error" sx={{ mb: 1 }} onClose={() => setError("")}>
            {error}
          </Alert>
        </Collapse>

        <form onSubmit={handleLogin}>
          <TextField
            fullWidth
            label="이메일"
            name="email"
            value={form.email}
            onChange={handleChange}
            autoComplete="email"
            margin="normal"
            size="small"
          />

          <TextField
            fullWidth
            size="small"
            label="비밀번호"
            name="password"
            type={passwordVisible ? "text" : "password"}
            value={form.password}
            onChange={handleChange}
            autoComplete="current-password"
            margin="dense"
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
          <div className="flex justify-end">
            <Button variant="text" onClick={() => router.push("/auth/find-pw")}>
              비밀번호 찾기
            </Button>
          </div>
          <Button
            variant="contained"
            fullWidth
            type="submit"
            className="bg-blue-600 hover:bg-blue-700"
            disabled={loading}
            sx={{ mt: 1 }}
          >
            {loading ? "로그인 중..." : "로그인"}
          </Button>
        </form>

        {/* <Typography className="text-sm text-center mt-3 font-semibold mb-1">
          아직 회원이 아니신가요? 회원가입하고 여러가지 혜택을 받아보세요!
        </Typography> */}
        <Button
          variant="outlined"
          fullWidth
          onClick={() => router.push("/auth/sign-in")}
          className="mt-3"
        >
          회원가입
        </Button>
      </div>
    </div>
  );
}
