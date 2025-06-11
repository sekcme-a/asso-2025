import { createServerSupabaseClient } from "@/utils/supabase/server";
import Link from "next/link";

const Footer = async () => {
  const supabase = await createServerSupabaseClient();
  const { data: settings } = await supabase
    .from("page_settings")
    .select("data")
    .eq("type", "main_footer")
    .single();

  const footerData = settings?.data || {};

  return (
    <footer
      className="mt-32 bg-gray-800 text-white py-8 px-10 md:px-20"
      aria-label="사이트 푸터"
    >
      <div className="flex flex-col md:flex-row justify-between items-end gap-8 h-full relative ">
        {/* 회사 정보 영역 */}
        <section className="flex-2" aria-label="기관 정보">
          <h2 className="text-3xl font-bold text-center md:text-start">
            대한생활체육회
          </h2>
          <address className="not-italic text-sm whitespace-pre-line break-keep mt-4 text-center md:text-start">
            {footerData.leftText && <p>{footerData.leftText}</p>}
            {footerData.location && <p>주소: {footerData.location}</p>}
            <div className="md:flex ">
              {footerData.phone && (
                <p>
                  전화:{" "}
                  <a href={`tel:${footerData.phone}`}>{footerData.phone}</a>
                </p>
              )}
              {footerData.mail && (
                <p className="md:ml-3">
                  이메일:{" "}
                  <a href={`mailto:${footerData.mail}`}>{footerData.mail}</a>
                </p>
              )}
            </div>
          </address>

          <p className="mt-2 text-sm text-center md:text-start">
            대한생활체육회 © 2025
          </p>
        </section>

        {/* 정책 링크 영역 */}
        <nav className="flex-1 w-full" aria-label="법적 고지 및 정책">
          <ul className="text-end flex items-center justify-center w-full md:justify-end text-sm md:text-base">
            <li className="px-3">
              <Link href="/terms">이용약관</Link>
            </li>
            <div className="h-3 w-[1px] bg-gray-300" />
            <li className="px-3">
              <Link href="/privacy">개인정보처리방침</Link>
            </li>
          </ul>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;
