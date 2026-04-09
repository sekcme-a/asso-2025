import SubHero from "@/app/(korean)/info/components/SubHero";
import PostList from "@/app/(korean)/notice/components/PostList";
import { createMetadata } from "@/utils/metadata";

export const metadata = createMetadata({
  title: "Events & Competition Schedule",
  description:
    "Check out the full schedule of upcoming competitions and events hosted by KSFAA.",
  url: "/en/notice/schedule",
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
          t("알림마당", "News & Media"),
          t("대회/행사일정", "Event Schedule"),
        ]}
        title={t("대회 및 행사 일정", "Event Schedule")}
        subTitle={
          <>
            {t(
              "대한생활체육회가 주관하는 다양한 대회와 생생한 행사 소식을 전해드립니다.",
              "Stay updated with the latest tournaments and cultural events hosted by the Korea Sports Council for All.",
            )}
            <br />
          </>
        }
      />
      <div className="relative py-24 px-6 bg-white min-h-screen">
        <PostList
          lang={lang}
          category="schedule"
          // 리스트 섹션의 제목을 '공지사항'보다 더 구체적으로 변경했습니다.
          title={t("대회 및 행사일정", "Event Schedule")}
          baseUrl={lang ? `/${lang}/post` : "/post"}
          searchParams={searchParams}
          itemsPerPage={10}
        />
      </div>
    </>
  );
};

export default NoticePage;
