import ClientHeader from "./ClientHeader";
import LoginMobile from "./LoginMobile";

const Header = () => {
  const IMAGES = ["2.jpg"];

  return (
    <>
      <div className="w-full aspect-[3/2] md:aspect-[2/1] lg:aspect-[3/1] relative overflow-hidden">
        <ClientHeader />
      </div>
      <LoginMobile />
    </>
  );
};

export default Header;
