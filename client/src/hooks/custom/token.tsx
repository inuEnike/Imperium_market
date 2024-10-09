import { useNavigate } from "react-router-dom";
import { useAppContext } from "../context/context";
import { Axios as axios } from "../../utils/axios";

// Destructure the setToken from the context properly
export const useToken = () => {
  const { setToken } = useAppContext();
  const navigate = useNavigate();

  const getToken = () => {
    const token = window.localStorage.getItem("auth");
    return token;
  };

  const saveToken = (token: string) => {
    window.localStorage.setItem("auth", token);
    setToken(token);
  };

  const deleteToken = () => {
    const check = window.confirm("Do you want to logout ?");
    if (check) {
      window.localStorage.removeItem("auth");
      setToken("");
      navigate("/");
    }
  };

  const headers = {
    Authorization: `Bearer ${getToken()}`,
    "Content-Type": "application/json",
  };

  const fetchUser = async () => {
    const res = await axios.get("/user/user", {
      headers,
    });
    return res.data.user;
    // console.log(res.data.user);
  };

  return {
    getToken,
    saveToken,
    deleteToken,
    fetchUser,
  };
};
