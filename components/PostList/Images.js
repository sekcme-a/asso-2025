import Link from "next/link";

const Images = ({
  posts,
  isAdmin,
  page,
  isYoutubeThumbnail,
  customGridCols,
}) => {
  return (
    <ul
      className={`mt-6 md:mt-6 grid gap-3 ${
        customGridCols
          ? customGridCols
          : isYoutubeThumbnail
          ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
          : "grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
      }`}
    >
      {posts?.map((post, index) => {
        const content = post.post || "";

        let src = null;
        if (!isYoutubeThumbnail) {
          // 1) firebase 스토리지 이미지 URL 추출 시도
          const firebaseMatch = content.match(
            /https:\/\/firebasestorage\.googleapis\.com\/[^"]+/
          );
          src = firebaseMatch?.[0] ?? null;
        } else {
          // 2) 유튜브 iframe src 추출 시도
          const iframeMatch = content.match(/<iframe[^>]+src="([^"]+)"/);
          let youtubeThumbnail = null;
          if (iframeMatch) {
            const src = iframeMatch[1];
            const videoIdMatch = src.match(/\/embed\/([^?\s]+)/);
            if (videoIdMatch) {
              const videoId = videoIdMatch[1];
              youtubeThumbnail = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
            }
          }
          src = youtubeThumbnail;
        }

        return (
          <li
            key={index}
            className={`relative overflow-hidden 
          ${
            isYoutubeThumbnail
              ? "aspect-[16/9]"
              : "aspect-[5/6] md:aspect-square"
          }  group cursor-pointer rounded-md`}
          >
            <Link
              href={
                isAdmin
                  ? `/admin/post/${post.id}`
                  : `/post/${post.id}?page=${page ?? 0}`
              }
            >
              <img
                src={src}
                alt={post.title}
                className="w-full h-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-110"
              />

              {/* 📱 모바일: 하단 고정 텍스트 */}
              <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white p-2 sm:hidden">
                <p className="text-sm font-medium line-clamp-2">{post.title}</p>
                <p className="text-xs mt-1">
                  {new Date(post.created_at).toLocaleDateString("ko-KR", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              </div>

              {/* 💻 데스크탑: hover 시 전체 오버레이 */}
              <div className="absolute inset-0 hidden sm:flex flex-col items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <p className="text-white xl:text-lg leading-snug font-semibold text-center px-2 break-keep">
                  {post.title}
                </p>
                <p className="text-white text-sm mt-2">
                  {new Date(post.created_at).toLocaleDateString("ko-KR", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              </div>
            </Link>
          </li>
        );
      })}
    </ul>
  );
};

export default Images;
