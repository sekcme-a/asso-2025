import { createMetadata } from "@/utils/metadata";
import ContactPage from "../../(korean)/contact/ContactPage";

export const metadata = createMetadata({
  title: "Contact Us",
  description:
    "If you have any questions or inquiries, please feel free to contact us anytime.",
  url: "/contact",
});
export default function Page() {
  return (
    <>
      <ContactPage />
    </>
  );
}
