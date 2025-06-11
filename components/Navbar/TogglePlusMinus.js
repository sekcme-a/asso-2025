"use client";
import { useState } from "react";

export default function TogglePlusMinus({ open, onClick }) {
  return (
    <button onClick={onClick} className="flex items-center justify-center">
      {/* 수직선 */}
      <span
        className={`
          absolute w-[2px] h-3 bg-black transition-all duration-300
          ${open ? "rotate-90 opacity-0" : "rotate-0 opacity-100"}
        `}
      />
      {/* 수평선 */}
      <span
        className={`
          absolute w-3 h-[2px] bg-black transition-all duration-300
          ${open ? "rotate-0" : "rotate-0"}
        `}
      />
    </button>
  );
}
