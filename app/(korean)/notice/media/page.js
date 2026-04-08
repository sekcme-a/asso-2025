import SubHero from "../../info/components/SubHero";
import PostList from "../components/PostList";
import MediaList from "./MediaList";

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
          t("언론보도", "Press & Release"),
        ]}
        title={t("언론보도", "Press & Release")}
        subTitle={
          <>
            {t(
              "대한생활체육회의 주요 소식과 공식 언론보도를 확인하실 수 있습니다.",
              "Check the latest news and official media coverage from the Korea Life Sports Association.",
            )}
            <br />
          </>
        }
      />
      {/* <div className="relative py-24 px-6 bg-white min-h-screen">
        <PostList
          category="anouncement"
          title={t("공지사항", "Announcements")}
          baseUrl={lang ? `/${lang}/notice` : "/notice"}
          searchParams={searchParams}
          itemsPerPage={10}
        />
      </div> */}
      <MediaList {...{ searchParams }} lang={lang} />
    </>
  );
};

export default NoticePage;
