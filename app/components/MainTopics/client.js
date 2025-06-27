"use client";

import Image from "next/image";
import { useState } from "react";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import Link from "next/link";
import { DEFAULT_TOPICS } from "@/data/main/topics";

const MainTopicsClient = ({ blocks }) => {
  const [hoveredIndex, setHoveredIndex] = useState(0);

  const topics = [...blocks, ...DEFAULT_TOPICS].slice(0, 4);

  return (
    <div className="py-16 url('/images/main/topic-bg.png')] bg-cover bg-center">
      <div className="flex gap-x-5 md:gap-x-12 lg:gap-x-36 ">
        {/* 왼쪽 텍스트 영역 */}
        <div className="flex-1">
          {topics.map((block, index) => (
            <div
              className="py-5 cursor-pointer group flex"
              key={index}
              onMouseEnter={() => setHoveredIndex(index)}
            >
              <div
                className={`w-12 h-[2px] ${
                  hoveredIndex === index ? "bg-blue-800" : "bg-gray-700"
                } mr-6 mt-4`}
              />
              <div className="flex-1">
                <h4
                  className={`text-4xl font-extrabold break-keep ${
                    hoveredIndex === index
                      ? "text-blue-800"
                      : "text-[rgb(150,150,150)]"
                  } transition-colors duration-300`}
                >
                  {block.title}
                </h4>
                {hoveredIndex === index && (
                  <p className=" mt-4 text-[rgb(60,60,60)] font-semibold break-keep">
                    {block.content}
                  </p>
                )}
                {hoveredIndex === index && block.url && (
                  <Link href={block.url}>
                    <div className="mt-5 flex items-center group/url">
                      <p className="text-blue-800 font-semibold group-hover/url:font-bold transition-all">{`바로가기`}</p>
                      <ChevronRightIcon className="text-blue-800 group-hover/url:ml-1 transition-all" />
                    </div>
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* 오른쪽 이미지 영역 */}
        <div className="flex-1 relative flex items-center justify-center">
          {/* 고정된 크기 + 비율 유지 */}
          <div className="relative w-[80%] aspect-[1/1]">
            {topics.map((block, index) => (
              <Image
                key={index}
                src={block.images?.[0] || "/default.jpg"}
                alt={block.title || "대표 이미지"}
                fill // 부모에 맞게 채움
                sizes="(max-width: 768px) 100vw, 500px"
                priority={index === 0}
                className={`rounded-lg object-contain absolute top-0 left-0 transition-opacity duration-500 ease-in-out
                  ${
                    hoveredIndex === index
                      ? "opacity-100 z-10"
                      : "opacity-0 z-0"
                  }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainTopicsClient;
