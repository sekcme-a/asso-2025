import PurposePage from "./PurposePage";
import { createMetadata } from "@/utils/metadata";
export const metadata = createMetadata({
  title: "설립목적",
  description:
    "대한생활체육회의 설립목적을 소개합니다 - 스포츠가 최고의 국민건강 복지다.",
  url: "/info/purpose",
});
export default function Purpose() {
  return <PurposePage />;
}
