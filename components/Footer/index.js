const Footer = () => {
  return (
    <footer className="mt-32 bg-gray-800 text-white py-8 px-20 flex justify-between items-center flex-col md:flex-row">
      <div>
        <h6 className="text-3xl font-bold">대한생활체육회</h6>

        <div className="text-sm">
          <p className="text-sm mt-4">{`상호: (사)대한생활체육회 | 대표자명: 김균식`}</p>
          <p>고유번호 : 102-82-10135</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
