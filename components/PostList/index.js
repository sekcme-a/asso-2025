import { NAVBAR_ITEM } from "@/data/navbar";
import { createServerSupabaseClient } from "@/utils/supabase/server";
import PostSearch from "./PostSearch";
import PostPagination from "./PostPagination";
import Link from "next/link";

const PAGE_SIZE = 10;

const PostList = async ({ category, page = 1, search = "" }) => {
  const supabase = await createServerSupabaseClient();

  const target = NAVBAR_ITEM.flatMap((group) => group.items).find((item) =>
    item.link.includes(category)
  );

  const from = (page - 1) * PAGE_SIZE;
  const to = from + PAGE_SIZE - 1;

  let query = supabase
    .from("posts")
    .select("*", { count: "exact" })
    .eq("category", category);

  if (search) {
    query = query.or(`title.ilike.%${search}%,post.ilike.%${search}%`);
  }

  query = query.order("created_at", { ascending: false }).range(from, to);

  const { data: posts, count, error } = await query;

  if (error) {
    console.error("Failed to fetch posts:", error.message);
  }

  const totalPages = count ? Math.ceil(count / PAGE_SIZE) : 0;

  return (
    <>
      <div className="flex justify-between items-center mb-8">
        <h4 className="text-2xl md:text-4xl font-bold">
          {target?.text || "게시글"}
        </h4>
        <p className="md:hidden text-sm">총 {count || 0}개의 게시글</p>
      </div>

      <div className="flex justify-between md:items-center">
        <p className="mb-0 hidden md:block">총 {count || 0}개의 게시글</p>
        <PostSearch category={category} initialSearch={search} />
      </div>

      <ul className="mt-5">
        {posts?.map((post) => (
          <li
            key={post.id}
            className=" border border-gray-300 rounded hover:shadow-xl hover:border-blue-700 hover:text-blue-700 transition cursor-pointer mb-2"
          >
            <Link href={`/notice/post/${post.id}`}>
              <article className="flex justify-between items-center p-4">
                <h2 className="text-xl font-semibold leading-tight line-clamp-2">
                  {post.title}
                </h2>
                <p className="text-sm text-gray-500 mt-1">
                  작성일:{" "}
                  <time dateTime={post.created_at}>
                    {new Date(post.created_at).toLocaleDateString()}
                  </time>
                </p>
              </article>
            </Link>
          </li>
        ))}
      </ul>

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
