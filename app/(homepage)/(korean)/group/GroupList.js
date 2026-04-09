"use client";
import Image from "next/image";
import Link from "next/link";
import SubHero from "../info/components/SubHero";
import { useParams } from "next/navigation";

const GroupList = ({ type, groups }) => {
  const params = useParams();
  const isEnglish = params.lang === "en";

  const t = (ko, en) => (isEnglish ? en : ko);

  const contentMap = {
    nation: {
      breadcrumb: [
        t("체육회 소개", "About Us"),
        t("전국 체육회", "National Org"),
      ],
      title: t("전국 체육회 현황", "National Organizations"),
      headerTitle: t("전국 체육회", "National"),
      headerSub: t("현황", "Organizations"),
      sub1: t("전국적인 네트워크를 통해", "Through a nationwide network,"),
      sub2: t(
        "생활체육의 저변을 넓혀갑니다.",
        "we expand the foundation of sports for all.",
      ),
    },
    internation: {
      breadcrumb: [
        t("체육회 소개", "About Us"),
        t("국제 체육회", "International Org"),
      ],
      title: t("국제 체육회 현황", "International Organizations"),
      headerTitle: t("국제 체육회", "International"),
      headerSub: t("현황", "Organizations"),
      sub1: t("글로벌 스포츠 교류를 통해", "Through global sports exchange,"),
      sub2: t(
        "세계로 나아가는 발판을 마련합니다.",
        "we bridge the gap to the world.",
      ),
    },
    sports: {
      breadcrumb: [
        t("체육회 소개", "About Us"),
        t("종목별 현황", "Sports Disciplines"),
      ],
      title: t("종목별 운영현황", "Sports by Discipline"),
      headerTitle: t("종목별", "Sports"),
      headerSub: t("운영현황", "Discipline Status"),
      sub1: t(
        "다양한 종목의 전문성을 바탕으로",
        "Based on expertise in various sports,",
      ),
      sub2: t(
        "종목별 맞춤형 환경을 조성합니다.",
        "we create tailored environments for each discipline.",
      ),
    },
    sanha: {
      breadcrumb: [t("체육회 소개", "About Us"), t("산하단체", "Affiliated")],
      title: t("산하단체 현황", "Affiliated Organizations"),
      headerTitle: t("산하단체", "Affiliated"),
      headerSub: t("현황", "Organizations"),
      sub1: t(
        "긴밀한 협력과 지원을 통해",
        "Through close cooperation and support,",
      ),
      sub2: t(
        "함께 성장하는 체육 생태계를 구축합니다.",
        "we build a sports ecosystem that grows together.",
      ),
    },
  };

  const currentContent = contentMap[type] || contentMap.nation;
  const safeGroups = Array.isArray(groups) ? groups : groups ? [groups] : [];

  return (
    <>
      <SubHero
        breadcrumb={currentContent.breadcrumb}
        title={currentContent.title}
        subTitle={
          <>
            {currentContent.sub1}
            <br />
            <strong className="font-bold text-gray-950">
              {currentContent.sub2}
            </strong>
          </>
        }
      />
      <section
        className="relative py-12 px-6 bg-[#fcfcfd] min-h-screen overflow-hidden"
        aria-labelledby="group-list-title"
      >
        <div
          className="absolute inset-0 [background-image:linear-gradient(#e5e7eb_1px,transparent_1px),linear-gradient(to_right,#e5e7eb_1px,transparent_1px)] [background-size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-20 pointer-events-none"
          aria-hidden="true"
        />
        <div
          className="absolute top-0 right-0 w-1/3 h-full bg-blue-600/5 -skew-x-12 transform translate-x-20 pointer-events-none z-0"
          aria-hidden="true"
        />

        <div className="max-w-4xl mx-auto relative z-10">
          <header className="mb-10 flex flex-col md:flex-row md:items-end gap-4 border-l-4 border-blue-600 pl-6">
            <div className="flex-1 space-y-1">
              <span className="text-[10px] font-black text-blue-600 uppercase tracking-[0.2em]">
                {t("Organization", "Organization")}
              </span>
              <h2
                id="group-list-title"
                className="text-3xl font-black tracking-tighter text-gray-900 leading-tight"
              >
                {currentContent.headerTitle}{" "}
                <span className="text-blue-600">
                  {currentContent.headerSub}
                </span>
              </h2>
            </div>
          </header>

          <div className="space-y-4">
            {safeGroups.map((group, index) => {
              const groupName = isEnglish
                ? group.name_en || group.name
                : group.name;
              const leaderName = group.leader || t("미지정", "TBD");
              const profileText = isEnglish
                ? group.description_en || group.description
                : group.description;

              return (
                <article
                  key={index}
                  className="group relative bg-white border border-gray-100 rounded-2xl overflow-hidden hover:border-blue-400 transition-all duration-300 shadow-sm hover:shadow-md"
                >
                  <Link
                    href={
                      isEnglish ? `/en/team/${group.id}` : `/team/${group.id}`
                    }
                    className="absolute inset-0 z-10"
                    aria-label={`${groupName} 상세 보기`}
                  />

                  <div className="flex flex-col md:flex-row items-stretch">
                    {/* 1. 로고 영역 */}
                    <div className="md:w-40 bg-gray-50/30 flex flex-col items-center justify-center p-5 border-b md:border-b-0 md:border-r border-gray-100">
                      <div className="w-16 h-16 bg-white rounded-xl shadow-sm border border-gray-100 p-3 flex items-center justify-center group-hover:scale-105 transition-transform duration-500">
                        <Image
                          src={group.logo_url || "/images/logo-circle.png"}
                          alt={`${groupName} Logo`}
                          width={60}
                          height={60}
                          className="object-contain"
                        />
                      </div>
                      <span className="mt-3 text-[9px] font-bold text-gray-300 tracking-wider">
                        NO.{String(index + 1).padStart(2, "0")}
                      </span>
                    </div>

                    {/* 2. 정보 영역 */}
                    <div className="flex-1 p-5 md:p-6">
                      <h3 className="text-xl font-black text-gray-900 tracking-tight mb-4 group-hover:text-blue-600 transition-colors">
                        {groupName}
                      </h3>

                      <div className="relative pl-4 border-l-2 border-gray-100 group-hover:border-blue-100 transition-colors">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="px-1.5 py-0.5 bg-gray-800 text-white text-[8px] font-bold uppercase rounded">
                            {t("Chair", "Chair")}
                          </span>
                          <span className="text-base font-bold text-gray-900">
                            {leaderName}{" "}
                            <span className="text-xs font-medium text-gray-400">
                              {t("회장", "President")}
                            </span>
                          </span>
                        </div>

                        <p className="text-sm font-medium text-gray-500 leading-snug break-keep whitespace-pre-line group-hover:text-gray-600 transition-colors line-clamp-2">
                          {profileText ||
                            t(
                              "지역 생활체육의 저변 확대와 회원 권익 보호를 위해 노력하고 있습니다.",
                              "Working to expand sports for all and protect member rights.",
                            )}
                        </p>
                      </div>
                    </div>

                    {/* 3. 화살표 화살표 아이콘 영역 (추가된 부분) */}
                    <div className="hidden md:flex items-center px-6 text-gray-300 group-hover:text-blue-500 transition-colors">
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="transform group-hover:translate-x-1 transition-transform duration-300"
                      >
                        <polyline points="9 18 15 12 9 6" />
                      </svg>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
};

export default GroupList;
