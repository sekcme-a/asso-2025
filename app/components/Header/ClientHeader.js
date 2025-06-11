"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import LoginPc from "./LoginPc";
// import LoginMobile from "./LoginMobile";

const ClientHeader = () => {
  const IMAGES = ["1.png"];
  // const randomInt = Math.floor(Math.random() * IMAGES.length);

  return (
    <>
      <motion.div
        initial={{ opacity: 0, scale: 1.1 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="absolute inset-0 z-[-1]"
      >
        <Image
          src={`/public/images/background/${IMAGES[0]}`}
          alt="배경 이미지"
          fill
          objectFit="cover"
        />
      </motion.div>

      {/* 반투명 배경 오버레이 */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 1 }}
        className="absolute w-full h-full z-0 flex justify-between items-center md:px-[5%] lg:px-[13%] bg-[rgba(218,218,218,0.32)] backdrop-blur-xs"
      >
        {/* 텍스트 애니메이션 */}
        <motion.div
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="flex-1 text-center md:text-left z-10 relative"
        >
          <p className="text-xl md:text-3xl font-bold">국민의 건강과</p>
          <p className="text-xl md:text-3xl font-bold">행복의 장을 여는</p>
          <h1 className="text-4xl md:text-6xl font-extrabold mt-3">
            대한생활체육회
          </h1>
          <h2 className="text-lg md:text-2xl mt-1 md:mt-4">
            Korea Sports For All Athletic Association
          </h2>
        </motion.div>

        {/* 로그인 박스도 페이드 인 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.7, duration: 0.8 }}
        >
          <LoginPc />
        </motion.div>
      </motion.div>
    </>
  );
};

export default ClientHeader;
