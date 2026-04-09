import SubHero from "@/app/(homepage)/(korean)/info/components/SubHero";
import MediaList from "@/app/(homepage)/(korean)/notice/media/MediaList";
import { createMetadata } from "@/utils/metadata";

export const metadata = createMetadata({
  title: "Media Coverage",
  description: "Check out the latest news and media coverage of KSFAA.",
  url: "/en/notice/media",
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
      <MediaList {...{ searchParams }} lang={lang} />
    </>
  );
};

export default NoticePage;
