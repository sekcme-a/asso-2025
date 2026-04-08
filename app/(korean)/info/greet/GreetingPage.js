"use client";
import React from "react";
import { motion } from "framer-motion";
import { useParams } from "next/navigation";
import SubHero from "../components/SubHero";

export default function GreetingPage() {
  const params = useParams();
  const isEnglish = params.lang === "en";

  // 번역 헬퍼 함수
  const t = (ko, en) => (isEnglish ? en : ko);

  return (
    <main className="bg-white pb-40">
      <SubHero
        breadcrumb={[
          t("체육회 소개", "About Us"),
          t("총재 인사말", "President's Message"),
        ]}
        title={t("총재 인사말", "President's Message")}
        subTitle={
          <>
            {t(
              "대한민국의 건강한 미래를 위해",
              "For a healthy future of Korea,",
            )}{" "}
            <br />
            <strong className="font-bold text-gray-950">
              {t("(사)대한생활체육회", "KSFAA")}
            </strong>
            {t("가 함께 뜁니다.", " runs with you.")}
          </>
        }
      />
      {/* MAIN CONTENT */}
      <div className="max-w-5xl mx-auto px-6 mt-24 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          {/* LEFT: 고정된 인물 정보 */}
          <div className="lg:col-span-4 lg:sticky lg:top-32">
            <div className="aspect-[3/4] bg-gray-100 rounded-[2rem] overflow-hidden mb-8 border border-gray-100 shadow-sm">
              <img
                src="/images/info/greet.webp"
                alt="President"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="space-y-2 border-l-4 border-blue-600 pl-6">
              <h3 className="text-3xl font-black text-gray-900 leading-none">
                {t("김균식", "Gyunsik Kim")}
              </h3>
              <p className="text-sm font-bold text-gray-400 italic">
                President of KSFAA
              </p>
            </div>
          </div>

          {/* RIGHT: 메시지 본문 */}
          <div className="lg:col-span-8">
            <div className="space-y-10 text-[17px] md:text-[19px] leading-[1.8] text-gray-600 font-medium break-keep">
              <h2 className="text-2xl md:text-3xl font-black text-gray-900 leading-tight mb-12">
                {t(
                  '"어게인 필승 코리아!! 5천만 국민 여러분!! 새로운 미래를 개척하기 위한 준비운동을 마쳤습니다."',
                  '"Again Victory Korea!! To 50 million citizens!! We have finished our warm-up to pioneer a new future."',
                )}
              </h2>

              <p>
                {t(
                  "코로나19의 긴 터널이 끝을 보이고 있는 가운데 이제 새로운 미래를 개척하기 위한 준비운동을 마쳤습니다. 지난 도쿄올림픽은 움츠렸던 인류의 체육이 질병의 곤경에도 여전히 살아있음을 보여주는 실 예가 되었습니다.",
                  "As the long tunnel of COVID-19 shows its end, we have now completed the warm-up to pioneer a new future. The last Tokyo Olympics served as an example that humanity's sports are still alive despite the hardships of disease.",
                )}
              </p>

              <p>
                {t(
                  "우리 대한민국은 전 세계 그 어떤 국가보다 강인한 정신력과 사회질서가 완벽한 도덕성을 자랑하는 동방예의지국으로서 전 국민의 완벽한 협조가 K-방역의 성공으로 이어졌습니다.",
                  "Korea, a nation of courtesy that boasts stronger mental power and social order than any other country in the world, achieved the success of K-quarantine through the perfect cooperation of all citizens.",
                )}
              </p>

              <p>
                {t(
                  "긴 시간 참고 기다렸던 온 국민들의 활기찬 건강체조가 우렁찬 구호와 함께 전국 방방곡곡에 울려 퍼져야 할 때가 왔습니다. 건강을 위한 최고의 덕목은 건전한 체육활동이며 이는 각자의 취향과 특기에 따라 다양하게 펼쳐져야 할 것입니다.",
                  "The time has come for the energetic gymnastics of all people, who have waited for a long time, to resonate throughout the country with loud slogans. The best virtue for health is sound physical activity, and this should be unfolded in various ways according to individual tastes and specialties.",
                )}
              </p>

              {/* 강조 섹션 */}
              <div className="bg-gray-50 p-10 rounded-[2.5rem] border border-gray-100 my-16">
                <p className="text-gray-900 font-bold italic mb-4 text-lg">
                  {t(
                    "기틀을 다지고 정식 출범하기까지",
                    "Laying the foundation and official launch",
                  )}
                </p>
                <p className="text-base text-gray-500 leading-relaxed">
                  {t(
                    "이에 (사)대한생활체육회는 지난 3월부터 구심점을 잃었던 모든 국민들의 생활체육의 활성화를 위해 꾸준한 준비를 해 왔습니다. 지역별, 종목별, 해외지부까지 꼼꼼히 조직을 구성하고 서울특별시에 비영리 사단법인을 신청하여 2021년 8월 17일 정식 인가를 받았으며, 9월 17일 첫 공식 활동에 착수했습니다.",
                    "The KSFAA has been making steady preparations since last March to vitalize sports for all citizens who had lost their focus. We carefully organized regions, sports, and overseas branches, applied for a non-profit corporation in Seoul, and received official authorization on August 17, 2021, starting official activities on September 17.",
                  )}
                </p>
              </div>

              <p>
                {t(
                  "이제 (사)대한생활체육회는 모든 국민들의 다양한 체육활동에 주체가 되어 체계적이고 안전한 대회개최는 물론, 종목별 지도자 양성, 각종 국제대회 개최, 청소년과 노인체육복지 바우처 사업 등 국민건강에 도움 되는 부분에 일조할 것입니다.",
                  "Now, the KSFAA will take the lead in various sports activities for all citizens, contributing to national health through systematic and safe competitions, training leaders by event, hosting international competitions, and youth/senior sports welfare voucher projects.",
                )}
              </p>

              <p>
                {t(
                  "지구상 어떤 생물이든 살아 움직일 때 생명력이 발전하는 것입니다. 하물며 인간에게 체육활동은 그 어떤 명약보다 소중하고 확실한 활력소가 되는 것이며 동호인들 간의 화합, 친목, 협동은 물론 평범한 아마추어에서 뛰어난 프로의 인재를 개발, 양성하는 통로가 될 것입니다.",
                  "Vitality develops when any living creature on earth is active. Physical activity is a more precious and certain tonic for humans than any miracle drug, serving as a channel for harmony, friendship, and cooperation among enthusiasts, as well as developing talent from ordinary amateurs to outstanding professionals.",
                )}
              </p>

              <p className="font-bold text-gray-800">
                {t(
                  "향후 전국대회 및 국제 대회가 개최되는 그날까지 온 국민의 응원과 힘찬 환호를 기대하며 모두가 하나 되는 건전하고 건강한 대장정을 기대합니다.",
                  "We look forward to the support and cheers of all citizens until the day national and international competitions are held, anticipating a sound and healthy journey where everyone becomes one.",
                )}
              </p>

              <p>
                {t(
                  "아울러 본 협회는 정치, 종교, 상업적 의미가 일체 배제된 순수 체육단체로서 오직 국민건강과 화기애애한 사회적 분위기를 도모하는데 목적을 두고 있습니다. 따라서 협회의 목적에 위배되는 요소는 강력하게 배제함은 물론 모든 경영의 투명화, 누구나 참여를 위해 모든 채널을 열어두고 있습니다.",
                  "In addition, this association is a pure sports organization that excludes all political, religious, and commercial meanings, aiming only to promote national health and a harmonious social atmosphere. Therefore, we strictly exclude factors that violate the association's purpose and keep all channels open for transparent management and participation for everyone.",
                )}
              </p>

              <p>
                {t(
                  "특정 세력이나 유명인 보다는 국민 모두를 가장 소중한 회원으로 모시는 (사)대한생활체육회는 함께 꾸려갈 훌륭한 인재를 모십니다. 많은 관심과 참여를 기대하며 가내 두루 평안과 희망찬 미래가 항상 함께 하길 바랍니다. 감사합니다.",
                  "The KSFAA, which serves all citizens as its most precious members rather than specific groups or celebrities, welcomes great talents to work together. We look forward to your interest and participation, and wish your family peace and a bright future. Thank you.",
                )}
              </p>

              {/* 하단 서명 영역 */}
              <div className="pt-16 border-t border-gray-100">
                <div className="flex items-end gap-4">
                  <p className="text-xl font-black text-gray-900 tracking-tight">
                    {t("(사)대한생활체육회 총재", "President of KSFAA")}
                  </p>
                  <span className="font-serif italic text-3xl text-blue-600 leading-none">
                    {t("김균식", "Gyunsik Kim")}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
