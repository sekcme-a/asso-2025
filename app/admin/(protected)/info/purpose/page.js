import EditableBlocks from "@/components/EditableBlocks";

const Purpose = () => {
  return (
    <div className="p-10">
      <EditableBlocks
        label="설립목적"
        table="page_settings"
        typeKey="info_purpose"
        formFields={[
          { name: "text", label: "목적", type: "text", required: true },
        ]}
      />
    </div>
  );
};

export default Purpose;
