import PurposePage from "@/app/(homepage)/(korean)/info/purpose/PurposePage";
import { createMetadata } from "@/utils/metadata";

export const metadata = createMetadata({
  title: "Mission & Purpose",
  description:
    "Introduction to the mission of KSFAA - Sports is the ultimate welfare for national health.",
  url: "/en/info/purpose",
});
export default function Purpose() {
  return <PurposePage />;
}
