import EditableBlocks from "@/components/EditableBlocks";

const Mou = () => {
  return (
    <div className="p-10">
      <EditableBlocks
        label="협력업체"
        bucket="public-bucket"
        path="admin/page-settings/mou"
        table="page_settings"
        typeKey="mou"
        formFields={[
          { name: "title", label: "명칭", type: "text", required: true },
          { name: "url", label: "홈페이지 url", type: "url" },
          {
            name: "content",
            label: "내용",
            type: "text",
            multiline: true,
            minRows: 4,
          },
          { name: "images", label: "이미지 업로드", type: "image", maxMB: 2 },
        ]}
      />
    </div>
  );
};

export default Mou;
