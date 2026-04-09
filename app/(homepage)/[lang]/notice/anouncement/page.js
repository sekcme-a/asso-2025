import SubHero from "@/app/(korean)/info/components/SubHero";
import PostList from "@/app/(korean)/notice/components/PostList";
import { createMetadata } from "@/utils/metadata";

export const metadata = createMetadata({
  title: "Announcements",
  description: "Check out all the latest announcements and news from KSFAA.",
  url: "/en/notice/anouncement",
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
          category="anouncement"
          title={t("공지사항", "Announcements")}
          baseUrl={lang ? `/${lang}/notice` : "/notice"}
          searchParams={searchParams}
          itemsPerPage={10}
          lang={lang}
        />
      </div>
    </>
  );
};

export default NoticePage;
