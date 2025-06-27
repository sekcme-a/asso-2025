import Images from "@/components/PostList/Images";
import { createServerSupabaseClient } from "@/utils/supabase/server";
import Link from "next/link";
import AddIcon from "@mui/icons-material/Add";
import MoreButton from "../public/MoreButton";

const PhotoZone = async () => {
  const supabase = await createServerSupabaseClient();
  const { data } = await supabase
    .from("posts")
    .select("id, title, created_at, post")
    .eq("category", "photo")
    .order("created_at", { ascending: false })
    .range(0, 7);

  return (
    <section aria-label="포토존" className="py-15 md:py-20">
      <div className="flex justify-between">
        <h5 className="text-2xl font-bold">포토갤러리</h5>
        <MoreButton url="/notice/photo/1" />
      </div>
      <Images posts={data} />
    </section>
  );
};

export default PhotoZone;
