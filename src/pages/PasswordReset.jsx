import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { auth } from "../firebase/firebase";
import { sendPasswordResetEmail } from "firebase/auth";
import logo from "/src/assets/images/pennywiselogo.png"

function PasswordReset() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [submittingEmail, setSubmittingEmail] = useState(false);

  const handleForgotPassword = async (data) => {
    setSubmittingEmail(true);

    try {
      await sendPasswordResetEmail(auth, data.email);
      setSubmittingEmail(false);
      alert(
        "If an account is associated with this email, you will receive a reset link shortly. Please check your spam folder.",
      );
    } catch (error) {
      console.log("Error:", error.code, error.message);
      setSubmittingEmail(false);
      alert(error.message);
    }
  };

  return (
    <div className="relative w-screen h-screen overflow-hidden">
      <div className="absolute -top-20 -right-32 w-88 h-72 md:w-120 md:h-104 bg-[#c2f139] rounded-[13rem] -rotate-45"></div>

      <div className="px-5 pt-6 md:pl-15 md:pt-10 z-20 w-full md:w-lg relative h-screen flex flex-col gap-y-[10%] md:gap-y-[13%]">
        <div>
          <img
            src={logo}
            alt="logo"
            className="w-40"
          />
        </div>

        <div>
          <div className=" text-4xl md:text-5xl font-bold text-[#2c2c2c] mb-10">
            Forgot Password?{`:(`}
          </div>

          <form onSubmit={handleSubmit(handleForgotPassword)}>
            <div className="flex flex-col group transition-colors duration-300 ease-in mb-7">
              <label className="text-[0.7rem] tracking-wider font-medium text-gray-600 group-focus-within:text-[#c2f139]">
                ENTER YOUR ACCOUNT'S EMAIL
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

            <button
              disabled={submittingEmail}
              className="w-full py-3.5 bg-[#c2f139] flex items-center justify-center rounded-3xl hover:bg-[#a8d522] text-[#2c2c2c] font-medium transition-all active:scale-[0.98]"
            >
              {submittingEmail ? "Sending..." : "Reset Password"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default PasswordReset;
