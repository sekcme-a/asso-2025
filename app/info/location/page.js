import { createMetadata } from "@/utils/metadata";
import ClientLocation from "./components/ClientLocation";

export async function generateMetadata() {
  return createMetadata({
    title: "오시는 길",
    description: "대한생활체육회로 오시는 길을 안내드립니다",
    url: "/info/location",
  });
}

const Location = () => {
  return <ClientLocation />;
};

export default Location;
