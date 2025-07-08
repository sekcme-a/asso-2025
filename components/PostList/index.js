import { Button } from "@mui/material";
import PostPagination from "./PostPagination";
import Link from "next/link";
import PostSearch from "./PostSearch";
import Posts from "./Posts";
import Images from "./Images";
import { createServerSupabaseClient } from "@/utils/supabase/server";
import { NAVBAR_ITEM } from "@/data/navbar";

const PostList = async ({
  category,
  page = 1,
  search = "",
  isAdmin,
  pageSize = 10,
  isGallery = false,
}) => {
  const supabase = await createServerSupabaseClient();

  const target = NAVBAR_ITEM.flatMap((group) => group.items).find((item) =>
    item.link.includes(category)
  );

  const from = (page - 1) * pageSize;
  const to = from + pageSize - 1;

  let query = supabase.from("posts");

  if (isGallery)
    query = query
      .select("id, title, created_at, post", { count: "exact" })
      .eq("category", category);
  else
    query = query
      .select("id, title, created_at", { count: "exact" })
      .eq("category", category); // ✅ 필요한 필드만 선택

  if (search) {
    query = query.or(`title.ilike.%${search}%,post.ilike.%${search}%`);
  }

  query = query.order("created_at", { ascending: false }).range(from, to);

  const { data: posts, count, error } = await query;

  if (error) {
    console.error("Failed to fetch posts:", error.message);
  }

  const totalPages = count ? Math.ceil(count / pageSize) : 0;

  return (
    <>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl md:text-4xl font-bold">
          {category === "support" ? "후원확인" : target?.text || "게시글"}
        </h1>
        <p className="md:hidden text-sm">총 {count || 0}개의 게시글</p>
      </div>

      <div className="flex justify-between md:items-center">
        <p className="mb-0 hidden md:block">총 {count || 0}개의 게시글</p>
        <PostSearch category={category} initialSearch={search} />
      </div>

      {isAdmin && (
        <div className="flex justify-end mt-3">
          <Link href={`/admin/post/new?category=${category}`}>
            <Button variant="contained">+ 새 게시물</Button>
          </Link>
        </div>
      )}

      {!isGallery ? (
        <Posts posts={posts} isAdmin={isAdmin} page={page} />
      ) : (
        <Images
          posts={posts}
          isAdmin={isAdmin}
          page={page}
          isYoutubeThumbnail={category === "video"}
        />
      )}
      <PostPagination
        category={category}
        currentPage={page}
        totalPages={totalPages}
        search={search}
      />
    </>
  );
};
export default PostList;
