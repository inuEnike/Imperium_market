import Hero from "../../components/Hero";
import Navbar from "../../components/navbar/Navbar";
import { TbMathGreater } from "react-icons/tb";
import banner from "../../assets/banner.png";
import { FaPlusCircle } from "react-icons/fa";
import Signup from "../auth/signup/Signup";
import { useAppContext } from "../../hooks/context/context";
import Signin from "../auth/login/Signin";
import TrendingAds from "../../components/TrendingAds";

const Home = () => {
  const { openOverlaySignup, openOverlaySignin } = useAppContext();

  const items = [
    "Hello",
    "Hi",
    "Welcome",
    "Greetings",
    "Salutations",
    "Cheers",
  ]; // Example item list

  return (
    <div className="relative">
      <Navbar />
      <Hero />
      <div className="my-5 md:flex gap-3 md:w-[85%] m-auto">
        <div className="bg-white flex-1 shadow-md">
          <ul className="px-3 md:block hidden">
            {items.map((item, index) => (
              <div key={index} className="flex items-center justify-between">
                <li className="my-4 opacity-80">{item}</li>
                <TbMathGreater color="#28363E" size={10} />
              </div>
            ))}
          </ul>
        </div>
        <div className="md:w-[70%] mx-3">
          <div>
            <div className="flex md:flex-row flex-col gap-2">
              <img src={banner} className="md:w-[75%]" alt="banner" />
              <div className="bg-[#fea03c] text-[#fff] text-center md:flex hidden items-center flex-col w-full">
                <h3 className="py-3 text-xl">Got something to sell</h3>
                <FaPlusCircle size={90} />
                <h3 className="py-3 text-xl">Post an advert for free!</h3>
              </div>
            </div>

            <div className="my-5">
              <h2 className="font-semibold text-[#1d0606c1] text-xl">
                Trending ads
              </h2>
              <TrendingAds />
            </div>
          </div>
        </div>
      </div>

      {openOverlaySignup && <Signup />}
      {openOverlaySignin && <Signin />}
    </div>
  );
};

export default Home;
