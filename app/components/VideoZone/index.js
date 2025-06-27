import Images from "@/components/PostList/Images";
import { createServerSupabaseClient } from "@/utils/supabase/server";
import Link from "next/link";
import AddIcon from "@mui/icons-material/Add";
import MoreButton from "../public/MoreButton";

const VideoZone = async () => {
  const supabase = await createServerSupabaseClient();
  const { data } = await supabase
    .from("posts")
    .select("id, title, created_at, post")
    .eq("category", "video")
    .order("created_at", { ascending: false })
    .range(0, 3);

  return (
    <section aria-label="포토존" className="py-5">
      <div className="flex justify-between">
        <h5 className="text-2xl font-bold">동영상갤러리</h5>
        <MoreButton url="/notice/video/1" />
      </div>
      <Images
        posts={data}
        isYoutubeThumbnail={true}
        customGridCols="grid-cols-1 md:grid-cols-2 lg:grid-cols-4"
      />
    </section>
  );
};

export default VideoZone;
