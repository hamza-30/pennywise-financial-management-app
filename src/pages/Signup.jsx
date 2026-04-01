import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { IoEyeOutline } from "react-icons/io5";
import { IoEyeOffOutline } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import { auth, db } from "../firebase/firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useAuthContext } from "../context/AuthContext/AuthContextProvider";
import Spinner from "../components/Spinner";
import { toast } from "react-hot-toast";
import { doc, setDoc } from "firebase/firestore";
import logo from "/src/assets/images/pennywiselogo.png"

function Signup() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const passwordValue = watch("password");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password,
      );

      await updateProfile(userCredential.user, { displayName: data.fullname });
      const user = userCredential.user

      await setDoc(doc(db, "users", user.uid), {
        fullname: data.fullname,
        email: data.email,
        initialBalance: 0,
        userId: user.uid,
      })
      
      navigate("/");
      toast.success(`Welcome to PennyWise, ${data.fullname}!`, { duration: 2000 });
    } catch (error) {
      setIsSubmitting(false);
      console.error("Signup error", error.code, error.message);
      
      let errorMessage = "Registration failed. Please try again.";
    
      switch (error.code) {
        case "auth/email-already-in-use":
          errorMessage = "This email is already registered.";
          break;
        case "auth/invalid-email":
          errorMessage = "Please provide a valid email address.";
          break;
        case "auth/weak-password":
          errorMessage = "Password is too weak. Try a stronger one.";
          break;
        case "auth/network-request-failed":
          errorMessage = "Network error. Check your connection.";
          break;
        default:
          errorMessage = error.message;
      }

      toast.error(errorMessage, { duration: 2000 });
    }
  };

  if (isSubmitting) {
    return <Spinner message={"Signing up"} fullPage={true} />;
  }

  return (
    <div className="relative w-screen h-screen overflow-x-hidden overflow-y-scroll">
      <div className="absolute -top-20 -right-32 w-88 h-72 md:w-120 md:h-104 bg-[#c2f139] rounded-[13rem] -rotate-45"></div>

      <div className="px-5 pt-6 md:pl-15 md:pt-10 z-20 w-full md:w-lg relative h-screen flex flex-col gap-y-[7%] md:gap-y-[7%]">
        <Link
          to={"/signup"}
        >
          <img
            src={logo}
            alt="logo"
            className="w-40"
          />
        </Link>

        <div>
          <div className="text-4xl md:text-5xl font-bold text-[#2c2c2c] mb-10">
            Create account.
          </div>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col group transition-colors duration-300 ease-in mb-7">
              <label className="text-[0.7rem] tracking-wider font-medium text-gray-600 group-focus-within:text-[#c2f139]">
                FULL NAME
              </label>
              <input
                {...register("fullname", {
                  required: "Full name is required",
                })}
                className={`py-2.5 border-b border-b-gray-200 outline-none focus:border-b-[#c2f139] focus:border-b-2 font-medium
                 ${errors.fullname && "border-b-red-400"}`}
              />
              {errors.fullname && (
                <span className="text-red-500 text-[10px] mt-1 tracking-tighter">
                  {errors.fullname.message}
                </span>
              )}
            </div>

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

            <div className="flex flex-col group transition-colors duration-300 ease-in relative mb-7">
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

            <div className="flex flex-col group transition-colors duration-300 ease-in relative">
              <label className="text-[0.7rem] tracking-wider font-medium text-gray-600 group-focus-within:text-[#c2f139]">
                CONFIRM PASSWORD
              </label>

              <div className="relative flex items-center">
                <input
                  {...register("confirmpassword", {
                    required: "Please confirm your password",
                    validate: (value) =>
                      value == passwordValue || "Passwords do not match",
                  })}
                  type={showConfirmPassword ? "text" : "password"}
                  className={`w-full py-2.5 border-b border-b-gray-200 outline-none focus:border-b-[#c2f139] focus:border-b-2 font-medium pr-10
                    ${errors.confirmpassword && "border-b-red-400"}`}
                />

                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-0 bottom-3 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showConfirmPassword ? (
                    <IoEyeOffOutline size={18} />
                  ) : (
                    <IoEyeOutline size={18} />
                  )}
                </button>
              </div>

              {errors.confirmpassword && (
                <span className="text-red-500 text-[10px] mt-1 tracking-tighter">
                  {errors.confirmpassword.message}
                </span>
              )}
            </div>

            <button className="w-full py-3.5 mt-8 bg-[#c2f139] flex items-center justify-center rounded-3xl hover:bg-[#a8d522] text-[#2c2c2c] font-medium transition-all active:scale-[0.98]">
              Sign up
            </button>

            <div className="text-sm mt-6 text-gray-600 text-center">
              Already have an account?{" "}
              <Link
                to={"/login"}
                className="text-black underline font-medium hover:text-gray-600 active:text-gray-600"
              >
                Log in
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Signup;
