import { createServerSupabaseClient } from "@/utils/supabase/server";
import Image from "next/image";
import MainTopicsClient from "./client";
import MobileTopics from "./mobile";

const MainTopics = async () => {
  const supabase = await createServerSupabaseClient();

  const { data } = await supabase
    .from("page_settings")
    .select("*")
    .eq("type", "main_event")
    .maybeSingle();

  if (!data) return null;
  const blocks = data.data;
  // if (!blocks || blocks.length === 0) return null;

  return (
    <>
      <div className="hidden md:block">
        <MainTopicsClient blocks={blocks} />
      </div>
      <div className="md:hidden">
        <MobileTopics blocks={blocks} />
      </div>
    </>
  );
};

export default MainTopics;
