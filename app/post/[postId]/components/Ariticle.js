import ArticleContent from "./ArticleContent";

const Article = ({ post }) => {
  return (
    <section>
      <h1 className="text-2xl font-bold">{post.title}</h1>
      <h2 className="mt-1 text-sm">
        작성일: {new Date(post.created_at).toLocaleDateString()}
      </h2>

      {post.files?.length > 0 && (
        <ul className="mt-4">
          {post.files.map((file, index) => (
            <li key={index} className="my-0.5">
              <a
                href={`/api/post?url=${encodeURIComponent(
                  file.url
                )}&name=${encodeURIComponent(file.title)}`}
                className="text-blue-600 hover:underline"
              >
                📎 {file.title}
              </a>
            </li>
          ))}
        </ul>
      )}
      <div
        className="prose prose-neutral max-w-none hidden"
        dangerouslySetInnerHTML={{ __html: post.post }}
      />
      <div className="mt-5">
        <ArticleContent html={post.post} />
      </div>
    </section>
  );
};

export default Article;
