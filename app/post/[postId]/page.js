import { createServerSupabaseClient } from "@/utils/supabase/server";
import NoArticle from "./components/NoArticle";
import HeadBanner from "@/app/notice/[category]/[page]/components/HeadBanner";
import PcLeftNavbar from "@/components/PcLeftNavbar";
import Article from "./components/Ariticle";
import BottomNav from "./components/BottomNav";

const Post = async ({ params, searchParams }) => {
  const { postId } = params;
  const { page } = searchParams;
  const supabase = await createServerSupabaseClient();

  const { data: post, error } = await supabase
    .from("posts")
    .select("*")
    .eq("id", postId)
    .single();
  if (error) {
    console.error("Error fetching post:", error);
    return <NoArticle />;
  }

  return (
    <>
      <HeadBanner category={post.category} />

      <div className="flex px-3 md:px-5 lg:px-32 mt-9">
        <section className="w-48 hidden md:block">
          <PcLeftNavbar group="알림마당" category={post.category} />
        </section>
        <div className="flex-1 md:ml-14 ">
          <Article post={post} />
          <BottomNav page={page} category={post.category} postId={postId} />
        </div>
      </div>
    </>
  );
};

export default Post;
