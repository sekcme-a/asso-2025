import AddIcon from "@mui/icons-material/Add";
import Link from "next/link";

const MoreButton = ({ url }) => {
  return (
    <div
      className="px-4 py-1 flex items-center justify-center shadow-md border-[1px] border-gray-200
    rounded-full cursor-pointer hover:bg-gray-900 transition-all hover:text-white"
    >
      <Link href={url}>
        <AddIcon style={{ fontSize: "0.875rem" }} />
        <span className="text-sm ml-2">더보기</span>
      </Link>
    </div>
  );
};

export default MoreButton;
