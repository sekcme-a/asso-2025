import { createMetadata } from "@/utils/metadata";
import SchedulePage from "./SchedulePage";
export const metadata = createMetadata({
  title: "대회/행사 일정",
  description:
    "대회 및 행사 일정을 한눈에 확인할 수 있는 페이지입니다. 달력과 리스트로 편리하게 일정을 관리하세요.",
  url: "/team/schedule",
});
export default function Page() {
  return <SchedulePage />;
}
