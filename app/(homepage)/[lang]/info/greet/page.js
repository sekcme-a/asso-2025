import GreetingPage from "@/app/(homepage)/(korean)/info/greet/GreetingPage";
import { createMetadata } from "@/utils/metadata";
export const metadata = createMetadata({
  title: "President's Message",
  description: "A message from Gyunsik Kim, the President of KSFAA.",
  url: "/en/info/greet",
});
export default function Greet() {
  return <GreetingPage />;
}
