import axios from "axios";
import React, { useContext, useState } from "react";
import { useQuery } from "react-query";
import { parentUrl } from "../Api/baseUrl";
import AllUsersTableRow from "../Componetns/AllUsersTableRow";
import { Toaster } from "sonner";
import { AuthContext } from "../Poveiders/AuthProvider";
import { useForm } from "react-hook-form";
import countriesWithFlag from "../Api/country";

const AllUsers = () => {
  const [showPass, setShowPass] = useState(false);
  // fetch fn
  const getUsers = async () => {
    const res = await axios.get(`${parentUrl}/users`);
    return res.data;
  };

  // show all users
  const {
    data: allusers,
    isLoading,
    error,
    refetch,
  } = useQuery({ queryKey: ["allusers"], queryFn: getUsers });

  // console.log(allusers);
  if (isLoading) {
    return <p className="text-center px-20 py-20">Loading...</p>;
  }

  if (error) {
    return <p className="text-center px-20 py-20">{error.message}</p>;
  }

  // show pass toggler
  const toggler = (e) => {
    e.preventDefault();
    setShowPass(!showPass);
  };

  // hookform
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  const password = watch("password");
  const confirmPass = watch("confirmPassword");
  const matchPassword = password === confirmPass;

  // create newuser with google createuser and also save to db
  const { createUser } = useContext(AuthContext);
  const createNewUser = () => {
    console.log("working");
  };

  return (
    <>
      <Toaster position="top-center" richColors />
      <div className="overflow-x-auto">
        <table className="table table-xs">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Email</th>
              <th>Country</th>
              <th>Phone</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {allusers.map((item, i) => (
              <AllUsersTableRow
                key={i}
                index={i + 1}
                Name={item.fullName}
                email={item.email}
                id={item._id}
                country={item.country}
                phone={item.phone}
                userStatus={item.activeStatus}
                refetch={refetch}
              />
            ))}
          </tbody>
        </table>
        {/* ass new user */}
        {/* Open the modal using document.getElementById('ID').showModal() method */}
        <div className="flex flex-col justify-center items-center gap-3 pt-10">
          <button
            className="btn btn-sm btn-circle bg-cyan-300"
            onClick={() => document.getElementById("my_modal_1").showModal()}
          >
            <img src="/add.svg" alt="add user" />
          </button>
          <p className="text-sm font-semibold">Add New User</p>
        </div>
        <dialog id="my_modal_1" className="modal">
          <div className="modal-box">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="flex flex-col gap-y-3">
                <input
                  type="text"
                  placeholder="Full Name"
                  className="input input-bordered w-full"
                  {...register("fullName", { required: true })}
                />
                <input
                  type="text"
                  placeholder="Username"
                  className="input input-bordered w-full"
                  {...register("userName", { required: true })}
                />
              </div>
              <div className="flex flex-col gap-3 mt-2">
                {/* <input
                type="text"
                placeholder="Country"
                className="input input-bordered w-full"
                {...register("country", { required: true })}
              /> */}

                <select
                  className="select select-bordered w-full"
                  {...register("country", { required: true })}
                >
                  <option className="text-lg text-slate-500" disabled selected>
                    Select your country
                  </option>
                  {countriesWithFlag.map((country, i) => (
                    <option key={i}>{country}</option>
                  ))}
                </select>

                <input
                  type="text"
                  placeholder="Phone Number"
                  className="input input-bordered w-full"
                  {...register("phone", { required: true })}
                />
                <input
                  type="email"
                  placeholder="Email"
                  className="input input-bordered w-full"
                  {...register("email", { required: true })}
                />
              </div>
              {/* password */}
              <div className="mt-2 flex flex-col gap-y-2">
                <div className="relative">
                  <input
                    type={showPass ? "text" : "password"}
                    placeholder="Password"
                    className="input input-bordered w-full"
                    {...register("password", {
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
                {errors.password && errors.password?.type === "minLength" && (
                  <p className="text-xs font-bold pt-1 text-red-400 mt-1">
                    Password must be atleast 6 characters
                  </p>
                )}
                {errors.password && errors.password?.type === "required" && (
                  <p className="text-xs font-bold pt-1 text-red-400 mt-1">
                    Password is required
                  </p>
                )}
                {errors.password && errors.password?.type === "pattern" && (
                  <p className="text-xs font-bold pt-1 text-red-400 mt-1">
                    uppercase, number and special character required
                  </p>
                )}
                <div className="relative">
                  <input
                    type={showPass ? "text" : "password"}
                    placeholder="Confirm Password"
                    className="input input-bordered w-full "
                    {...register("confirmPassword", {
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
                  Sign Up
                </button>
              ) : (
                <button className="btn-disabled border-2 border-slate-500 rounded-md px-4 py-2 mt-2 bg-indigo-200 hover:bg-indigo-300 font-bold text-sm w-full  btn text-[#111110]">
                  Sign Up
                </button>
              )}
            </form>
            <div className="modal-action">
              <form method="dialog">
                {/* if there is a button in form, it will close the modal */}
                <button className="btn">Close</button>
              </form>
            </div>
          </div>
        </dialog>
      </div>
    </>
  );
};

export default AllUsers;
