import AddIcon from "@mui/icons-material/Add";
import List from "./List";
import Link from "next/link";
import MoreButton from "../public/MoreButton";

const Notices = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-10 py-15 md:py-20">
      <section className="">
        <div className="flex justify-between items-center ">
          <h5 className="text-xl md:text-2xl font-bold ">최근소식</h5>
          <MoreButton url="/notice/anouncement/1" />
        </div>
        <List color="blue" />
      </section>
      <section className="">
        <div className="flex justify-between items-center ">
          <h5 className="text-xl md:text-2xl font-bold ">언론보도</h5>
          <MoreButton url="/notice/media/1" />
        </div>
        <List category="media" color="green" />
      </section>
    </div>
  );
};

export default Notices;
