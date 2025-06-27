"use client";

import EditableBlocks from "@/components/EditableBlocks";
import { createBrowserSupabaseClient } from "@/utils/supabase/client";
import { Button } from "@mui/material";
import { useRouter } from "next/navigation";
import { useState } from "react";

const Position = () => {
  const router = useRouter();
  const supabase = createBrowserSupabaseClient();
  const [blocks, setBlocks] = useState([{}]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    await supabase
      .from("page_settings")
      .upsert(
        { type: "info_status_group", data: blocks },
        { onConflict: "type" }
      );
  };

  return (
    <div className="p-10">
      <EditableBlocks
        label="임원 직위"
        table="page_settings"
        typeKey="info_status_group"
        formFields={[
          { name: "text", label: "임원 직위명", type: "text", required: true },
        ]}
        setBlockValue={setBlocks}
        hideSubmitButton
        blockButtons={[
          {
            text: "임원진 편집",
            onClick: (field) => {
              router.push(`members/${field.id}`);
            },
          },
        ]}
      />

      <Button
        variant="contained"
        color="success"
        onClick={handleSubmit}
        disabled={isSubmitting}
        fullWidth
        className="mt-3"
      >
        {isSubmitting ? "저장 중..." : "전체 저장하기"}
      </Button>
    </div>
  );
};

export default Position;
