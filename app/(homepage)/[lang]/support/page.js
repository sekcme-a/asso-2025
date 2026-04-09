import SupportPage from "./SupportPage";
import { createMetadata } from "@/utils/metadata";

export const metadata = createMetadata({
  title: "Sponsorship Information",
  description:
    "As a designated donation organization by the Ministry of Economy and Finance, contributions to KSFAA are eligible for tax benefits.",
  url: "/en/support",
});
export default async function Support() {
  return <SupportPage />;
}
