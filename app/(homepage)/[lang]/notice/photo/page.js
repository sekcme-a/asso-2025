import SubHero from "@/app/(homepage)/(korean)/info/components/SubHero";
import MediaList from "@/app/(homepage)/(korean)/notice/media/MediaList";
import { createMetadata } from "@/utils/metadata";

export const metadata = createMetadata({
  title: "Photo Gallery",
  description:
    "Photo Gallery - View the activity photos and event galleries of KSFAA.",
  url: "/en/notice/photo",
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
          t("포토갤러리", "Photo Gallery"),
        ]}
        title={t("포토갤러리", "Photo Gallery")}
        subTitle={
          <>
            {t(
              "대한생활체육회의 활기찬 활동 현장과 주요 행사의 소중한 순간들을 사진으로 만나보세요.",
              "Experience the vibrant scenes and precious moments of the Korea Sports Council for All through our photo collection.",
            )}
            <br />
          </>
        }
      />
      <PhotoList {...{ searchParams }} lang={lang} />
    </>
  );
}
