const Position = ({ data }) => {
  return (
    <span
      className="flex justify-center items-center rounded-md 
    h-10 bg-[#ff9641] font-bold text-xl text-white"
    >
      {data.position}
    </span>
  );
};

export default Position;
