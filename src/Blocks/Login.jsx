import React from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

const Login = () => {
  // form data and hanlde submit
  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => console.log(data);

  return (
    <div className="h-screen bg-[#fffafa]">
      {/* hero section and user authentication */}
      <div className="grid lg:grid-cols-2 grid-cols-1 gap-5">
        {/* left portion: graphics */}
        <div></div>

        {/* right portion: login form and others */}
        <div className="bg-[#f0fff0] px-10 pt-24 h-screen">
          <div className="flex gap-x-2 items-end justify-center">
            <img
              className="h-10 mb-3 order-2"
              src="/waving-hand-tiny.png"
              alt="waving hand"
            />
            <h1 className="text-4xl font-bold text-slate-700 order-1">
              Welcome
            </h1>
          </div>
          <p className="text-xs py-1 font-semibold text-center">
            Please sign in to your account
          </p>

          {/* login form / form data */}
          <div className="py-10">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="flex flex-col gap-3 px-10">
                <input
                  placeholder="Email"
                  className="border border-[#e2e2e2] rounded-md pt-2 pb-1 px-2"
                  {...register("email")}
                />
                <input
                  placeholder="Password"
                  className="border border-[#e2e2e2] rounded-md pt-2 pb-1 px-2"
                  {...register("pass")}
                />
              </div>
              <div className="px-10 mt-5 flex justify-between">
                <p className="text-xs font-semibold">
                  Don't have an account?{" "}
                  <Link
                    className="text-indigo-500 hover:font-bold hover:underline"
                    to={""}
                  >
                    Sign Up
                  </Link>{" "}
                  now!
                </p>

                <p className="text-xs text-purple-600">Forgot Password</p>
              </div>

              <div className="px-10">
                <button
                  className="w-full pt-2 pb-1 px-7 mt-5 border border-slate-100 bg-[#f6ee86] hover:bg-yellow-300 rounded-md text-sm font-bold text-slate-600"
                  type="submit"
                >
                  Sign In
                </button>
              </div>
            </form>
          </div>

          <div className="divider text-sm font-bold text-slate-300">or</div>
          {/* sign in with goole */}
          <button className="px-4 pt-2 pb-1 rounded-3xl bg-white text-sm font-semibold mx-auto flex justify-center gap-2 my-4">
            Sign in with Google{" "}
            <img
              className="h-4 inline-block"
              src="/google-icon-tiny.png"
              alt="google icon"
            />
          </button>
        </div>
      </div>
      {/* end of grid */}
    </div>
  );
};

export default Login;
