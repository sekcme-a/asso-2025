import Image from "next/image";

const Member2 = ({ member, key }) => {
  return (
    <span
      key={key}
      className="flex  border-blue-900 border-[1px] mt-3 h-14 bg-white "
    >
      <div className="relative w-14 aspect-[1/1] overflow-hidden hidden md:block">
        <Image
          src={member.image ?? `/images/members/${member.name}.png`}
          fill
          objectFit="cover"
          alt={member.name}
          unoptimized
        />
      </div>
      <div className="w-full h-full flex flex-col  flex-1 text-center md:text-start">
        <div className=" w-full bg-[rgb(87,104,233)] md:pl-3">
          <p className="font-semibold text-sm text-white line-clamp-1">
            {member.detail}
          </p>
        </div>
        <div className="font-semibold text-lg leading-tight w-full flex-1 flex items-center md:pl-3 ">
          <p className=" w-full text-center md:text-start">{member.name}</p>
        </div>
      </div>
    </span>
  );
};

export default Member2;
