import { createBrowserSupabaseClient } from "./client";

export async function handleStorageFiles({ mode, bucket, path, files = [] }) {
  const supabase = createBrowserSupabaseClient();
  // 기존 파일 삭제 (insert, delete 모드)
  if (mode === "insert" || mode === "delete") {
    const { data: existingFiles, error: listError } = await supabase.storage
      .from(bucket)
      .list(path);
    if (listError) {
      console.error("List error:", listError.message);
    } else if (existingFiles && existingFiles.length > 0) {
      const pathsToRemove = existingFiles.map((file) => `${path}/${file.name}`);
      const { error: removeError } = await supabase.storage
        .from(bucket)
        .remove(pathsToRemove);
      if (removeError) {
        console.error("Remove error:", removeError.message);
      }
    }
  }

  if (mode === "delete") {
    return [];
  }

  const uploadedUrls = [];

  for (const item of files) {
    const file = item.file;
    if (!file) {
      console.warn("No file property found in item:", item);
      continue;
    }

    const fileExt = getFileExtension(file);
    const uniqueName = `${Date.now()}-${Math.random()
      .toString(36)
      .substring(2)}.${fileExt}`;
    const fullPath = `${path}/${uniqueName}`;

    const { error: uploadError } = await supabase.storage
      .from(bucket)
      .upload(fullPath, file, {
        cacheControl: "3600",
        upsert: false,
      });

    if (uploadError) {
      console.error(
        `Upload failed for ${file.name || "unnamed file"}:`,
        uploadError.message
      );
      continue;
    }

    const { data: urlData } = supabase.storage
      .from(bucket)
      .getPublicUrl(fullPath);
    uploadedUrls.push(urlData.publicUrl);
  }

  return uploadedUrls;
}

function getFileExtension(file) {
  if (typeof file.name === "string" && file.name.includes(".")) {
    return file.name.split(".").pop();
  }
  return "bin";
}
