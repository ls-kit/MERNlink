import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../Poveiders/AuthProvider";
import { Toaster, toast } from "sonner";

const SignUp = () => {
  const { createUser } = useContext(AuthContext);
  const [showPass, setShowPass] = useState(false);
  const toggler = (e) => {
    e.preventDefault();
    setShowPass(!showPass);
  };

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    createUser(data.email, data.password)
      .then((res) => {
        toast.success("Account Created");
        reset();
      })
      .catch((error) => {
        if (error) {
          toast.error(`${error.message}`);
        }
      });
  };

  const password = watch("password");
  const confirmPass = watch("confirmPassword");
  const matchPassword = password === confirmPass;

  // signup using google
  const handleGoogleSignUp = () => {
    console.log("Google Signup");
  };

  return (
    <div className="grid grid-cols-2">
      <Toaster position="top-center" richColors />
      <div className="bg-[#EEEEFF] py-20 h-screen">
        <h1 className="text-2xl font-bold text-slate-700 mb-4 px-20">
          Register Your Account
        </h1>

        {/* form */}
        <form className="px-20" onSubmit={handleSubmit(onSubmit)}>
          <div className="flex gap-3">
            <input
              type="text"
              placeholder="Full Name"
              className="border border-[#e2e2e2] rounded-md pt-2 pb-1 px-2 bg-white w-full"
              {...register("fullName", { required: true })}
            />
            <input
              type="text"
              placeholder="Username"
              className="border border-[#e2e2e2] rounded-md pt-2 pb-1 px-2 bg-white w-full"
              {...register("userName", { required: true })}
            />

            {/* <div className="relative">
              <input
                type={showPass ? "text" : "password"}
                placeholder="Password"
                className="border border-[#e2e2e2] rounded-md pt-2 pb-1 px-2 w-full bg-white"
                {...register("pass", { required: true })}
              />
              <button
                onClick={toggler}
                className="absolute right-0 top-0 text-md px-2 pt-2 pb-1 rounded-tr-md rounded-br-md"
              >
                {showPass ? "🕶️" : "👀"}
              </button>
            </div> */}
          </div>
          <div className="flex flex-col gap-3 mt-2">
            <input
              type="text"
              placeholder="Country"
              className="border border-[#e2e2e2] rounded-md pt-2 pb-1 px-2 bg-white w-full"
              {...register("country", { required: true })}
            />
            <input
              type="text"
              placeholder="Phone Number"
              className="border border-[#e2e2e2] rounded-md pt-2 pb-1 px-2 bg-white w-full"
              {...register("phone", { required: true })}
            />
            <input
              type="email"
              placeholder="Email"
              className="border border-[#e2e2e2] rounded-md pt-2 pb-1 px-2 bg-white w-full"
              {...register("email", { required: true })}
            />
          </div>
          {/* password */}
          <div className="mt-2 flex flex-col gap-2">
            <div className="relative">
              <input
                type={showPass ? "text" : "password"}
                placeholder="Password"
                className="border border-[#e2e2e2] rounded-md pt-2 pb-1 px-2 w-full bg-white"
                {...register("password", {
                  required: true,
                  minLength: 6,
                  pattern: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z])/,
                })}
              />
              <button
                onClick={toggler}
                className="absolute right-0 top-0 text-md px-2 pt-2 pb-1 rounded-tr-md rounded-br-md"
              >
                {showPass ? "🕶️" : "👀"}
              </button>
            </div>

            {/* validations for ui */}
            {errors.password?.type == "minLength" && (
              <p className="text-xs font-bold pt-1 text-red-400 mt-1">
                Password must be atleast 6 characters
              </p>
            )}
            {errors.password?.type === "required" && (
              <p className="text-xs font-bold pt-1 text-red-400 mt-1">
                Password is required
              </p>
            )}
            {errors.password?.type === "pattern" && (
              <p className="text-xs font-bold pt-1 text-red-400 mt-1">
                uppercase, number and special character required
              </p>
            )}
            <div className="relative">
              <input
                type={showPass ? "text" : "password"}
                placeholder="Confirm Password"
                className="border border-[#e2e2e2] rounded-md pt-2 pb-1 px-2 w-full bg-white"
                {...register("confirmPassword", {
                  required: true,
                })}
              />
              <button
                onClick={toggler}
                className="absolute right-0 top-0 text-md px-2 pt-2 pb-1 rounded-tr-md rounded-br-md"
              >
                {showPass ? "🕶️" : "👀"}
              </button>
            </div>
            {matchPassword ? (
              <p className="text-xs font-bold text-emerald-300 pt-1">
                Password match
              </p>
            ) : (
              <p className="text-xs font-bold text-red-400 pt-1">
                Password don't match
              </p>
            )}
          </div>
          <button
            type="submit"
            className="border border-slate-600 rounded-md px-4 pt-2 pb-1 mt-2 w-full bg-indigo-300 hover:bg-indigo-400 text-white font-bold text-sm"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
