import { LuSearch } from "react-icons/lu";

const Hero = () => {
  return (
    <div className="bg-[linear-gradient(160.29deg,#00b53f_0.67%,#00831e_100.93%)] h-[50vh] flex justify-center items-center flex-col">
      <h3 className="text-[#ede2e2]">Find Anything in Nigeria</h3>
      <form className="bg-white flex my-3 py-3 rounded-md px-5 ">
        <div className="">
          <input
            type="text"
            className="md:w-[30vw] w-[80vw] h-full focus:outline-none"
            name=""
            id=""
            placeholder="I am looking for ........."
          />
        </div>
        <button>
          <LuSearch />
        </button>
      </form>
    </div>
  );
};

export default Hero;
