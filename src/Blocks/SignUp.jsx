import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../Poveiders/AuthProvider";
import { Toaster, toast } from "sonner";
import { Link } from "react-router-dom";

const SignUp = () => {
  const { createUser, googleSignIn } = useContext(AuthContext);
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
        toast.success("Account created successfully");
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
    googleSignIn()
      .then((res) => {
        toast.success("Account created successfully");
      })
      .catch((error) => {
        toast.error(`${error.message}`);
      });
  };

  return (
    <div className="grid lg:grid-cols-2 grid-cols-1 items-center">
      <Toaster position="top-center" richColors />

      {/* first grid column */}
      <div className="bg-[#F8F8FF] py-20 h-screen">
        <h1 className="text-2xl font-bold text-slate-700 px-20">
          Register / Sign Up
        </h1>
        <p className="text-xs px-20 pb-4 pt-1">
          Create your account first, provide all the valid info. <br />
          All the fields are required
        </p>

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
            className="border border-slate-600 rounded-md px-4 pt-2 pb-1 mt-2 w-full bg-indigo-200 hover:bg-indigo-300 text-slate-700 font-bold text-sm"
          >
            Sign Up
          </button>
        </form>
        <div className="divider text-sm font-bold text-slate-500 px-20 mt-5">
          or
        </div>
        <div className="px-20 my-1">
          <h1 className="text-xs text-center">
            Already have an account?{" "}
            <Link className="text-indigo-500 hover:font-bold" to={"/"}>
              Log In
            </Link>{" "}
            instead
          </h1>
        </div>
        {/* sign in with google */}
        <button
          onClick={handleGoogleSignUp}
          className="px-4 pt-2 pb-1 rounded-3xl bg-white text-sm font-semibold mx-auto flex justify-center gap-2 my-4 border border-slate-500 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300"
        >
          Sign Up with Google
          <img
            className="h-4 inline-block"
            src="/google-icon-tiny.png"
            alt="google icon"
          />
        </button>
      </div>

      {/* second grid column */}
      <div className="py-20 px-10">
        <div className="flex justify-center">
          <img
            className="h-72"
            src="/Tech-Life-Schedule-Meeting-tiny.png"
            alt="Tech life"
          />
        </div>
        <h1 className="text-2xl font-bold text-slate-700 pt-4 text-center">
          First, Efficient and Productive
        </h1>
        <p className="text-xs text-center px-10 pt-2">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quis alias
          esse assumenda natus neque consequatur!
        </p>
      </div>
    </div>
  );
};

export default SignUp;
