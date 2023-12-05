import React, { useContext } from "react";
import { AuthContext } from "../Poveiders/AuthProvider";
import { useForm } from "react-hook-form";
import { Toaster, toast } from "sonner";
import { Link } from "react-router-dom";

const ResetPass = () => {
  const { resetPass } = useContext(AuthContext);

  const { register, handleSubmit, reset } = useForm();
  const onSubmit = (data) => {
    console.log(data.email);
    resetPass(data.email)
      .then((res) => {
        toast.success(`A reset link has been sent to your email`);
        reset();
      })
      .catch((error) => toast.error(error.message));
  };

  return (
    <div className="px-20 py-20">
      <Toaster position="top-center" richColors />
      <h1 className="text-2xl font-bold text-slate-700 text-center">
        Give your email address
      </h1>
      <p className="text-xs text-center pt-2">
        This email should be the exact email of <br /> your registered account
      </p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex justify-center mt-2 gap-2">
          <input
            type="email"
            placeholder="Your email"
            className="input input-bordered input-md w-full max-w-xs"
            {...register("email", { required: true })}
          />
          <input className="btn btn-outline" type="submit" />
        </div>
      </form>
      <p className="text-xs text-center pt-10">
        Go back to{" "}
        <Link className="hover:text-indigo-400 font-bold" to={"/login"}>
          Log in
        </Link>{" "}
        after resetting password
      </p>
    </div>
  );
};

export default ResetPass;
