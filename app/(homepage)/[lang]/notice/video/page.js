import SubHero from "@/app/(homepage)/(korean)/info/components/SubHero";
import { createMetadata } from "@/utils/metadata";
export const metadata = createMetadata({
  title: "동영상갤러리",
  description: `동영상갤러리 - 대한생활체육회의 활동 영상자료 모음입니다.`,
  url: `/notice/video`,
});
export default async function Photo({ params, searchParams }) {
  const { lang } = await params;
  const isEnglish = lang === "en";

  // 번역 헬퍼 함수
  const t = (ko, en) => (isEnglish ? en : ko);
  return (
    <>
      <SubHero
        breadcrumb={[
          t("알림마당", "News & Media"),
          t("동영상갤러리", "Video Gallery"),
        ]}
        title={t("동영상갤러리", "Video Gallery")}
        subTitle={
          <>
            {t(
              "대한생활체육회의 활기찬 활동 현장과 주요 행사의 소중한 순간들을 동영상으로 만나보세요.",
              "Experience the vibrant scenes and precious moments of the Korea Sports Council for All through our video collection.",
            )}
            <br />
          </>
        }
      />
      <VideoList {...{ searchParams }} lang={lang} />
    </>
  );
}
