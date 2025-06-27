"use client";

import EditableBlocks from "@/components/EditableBlocks";
import { useParams } from "next/navigation";

const Member = () => {
  const { positionId } = useParams();

  return (
    <div className="p-10">
      <EditableBlocks
        label="임원"
        bucket="public-bucket"
        path="admin/page-settings/info/status"
        table="page_settings"
        typeKey={`info_status_position_${positionId}`}
        formFields={[
          { name: "name", label: "성명", type: "text", required: true },
          {
            name: "profile",
            label: "프로필",
            type: "text",
            multiline: true,
            minRows: 4,
          },
          { name: "images", label: "이미지 업로드", type: "image", maxMB: 1 },
        ]}
      />
    </div>
  );
};

export default Member;
