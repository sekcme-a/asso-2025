const Position = ({ data }) => {
  return (
    <span
      className="flex justify-center items-center rounded-md 
    h-9 md:h-10 bg-white border-[1px] border-blue-800 font-bold md:text-xl text-blue-900 "
      //   className="flex justify-center items-center rounded-md
      // h-9 md:h-10 bg-blue-900 font-bold md:text-xl text-white"
    >
      {data.position}
    </span>
  );
};

export default Position;
