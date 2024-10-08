import { IoIosCloseCircle } from "react-icons/io";
import { useAppContext } from "../../../hooks/context/context";
import SigninForm from "../../../components/auth/login/signinForm";

const Signin = () => {
  const { handleOverLaySignin } = useAppContext();
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="relative flex flex-col justify-center min-h-screen overflow-hidden">
        <div className="p-6 m-auto bg-white rounded-md shadow-xl shadow-rose-600/40 ring-2 ring-indigo-600">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-semibold text-[#00b53f] uppercase">
              Sign In
            </h1>
            <button>
              <IoIosCloseCircle
                color="#00b53f"
                onClick={handleOverLaySignin}
                size={20}
              />
            </button>
          </div>
          <SigninForm />
          <p className="mt-8 text-xs font-light text-center text-gray-700">
            Don't have an account?{" "}
            <a href="#" className="font-medium text-[#00b53f] hover:underline">
              Sign up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signin;
