"use client";

import React from "react";

export default function SubHero({
  breadcrumb = [], // [{label: "카테고리", href: "..."}] 형태
  title,
  subTitle,
}) {
  return (
    <section className="relative pt-32 pb-24 px-6 overflow-hidden bg-white mt-16">
      {/* --- 배경 디자인 요소 (수정 없이 유지) --- */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/60 via-white to-gray-100/40"></div>
        <svg
          className="absolute inset-0 w-full h-full opacity-[0.03]"
          width="100%"
          height="100%"
        >
          <defs>
            <pattern
              id="dotPattern"
              width="15"
              height="15"
              patternUnits="userSpaceOnUse"
            >
              <circle cx="1" cy="1" r="1" fill="#1e3a8a" opacity="0.5" />
            </pattern>
            <pattern
              id="gridPattern"
              width="60"
              height="60"
              patternUnits="userSpaceOnUse"
            >
              <rect width="60" height="60" fill="url(#dotPattern)" />
              <path
                d="M 60 0 L 0 0 0 60"
                fill="none"
                stroke="#1e3a8a"
                strokeWidth="0.5"
                opacity="0.3"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#gridPattern)" />
        </svg>
        <svg
          className="absolute bottom-0 right-0 w-[120%] h-full opacity-60 text-blue-100/70 translate-x-20"
          viewBox="0 0 1000 600"
          preserveAspectRatio="none"
        >
          <path
            d="M0,500 C150,450 350,550 500,500 C650,450 850,550 1000,500 L1000,600 L0,600 Z"
            fill="currentColor"
          ></path>
          <path
            d="M0,530 C150,480 350,580 500,530 C650,480 850,580 1000,530 L1000,600 L0,600 Z"
            fill="currentColor"
            opacity="0.5"
          ></path>
        </svg>
        <svg
          className="absolute top-0 left-0 w-1/2 h-full opacity-30 text-gray-200"
          viewBox="0 0 500 600"
          preserveAspectRatio="none"
        >
          <path
            d="M0,0 L500,0 C400,100 300,50 200,200 C100,350 100,500 0,600 Z"
            fill="currentColor"
          ></path>
        </svg>
        <div className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full bg-gradient-to-r from-blue-200/50 via-teal-100/40 to-blue-100/50 blur-[100px] opacity-70 animate-blob-slow z-0"></div>
        <div className="absolute top-1/2 right-10 w-2 h-96 rounded-full bg-gradient-to-b from-transparent via-blue-300/30 to-transparent blur-sm z-0"></div>
        <div className="absolute -bottom-32 -left-32 w-[500px] h-[500px] rounded-full bg-gradient-to-t from-gray-200/70 to-white/10 blur-[80px] z-0"></div>
        <svg
          className="absolute left-[15%] top-1/4 w-60 h-[500px] text-blue-300/30"
          viewBox="0 0 100 400"
          fill="none"
        >
          <path
            d="M10,10 C50,100 -20,200 40,300 Q60,350 20,390"
            stroke="currentColor"
            strokeWidth="0.7"
            strokeLinecap="round"
            strokeDasharray="5 5"
          />
          <path
            d="M30,50 Q70,150 20,250 T40,350"
            stroke="currentColor"
            strokeWidth="0.5"
            strokeLinecap="round"
          />
        </svg>
      </div>

      {/* --- 콘텐츠 영역 --- */}
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-10">
          <div>
            {/* 브레드크럼 순회 */}
            <nav className="flex items-center gap-1.5 text-xs font-bold mb-8">
              <span className="px-2.5 py-1 rounded-full bg-white border border-gray-100 text-gray-500 shadow-sm">
                Home
              </span>
              {breadcrumb.map((item, idx) => (
                <React.Fragment key={idx}>
                  <span className="text-gray-300">/</span>
                  <span
                    className={`px-2.5 py-1 rounded-full border shadow-sm ${
                      idx === breadcrumb.length - 1
                        ? "bg-blue-50 border-blue-100 text-blue-700"
                        : "bg-white border-gray-100 text-gray-500"
                    }`}
                  >
                    {item}
                  </span>
                </React.Fragment>
              ))}
            </nav>

            <h1 className="text-5xl md:text-7xl font-black tracking-tighter leading-none">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-gray-900 via-blue-950 to-gray-900">
                {title}
              </span>
            </h1>
          </div>

          <div className="relative md:pb-2">
            <div className="absolute -left-5 top-0 bottom-0 w-1 bg-blue-500 rounded-full hidden md:block"></div>
            <div className="text-gray-600 font-medium text-base md:text-lg max-w-xs break-keep leading-relaxed pl-1">
              {subTitle}
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent"></div>

      <style jsx global>{`
        @keyframes blob-slow {
          0%,
          100% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
        }
        .animate-blob-slow {
          animation: blob-slow 15s infinite ease-in-out;
        }
      `}</style>
    </section>
  );
}
