import { createMetadata } from "@/utils/metadata";
import ContactPage from "./ContactPage";

export const metadata = createMetadata({
  title: "문의하기",
  description: "궁금한 사항이나 문의사항이 있으시면 언제든지 문의해 주세요.",
  url: "/contact",
});
export default function Page() {
  return (
    <>
      <ContactPage />
    </>
  );
}
