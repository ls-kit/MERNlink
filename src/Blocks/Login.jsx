import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { AuthContext } from "../Poveiders/AuthProvider";
import { Toaster, toast } from "sonner";

const Login = () => {
  // authcontext and create user
  const { signIn, googleSignIn } = useContext(AuthContext);

  //see or hide pass
  const [showPass, setShowPass] = useState(false);

  const toggler = (e) => {
    e.preventDefault();
    setShowPass(!showPass);
  };

  // form data and hanlde submit
  const { register, handleSubmit, reset } = useForm();
  const onSubmit = (data) => {
    // console.log(data);
    signIn(data.email, data.pass)
      .then((res) => {
        const loggedUser = res.user;
        toast.success("Successfully Logged in");
        // console.log(loggedUser);
        reset();
      })
      .catch((error) => {
        toast.error(`${error.message}`);
        console.log(error.message);
      });
  };

  // signin with google
  const handleGoogleSignIn = () => {
    googleSignIn()
      .then((res) => {
        if (res.status) {
          toast.success("Successfully Logged in");
        }
      })
      .catch((error) => {
        toast.error(`${error.message}`);
      });
  };

  return (
    <div className="lg:h-screen md:h-screen bg-[#fffafa]">
      <Toaster position="top-center" richColors />
      {/* hero section and user authentication */}
      <div className="grid lg:grid-cols-2 grid-cols-1 items-center">
        {/* left portion: graphics */}
        <div className="py-20 px-10 lg:order-first order-last">
          <div className="flex justify-center">
            <img className="h-72" src="/Tech Life -tiny.png" alt="Tech life" />
          </div>
          <h1 className="text-2xl font-bold text-slate-700 pt-4 text-center">
            First, Efficient and Productive
          </h1>
          <p className="text-xs text-center px-10 pt-2">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quis alias
            esse assumenda natus neque consequatur!
          </p>
        </div>

        {/* right portion: login form and others */}
        <div className="bg-[#f0fff0] px-10 pt-24 lg:order-last order-first lg:h-screen">
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
                  type="email"
                  placeholder="Email"
                  className="border border-[#e2e2e2] rounded-md pt-2 pb-1 px-2 bg-white w-full"
                  {...register("email", { required: true })}
                />
                <div className="relative">
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
                </div>
              </div>
              <div className="px-10 mt-5 flex justify-between">
                <p className="text-xs font-semibold">
                  Don't have an account?{" "}
                  <Link
                    className="text-indigo-500 hover:font-bold hover:underline"
                    to={"/signup"}
                  >
                    Sign Up
                  </Link>{" "}
                  now!
                </p>

                <p className="text-xs text-purple-600">Forgot Password</p>
              </div>

              <div className="px-10">
                <button
                  className="w-full pt-2 pb-1 px-7 mt-5 border border-slate-500 bg-[#f6ee86] hover:bg-yellow-300 rounded-md text-sm font-bold text-slate-600"
                  type="submit"
                >
                  Sign In
                </button>
              </div>
            </form>
          </div>

          <div className="divider text-sm font-bold text-slate-300">or</div>
          {/* sign in with goole */}
          <button
            onClick={handleGoogleSignIn}
            className="px-4 pt-2 pb-1 rounded-3xl bg-white text-sm font-semibold mx-auto flex justify-center gap-2 my-4 border border-slate-500"
          >
            Sign in with Google
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
