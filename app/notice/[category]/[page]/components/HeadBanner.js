import { NAVBAR_ITEM } from "@/data/navbar";
import Link from "next/link";
import MobileSelectCategory from "./MobileSelectCategory";

const HeadBanner = ({ category, groupText = "알림마당" }) => {
  const noticeGroup = NAVBAR_ITEM.find((group) => group.text === groupText);
  const noticeGroupItems = noticeGroup?.items || [];
  const sortedItems = [
    ...noticeGroupItems.filter((item) =>
      item.link.split("/").includes(category)
    ),
    ...noticeGroupItems.filter(
      (item) => !item.link.split("/").includes(category)
    ),
  ];

  return (
    <>
      <div
        className="bg-[url(/images/banner/4.png)] w-full aspect-[3/1] md:aspect-[5/1] bg-cover flex items-center md:items-end py-10 md:px-32"
        role="region"
        aria-label="알림마당 배너"
      >
        <div className="w-full">
          {/* Desktop Title */}
          <p className="text-white font-semibold text-5xl text-start w-full hidden md:block">
            {groupText}
          </p>

          {/* Mobile Title */}
          <p className="text-white font-semibold text-3xl text-center md:hidden w-full">
            {sortedItems[0]?.text}
          </p>

          {/* Desktop Navigation */}
          <nav
            className="mt-5 ml-1 hidden md:flex"
            aria-label="알림마당 카테고리 목록"
          >
            <ul className="flex">
              {sortedItems.map((item, index) => (
                <li key={item.link} className="mr-10">
                  <Link
                    href={item.link}
                    className={`${
                      index === 0 ? "text-blue-400 font-bold" : "text-white"
                    } text-lg hover:text-blue-400 transition-all duration-300`}
                  >
                    {item.text}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>

      <MobileSelectCategory sortedItems={sortedItems} />
    </>
  );
};

export default HeadBanner;
