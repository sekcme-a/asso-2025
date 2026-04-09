import { createMetadata } from "@/utils/metadata";
import SupportPage from "./SupportPage";

export const metadata = createMetadata({
  title: "후원안내",
  description:
    "대한생활체육회는 기획재정부 지정기부금단체로서 기부금은 지정기부금에 해당되어 세제상의 혜택을 받을 수 있습니다.",
  url: "/support",
});

export default async function Support() {
  return <SupportPage />;
}
