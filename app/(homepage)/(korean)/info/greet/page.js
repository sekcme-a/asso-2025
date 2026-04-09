import { createMetadata } from "@/utils/metadata";
import GreetingPage from "./GreetingPage";

export const metadata = createMetadata({
  title: "총재 인사말",
  description: "대한생활체육회 총재 김균식의 인사말입니다.",
  url: "/info/greet",
});
export default function Greet() {
  return <GreetingPage />;
}
