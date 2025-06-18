import Link from "next/link";

const Posts = ({ posts, isAdmin, page }) => {
  return (
    <ul className="mt-5">
      {posts?.map((post) => (
        <li
          key={post.id}
          className=" border border-gray-300 rounded hover:shadow-xl hover:border-blue-700 hover:text-blue-700 transition cursor-pointer mb-2"
        >
          <Link
            href={
              isAdmin
                ? `/admin/post/${post.id}`
                : `/post/${post.id}?page=${page ?? 0}`
            }
          >
            <article className="md:flex justify-between items-center p-4 break-keep">
              <h2 className="text-lg md:text-xl font-semibold leading-tight line-clamp-2">
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
  );
};

export default Posts;
