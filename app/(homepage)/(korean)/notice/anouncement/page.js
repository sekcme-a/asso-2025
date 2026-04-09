import SubHero from "../../info/components/SubHero";
import PostList from "../components/PostList";

import { createMetadata } from "@/utils/metadata";

export const metadata = createMetadata({
  title: "공지/소식사항",
  description: "대한생활체육회의 모든 공지/소식사항을 확인해보세요.",
  url: "/notice/anouncement",
});

const NoticePage = async ({ params, searchParams }) => {
  const { lang } = await params;
  const isEnglish = lang === "en";

  // 번역 헬퍼 함수
  const t = (ko, en) => (isEnglish ? en : ko);

  return (
    <>
      <SubHero
        breadcrumb={[
          t("알림마당", "News & Notice"),
          t("공지사항", "Announcements"),
        ]}
        title={t("공지사항", "Announcements")}
        subTitle={
          <>
            {t(
              "대한민국 모든 국민의 즐거운 스포츠 삶을 위한 최신 소식을 전해드립니다.",
              "We provide the latest news for the enjoyable sports life of all citizens.",
            )}
            <br />
          </>
        }
      />
      <div className="relative py-24 px-6 bg-white min-h-screen">
        <PostList
          lang={lang}
          category="anouncement"
          title={t("공지사항", "Announcements")}
          baseUrl={lang ? `/${lang}/post` : "/post"}
          searchParams={searchParams}
          itemsPerPage={10}
        />
      </div>
    </>
  );
};

export default NoticePage;
