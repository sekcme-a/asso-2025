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
    <main>
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
      <div className="relative py-32 px-6 bg-[#f2f2f4] min-h-screen overflow-hidden">
        {/* BACKGROUND DECOR */}
        <div className="absolute inset-0 opacity-[0.03] bg-[url('/images/noise.png')] pointer-events-none" />
        <div className="absolute inset-0 [background-image:linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] [background-size:80px_80px] pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10">
          {/* HEADER */}
          <div className="mb-24 space-y-4 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-3">
              <div className="w-10 h-[2px] bg-gray-900" />
              <span className="text-[12px] font-black text-gray-900 tracking-[0.3em] uppercase">
                Executive Roster
              </span>
            </div>
            <h1 className="text-5xl md:text-6xl font-black tracking-tighter text-gray-900 leading-none">
              {t("임원", "Executive")}{" "}
              <span className="text-blue-600 italic">
                {t("현황", "Status")}
              </span>
            </h1>
          </div>

          {/* EXECUTIVE LIST */}
          {/* EXECUTIVE LIST */}
          <div className="space-y-24">
            {statusList.map((group, groupIdx) => {
              // 해당 그룹의 멤버 수 체크
              const memberCount = group.members?.length || 0;

              return (
                <section key={groupIdx} className="space-y-8">
                  <div className="flex items-center gap-4">
                    <h2 className="text-xl font-black text-gray-900 tracking-tight shrink-0">
                      {isEnglish
                        ? group.positionEn || group.position
                        : group.position}
                    </h2>
                    <div className="h-[1px] flex-1 bg-gray-200" />
                  </div>

                  <ul
                    className={`grid gap-6 ${
                      // 멤버가 1명일 경우: 중앙 정렬 및 최대 너비 제한으로 비어보임 방지
                      memberCount === 1
                        ? "grid-cols-1 max-w-2xl mx-auto md:mx-0"
                        : "grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3"
                    }`}
                  >
                    {group.members?.map((member, index) => (
                      <li
                        key={index}
                        className="group relative bg-white border-2 border-gray-100 rounded-[2rem] p-6 hover:border-blue-600 transition-all duration-500 hover:shadow-[0_30px_60px_rgba(0,0,0,0.06)]"
                      >
                        <div className="flex items-start gap-6">
                          <div className="w-28 h-36 relative shrink-0 overflow-hidden rounded-2xl bg-gray-50 shadow-inner">
                            <Image
                              src={
                                member.images?.[0] || "/images/placeholder.jpg"
                              }
                              alt={member.name}
                              fill
                              className="object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                          </div>

                          <div className="flex-1 space-y-3 pt-1">
                            <div>
                              <p className="text-[10px] font-black text-blue-600 tracking-widest uppercase mb-1">
                                Name
                              </p>
                              <h3 className="text-xl font-black text-gray-900 tracking-tighter">
                                {isEnglish
                                  ? member.nameEn || member.name
                                  : member.name}
                              </h3>
                            </div>

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
                        </div>
                      </li>
                    ))}
                  </ul>
                </section>
              );
            })}
          </div>
        </div>
      </div>
    </main>
  );
};

export default StatusPage;
