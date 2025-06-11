"use client";

import Pagination from "@mui/material/Pagination";
import { useRouter } from "next/navigation";

const PostPagination = ({ category, currentPage, totalPages, search = "" }) => {
  const router = useRouter();

  const handleChange = (event, page) => {
    const searchParam = search ? `?search=${encodeURIComponent(search)}` : "";
    router.push(`/notice/${category}/${page}${searchParam}`);
  };

  return (
    <div className="mt-6 flex justify-center">
      <Pagination
        count={totalPages}
        page={Number(currentPage)}
        onChange={handleChange}
        variant="outlined"
        color="primary"
        showFirstButton
        showLastButton
      />
    </div>
  );
};

export default PostPagination;
