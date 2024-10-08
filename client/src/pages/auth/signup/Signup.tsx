import SignupForm from "../../../components/auth/signup/signupForm";
import { IoIosCloseCircle } from "react-icons/io";
import { useAppContext } from "../../../hooks/context/context";
import { Link } from "react-router-dom";

const Signup = () => {
  const { handleOverLaySignup } = useAppContext();

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="relative flex flex-col justify-center min-h-screen overflow-hidden">
        <div className="p-6 m-auto bg-white rounded-md shadow-xl shadow-rose-600/40 ring-2 ring-indigo-600">
          <div className="flex items-center justify-between my-2">
            <h1 className="md:text-3xl text-2xl font-semibold text-[#00b53f] uppercase">
              Sign Up
            </h1>
            <button>
              <IoIosCloseCircle
                color="#00b53f"
                onClick={handleOverLaySignup}
                size={20}
              />
            </button>
          </div>
          <SignupForm />
          <p className="mt-8 text-xs font-light text-center text-gray-700">
            Already have an account?{" "}
            <Link
              to={"/"}
              className="font-medium text-[#00b53f] hover:underline"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
