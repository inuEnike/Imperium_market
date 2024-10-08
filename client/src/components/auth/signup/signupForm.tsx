import React from "react";
import { Axios as axios } from "../../../utils/axios";

const SignupForm = () => {
  const [data, setData] = React.useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    phoneNumber: "",
    repeatpassword: "",
  });
  const [loading, setLoading] = React.useState(false);
  const [message, setMessage] = React.useState("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Prevent form from refreshing

    try {
      setLoading(true);
      const res = await axios.post("/auth/signup", data); // Send form data
      setMessage(res.data.message); // Handle success case
      setData({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        phoneNumber: "",
        repeatpassword: "",
      });
    } catch (error: any) {
      if (error.response) {
        setMessage(error.response.data.errMessage);
      }
    } finally {
      setLoading(false); // Always stop loading after the request is complete
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
      <div className="md:mb-4 mb-2">
        <label className="block text-sm text-gray-800">Firstname</label>
        <input
          type="text"
          name="firstName"
          className="block md:w-[30vw] w-[80vw] px-4 py-2 mt-2 text-indigo-700 bg-white border rounded-md focus:border-indigo-400 focus:ring-indigo-300 focus:outline-none focus:ring focus:ring-opacity-40"
          value={data.firstName}
          onChange={handleChange}
        />
      </div>
      <div className="md:mb-4 mb-2">
        <label className="block text-sm text-gray-800">Lastname</label>
        <input
          type="text"
          name="lastName"
          className="block md:w-[30vw] w-[80vw] px-4 py-2 mt-2 text-indigo-700 bg-white border rounded-md focus:border-indigo-400 focus:ring-indigo-300 focus:outline-none focus:ring focus:ring-opacity-40"
          value={data.lastName}
          onChange={handleChange}
        />
      </div>
      <div className="md:mb-4 mb-2">
        <label className="block text-sm text-gray-800">Email</label>
        <input
          type="email"
          name="email"
          className="block md:w-[30vw] w-[80vw] px-4 py-2 mt-2 text-indigo-700 bg-white border rounded-md focus:border-indigo-400 focus:ring-indigo-300 focus:outline-none focus:ring focus:ring-opacity-40"
          value={data.email}
          onChange={handleChange}
        />
      </div>
      <div className="md:mb-4 mb-2">
        <label className="block text-sm text-gray-800">Phone Number</label>
        <input
          type="number"
          name="phoneNumber"
          className="block md:w-[30vw] w-[80vw] px-4 py-2 mt-2 text-indigo-700 bg-white border rounded-md focus:border-indigo-400 focus:ring-indigo-300 focus:outline-none focus:ring focus:ring-opacity-40"
          value={data.phoneNumber}
          onChange={handleChange}
        />
      </div>
      <div className="md:mb-4 mb-2">
        <label className="block text-sm text-gray-800">Password</label>
        <input
          type="password"
          name="password"
          className="block md:w-[30vw] w-[80vw] px-4 py-2 mt-2 text-indigo-700 bg-white border rounded-md focus:border-indigo-400 focus:ring-indigo-300 focus:outline-none focus:ring focus:ring-opacity-40"
          value={data.password}
          onChange={handleChange}
        />
      </div>
      <div className="md:mb-4 mb-2">
        <label className="block text-sm text-gray-800">Repeat Password</label>
        <input
          type="password"
          name="repeatpassword"
          className="block md:w-[30vw] w-[80vw] px-4 py-2 mt-2 text-indigo-700 bg-white border rounded-md focus:border-indigo-400 focus:ring-indigo-300 focus:outline-none focus:ring focus:ring-opacity-40"
          value={data.repeatpassword}
          onChange={handleChange}
        />
      </div>
      {message && (
        <p className="text-red-600 text-sm md:w-[30vw] w-[80vw]">{message}</p>
      )}
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

export default SignupForm;
