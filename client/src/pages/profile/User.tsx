import React from "react";
import { useToken } from "../../hooks/custom/token";

const User = () => {
  const { fetchUser } = useToken();
  React.useEffect(() => {
    fetchUser();
  }, []);
  return (
    <div className="flex md:flex-row flex-col gap-4 text-xl py-20 px-5">
      <div className="div1 bg-white md:w-[30%] rounded-md md:h-[80vh] p-2">
        <div className="userImage">
          <img src="" alt="User Profile" />
        </div>
        <div className="userDetail">
          <h2>Hello</h2>
          <h2>Hello</h2>
          <h2>Hello</h2>
          <h2>Hello</h2>
          <h2>Hello</h2>
        </div>
      </div>
      <div className="div2 bg-white w-full h-[80vh] rounded-md p-2">2</div>
    </div>
  );
};

export default User;
