import OrganizationSelectionPage from "@/app/(homepage)/(korean)/team/apply/OrganizationSelectionPage";
import { createMetadata } from "@/utils/metadata";
export const metadata = createMetadata({
  title: "Athlete Registration",
  description:
    "Registration page for athletes. Please select your affiliated organization to begin.",
  url: "/team/apply",
});

export default function ApplyPage() {
  return (
    <>
      <OrganizationSelectionPage />
    </>
  );
}
