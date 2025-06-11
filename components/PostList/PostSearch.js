// components/PostSearch.tsx
"use client";

import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { TextField, IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const PostSearch = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const [input, setInput] = useState("");

  useEffect(() => {
    const search = searchParams.get("search") ?? "";
    setInput(search);
  }, [searchParams]);

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (input.trim()) params.set("search", input);
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <TextField
      value={input}
      onChange={(e) => setInput(e.target.value)}
      onKeyDown={(e) => e.key === "Enter" && handleSearch()}
      placeholder="제목 또는 내용 검색"
      className="w-full md:w-80"
      slotProps={{
        input: {
          endAdornment: (
            <IconButton onClick={handleSearch}>
              <SearchIcon />
            </IconButton>
          ),
        },
      }}
      // InputProps={{
      //   endAdornment: (
      //     <IconButton onClick={handleSearch}>
      //       <SearchIcon />
      //     </IconButton>
      //   ),
      // }}
      size="small"
    />
  );
};

export default PostSearch;
