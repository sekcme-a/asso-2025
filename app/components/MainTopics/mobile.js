"use client";

import { DEFAULT_TOPICS } from "@/data/main/topics";
import Link from "next/link";
import { useState } from "react";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

const MobileTopics = ({ blocks }) => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const topics = [...blocks, ...DEFAULT_TOPICS].slice(0, 4);

  return (
    <div className="py-8 bg-[url('/images/main/topic-bg.png')] bg-cover bg-center ">
      {topics.map((block, index) => {
        return (
          <div
            className="py-4 cursor-pointer"
            key={index}
            onClick={() => setSelectedIndex(index)}
          >
            <h4
              className={`text-2xl font-extrabold break-keep ${
                selectedIndex === index
                  ? "text-blue-800"
                  : "text-[rgb(150,150,150)]"
              } transition-colors duration-300`}
            >
              {block.title}
            </h4>
            {selectedIndex === index && (
              <p className=" mt-2 text-[rgb(60,60,60)] font-semibold break-keep">
                {block.content}
              </p>
            )}
            {selectedIndex === index && block.url && (
              <Link href={block.url}>
                <div className="mt-1 flex items-center group/url">
                  <p className="text-blue-800 text-sm font-semibold group-hover/url:font-bold transition-all">{`바로가기`}</p>
                  <ChevronRightIcon className="text-blue-800 group-hover/url:ml-1 transition-all" />
                </div>
              </Link>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default MobileTopics;
