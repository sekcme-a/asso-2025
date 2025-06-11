"use client";

import Image from "next/image";
import Member from "./components/Member";
import Position from "./components/Position";
import { useEffect, useRef, useState } from "react";
import { CHART } from "@/data/chart";

const Chart = () => {
  const topRef = useRef(null);
  const bottomRef = useRef(null);
  const [lineHeight, setLineHeight] = useState(0);

  useEffect(() => {
    if (topRef.current && bottomRef.current) {
      const top = topRef.current.getBoundingClientRect().top;
      const bottom = bottomRef.current.getBoundingClientRect().bottom;
      setLineHeight(bottom - top);
    }
  }, []);

  return (
    <div className="md:px-[15%] w-full">
      {CHART.map((group, index) => {
        if (!group.all)
          return (
            <div className="flex items-start gap-x-14 mt-10 " key={index}>
              <div
                className={`${
                  index === 0 ? "mt-20" : "mt-4"
                } space-y-4 flex-1 `}
              >
                {group?.left?.map((left, index) => {
                  return (
                    <div key={index} className="flex flex-col">
                      <Position data={left} />
                      {left?.members?.map((member, index) => {
                        return <Member key={index} member={member} />;
                      })}
                    </div>
                  );
                })}
              </div>

              <div className="flex-1 flex flex-col relative">
                {index === 0 && (
                  <>
                    <span
                      ref={topRef}
                      className="bg-[#ff7300] w-full text-2xl font-bold text-white rounded-md h-16 flex items-center justify-center z-10"
                    >
                      <p>총 회</p>
                    </span>
                    {/* 세로 줄 */}
                    <div
                      className="absolute left-1/2 transform -translate-x-1/2 w-[2px] -z-10 bg-[#ff7300]"
                      style={{ height: `${lineHeight}px`, top: 0 }}
                    />
                  </>
                )}
                {group?.center?.map((center, centerIndex) => {
                  return (
                    <div key={centerIndex} className="flex flex-col mt-4">
                      <div
                        ref={
                          index === CHART.length - 1 &&
                          centerIndex === group.center.length - 1
                            ? bottomRef
                            : null
                        }
                      >
                        <Position data={center} />
                      </div>
                      {center?.members?.map((member, index) => {
                        return <Member key={index} member={member} />;
                      })}
                    </div>
                  );
                })}
              </div>

              <div
                className={`${index == 0 ? "mt-20" : "mt-4"} space-y-4 flex-1 `}
              >
                {group?.right?.map((right, index) => {
                  return (
                    <div key={index} className="flex flex-col">
                      <Position data={right} />
                      {right?.members?.map((member, index) => {
                        return <Member key={index} member={member} />;
                      })}
                    </div>
                  );
                })}
              </div>
            </div>
          );

        return (
          <div className="flex items-start gap-x-14 mt-10 " key={index}>
            <div
              className={`${index === 0 ? "mt-20" : "mt-4"} space-y-4 flex-1 `}
            >
              <div key={index} className="flex flex-col">
                <Position data={group.all[0]} />
                {group?.all[0]?.members?.map((member, index) => {
                  if (index % 3 === 0)
                    return <Member key={index} member={member} />;
                })}
              </div>
            </div>

            <div className="flex-1 flex flex-col relative">
              <div className="flex flex-col mt-4">
                <div ref={index === CHART.length - 1 ? bottomRef : null}>
                  <Position data={group.all[0]} />
                </div>
                {group?.all[0]?.members?.map((member, index) => {
                  if (index % 3 === 1)
                    return <Member key={index} member={member} />;
                })}
              </div>
            </div>

            <div
              className={`${index === 0 ? "mt-20" : "mt-4"} space-y-4 flex-1 `}
            >
              <div key={index} className="flex flex-col">
                <Position data={group.all[0]} />
                {group?.all[0]?.members?.map((member, index) => {
                  if (index % 3 === 2)
                    return <Member key={index} member={member} />;
                })}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Chart;
