import SubHero from "@/app/(korean)/info/components/SubHero";
import PostList from "@/app/(korean)/notice/components/PostList";

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
          t("자료실", "Archive Library"),
        ]}
        title={t("자료실", "Archive & Resources")}
        subTitle={
          <>
            {t(
              "대한생활체육회의 각종 규정, 서식 및 주요 활동 자료를 확인하고 다운로드하실 수 있습니다.",
              "Access and download various regulations, forms, and key activity materials",
            )}
            <br />
          </>
        }
      />
      <div className="relative py-24 px-6 bg-white min-h-screen">
        <PostList
          lang={lang}
          category="reference"
          title={t("자료실", "Archive")}
          baseUrl={lang ? `/${lang}/post` : "/post"}
          searchParams={searchParams}
          itemsPerPage={10}
        />
      </div>
    </>
  );
};

export default NoticePage;
