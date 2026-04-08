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
    </div>
  );
}
