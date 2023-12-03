import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../Poveiders/AuthProvider";
import { Toaster, toast } from "sonner";

const SignUp = () => {
  const { createUser } = useContext(AuthContext);

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
  const confirmPassword = watch("consfirmPassword");
  const matchPassword = password === confirmPassword;

  // signup using google
  const handleGoogleSignUp = () => {
    console.log("Google Signup");
  };

  return (
    <div className="px-36 py-20">
      <Toaster position="top-center" richColors />
      <h1 className="text-center text-3xl font-bold text-slate-700 pb-2">
        Register Your Account
      </h1>
      {/* form data */}
      <div className="border border-slate-400 px-10 py-20 bg-[#f0fff0] rounded-lg">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex gap-4 mb-2">
            <input
              className="border bborder-[#e2e2e2] rounded-md pt-2 pb-1 px-2 bg-white w-full"
              placeholder="Name"
              {...register("fullName", { required: true })}
            />
            <input
              className="border bborder-[#e2e2e2] rounded-md pt-2 pb-1 px-2 bg-white w-full"
              placeholder="Username"
              {...register("userName", { required: true })}
            />
          </div>
          <div className="flex gap-4 mb-2">
            <input
              className="border bborder-[#e2e2e2] rounded-md pt-2 pb-1 px-2 bg-white w-full"
              placeholder="Email"
              {...register("email", { required: true })}
            />
            <input
              className="border bborder-[#e2e2e2] rounded-md pt-2 pb-1 px-2 bg-white w-full"
              placeholder="Phone Number"
              type=""
              {...register("phone", { required: true })}
            />
            <input
              className="border bborder-[#e2e2e2] rounded-md pt-2 pb-1 px-2 bg-white w-full"
              placeholder="Country"
              {...register("country", { required: true })}
            />
          </div>
          <input
            className="border bborder-[#e2e2e2] rounded-md pt-2 pb-1 px-2 bg-white w-full mb-2"
            placeholder="Password"
            {...register("password", { required: true })}
          />
          <input
            className="border bborder-[#e2e2e2] rounded-md pt-2 pb-1 px-2 bg-white w-full mb-2"
            placeholder="Confirm Password"
            {...register("confirmPassword", { required: true })}
          />

          <input
            className="px-4 py-2 rounded-lg bg-indigo-400 text-white font-bold"
            type="submit"
          />
          {/* sign up with google */}
          <div className="divider">or</div>
          <div>
            <button
              onClick={handleGoogleSignUp}
              className="px-4 pt-2 pb-1 rounded-3xl bg-white text-sm font-semibold mx-auto flex justify-center gap-2 my-4 border border-slate-500"
            >
              Sign Up with Google
              <img
                className="h-4 inline-block"
                src="/google-icon-tiny.png"
                alt="google icon"
              />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
