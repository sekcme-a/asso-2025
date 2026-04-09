import LocationPage from "@/app/(korean)/info/location/LocationPage";
import { createMetadata } from "@/utils/metadata";

export const metadata = createMetadata({
  title: "Location & Directions",
  description:
    "Directions and location information for the KSFAA headquarters.",
  url: "/en/info/location",
});
export default function Location() {
  return <LocationPage />;
}
