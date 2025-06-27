import HeadBanner from "@/app/notice/[category]/[page]/components/HeadBanner";
import Layout from "@/components/Layout";
import PcLeftNavbar from "@/components/PcLeftNavbar";
import { createMetadata } from "@/utils/metadata";
import Image from "next/image";

export async function generateMetadata() {
  return createMetadata({
    title: "총재 인사말",
    description: "대한생활체육회 총재 김균식의 인사말입니다.",
    url: "/info/greet",
  });
}

const Greet = () => {
  return (
    <>
      <Layout category="greet" groupText="체육회소개" title="총재 인사말">
        <div
          className="flex items-center gap-5 overflow-hidden relative
          border-[2px] border-gray-200 py-3 break-keep
          RESPONSIVE flex-col md:flex-row text-center md:text-start px-2 md:px-5 "
        >
          <div className="absolute hidden md:block inset-0 bg-[url(/images/logo-circle.png)] bg-no-repeat bg-center bg-cover opacity-8 pointer-events-none" />
          <div className="w-[12%] min-w-32 aspect-[2/3] relative">
            <Image
              src="/images/info/greet.png"
              // src="/images/logo-circle.png"
              alt="대한생활체육회 로고"
              fill
              objectFit="contain"
            />
          </div>
          <div>
            <h2 className="text-blue-800 text-3xl font-bold">
              AGAIN 필승 코리아!
            </h2>
            <h3 className="text-xl font-bold">
              건강한 체육활동으로 국민 활력을 되찾다
            </h3>
            <h4 className="whitespace-pre-line mt-2 text-gray-600 leading-snug">{`(사)대한생활체육회는 생활체육 활성화를 통해 전 국민의 건강 증진과 활력 회복에 앞장섭니다.
정치·종교를 배제한 순수 체육단체로서 모두가 함께하는 건강한 체육문화를 만들어가겠습니다.`}</h4>
            <p className="text-sm mt-3">총재 김균식</p>
          </div>
        </div>

        <h5 className="text-xl font-bold mt-10">
          어게인 필승 코리아!! 5천만 국민 여러분!!
        </h5>
        <p className="whitespace-pre-line text-lg md:leading-snug mt-3">
          {`코로나19의 긴 터널이 끝을 보이고 있는 가운데 이제 새로운 미래를 개척하기 위한 준비운동을 마쳤습니다. 

지난 도쿄올림픽은 움츠렸던 인류의 체육이 질병의 곤경에도 여전히 살아있음을 보여주는 실 예가 되었습니다.
우리 대한민국은 전 세계 그 어떤 국가보다 강인한 정신력과 사회질서가 완벽한 도덕성을 자랑하는 동방예의지국으로서 전 국민의 완벽한 협조가 K-방역의 성공으로 이어졌습니다. 

긴 시간 참고 기다렸던 온 국민들의 활기찬 건강체조가 우렁찬 구호와 함께 전국 방방곡곡에 울려 퍼져야 할 때가 왔습니다. 건강을 위한 최고의 덕목은 건전한 체육활동이며 이는 각자의 취향과 특기에 따라 다양하게 펼쳐져야 할 것입니다. 

이에 (사)대한생활체육회는 지난 3월부터 구심점을 잃었던 모든 국민들의 생활체육의 활성화를 위해 꾸준한 준비를 해 왔습니다. 지역별, 종목별, 해외지부까지 꼼꼼히 조직을 구성하고 서울특별시에 비영리 사단법인을 신청하여 지난 8월 17일 정식 인가를 받았습니다. 이후 등기완성과 고유 번호증을 부여받아 2021년 9월 17일 첫 공식 활동에 착수했습니다. 

이제 (사)대한생활체육회는 모든 국민들의 다양한 체육활동에 주최가 되어 체계적이고 안전한 대회개최는 물론, 종목별 지도자 양성, 각종국제대회 개최, 청소년과 노인체육복지 바우처 사업 등 국민건강에 도움 되는 부분에 일조할 것입니다. 

지구상 어떤 생물이든 살아움직일 때 생명력이 발전하는 것입니다. 하물며 인간에게 체육활동은 그 어떤 명약보다 소중하고 확실한 활력소가 되는 것이며 동호인들 간의 화합, 친목, 협동은 물론 평범한 아마추어에서 뛰어난 프로의 인재를 개발, 양성하는 통로가 될 것입니다. 

향후 전국대회 및 국제 대회가 개최되는 그날까지 온 국민의 응원과 힘찬 환호를 기대하며  모두가 하나 되는 건전하고 건강한 대장정을 기대합니다. 

아울러 본 협회는 정치, 종교, 상업적, 의미의 일체 배제된 순수 체육단체로서 오직 국민건강과 화기애애한 사회적 분위기를 도모하는데 목적을 두고 있습니다. 따라서 협회의 목적에 위배되는 요소는 강력하게 배재함은 물론 모든 경영의 투명화, 누구나 참여를 위해 모든 채널을 열어두고 있습니다. 특정 세력이나 유명인 보다는 국민모두를 가장 소중한 회원으로 모시는 (사)대한생활체육회는 함께 꾸려갈 훌륭한 인재를 모십니다. 

많은 관심과 참여를 기대하며 가내 두루 평안과 희망찬 미래가 항상 함께 하길 바랍니다. 

감사합니다. `}
        </p>
      </Layout>
    </>
  );
};

export default Greet;
