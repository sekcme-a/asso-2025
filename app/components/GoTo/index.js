import Image from "next/image";
import Link from "next/link";

const GoTo = () => {
  const ITEMS = [
    {
      link: "/info/greet",
      title: "총재 인사말",
      image: "/images/main/goto/greet.png",
    },
    {
      link: "/info/purpose",
      title: "설립목적",
      image: "/images/main/goto/purpose.png",
    },
    {
      link: "/info/chart",
      title: "중앙 조직도",
      image: "/images/main/goto/chart.png",
    },
    {
      link: "/info/location",
      title: "오시는 길",
      image: "/images/main/goto/location.png",
    },
  ];
  return (
    <div className="py-20 lg:flex justify-between">
      <div className="lg:max-w-80 break-keep mb-10 md:mb-0">
        <h4 className="text-blue-700 font-bold text-lg">체육회 소개</h4>
        <p className="text-xl md:text-2xl font-bold mt-2">
          국민의 건강과 행복의 장을 여는 대한생활체육회를 소개합니다.
        </p>
      </div>
      <div className="grid grid-cols-4 lg:grid-cols-4 gap-x-6 md:gap-x-10 gap-y-8 flex-1 lg:max-w-[55%]">
        {ITEMS.map((item, index) => (
          <Link href={item.link} key={index}>
            <div className="flex justify-center flex-wrap cursor-pointer group">
              <div
                className="bg-gray-100 md:p-4 rounded-full flex justify-center items-center w-[100%] md:w-[70%] 
                aspect-square border-[2px] border-gray-300 relative group-hover:border-blue-700 group-hover:bg-white
                transition-all duration-300"
              >
                <Image src={item.image} alt={item.title} fill className="p-3" />
                <div className="absolute bottom-[-9px] md:bottom-[-13px] left-0 right-0 flex justify-center">
                  <div className="w-[18px] md:w-[26px] aspect-square relative">
                    <Image
                      src="/images/main/goto/arrow.png"
                      alt="화살표"
                      fill
                      className="group-hover:opacity-0 transition-all duration-300"
                    />
                    <Image
                      src="/images/main/goto/arrow-active.png"
                      alt="화살표"
                      fill
                      className=" opacity-0 group-hover:opacity-100 transition-all duration-300"
                    />
                  </div>
                </div>
              </div>
              <p className="text-center w-[100%] mt-3 md:mt-5 text-sm md:text-lg font-semibold group-hover:text-blue-800 transition-all duration-300">
                {item.title}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default GoTo;
