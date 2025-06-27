import { NAVBAR_ITEM } from "@/data/navbar";
import { formatToYMD } from "@/utils/supabase/formatDate";
import { createServerSupabaseClient } from "@/utils/supabase/server";
import Link from "next/link";

const colorMap = {
  green: {
    bg: "bg-green-800",
    text: "text-green-800",
    hover: "group-hover/first:text-green-800",
    hoverRecent: "group-hover/recent:text-green-800",
  },
  blue: {
    bg: "bg-blue-800",
    text: "text-blue-800",
    hover: "group-hover/first:text-blue-800",
    hoverRecent: "group-hover/recent:text-blue-800",
  },
  red: {
    bg: "bg-red-800",
    text: "text-red-800",
    hover: "group-hover/first:text-red-800",
    hoverRecent: "group-hover/recent:text-red-800",
  },
  // 필요에 따라 색상 추가 가능
};

const List = async ({ category, color = "green" }) => {
  const supabase = await createServerSupabaseClient();

  const appliedColor = colorMap[color] ?? colorMap.green;

  // 첫 번째 게시글 가져오기
  let firstQuery = supabase
    .from("posts")
    .select("title, post, id, created_at")
    .order("created_at", { ascending: false })
    .limit(1)
    .single();

  if (category) {
    firstQuery = firstQuery.eq("category", category);
  }

  const { data: firstPost } = await firstQuery;

  const date = new Date(firstPost.created_at);
  const yearMonth = `${date.getFullYear()}.${String(
    date.getMonth() + 1
  ).padStart(2, "0")}`;
  const day = String(date.getDate()).padStart(2, "0");
  const plainText = firstPost.post
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<\/p>/gi, "\n")
    .replace(/<[^>]+>/g, "")
    .replace(/\n{2,}/g, "\n")
    .replace(/&nbsp;/g, "")
    .trim();

  // 최근 게시글 4개 (첫 게시글 제외)
  let recentQuery = supabase
    .from("posts")
    .select("title, created_at, id, category")
    .order("created_at", { ascending: false })
    .range(1, 4);

  if (category) {
    recentQuery = recentQuery.eq("category", category);
  }

  const { data: recentPosts } = await recentQuery;

  const getCategoryTextById = (categoryId) => {
    for (const item of NAVBAR_ITEM) {
      if (!item.items) continue;

      for (const subItem of item.items) {
        const match = subItem.link.match(/^\/notice\/([^/]+)\/1$/);
        if (match && match[1] === categoryId) {
          return subItem.text;
        }
      }
    }

    return null;
  };

  return (
    <div className="shadow-xl border-gray-100 border-[1px] mt-4 p-3 md:p-5 rounded-md bg-white">
      <div className="flex items-center">
        <div
          className={`rounded-xl p-2 md:p-3 flex items-center justify-center aspect-square text-white ${appliedColor.bg}`}
        >
          <div>
            <p className="text-center text-sm leading-tight">{yearMonth}</p>
            <p className="text-center font-bold text-xl leading-tight">{day}</p>
          </div>
        </div>
        <article className="flex-1 ml-5 cursor-pointer group/first">
          <p
            className={`font-semibold md:text-lg transition-all line-clamp-1 ${appliedColor.hover}`}
          >
            {firstPost.title}
          </p>
          <p
            className={`text-gray-600 text-sm line-clamp-2 leading-snug mt-1 transition-all ${appliedColor.hover}`}
          >
            {plainText}
          </p>
        </article>
      </div>

      <div className="flex mt-4">
        <ul className="hidden md:block mr-5">
          {recentPosts?.map((post, index) => (
            <li key={index} className="py-1">
              <p className={`text-center ${appliedColor.text}`}>
                {getCategoryTextById(post.category)}
              </p>
            </li>
          ))}
        </ul>
        <ul className="flex-1">
          {recentPosts?.map((post, index) => (
            <li key={index} className="group/recent py-1">
              <Link href={`post/${post.id}`} className="flex items-center ">
                <p
                  className={`text-sm md:text-base flex-1 mr-5 line-clamp-1 ${appliedColor.hoverRecent}`}
                >
                  {post.title}
                </p>
                <p
                  className={`text-xs md:text-sm text-gray-500 ${appliedColor.hoverRecent}`}
                >
                  {formatToYMD(post.created_at)}
                </p>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default List;
