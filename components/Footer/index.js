import { createServerSupabaseClient } from "@/utils/supabase/server";

const Footer = async () => {
  const supabase = await createServerSupabaseClient();
  const { data: settings } = await supabase
    .from("page_settings")
    .select("data")
    .eq("type", "main_footer")
    .single();
  const footerData = settings?.data || {};
  return (
    <footer className="mt-32 bg-gray-800 text-white py-8 px-20 flex justify-between items-center flex-col md:flex-row">
      <div className="flex-1">
        <h6 className="text-3xl font-bold">대한생활체육회</h6>

        <div className="text-xs whitespace-pre-line break-keep">
          <p className="text-sm mt-4">{`상호: (사)대한생활체육회 | 대표자명: 김균식`}</p>
          <p>고유번호 : 102-82-10135</p>
          <p>{footerData.leftText}</p>
        </div>
      </div>
      {/* <div className="flex-1">

      </div>
      <div className="flex-1"></div> */}
    </footer>
  );
};

export default Footer;
