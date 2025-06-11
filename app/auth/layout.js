import { createServerSupabaseClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

const AuthLayout = async ({ children }) => {
  const supabase = await createServerSupabaseClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    return redirect("/");
  }

  return <>{children}</>;
};

export default AuthLayout;
