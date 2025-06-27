"use client";

import Image from "next/image";
import Member2 from "./components/Member2";
import Position from "./components/Position";
import { useEffect, useRef, useState } from "react";
import { CHART } from "@/data/chart";
import Layout from "@/components/Layout";

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
    <Layout category="chart" groupText="체육회소개" title="중앙 조직도">
      <main className="w-full">
        {CHART.map((group, index) => {
          if (!group.all)
            return (
              <section
                className="flex items-start gap-x-1 md:gap-x-3 lg:gap-x-14 mt-10"
                key={index}
              >
                {/* 왼쪽 그룹 */}
                <div
                  className={`${
                    index === 0 ? "mt-16 md:mt-20" : "mt-4"
                  } space-y-4 flex-1`}
                >
                  {group?.left?.map((left, idx) => (
                    <article key={idx} className="flex flex-col mb-3 ">
                      <Position data={left} />
                      {left?.members?.map((member, mIdx) => (
                        <Member2 key={mIdx} member={member} />
                      ))}
                    </article>
                  ))}
                </div>

                {/* 중앙 그룹 */}
                <div className="flex-1 flex flex-col relative">
                  {index === 0 && (
                    <>
                      <span
                        ref={topRef}
                        className="bg-blue-800 w-full text-lg md:text-2xl font-bold text-white rounded-md 
                        h-12 md:h-16 flex items-center justify-center z-10"
                      >
                        <p>총 회</p>
                      </span>
                      <div
                        className="absolute left-1/2 transform -translate-x-1/2 w-[2px] -z-10 bg-blue-800"
                        style={{ height: `${lineHeight}px`, top: 0 }}
                      />
                    </>
                  )}
                  {group?.center?.map((center, cIdx) => (
                    <article key={cIdx} className="flex flex-col mt-4">
                      <div
                        ref={
                          index === CHART.length - 1 &&
                          cIdx === group.center.length - 1
                            ? bottomRef
                            : null
                        }
                      >
                        <Position data={center} />
                      </div>
                      {center?.members?.map((member, mIdx) => (
                        <Member2 key={mIdx} member={member} />
                      ))}
                    </article>
                  ))}
                </div>

                {/* 오른쪽 그룹 */}
                <div
                  className={`${
                    index === 0 ? "mt-16 md:mt-20" : "mt-4"
                  } space-y-4 flex-1`}
                >
                  {group?.right?.map((right, idx) => (
                    <article key={idx} className="flex flex-col mb-3 ">
                      <Position data={right} />
                      {right?.members?.map((member, mIdx) => (
                        <Member2 key={mIdx} member={member} />
                      ))}
                    </article>
                  ))}
                </div>
              </section>
            );

          // group.all이 있는 경우 (3분할)
          return (
            <section
              className="flex items-start gap-x-1 md:gap-x-3 lg:gap-x-14 mt-10"
              key={index}
            >
              {/* 왼쪽 */}
              <div
                className={`${
                  index === 0 ? "mt-16 md:mt-20" : "mt-4"
                } space-y-4 flex-1`}
              >
                <article className="flex flex-col">
                  <Position data={group.all[0]} />
                  {group.all[0].members?.map((member, mIdx) =>
                    mIdx % 3 === 0 ? (
                      <Member2 key={mIdx} member={member} />
                    ) : null
                  )}
                </article>
              </div>

              {/* 중앙 */}
              <div className="flex-1 flex flex-col relative">
                <article className="flex flex-col mt-4">
                  <div ref={index === CHART.length - 1 ? bottomRef : null}>
                    <Position data={group.all[0]} />
                  </div>
                  {group.all[0].members?.map((member, mIdx) =>
                    mIdx % 3 === 1 ? (
                      <Member2 key={mIdx} member={member} />
                    ) : null
                  )}
                </article>
              </div>

              {/* 오른쪽 */}
              <div
                className={`${
                  index === 0 ? "mt-16 md:mt-20" : "mt-4"
                } space-y-4 flex-1`}
              >
                <article className="flex flex-col">
                  <Position data={group.all[0]} />
                  {group.all[0].members?.map((member, mIdx) =>
                    mIdx % 3 === 2 ? (
                      <Member2 key={mIdx} member={member} />
                    ) : null
                  )}
                </article>
              </div>
            </section>
          );
        })}
      </main>
    </Layout>
  );
};

export default Chart;
