// components/ArticleContent.tsx
"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import { useEffect } from "react";
// import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";

const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });

export default function ArticleContent({ html }) {
  const [data, setData] = useState(null);
  // 그냥 보이게 하면 페이지코드에 에러코드가 보여서, 동적 렌더링
  useEffect(() => {
    setTimeout(() => {
      setData(html);
    }, 100);
  }, []);
  if (data)
    return (
      <ReactQuill
        value={data}
        readOnly={true}
        theme="snow"
        modules={{
          toolbar: false,
          clipboard: {
            matchVisual: false,
          },
        }}
      />
    );
}
