import { createMetadata } from "@/utils/metadata";
import SchedulePage from "@/app/(homepage)/(korean)/team/schedule/SchedulePage";

export const metadata = createMetadata({
  title: "Events & Competitions Schedule",
  description:
    "View all competition and event schedules at a glance. Manage your schedule easily with our calendar and list views.",
  url: "/team/schedule",
});
export default function Page() {
  return <SchedulePage />;
}
