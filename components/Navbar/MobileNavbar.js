"use client";

import { NAVBAR_ITEM } from "@/data/navbar";
import MenuIcon from "@mui/icons-material/Menu";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import { useState } from "react";
import TogglePlusMinus from "./TogglePlusMinus";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";

const MobileNavbar = () => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState("");

  const handleGroupToggle = (text) => {
    setSelectedGroup((prev) => (prev === text ? "" : text));
  };

  return (
    <>
      {/* 메뉴 토글 버튼 */}
      <div onClick={() => setIsOpen((prev) => !prev)} className="z-30 relative">
        {isOpen ? <MenuOpenIcon /> : <MenuIcon />}
      </div>

      {/* 오버레이 */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-20 bg-white"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            onClick={() => {
              setIsOpen(false);
              setSelectedGroup("");
            }}
          />
        )}
      </AnimatePresence>

      {/* 메뉴 리스트 */}
      <AnimatePresence>
        {isOpen && (
          <motion.ul
            className="bg-white absolute top-full left-0 w-full z-30 shadow-lg"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            onClick={(e) => e.stopPropagation()} // 메뉴 클릭 시 닫힘 방지
          >
            {NAVBAR_ITEM.map((group, index) => {
              const isGroupOpen = selectedGroup === group.text;

              return (
                <li
                  className="py-3 px-7 text-lg font-bold border-b border-b-[rgb(203,203,203)]"
                  key={index}
                  onClick={() => handleGroupToggle(group.text)}
                >
                  <div className="flex justify-between items-center">
                    <p>{group.text}</p>
                    <TogglePlusMinus open={isGroupOpen} />
                  </div>

                  <AnimatePresence>
                    {isGroupOpen && (
                      <motion.ul
                        key="group-items"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden mt-1 ml-3 font-semibold text-base"
                      >
                        {group.items.map((item, index) => (
                          <li
                            key={index}
                            className="py-1"
                            onClick={(e) => {
                              e.stopPropagation(); // 메뉴 닫힘 방지
                              setIsOpen(false);
                              setSelectedGroup("");
                              setTimeout(() => {
                                router.push(item.link); // ✅ 수동 이동
                              }, 500);
                            }}
                          >
                            {item.text}
                          </li>
                        ))}
                      </motion.ul>
                    )}
                  </AnimatePresence>
                </li>
              );
            })}
          </motion.ul>
        )}
      </AnimatePresence>
    </>
  );
};

export default MobileNavbar;
