import React, { useState } from "react";
import { Link, useLoaderData } from "react-router-dom";
import { IoIosArrowDropleftCircle, IoIosSend } from "react-icons/io";
import { MdLockReset } from "react-icons/md";
import { useForm } from "react-hook-form";
import axios from "axios";
import { parentUrl } from "../Api/baseUrl";
import { Toaster, toast } from "sonner";
import { loacalServerURL } from "../Api/localURL";

const UserDetails = () => {
  const [showPass, setShowPass] = useState(false);
  const data = useLoaderData();
  const { fullName, email, userName, country, phone, activeStatus, _id } = data;

  // hookform
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  // show pass toggler
  const toggler = (e) => {
    e.preventDefault();
    setShowPass(!showPass);
  };

  const onSubmitResetPass = (data) => {
    // console.log(data);
    // *reset pass
    const payload = { password: data.pass };
    const id = _id;
    axios
      .patch(`${parentUrl}/users/reset/${id}`, payload)
      .then((res) => {
        if (res.data.modifiedCount === 1) {
          toast.success(`Password reset successfull`);
          reset();
        } else {
          toast.warning(`${res.data.message}`);
          reset();
        }
      })
      .catch((error) => {
        toast.error(error.message);
        reset();
      });
  };

  const onSubmit = (data) => {
    const mailPayload = {
      to: email,
      subject: data.subject,
      text: data.text,
    };

    console.log(mailPayload);

    axios
      .post(`${loacalServerURL}/personal-message`, mailPayload)
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  const pass = watch("pass");
  const confirmPass = watch("confirmPass");
  const matchPassword = pass === confirmPass;

  return (
    <div>
      <Toaster position="top-center" richColors />
      <div className="px-5 pt-5">
        <Link className="text-2xl flex items-end gap-1" to={"/allusers"}>
          <IoIosArrowDropleftCircle className="inline-block text-slate-700 hover:text-slate-900" />
          <span className="text-xs">Go back to All Users</span>
        </Link>
        <h1 className="text-center font-bold text-2xl text-slate-400 underline">
          Details of <span className="text-indigo-400">{fullName}</span>
        </h1>
      </div>
      <div className="px-5 py-5">
        <div className="border-2 border-border-slate-500 shadow-sm py-10 px-5 rounded-lg grid lg:grid-cols-3 grid-cols-1 items-end">
          <div>
            <h1 className="text-lg font-bold">{fullName}</h1>
            <small className="pt-0 text-sm">@sername: {userName}</small> <br />
            <small className="text-sm">Email:{email}</small>
          </div>
          <div>
            <small>Country: {country}</small> <br />
            <small>Active Status: {activeStatus}</small> <br />
            <small>Phone: {phone}</small>
          </div>
        </div>
      </div>
      {/* message and reset section */}
      <div className="px-5">
        <div className="grid lg:grid-cols-2 grid-cols-1 items-center my-4 border border-slate-300 rounded-lg p-1">
          {/* send mail */}
          <div className="px-4 py-4 bg-[#f1f9ec] rounded-s-md flex gap-2 items-center">
            <div>
              {/* send message button and text */}
              {/* You can open the modal using document.getElementById('ID').showModal() method */}
              <div className=" tooltip tooltip-right" data-tip="Send Email">
                <button
                  className="btn btn-outline btn-sm btn-circle bg-yellow-300"
                  onClick={() =>
                    document.getElementById("my_modal_mail").showModal()
                  }
                >
                  <IoIosSend className="text-xl font-bold" />
                </button>
              </div>

              <dialog id="my_modal_mail" className="modal">
                <div className="modal-box">
                  <form method="dialog">
                    {/* if there is a button in form, it will close the modal */}
                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 hover:bg-red-400">
                      <img src="/cross.svg" alt="close" />
                    </button>
                  </form>
                  <h3 className="font-bold text-lg pt-3">
                    Message: {fullName} 💬
                  </h3>
                  <p className="py-2 text-xs font-bold text-slate-400">
                    Press ESC key or click on ✕ button to close <br />
                    <span className="animate-pulse">In progress...</span>
                  </p>
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <label className="form-control w-full">
                      <div className="label">
                        <span className="label-text font-bold text-slate-600">
                          Subject
                        </span>
                      </div>
                      <input
                        type="text"
                        placeholder="Type here"
                        className="input input-bordered w-full"
                        {...register("subject")}
                      />
                    </label>
                    <label className="form-control pt-3">
                      <div className="label">
                        <span className="label-text font-bold text-slate-600">
                          Your Message
                        </span>
                      </div>
                      <textarea
                        className="textarea textarea-bordered h-24"
                        placeholder="Type here"
                        {...register("message")}
                      ></textarea>
                    </label>
                    <button
                      type="submit"
                      className="mt-3 w-full btn btn-outline bg-indigo-300 text-lg font-bold"
                    >
                      Send
                    </button>
                  </form>
                </div>
              </dialog>
            </div>
            {/* text */}
            <div>
              <h1 className="text-sm">Send Personalized Email</h1>
              <p className="text-xs">
                Say something interesting to {fullName} 👋
              </p>
            </div>
          </div>

          {/*pass and text */}
          <div className="px-4 py-4 bg-[#f1f9ec] rounded-e-md flex gap-2 items-center">
            {/*reset pass */}
            {/* You can open the modal using document.getElementById('ID').showModal() method */}
            <div className="tooltip tooltip-right" data-tip="Reset Password">
              <button
                className="btn btn-circle btn-outline btn-sm bg-emerald-300"
                onClick={() =>
                  document.getElementById("my_modal_pass").showModal()
                }
              >
                <MdLockReset className="text-2xl font-bold" />
              </button>
            </div>
            <dialog id="my_modal_pass" className="modal">
              <div className="modal-box">
                <form method="dialog">
                  {/* if there is a button in form, it will close the modal */}
                  <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 hover:bg-red-400">
                    <img src="/cross.svg" alt="close" />
                  </button>
                </form>
                <h3 className="font-bold text-lg pt-3">Password Reset 🔒</h3>
                <p className="py-2 text-xs font-bold text-slate-400">
                  Press ESC key or click on ✕ button to close <br />
                  {/* <span className="animate-pulse">In progress...</span> */}
                </p>
                <form
                  className="pt-2"
                  onSubmit={handleSubmit(onSubmitResetPass)}
                >
                  {/* password */}
                  <div className="mt-2 flex flex-col gap-y-2">
                    <div className="relative">
                      <input
                        type={showPass ? "text" : "password"}
                        placeholder="Password"
                        className="input input-bordered w-full"
                        {...register("pass", {
                          required: true,
                          minLength: 6,
                          pattern:
                            /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z])/,
                        })}
                      />
                      <button
                        onClick={toggler}
                        className="absolute right-0 top-2 text-md px-2 pt-2 pb-1 rounded-tr-md rounded-br-md"
                      >
                        {showPass ? "🕶️" : "👀"}
                      </button>
                    </div>

                    {/* validations for ui */}
                    {errors.pass && errors.pass?.type === "minLength" && (
                      <p className="text-xs font-bold pt-1 text-red-400 mt-1">
                        Password must be atleast 6 characters
                      </p>
                    )}
                    {errors.pass && errors.password?.type === "required" && (
                      <p className="text-xs font-bold pt-1 text-red-400 mt-1">
                        Password is required
                      </p>
                    )}
                    {errors.pass && errors.pass?.type === "pattern" && (
                      <p className="text-xs font-bold pt-1 text-red-400 mt-1">
                        uppercase, number and special character required
                      </p>
                    )}
                    <div className="relative">
                      <input
                        type={showPass ? "text" : "password"}
                        placeholder="Confirm Password"
                        className="input input-bordered w-full "
                        {...register("confirmPass", {
                          required: true,
                        })}
                      />
                      <button
                        onClick={toggler}
                        className="absolute right-0 top-2 text-md px-2 pt-2 pb-1 rounded-tr-md rounded-br-md"
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
                  {matchPassword ? (
                    <button
                      type="submit"
                      className="border-2 border-slate-500 rounded-md px-4 pt-2 pb-1 mt-2 bg-indigo-200 hover:bg-indigo-300 font-bold text-sm w-full  btn text-[#111110]"
                    >
                      Reset Password
                    </button>
                  ) : (
                    <button className="btn-disabled border-2 border-slate-500 rounded-md px-4 py-2 mt-2 bg-indigo-200 hover:bg-indigo-300 font-bold text-sm w-full  btn text-[#111110]">
                      Reset Password
                    </button>
                  )}
                </form>
              </div>
            </dialog>
            {/* text */}
            <div>
              <h1 className="text-sm">Reset Password of {fullName}?</h1>
              <p className="text-xs">P.S: Only admit created users</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDetails;
