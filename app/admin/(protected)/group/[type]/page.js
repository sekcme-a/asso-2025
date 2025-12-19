import EditableBlocks from "@/components/EditableBlocks";

const Group = ({ params }) => {
  const { type } = params;

  return (
    <div className="p-10">
      <EditableBlocks
        label="단체"
        bucket="public-bucket"
        path={`admin/page-settings/group/${type}`}
        table="page_settings"
        typeKey={`group_${type}`}
        formFields={[
          { name: "groupName", label: "단체명", type: "text", required: true },
          { name: "name", label: "회장", type: "text", required: true },
          {
            name: "profile",
            label: "프로필",
            type: "text",
            multiline: true,
            minRows: 4,
          },
          { name: "url", label: "홈페이지 링크 (https://포함)", type: "text" },
          { name: "images", label: "이미지 업로드", type: "image", maxMB: 1 },
        ]}
      />
    </div>
  );
};

export default Group;
