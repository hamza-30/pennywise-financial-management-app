import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { IoEyeOutline } from "react-icons/io5";
import { IoEyeOffOutline } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../firebase/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import Spinner from "../components/Spinner";
import { useAuthContext } from "../context/AuthContext/AuthContextProvider";

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [showPassword, setShowPassword] = useState(false);
  const [ isSubmitting, setIsSubmitting ] = useState(false)

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    setIsSubmitting(true)
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        data.email,
        data.password,
      );

      console.log("User signed in", userCredential.user);
      navigate("/");
    } catch (error) {
      setIsSubmitting(false)
      console.error("Signup error", error.code, error.message);
      alert(error.message);
    }
  };

  if(isSubmitting){
    return <Spinner message={"Logging in"} fullPage={true}/>
  }

  return (
    <div className="relative w-screen h-screen overflow-hidden">
      <div className="absolute -top-20 -right-32 w-88 h-72 md:w-120 md:h-104 bg-[#c2f139] rounded-[13rem] -rotate-45"></div>

      <div className="px-5 pt-6 md:pl-15 md:pt-10 z-20 w-full md:w-lg relative h-screen flex flex-col gap-y-[10%] md:gap-y-[13%]">
        <div>
          <img
            src="/src/assets/images/pennywiselogo.png"
            alt="logo"
            className="w-40"
          />
        </div>

        <div>
          <div className="text-5xl font-bold text-[#2c2c2c] mb-10">
            Welcome back.
          </div>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col group transition-colors duration-300 ease-in mb-7">
              <label className="text-[0.7rem] tracking-wider font-medium text-gray-600 group-focus-within:text-[#c2f139]">
                EMAIL ADDRESS
              </label>
              <input
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                    message: "Please enter a valid email address",
                  },
                })}
                className={`py-2.5 border-b border-b-gray-200 outline-none focus:border-b-[#c2f139] focus:border-b-2 font-medium
                  ${errors.email && "border-b-red-400"}`}
              />
              {errors.email && (
                <span className="text-red-500 text-[10px] mt-1 tracking-tighter">
                  {errors.email.message}
                </span>
              )}
            </div>

            <div className="flex flex-col group transition-colors duration-300 ease-in relative">
              <label className="text-[0.7rem] tracking-wider font-medium text-gray-600 group-focus-within:text-[#c2f139]">
                PASSWORD
              </label>

              <div className="relative flex items-center">
                <input
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 8,
                      message: "Password should have minimum 8 characters",
                    },
                  })}
                  type={showPassword ? "text" : "password"}
                  className={`w-full py-2.5 border-b border-b-gray-200 outline-none focus:border-b-[#c2f139] focus:border-b-2 font-medium pr-10
                    ${errors.password && "border-b-red-400"}`}
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-0 bottom-3 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showPassword ? (
                    <IoEyeOffOutline size={18} />
                  ) : (
                    <IoEyeOutline size={18} />
                  )}
                </button>
              </div>

              {errors.password && (
                <span className="text-red-500 text-[10px] mt-1 tracking-tighter">
                  {errors.password.message}
                </span>
              )}
            </div>

            <div className="text-[0.82rem] text-right mt-3 underline text-gray-600 cursor-pointer hover:text-gray-400 mb-10">
              <Link to={"/forgotpassword"}>
                Forgot password?
              </Link>
            </div>

            <button className="w-full py-3.5 bg-[#c2f139] flex items-center justify-center rounded-3xl hover:bg-[#a8d522] text-[#2c2c2c] font-medium transition-all active:scale-[0.98]">
              Log in
            </button>

            <div className="text-sm mt-6 text-gray-600 text-center">
              Don't have an account?{" "}
              <Link
                to={"/signup"}
                className="text-black underline font-medium hover:text-gray-600 active:text-gray-600"
              >
                Sign up
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
