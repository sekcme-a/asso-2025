import { Button } from "@mui/material";
import Image from "next/image";
import Buttons from "./Buttons";
import { createServerSupabaseClient } from "@/utils/supabase/server";

const LoginMobile = async () => {
  const supabase = await createServerSupabaseClient();
  const { data } = await supabase.auth.getSession();
  const userId = data?.session?.user?.id ?? null;
  let isSubscriber = false;
  let userName = "";
  if (userId) {
    const { data } = await supabase
      .from("subscribers")
      .select()
      .eq("user_id", userId)
      .single();
    if (data) isSubscriber = true;

    const { data: userData } = await supabase
      .from("profiles")
      .select("name")
      .eq("id", userId)
      .single();
    if (userData) userName = userData.name;
  }
  return (
    <div className="py-8 px-5 flex items-center flex-col md:hidden border-b-[1px] border-b-[rgb(200,200,200)]">
      <div className="flex justify-around items-center w-full">
        <div className="w-[30%] aspect-[1/1] relative ">
          <Image src="/images/logo-circle.png" alt="대한생활체육회 로고" fill />
        </div>
        <div>
          {!userId ? (
            <h3 className="text-xl font-bold">대한생활체육회 정회원 </h3>
          ) : (
            <h3 className="text-xl font-bold">
              안녕하세요, <strong className="text-2xl">{userName}</strong> 님
            </h3>
          )}
          <h3 className="font-medium leading-tight mt-1">
            대한생활체육회의 정회원이 되어
            <br />
            여러가지 혜택을 받아보세요!
          </h3>
        </div>
      </div>
      <Buttons />
    </div>
  );
};

export default LoginMobile;
