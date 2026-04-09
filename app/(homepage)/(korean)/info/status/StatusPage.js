"use client";

import Image from "next/image";
import SubHero from "../components/SubHero";
import { useParams } from "next/navigation";

const StatusPage = ({ statusList }) => {
  const params = useParams();
  const isEnglish = params.lang === "en";

  // 번역 헬퍼 함수
  const t = (ko, en) => (isEnglish ? en : ko);

  return (
    <>
      <SubHero
        breadcrumb={[
          t("체육회 소개", "About Us"),
          t("임원현황", "Executive Status"),
        ]}
        title={t("임원현황", "Executive Status")}
        subTitle={
          <>
            {t(
              "투명한 경영과 전문적인 행정으로",
              "Through transparent management and professional administration,",
            )}{" "}
            <br />
            <strong className="font-bold text-gray-950">
              {t(
                "대한생활체육회를 이끄는 리더십입니다.",
                "we present the leadership leading the KSFAA.",
              )}
            </strong>
          </>
        }
      />
      {/* section에 id와 aria-labelledby를 연결하여 접근성 강화 */}
      <section
        className="relative py-32 px-6 bg-[#f2f2f4] min-h-screen overflow-hidden"
        aria-labelledby="status-main-title"
      >
        {/* BACKGROUND DECOR (aria-hidden으로 장식 요소 제외) */}
        <div
          className="absolute inset-0 opacity-[0.03] bg-[url('/images/noise.png')] pointer-events-none"
          aria-hidden="true"
        />
        <div
          className="absolute inset-0 [background-image:linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] [background-size:80px_80px] pointer-events-none"
          aria-hidden="true"
        />

        <div className="max-w-7xl mx-auto relative z-10">
          {/* HEADER: SubHero에 h1이 있으므로 여기는 h2로 설정 */}
          <header className="mb-24 space-y-4 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-3">
              <div className="w-10 h-[2px] bg-gray-900" aria-hidden="true" />
              <span className="text-[12px] font-black text-gray-900 tracking-[0.3em] uppercase">
                Executive Roster
              </span>
            </div>
            <h2
              id="status-main-title"
              className="text-5xl md:text-6xl font-black tracking-tighter text-gray-900 leading-none"
            >
              {t("임원", "Executive")}{" "}
              <span className="text-blue-600 italic">
                {t("현황", "Status")}
              </span>
            </h2>
          </header>

          {/* EXECUTIVE LIST: 각 그룹별 section과 위계 순서(h3, h4) 조정 */}
          <div className="space-y-24">
            {statusList.map((group, groupIdx) => {
              const memberCount = group.members?.length || 0;
              const positionTitle = isEnglish
                ? group.positionEn || group.position
                : group.position;

              return (
                <section
                  key={groupIdx}
                  className="space-y-8"
                  aria-label={positionTitle}
                >
                  <div className="flex items-center gap-4">
                    {/* 그룹별 직위명을 h3로 설정 */}
                    <h3 className="text-xl font-black text-gray-900 tracking-tight shrink-0">
                      {positionTitle}
                    </h3>
                    <div
                      className="h-[1px] flex-1 bg-gray-200"
                      aria-hidden="true"
                    />
                  </div>

                  <ul
                    className={`grid gap-6 ${
                      memberCount === 1
                        ? "grid-cols-1 max-w-2xl mx-auto md:mx-0"
                        : "grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3"
                    }`}
                  >
                    {group.members?.map((member, index) => {
                      const memberName = isEnglish
                        ? member.nameEn || member.name
                        : member.name;

                      return (
                        <li
                          key={index}
                          className="group relative bg-white border-2 border-gray-100 rounded-[2rem] p-6 hover:border-blue-600 transition-all duration-500 hover:shadow-[0_30px_60px_rgba(0,0,0,0.06)]"
                        >
                          <article className="flex items-start gap-6">
                            <div className="w-28 h-36 relative shrink-0 overflow-hidden rounded-2xl bg-gray-50 shadow-inner">
                              <Image
                                src={
                                  member.images?.[0] ||
                                  "/images/placeholder.jpg"
                                }
                                alt={`${memberName} - ${positionTitle}`}
                                fill
                                className="object-cover transition-transform duration-700 group-hover:scale-110"
                              />
                            </div>

                            <div className="flex-1 space-y-3 pt-1">
                              <header>
                                <p className="text-[10px] font-black text-blue-600 tracking-widest uppercase mb-1">
                                  Name
                                </p>
                                {/* 개별 임원 이름을 h4로 설정하여 계층 구조 완성 */}
                                <h4 className="text-xl font-black text-gray-900 tracking-tighter">
                                  {memberName}
                                </h4>
                              </header>

                              <div>
                                <p className="text-[10px] font-black text-gray-400 tracking-widest uppercase mb-1">
                                  Profile
                                </p>
                                <p className="text-[13px] font-bold text-gray-500 leading-relaxed whitespace-pre-line line-clamp-4 group-hover:text-gray-700 transition-colors">
                                  {isEnglish
                                    ? member.profileEn || member.profile
                                    : member.profile}
                                </p>
                              </div>
                            </div>
                          </article>
                        </li>
                      );
                    })}
                  </ul>
                </section>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
};

export default StatusPage;
