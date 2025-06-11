import { createServerSupabaseClient } from "@/utils/supabase/server";
import NoArticle from "./components/NoArticle";

const Post = async ({ params }) => {
  const { postId } = params;
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
    <div>
      <h1>Post ID: {params.id}</h1>
      <p>This is the content of the post with ID: {params.id}</p>
    </div>
  );
};

export default Post;
