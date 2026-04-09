import ChartPage from "@/app/(homepage)/(korean)/info/chart/ChartPage";
import { createMetadata } from "@/utils/metadata";
export const metadata = createMetadata({
  title: "Organization Chart",
  description: "Introduction to the central organization structure of KSFAA.",
  url: "/en/info/chart",
});
export default function Chart() {
  return <ChartPage />;
}
