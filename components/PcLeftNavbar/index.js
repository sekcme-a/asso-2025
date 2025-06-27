import { NAVBAR_ITEM } from "@/data/navbar";
import Link from "next/link";

const PcLeftNavbar = ({ group, category }) => {
  const noticeGroup = NAVBAR_ITEM.find((gp) => gp.text === group);
  const noticeGroupItems = noticeGroup?.items || [];

  return (
    <>
      <div className="h-20 flex justify-center items-center bg-blue-500 rounded-md ">
        <div className="text-xl text-white">{group}</div>
      </div>

      <ul className="mt-3 rounded-md border-[1px] border-gray-300">
        {noticeGroupItems.map((item, index) => {
          const isActive = item.link.split("/").includes(category);
          const isLast = index === noticeGroupItems.length - 1;

          return (
            <li
              key={item.link}
              className={!isLast ? "border-b border-gray-300" : ""}
            >
              <Link
                href={item.link}
                className={`
                  block w-full py-3 px-5
                  ${
                    isActive
                      ? "bg-blue-100 text-blue-500 font-semibold"
                      : "text-gray-700 hover:bg-gray-100 hover:text-blue-500"
                  }
                `}
              >
                {item.text}
              </Link>
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default PcLeftNavbar;
