import React from "react";
import { Axios as axios } from "../../../utils/axios";
import { useToken } from "../../../hooks/custom/token";
import { useAppContext } from "../../../hooks/context/context";

const SigninForm = () => {
  const { saveToken } = useToken();
  const { handleCloseOverLay } = useAppContext();
  const [data, setData] = React.useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = React.useState(false);
  const [message, setMessage] = React.useState("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Prevent form from refreshing

    try {
      setLoading(true);
      const res = await axios.post("/auth/signin", data); // Send form data
      if (res.status === 200 || res.status === 201) {
        saveToken(res.data.token);
        handleCloseOverLay();
      } else {
        setMessage(res.data.errMessage);
      }
    } catch (error: any) {
      setMessage(error.response?.data?.errMessage || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <form className="mt-6" onSubmit={handleSubmit}>
      <div className="mb-4">
        <label className="block text-sm text-gray-800">Email</label>
        <input
          type="email"
          name="email"
          className="block md:w-[30vw] w-[80vw] px-4 py-2 mt-2 text-indigo-700 bg-white border rounded-md focus:border-indigo-400 focus:ring-indigo-300 focus:outline-none focus:ring focus:ring-opacity-40"
          value={data.email}
          onChange={handleChange}
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm text-gray-800">Password</label>
        <input
          type="password"
          name="password"
          className="block md:w-[30vw] w-[80vw] px-4 py-2 mt-2 text-indigo-700 bg-white border rounded-md focus:border-indigo-400 focus:ring-indigo-300 focus:outline-none focus:ring focus:ring-opacity-40"
          value={data.password}
          onChange={handleChange}
        />
      </div>
      {message && <p className="text-red-600">{message}</p>}{" "}
      {/* Error message in red */}
      <div className="mt-6">
        <button
          type="submit"
          className={`w-full ${
            loading && `bg-[#00b53fc0]`
          } px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-[#00b53f] rounded-md hover:bg-[#00b53fdb] focus:outline-none focus:bg-[#00b53fdc]`}
          disabled={loading} // Prevent button from being clicked again while loading
        >
          {loading ? "Loading..." : "Sign In"}
        </button>
      </div>
    </form>
  );
};

export default SigninForm;
