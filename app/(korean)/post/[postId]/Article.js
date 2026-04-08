"use client";
import { format } from "date-fns";
import ArticleContent from "./ArticleContent";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Article = ({ post, lang }) => {
  const router = useRouter();
  const isEnglish = lang === "en";
  const t = (ko, en) => (isEnglish ? en : ko);

  return (
    <main className="min-h-screen bg-[#f8f9fa] py-16 px-2 md:px-6">
      <article className="max-w-4xl mx-auto bg-white border border-gray-200 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07)] rounded-3xl overflow-hidden">
        {/* 1. HEADER: 제목 및 메타 데이터 */}
        <header className="px-6 md:px-16 pt-12 pb-10 border-b border-gray-50">
          <div className="mb-10">
            <button
              onClick={() => router.back()}
              className="group inline-flex items-center gap-2 text-gray-400 hover:text-blue-600 transition-colors"
            >
              <div className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-50 group-hover:bg-blue-50 transition-colors">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="group-hover:-translate-x-1 transition-transform"
                >
                  <path d="M19 12H5M12 19l-7-7 7-7" />
                </svg>
              </div>
              <span className="text-[11px] font-black tracking-[0.2em] uppercase">
                {t("돌아가기", "Back")}
              </span>
            </button>
          </div>

          <div className="flex items-center gap-3 mb-6">
            <span className="inline-flex items-center bg-blue-600 text-white text-[10px] font-black px-2 py-1 rounded-sm tracking-widest uppercase">
              {t("공지사항", "Notice")}
            </span>
            <div className="h-4 w-[1px] bg-gray-200" />
            <span className="text-[11px] font-bold text-gray-400 font-mono tracking-tighter">
              {format(new Date(post.created_at), "yyyy. MM. dd")}
            </span>
          </div>

          <h1 className="text-3xl md:text-4xl font-black tracking-tighter text-gray-950 leading-tight break-keep">
            {isEnglish ? post.title_en || post.title : post.title}
          </h1>
        </header>

        {/* 2. ATTACHMENTS */}
        {post.files?.length > 0 && (
          <aside className="px-6 md:px-16 py-6 bg-[#fbfbfd] border-b border-gray-50">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-1.5 h-1.5 rounded-full bg-blue-600" />
              <span className="text-[11px] font-black text-gray-900 uppercase tracking-widest">
                {t("첨부파일 모음", "Attachments")}
              </span>
              <span className="text-[10px] font-bold text-gray-300">
                ({post.files.length})
              </span>
            </div>

            <div className="flex flex-wrap gap-2">
              {post.files.map((file, index) => (
                <a
                  key={index}
                  href={`/api/post?url=${encodeURIComponent(file.url)}&name=${encodeURIComponent(file.title)}`}
                  className="flex items-center gap-3 px-4 py-2.5 bg-white border border-gray-200 rounded-xl hover:border-blue-600 hover:shadow-md transition-all group max-w-full"
                >
                  <div className="w-7 h-7 flex items-center justify-center rounded-lg bg-gray-50 text-gray-400 group-hover:bg-blue-600 group-hover:text-white transition-colors shadow-inner">
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3" />
                    </svg>
                  </div>
                  <span className="text-[13px] font-bold text-gray-600 group-hover:text-gray-950 truncate max-w-[180px] md:max-w-xs">
                    {file.title}
                  </span>
                </a>
              ))}
            </div>
          </aside>
        )}

        {/* 3. CONTENT */}
        <section className="px-6 md:px-16 py-12 min-h-[500px]">
          <div className="article-content-wrapper relative">
            <ArticleContent
              html={isEnglish ? post.post_en || post.post : post.post}
            />
          </div>
        </section>

        {/* 4. FOOTER */}
        <footer className="px-8 md:px-16 py-10 bg-gray-50/50 border-t border-gray-100 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-[10px] font-black text-gray-300 tracking-[0.5em] uppercase italic">
            Official Archive System
          </div>

          <button
            onClick={() => router.back()}
            className="group flex items-center gap-3 px-6 py-3 bg-gray-950 text-white rounded-xl font-black text-[12px] tracking-widest hover:bg-blue-600 transition-all shadow-xl shadow-gray-200"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="group-hover:-translate-x-1 transition-transform"
            >
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            {t("뒤로가기", "Back")}
          </button>
        </footer>
      </article>

      {/* <style jsx global>{`
        .article-content-wrapper .ql-container.ql-snow {
          border: none !important;
        }
        .article-content-wrapper .ql-editor {
          padding: 0 !important;
          font-size: 1.1rem !important;
          line-height: 1.9 !important;
          color: #1a1a1a !important;
          letter-spacing: -0.01em !important;
        }
        .article-content-wrapper .ql-editor p {
          margin-bottom: 1.8rem !important;
        }
        .article-content-wrapper .ql-editor img {
          border-radius: 1rem !important;
          margin: 3rem auto !important;
          box-shadow: 0 10px 30px -10px rgba(0, 0, 0, 0.1);
        }
        .article-content-wrapper .ql-editor h1,
        .article-content-wrapper .ql-editor h2 {
          font-weight: 900 !important;
          letter-spacing: -0.03em !important;
          margin-top: 3rem !important;
          margin-bottom: 1.5rem !important;
          color: #000 !important;
        }
      `}</style> */}
    </main>
  );
};

export default Article;
