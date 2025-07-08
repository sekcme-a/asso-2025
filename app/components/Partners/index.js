import { createServerSupabaseClient } from "@/utils/supabase/server";
import PartnersCarousel from "./PartnersCarousel";

const Partners = async () => {
  const supabase = await createServerSupabaseClient();
  const { data } = await supabase
    .from("page_settings")
    .select("data")
    .eq("type", "mou")
    .single();

  return (
    <section className="mt-10 ">
      <PartnersCarousel
        data={[
          {
            images: ["/images/logo-tax.jpg"],
            url: "https://www.nts.go.kr/nts/main.do",
          },
          ...data.data,
        ]}
      />
    </section>
  );
};

export default Partners;
