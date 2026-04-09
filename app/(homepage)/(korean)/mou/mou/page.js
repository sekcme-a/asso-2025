import { createMetadata } from "@/utils/metadata";
import MouList from "./MouList";

export const metadata = createMetadata({
  title: "협력업체",
  description: "대한생활체육회와 협력하고있는 기관들을 소개합니다.",
  url: "/mou/mou",
});

export default async function Mou({ params }) {
  const { lang } = await params;
  const isEnglish = lang === "en";

  // 번역 헬퍼 함수
  const t = (ko, en) => (isEnglish ? en : ko);

  return (
    <>
      {/* <SubHero
        breadcrumb={[
          t("협력업체", "Partners"),
          t("협력업체 현황", "Partners List"),
        ]}
        title={t("협력업체 현황", "Partners List")}
        subTitle={
          <>
            {t(
              "대한생활체육회와 함께하는 협력업체를 소개합니다.",
              "Meet our partner organizations collaborating with KSFAA",
            )}
            <br />
          </>
        }
      /> */}

      <MouList lang={lang} />
    </>
  );
}
