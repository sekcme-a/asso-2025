import Image from "next/image";

const Member = ({ member, key }) => {
  return (
    <span
      key={key}
      className="flex  border-[#ff7300] border-[1px] mt-3 h-14 bg-white"
    >
      <div className="relative w-14 aspect-[1/1] overflow-hidden">
        <Image
          src={member.image ?? `/images/members/${member.name}.png`}
          fill
          objectFit="cover"
          alt={member.name}
        />
      </div>
      <div className="w-full h-full flex flex-col  flex-1">
        <div className="bg-[#ff7300] w-full">
          <p className="font-semibold text-sm text-white ml-3">
            {member.detail}
          </p>
        </div>
        <div className="font-bold text-lg leading-tight ml-3  flex-1 flex items-center ">
          <p>{member.name}</p>
        </div>
      </div>
    </span>
  );
};

export default Member;
