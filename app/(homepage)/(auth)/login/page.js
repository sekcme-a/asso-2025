"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2, ArrowLeft, Eye, EyeOff } from "lucide-react";
import { createBrowserSupabaseClient } from "@/utils/supabase/client";

const getKoreanErrorMessage = (error) => {
  const msg = error.message;
  if (msg.includes("Email not confirmed"))
    return "이메일 인증이 완료되지 않았습니다. 메일함을 확인해주세요.";
  if (msg.includes("Invalid login credentials"))
    return "이메일 또는 비밀번호가 일치하지 않습니다.";
  if (msg.includes("User already registered")) return "이미 등록된 회원입니다."; // 문구 수정
  if (msg.includes("Password should be at least 6 characters"))
    return "비밀번호는 최소 6자 이상이어야 합니다.";
  if (msg.includes("Too many requests"))
    return "보안을 위해 요청이 제한되었습니다. 잠시 후 다시 시도해주세요.";
  return "처리 중 오류가 발생했습니다.";
};

export default function LoginPage() {
  const [mode, setMode] = useState("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const { groupId } = useParams();
  const router = useRouter();
  const supabase = createBrowserSupabaseClient();

  const handleAuth = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (mode === "login") {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) alert(getKoreanErrorMessage(error));
      else router.push(`/profile`);
    } else if (mode === "signup") {
      if (password !== confirmPassword) {
        alert("비밀번호 재확인이 일치하지 않습니다."); // 문구 수정
        setLoading(false);
        return;
      }

      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/${groupId}/login/callback`,
          data: { full_name: email.split("@")[0] },
        },
      });

      if (error) alert(getKoreanErrorMessage(error));
      else {
        alert(
          // "회원가입 신청이 완료되었습니다!\n입력하신 이메일로 인증 메일을 보내드렸으니 확인 부탁드립니다.", // 문구 수정
          "회원가입을 환영합니다! 지금부터 다양한 기능을 자유롭게 이용하실 수 있습니다.",
        );
        setMode("login");
      }
    }
    setLoading(false);
  };

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/update-password`,
    });
    if (error) alert(getKoreanErrorMessage(error));
    else {
      alert("비밀번호 재설정 이메일이 발송되었습니다. 메일함을 확인해주세요.");
      setMode("login");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#fafafa] p-4 font-sans">
      <motion.div
        layout
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white w-full max-w-md p-10 rounded-[2.5rem] shadow-[0_8px_40px_rgb(0,0,0,0.04)] border border-gray-100"
      >
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 mb-3">
            {mode === "login" && "대한생활체육회"}
            {mode === "signup" && "회원 가입"}
            {mode === "forgot" && "비밀번호 찾기"}
          </h1>
          <p className="text-gray-400 text-sm">
            {mode === "forgot"
              ? "등록된 이메일을 입력하시면 재설정 링크를 보내드립니다."
              : "대한생활체육회 통합 시스템"}
          </p>
        </div>

        <form
          onSubmit={mode === "forgot" ? handleForgotPassword : handleAuth}
          className="space-y-4"
        >
          <div className="space-y-1">
            <label className="text-xs font-bold text-gray-400 ml-1 uppercase">
              Email Address
            </label>
            <input
              type="email"
              placeholder="이메일 주소 입력"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full bg-gray-50/50 border border-gray-200 rounded-2xl px-5 py-4 text-[15px] outline-none focus:border-black focus:bg-white transition-all"
            />
          </div>

          {mode !== "forgot" && (
            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-400 ml-1 uppercase">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="비밀번호 입력"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full bg-gray-50/50 border border-gray-200 rounded-2xl px-5 py-4 text-[15px] outline-none focus:border-black focus:bg-white transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-black transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>
          )}

          <AnimatePresence>
            {mode === "signup" && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="space-y-1 overflow-hidden"
              >
                <label className="text-xs font-bold text-gray-400 ml-1 uppercase">
                  Confirm Password
                </label>
                <input
                  type="password"
                  placeholder="비밀번호 확인"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  className="w-full bg-gray-50/50 border border-gray-200 rounded-2xl px-5 py-4 text-[15px] outline-none focus:border-black focus:bg-white transition-all"
                />
              </motion.div>
            )}
          </AnimatePresence>

          {mode === "login" && (
            <div className="flex justify-end pr-1">
              <button
                type="button"
                onClick={() => setMode("forgot")}
                className="text-xs text-gray-400 hover:text-black transition-colors"
              >
                비밀번호를 분실하셨나요?
              </button>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-black text-white rounded-2xl py-5 font-bold text-[15px] hover:bg-gray-800 transition-all disabled:opacity-50 mt-4 shadow-lg shadow-black/5 active:scale-[0.98]"
          >
            {loading ? (
              <Loader2 className="w-5 h-5 animate-spin mx-auto" />
            ) : mode === "login" ? (
              "로그인하기"
            ) : mode === "signup" ? (
              "가입 신청하기"
            ) : (
              "메일 발송하기"
            )}
          </button>
        </form>

        <div className="mt-8 text-center space-y-3">
          {mode !== "login" ? (
            <button
              type="button"
              onClick={() => setMode("login")}
              className="flex items-center justify-center gap-2 w-full text-gray-500 text-sm hover:text-black transition-colors font-medium"
            >
              <ArrowLeft className="w-4 h-4" />
              이전 화면으로 돌아가기
            </button>
          ) : (
            <button
              type="button"
              onClick={() => setMode("signup")}
              className="text-gray-500 text-sm hover:text-black transition-colors font-medium"
            >
              아직 회원이 아니신가요?{" "}
              <span className="text-black font-bold ml-1">가입 신청</span>
            </button>
          )}
        </div>
      </motion.div>
    </div>
  );
}
