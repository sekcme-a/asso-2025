import Image from "next/image";
import Link from "next/link";
import FullNavbar from "./FullNavbar";
import MobileNavbar from "./MobileNavbar";
import { NAVBAR_ITEM } from "@/data/navbar";

const Navbar = () => {
  return (
    <header>
      <nav aria-label="Main Navigation" className=" relative z-50 w-[100vw]">
        <div className="md:hidden px-5 py-2 flex justify-between items-center">
          <div className="w-[42%] ">
            <div className="w-[100%] max-w-52 aspect-[3/1] relative">
              <Image src="/images/logo.png" alt="대한생활체육회 로고" fill />
            </div>
          </div>
          <MobileNavbar />
        </div>
        <div
          className="hidden md:flex px-5 lg:px-20
         items-stretch relative z-30"
        >
          <div className="w-[35%] relative z-30 bg-white flex items-center">
            <div className="w-[100%] max-w-44 aspect-[3/1] relative">
              <Image src="/images/logo.png" alt="대한생활체육회 로고" fill />
            </div>
          </div>
          <ul className="text-lg font-semibold flex-1 flex h-full bg-white group/nav ">
            {NAVBAR_ITEM.map((group, index) => {
              return (
                <li
                  className="group w-28 lg:w-36 text-center h-full relative z-30 bg-white"
                  key={index}
                >
                  <Link href={group.link} className="">
                    <div className="hover:text-[#ff7300] transition-colors group/title relative py-5">
                      {group.text}
                      <div className="absolute bottom-0 left-0 w-full flex justify-center">
                        <div className="w-0 group-hover/title:w-20 h-[1px] bg-[#ff7300] transition-all" />
                      </div>
                    </div>
                  </Link>
                </li>
              );
            })}
            <div
              className="
            absolute left-0 group-hover/nav:top-full 
            opacity-0 group-hover/nav:opacity-100
                    top-[-300px]
                     transition-all "
            >
              <FullNavbar />
            </div>
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
