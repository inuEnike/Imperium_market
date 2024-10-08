import Button from "../button";
import { useAppContext } from "../../hooks/context/context";
import { useToken } from "../../hooks/custom/token";
import { IoMdLogOut } from "react-icons/io";
import { FaUserAlt } from "react-icons/fa";
import { TiMessages } from "react-icons/ti";
import { Link } from "react-router-dom";

const Desktop = () => {
  const { handleOverLaySignup, handleOverLaySignin } = useAppContext();
  const { deleteToken } = useToken();
  const { getToken } = useToken();
  return (
    <nav className="flex justify-around py-3 fixed w-full text-[#ede2e2] items-center bg-[#00b53f]">
      <div className="navLogo">
        <Link to={"/"}>
          <h2 className="text-xl font-bold">IMPERIUM</h2>
        </Link>
      </div>
      <div className="md:flex items-center uppercase opacity-45 gap-3 hidden">
        <h2>Buy Smarter</h2>
        <h2>Sell Faster</h2>
      </div>
      <ul className="navItems flex gap-3 text-sm items-center">
        {getToken() ? (
          <li className="flex gap-2 items-center">
            <IoMdLogOut
              size={20}
              onClick={deleteToken}
              className="cursor-pointer"
              name="logout"
            />
            <Link to={"/profile/user"}>
              <FaUserAlt className="cursor-pointer" size={20} name="user" />
            </Link>
            <TiMessages className="cursor-pointer" size={20} name="messages" />
          </li>
        ) : (
          <li className="flex items-center text-[#fff]">
            <p onClick={handleOverLaySignup} className="cursor-pointer">
              Registration
            </p>
            <p onClick={handleOverLaySignin} className=" px-3 cursor-pointer">
              Sign In
            </p>
          </li>
        )}
        <Button
          text={"Start Sell"}
          color={"#fea03c"}
          link={"/profile/add-Ads"}
        />
      </ul>
    </nav>
  );
};

export default Desktop;
