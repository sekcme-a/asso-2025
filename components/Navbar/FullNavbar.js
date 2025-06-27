import { NAVBAR_ITEM } from "@/data/navbar";
import Image from "next/image";
import Link from "next/link";

const FullNavbar = () => {
  return (
    <div
      className="flex z-50 relative bg-white w-[100vw] border-y-[1px] border-y-[#ff7300] 
    px-5 lg:px-20"
    >
      <div className="w-[35%] flex items-end flex-col py-6 pr-7">
        <p
          className=" text-end text-base break-keep
        border-r-[#ff7300] border-r-2 pr-2"
        >
          국민의 건강과 행복의 장을 여는
        </p>
        <p
          className="font-bold text-lg
        border-r-[#ff7300] border-r-2 pr-2"
        >
          대한생활체육회
        </p>
        <div className="w-[30%] aspect-[1/1] relative mt-2 mr-2">
          <Image src="/images/logo-circle.png" alt="대한생활체육회 로고" fill />
        </div>
      </div>
      <div className="flex-1 flex">
        {NAVBAR_ITEM.map((group, index) => {
          return (
            <ul
              key={index}
              className={`group/child  w-28 lg:w-36  text-center py-3 border-l-[1px] border-l-[#dcdcdc]
                hover:bg-[#fafafa] relative
                ${
                  index + 1 === NAVBAR_ITEM.length &&
                  "border-r-[1px] border-r-[#dcdcdc]"
                }
                `}
            >
              <div className="flex justify-center absolute top-[-2px] left-0 w-full">
                <div className="w-0 group-hover/child:w-20 h-[3px] bg-[#ff7300] transition-all" />
              </div>
              {group.items.map((item, index) => {
                return (
                  <li
                    className="text-base py-1.5 font-normal hover:text-[#ff7300]"
                    key={index}
                  >
                    <Link href={item.link}>{item.text}</Link>
                  </li>
                );
              })}
            </ul>
          );
        })}
      </div>
    </div>
  );
};

export default FullNavbar;
