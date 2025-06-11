"use client";

import { useState, useEffect, useRef } from "react";
import {
  Card,
  CardContent,
  TextField,
  IconButton,
  Button,
  Typography,
  Stack,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import DragDropZone from "@/components/DragDropZone";
import { handleStorageFiles } from "@/utils/supabase/handleStorageFiles";
import { createBrowserSupabaseClient } from "@/utils/supabase/client";

const EventEditor = () => {
  const [blocks, setBlocks] = useState([
    { title: "", content: "", images: [], url: "" },
  ]);
  const prevImagesRef = useRef([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const supabase = createBrowserSupabaseClient();
    try {
      const { data, error } = await supabase
        .from("page_settings")
        .select("*")
        .eq("type", "main_event")
        .maybeSingle();

      if (error) throw error;

      if (data) {
        const fetchedBlocks = data.data;
        const images = fetchedBlocks.map((block) => {
          return block.images.map((image) => image);
        });
        prevImagesRef.current = images.flat();

        const formattedBlocks = fetchedBlocks.map((block) => {
          const images = block.images.map((image) => ({
            url: image,
            id: image,
          }));
          return {
            ...block,
            images: images,
          };
        });
        setBlocks(formattedBlocks);
        console.log("이벤트 블록 데이터 로드 성공:", formattedBlocks);
      }
    } catch (error) {
      alert("데이터를 불러오는 중 오류가 발생했습니다.");
      console.error("이벤트 블록 데이터 로드 실패:", error);
    }
  };

  const handleAddBlock = () => {
    setBlocks((prev) => [...prev, { title: "", content: "", images: [] }]);
  };

  const handleRemoveBlock = (indexToRemove) => {
    setBlocks((prev) => prev.filter((_, index) => index !== indexToRemove));
  };

  const handleBlockChange = (index, field, value) => {
    setBlocks((prev) =>
      prev.map((block, i) =>
        i === index ? { ...block, [field]: value } : block
      )
    );
  };

  const handleImageChange = (index, images) => {
    setBlocks((prev) =>
      prev.map((block, i) => (i === index ? { ...block, images } : block))
    );
  };

  const handleMoveBlock = (from, to) => {
    if (to < 0 || to >= blocks.length) return;
    const newBlocks = [...blocks];
    const [movedBlock] = newBlocks.splice(from, 1);
    newBlocks.splice(to, 0, movedBlock);
    setBlocks(newBlocks);
  };

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    const supabase = createBrowserSupabaseClient();
    console.log("제출할 데이터:", blocks);

    const isValid = blocks.every((block) => block.title && block.content);
    if (!isValid) {
      alert("모든 이벤트 블록에 제목, 내용을 입력해주세요.");
      return;
    }

    setIsSubmitting(true);

    const imageUploadedBlocks = await Promise.all(
      blocks.map(async (block) => {
        if (block.images.length === 0) return { ...block, images: [] };

        const images = await Promise.all(
          block.images.map(async (img) => {
            console.log(img);
            if (img.url) return img.url;
            const newImgs = await handleStorageFiles({
              mode: "update",
              bucket: "public-bucket",
              path: "admin/page-settings/main/event",
              files: [img],
            });
            return newImgs[0];
          })
        );
        console.log(images);
        return { ...block, images };
      })
    );

    const { error } = await supabase
      .from("page_settings")
      .update({
        type: "main_event",
        data: imageUploadedBlocks,
      })
      .eq("type", "main_event");

    if (error) {
      alert("업로드 중 에러가 발생했습니다.");
      console.error("이벤트 블록 데이터 업로드 실패:", error);
    }

    setIsSubmitting(false);
  };

  return (
    <Stack spacing={3}>
      {blocks.map((block, index) => (
        <Card key={index} variant="outlined" className="shadow-xl">
          <CardContent>
            <Stack spacing={2}>
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
              >
                <Typography variant="h6">이벤트 {index + 1}</Typography>
                <Stack direction="row" spacing={1}>
                  <IconButton
                    onClick={() => handleMoveBlock(index, index - 1)}
                    disabled={index === 0}
                  >
                    <ArrowUpwardIcon />
                  </IconButton>
                  <IconButton
                    onClick={() => handleMoveBlock(index, index + 1)}
                    disabled={index === blocks.length - 1}
                  >
                    <ArrowDownwardIcon />
                  </IconButton>
                  <IconButton
                    onClick={() => handleRemoveBlock(index)}
                    color="error"
                  >
                    <DeleteIcon />
                  </IconButton>
                </Stack>
              </Stack>

              <TextField
                label="제목"
                size="small"
                variant="outlined"
                value={block.title}
                onChange={(e) =>
                  handleBlockChange(index, "title", e.target.value)
                }
                fullWidth
              />
              <TextField
                label="바로가기 url"
                size="small"
                variant="outlined"
                value={block.url}
                onChange={(e) =>
                  handleBlockChange(index, "url", e.target.value)
                }
                fullWidth
              />

              <TextField
                label="내용"
                size="small"
                variant="outlined"
                multiline
                minRows={4}
                value={block.content}
                onChange={(e) =>
                  handleBlockChange(index, "content", e.target.value)
                }
                fullWidth
              />

              <DragDropZone
                maxMB={2}
                files={block.images}
                onChange={(files) => handleImageChange(index, files)}
              />
            </Stack>
          </CardContent>
        </Card>
      ))}

      <Button
        variant="contained"
        startIcon={<AddIcon />}
        onClick={handleAddBlock}
        color="primary"
      >
        이벤트 추가
      </Button>

      <Button
        variant="contained"
        color="success"
        onClick={handleSubmit}
        disabled={isSubmitting}
      >
        {isSubmitting ? "저장 중..." : "전체 저장하기"}
      </Button>
    </Stack>
  );
};

export default EventEditor;
