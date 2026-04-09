import { createMetadata } from "@/utils/metadata";
import ChartPage from "./ChartPage";

export const metadata = createMetadata({
  title: "조직도",
  description: "대한생활체육회의 중앙 조직도를 소개합니다.",
  url: "/info/chart",
});

export default function Chart() {
  return <ChartPage />;
}
