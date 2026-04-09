"use client";
import Image from "next/image";
import Link from "next/link";
import SubHero from "../info/components/SubHero";
import { useParams } from "next/navigation";

const GroupList = ({ type, groups }) => {
  const params = useParams();
  const isEnglish = params.lang === "en";

  // 번역 헬퍼 함수
  const t = (ko, en) => (isEnglish ? en : ko);

  // 1. 타입별 문구 설정 객체
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
    international: {
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
        {/* 배경 패턴 (aria-hidden 처리) */}
        <div
          className="absolute inset-0 [background-image:linear-gradient(#e5e7eb_1px,transparent_1px),linear-gradient(to_right,#e5e7eb_1px,transparent_1px)] [background-size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-20 pointer-events-none"
          aria-hidden="true"
        />
        <div
          className="absolute top-0 right-0 w-1/3 h-full bg-blue-600/5 -skew-x-12 transform translate-x-20 pointer-events-none z-0"
          aria-hidden="true"
        />

        <div className="max-w-4xl mx-auto relative z-10">
          {/* HEADER: SubHero의 h1을 고려하여 h2로 변경 */}
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
            <div
              className="text-right hidden md:block"
              aria-label={`Total ${groups.length} organizations`}
            >
              <p className="text-2xl font-black text-gray-200 tabular-nums leading-none">
                {groups.length.toString().padStart(2, "0")}
              </p>
              <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">
                Registered
              </p>
            </div>
          </header>

          {/* LIST AREA: 각 항목을 article로 구성하여 개별 정보 강조 */}
          <div className="space-y-4">
            {groups.map((group, index) => {
              const groupName = isEnglish
                ? group.groupNameEn || group.groupName
                : group.groupName;
              const leaderName = isEnglish
                ? group.nameEn || group.name
                : group.name;

              return (
                <article
                  key={index}
                  className="group bg-white border border-gray-100 rounded-2xl overflow-hidden hover:border-blue-400 transition-all duration-300 shadow-sm hover:shadow-md"
                >
                  <div className="flex flex-col md:flex-row items-stretch">
                    {/* 1. 로고 영역 */}
                    <div className="md:w-40 bg-gray-50/30 flex flex-col items-center justify-center p-5 border-b md:border-b-0 md:border-r border-gray-100">
                      <div className="w-16 h-16 bg-white rounded-xl shadow-sm border border-gray-100 p-3 flex items-center justify-center group-hover:scale-105 transition-transform duration-500">
                        <Image
                          src="/images/logo-circle.png"
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
                      {/* 단체명 h3로 변경 */}
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
                          {isEnglish
                            ? group.profileEn ||
                              "Providing transparent and fair administrative services to expand the foundation of local sports for all and protect members' rights."
                            : group.profile ||
                              "지역 생활체육의 저변 확대와 회원 권익 보호를 위해 투명하고 공정한 행정 서비스를 제공하고 있습니다."}
                        </p>
                      </div>
                    </div>

                    {/* 3. 링크 영역 */}
                    {group.url && (
                      <div className="flex items-center px-6 pb-5 md:pb-0">
                        <Link
                          href={group.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          title={`${groupName} ${t("홈페이지 방문", "Website")}`}
                          className="group/link flex items-center justify-center w-full md:w-12 h-12 rounded-xl bg-gray-50 text-gray-400 hover:bg-blue-600 hover:text-white transition-all duration-300"
                        >
                          <svg
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            aria-hidden="true"
                          >
                            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                            <polyline points="15 3 21 3 21 9" />
                            <line x1="10" y1="14" x2="21" y2="3" />
                          </svg>
                          <span className="sr-only">
                            {groupName} {t("홈페이지 바로가기", "Website Link")}
                          </span>
                        </Link>
                      </div>
                    )}
                  </div>
                </article>
              );
            })}
          </div>

          {/* FOOTER */}
          <footer className="mt-16 py-8 text-center border-t border-gray-100">
            <p className="text-[10px] font-bold text-gray-400 tracking-widest uppercase">
              {t(
                "사단법인 대한생활체육회",
                "Korean Sports For All Athletic Association",
              )}
            </p>
          </footer>
        </div>
      </section>
    </>
  );
};

export default GroupList;
