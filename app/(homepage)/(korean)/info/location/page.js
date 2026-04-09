import LocationPage from "./LocationPage";

import { createMetadata } from "@/utils/metadata";
export const metadata = createMetadata({
  title: "오시는 길",
  description: "대한생활체육회로 오시는 길을 안내드립니다",
  url: "/info/location",
});

export default function Location() {
  return <LocationPage />;
}
