import { createServerSupabaseClient } from "@/utils/supabase/server";
import Image from "next/image";

const MouList = async ({ lang }) => {
  const supabase = await createServerSupabaseClient();

  const isEnglish = lang === "en";
  const t = (ko, en) => (isEnglish ? en : ko);

  const { data } = await supabase
    .from("page_settings")
    .select("data")
    .eq("type", `mou`)
    .single();

  const partners = data?.data || [];

  return (
    <div className="min-h-screen bg-[#fcfcfd] py-24 px-6 mt-26">
      <div className="max-w-6xl mx-auto">
        {/* HEADER: 신뢰감을 주는 묵직한 헤더 */}
        <header className="mb-20 text-center space-y-4">
          <div className="flex justify-center items-center gap-3 mb-2">
            <div className="h-[1px] w-8 bg-gray-200" />
            <span className="text-[11px] font-black text-blue-600 uppercase tracking-[0.4em]">
              Partnership
            </span>
            <div className="h-[1px] w-8 bg-gray-200" />
          </div>
          <h1 className="text-4xl md:text-5xl font-black tracking-tighter text-gray-950">
            {t("협력업체 및 MOU", "Partners & MOU")}
          </h1>
          <p className="text-gray-400 font-bold text-sm md:text-base max-w-2xl mx-auto break-keep">
            {t(
              "대한생활체육회와 함께 건강한 미래를 만들어가는",
              "Introducing our valuable partners",
            )}
            <br className="hidden md:block" />
            {t(
              "소중한 파트너사를 소개합니다.",
              "who are building a healthy future with us.",
            )}
          </p>
        </header>

        {/* PARTNER GRID: 밀도 높은 카드 레이아웃 */}
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {partners.map((group, index) => (
            <li key={index}>
              <a
                href={group.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col h-full bg-white border border-gray-100 rounded-[2rem] p-8 shadow-sm hover:shadow-2xl hover:shadow-blue-100 transition-all duration-500 hover:-translate-y-2"
              >
                {/* 로고 영역 */}
                <div className="relative w-full aspect-[3/1] mb-8 bg-white border border-gray-50 rounded-2xl overflow-hidden shadow-inner flex items-center justify-center p-6">
                  <Image
                    src={group?.images?.[0] ?? "/placeholder.png"}
                    alt={isEnglish ? group.titleEn || group.title : group.title}
                    fill
                    className="object-contain p-4 filter transition-all duration-500"
                  />
                </div>

                {/* 정보 영역 */}
                <article className="flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />
                      <h2 className="text-xl font-black text-gray-950 tracking-tight group-hover:text-blue-600 transition-colors">
                        {isEnglish ? group.titleEn || group.title : group.title}
                      </h2>
                    </div>
                    <p className="text-[14px] font-bold text-gray-500 whitespace-pre-line leading-relaxed break-keep line-clamp-3">
                      {isEnglish
                        ? group.contentEn || group.content
                        : group.content}
                    </p>
                  </div>

                  {/* 하단 장식 */}
                  <div className="mt-8 pt-6 border-t border-gray-50 flex items-center justify-between">
                    <span className="text-[10px] font-black text-gray-300 uppercase tracking-widest group-hover:text-gray-900 transition-colors">
                      {t("Visit Website", "Visit Website")}
                    </span>
                    <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center text-gray-300 group-hover:bg-gray-950 group-hover:text-white transition-all">
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M7 17L17 7M17 7H7M17 7V17" />
                      </svg>
                    </div>
                  </div>
                </article>
              </a>
            </li>
          ))}
        </ul>

        {/* Empty State */}
        {partners.length === 0 && (
          <div className="py-40 text-center border-2 border-dashed border-gray-100 rounded-[3rem]">
            <p className="text-gray-300 font-black text-lg tracking-widest uppercase">
              {t("등록된 협력업체가 없습니다.", "No partners registered.")}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MouList;
