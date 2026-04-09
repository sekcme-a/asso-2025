import SubHero from "../../info/components/SubHero";
import PostList from "../components/PostList";
import { createMetadata } from "@/utils/metadata";

export const metadata = createMetadata({
  title: "후원확인",
  description: `후원확인 - 대한생활체육회 후원 목록입니다.`,
  url: `/notice/sup`,
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
          t("후원확인", "Sponsorship Verification"),
        ]}
        title={t("후원확인", "Sponsorship Verification")}
        subTitle={
          <>
            {t(
              "후원 내역을 확인하고 관련 정보를 조회하실 수 있습니다.",
              "Check your sponsorship details and view related information.",
            )}
            <br />
          </>
        }
      />
      <div className="relative py-24 px-6 bg-white min-h-screen">
        <PostList
          lang={lang}
          category="support"
          title={t("후원확인", "Sponsorship Verification")}
          baseUrl={lang ? `/${lang}/post` : "/post"}
          searchParams={searchParams}
          itemsPerPage={10}
        />
      </div>
    </>
  );
};

export default NoticePage;
