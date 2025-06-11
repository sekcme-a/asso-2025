"use client";

import { useState } from "react";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import Link from "next/link";

const MobileSelectCategory = ({ sortedItems }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="md:hidden">
      {/* 토글 버튼 */}
      <button
        className="w-full py-2 px-3 bg-blue-700 flex justify-between items-center cursor-pointer"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-expanded={isOpen}
        aria-controls="mobile-category-list"
      >
        <span className="text-white font-semibold">{sortedItems[0]?.text}</span>
        {isOpen ? (
          <ArrowDropUpIcon className="text-white" />
        ) : (
          <ArrowDropDownIcon className="text-white" />
        )}
      </button>

      {/* 애니메이션 가능한 목록 */}
      <nav
        id="mobile-category-list"
        className={`
          overflow-hidden transition-all duration-500 ease-in-out
          ${isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}
        `}
        aria-hidden={!isOpen}
      >
        <ul className="py-2 px-3 bg-white z-10 relative shadow-md ">
          {sortedItems.map((item, index) => (
            <li key={item.link} className="py-1.5">
              <Link
                href={item.link}
                className={`block font-semibold ${
                  index === 0 ? "text-blue-800" : "text-gray-800"
                }`}
              >
                {item.text}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default MobileSelectCategory;
