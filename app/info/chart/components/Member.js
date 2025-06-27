import Image from "next/image";

const Member = ({ member, key }) => {
  return (
    <span
      key={key}
      className="flex mt-2 bg-[rgb(87,104,233)] justify-center py-1.5 
      font-semibold rounded-md text-white"
    >
      {member.detail}
    </span>
  );
};

export default Member;
