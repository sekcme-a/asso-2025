"use client";

import Pagination from "@mui/material/Pagination";
import { useRouter } from "next/navigation";
import { useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";

const PostPagination = ({ category, currentPage, totalPages, search = "" }) => {
  const router = useRouter();

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md")); // md 미만

  const handleChange = (event, page) => {
    const searchParam = search ? `?search=${encodeURIComponent(search)}` : "";
    router.push(`/notice/${category}/${page}${searchParam}`);
  };

  return (
    <div className="mt-10 flex justify-center">
      <Pagination
        count={totalPages}
        page={Number(currentPage)}
        onChange={handleChange}
        variant="outlined"
        color="primary"
        showFirstButton
        showLastButton
        size={isSmallScreen ? "small" : "medium"} // ⬅ 조건부 적용
      />
    </div>
  );
};

export default PostPagination;
