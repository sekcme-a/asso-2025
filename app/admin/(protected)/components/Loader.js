import { CircularProgress } from "@mui/material";

const Loader = () => {
  return (
    <div className="p-10 flex justify-center items-center mt-10 flex-col">
      <CircularProgress />
      <p className="text-center mt-10 text-sm">데이터를 받아오는 중...</p>
    </div>
  );
};

export default Loader;
