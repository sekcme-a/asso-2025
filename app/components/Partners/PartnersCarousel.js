"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/autoplay";
import { Autoplay } from "swiper/modules";
import Image from "next/image";

const PartnersCarousel = ({ data }) => {
  return (
    <div className="w-full pb-3">
      <Swiper
        modules={[Autoplay]}
        autoplay={{
          delay: 0,
          disableOnInteraction: false,
        }}
        speed={5000}
        loop={true}
        spaceBetween={30}
        slidesPerView={8} // 👈 한 화면에 5개 보이게
        breakpoints={{
          320: { slidesPerView: 2 },
          640: { slidesPerView: 5 },
          1024: { slidesPerView: 6 },
        }}
        className="w-full"
      >
        {data.map((partner, index) =>
          partner.images.map((img, i) => (
            <SwiperSlide key={`${index}-${i}`}>
              <a
                href={partner.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex justify-center items-center aspect-[4/1]"
              >
                <Image
                  src={img}
                  alt={`협력업체 배너 ${index}-${i}`}
                  width={160}
                  height={80}
                  className="object-contain h-full w-auto"
                />
              </a>
            </SwiperSlide>
          ))
        )}
      </Swiper>
    </div>
  );
};

export default PartnersCarousel;
