"use client";

import { useState, useEffect } from "react";
import "react-quill-new/dist/quill.snow.css";

export default function ArticleContent({ html }) {
  const [data, setData] = useState("");

  useEffect(() => {
    setData(html);
  }, [html]);

  if (!data) return null;

  return (
    <div className="ql-container ql-snow" style={{ border: "none" }}>
      {/* Quill의 파싱 과정을 건너뛰고 브라우저가 직접 그리게 합니다 */}
      <div className="ql-editor" dangerouslySetInnerHTML={{ __html: data }} />

      {/* 동영상 반응형 스타일 강제 적용 */}
      <style jsx global>{`
        .ql-editor iframe.ql-video {
          width: 100% !important;
          aspect-ratio: 16 / 9; /* 가로 길이에 맞춰 세로 높이 자동 조절 */
          height: auto !important;
          border-radius: 12px; /* 디자인에 맞춰 조절 (선택사항) */
          box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1); /* 선택사항 */
        }

        /* 모바일 대응: 가로가 좁아질 때도 비율 유지 */
        @media (max-width: 640px) {
          .ql-editor iframe.ql-video {
            aspect-ratio: 16 / 9;
          }
        }
      `}</style>
    </div>
  );
}
