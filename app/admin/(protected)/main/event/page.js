"use client";

import { useEffect, useState } from "react";
import EditableBlocks from "@/components/EditableBlocks";

const Event = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
    } catch (e) {
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-10">
      {/* <EventEditor /> */}
      <EditableBlocks
        label="이벤트"
        bucket="public-bucket"
        path="admin/page-settings/main/event"
        table="page_settings"
        typeKey="main_event"
        formFields={[
          { name: "title", label: "제목", type: "text", required: true },
          { name: "url", label: "바로가기 url", type: "url" },
          {
            name: "content",
            label: "내용",
            type: "text",
            multiline: true,
            minRows: 4,
            required: true,
          },
          { name: "images", label: "이미지 업로드", type: "image", maxMB: 2 },
        ]}
      />
    </div>
  );
};

export default Event;
