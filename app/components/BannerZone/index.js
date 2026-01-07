"use client";

import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";

// Swiper 스타일 임포트
("import 'swiper/css';");
("import 'swiper/css/navigation';");

export default function BannerZone() {
  const banners = [
    {
      id: 1,
      src: "/images/banner/commercial/sangzo.png",
      alt: "배너1",
      url: "http://대한생활체육회상조회.kr",
    },
  ];

  // 배너가 3개 초과인지 확인
  const isSlider = banners.length > 3;

  return (
    <section className="max-w-7xl mx-auto pt-15 px-4">
      {/* 제목 및 화살표 영역 */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">배너 존</h2>

        {isSlider && (
          <div className="flex gap-x-1">
            <button className="prev-btn p-1 rounded-full bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer">
              <ArrowLeftIcon />
            </button>
            <button className="next-btn p-1 rounded-full bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer">
              <ArrowRightIcon />
            </button>
          </div>
        )}
      </div>

      {/* 배너 리스트 / 슬라이더 */}
      <Swiper
        modules={[Navigation]}
        spaceBetween={16}
        slidesPerView={1}
        navigation={{
          prevEl: ".prev-btn",
          nextEl: ".next-btn",
        }}
        breakpoints={{
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
      >
        {banners.map((banner) => (
          <SwiperSlide key={banner.id}>
            <div className="relative aspect-[16/5] overflow-hidden rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <Link href={banner.url} target="_blank" rel="noopener noreferrer">
                <Image
                  src={banner.src}
                  alt={banner.alt}
                  fill
                  className="object-contain"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              </Link>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
