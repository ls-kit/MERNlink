import React from "react";
import { Link, useLoaderData } from "react-router-dom";
import { IoIosArrowDropleftCircle, IoIosSend } from "react-icons/io";
import { MdLockReset } from "react-icons/md";

const UserDetails = () => {
  const data = useLoaderData();
  const { fullName, email, userName, country, phone, activeStatus, _id } = data;

  return (
    <div>
      <div className="px-5 pt-5">
        <Link className="text-2xl flex items-end gap-1" to={"/allusers"}>
          <IoIosArrowDropleftCircle className="inline-block text-slate-700 hover:text-slate-900" />
          <span className="text-xs">Go back to All Users</span>
        </Link>
        <h1 className="text-center font-semibold">Info of {fullName}</h1>
      </div>
      <div className="px-5 py-5">
        <div className="border border-[#e2e2e2] shadow-sm py-10 px-5 rounded-lg grid lg:grid-cols-3 grid-cols-1">
          <div>
            <h1>{fullName}</h1>
            <small className="pt-0">@sername: {userName}</small> <br />
            <small>Email:{email}</small>
          </div>
          <div>
            <small>Country: {country}</small> <br />
            <small>Active Status: {activeStatus}</small> <br />
            <small>Phone: {phone}</small>
          </div>
          <div className="flex flex-col gap-4 items-start">
            {/* send mail */}
            <div>
              {/* You can open the modal using document.getElementById('ID').showModal() method */}
              <div
                className=" tooltip tooltip-open tooltip-right"
                data-tip="Send Email"
              >
                <button
                  className="btn btn-outline btn-sm btn-circle bg-yellow-300"
                  onClick={() =>
                    document.getElementById("my_modal_3").showModal()
                  }
                >
                  <IoIosSend className="text-xl font-bold" />
                </button>
              </div>
              <dialog id="my_modal_3" className="modal">
                <div className="modal-box">
                  <form method="dialog">
                    {/* if there is a button in form, it will close the modal */}
                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                      ✕
                    </button>
                  </form>
                  <h3 className="font-bold text-lg">Hello!</h3>
                  <p className="py-4">
                    Press ESC key or click on ✕ button to close
                  </p>
                </div>
              </dialog>
            </div>
            {/* reset pass */}
            <div>
              {/* You can open the modal using document.getElementById('ID').showModal() method */}
              <div
                className="tooltip tooltip-open tooltip-right"
                data-tip="Reset Password"
              >
                <button
                  className="btn btn-circle btn-outline btn-sm bg-emerald-300"
                  onClick={() =>
                    document.getElementById("my_modal_3").showModal()
                  }
                >
                  <MdLockReset className="text-2xl font-bold" />
                </button>
              </div>
              <dialog id="my_modal_3" className="modal">
                <div className="modal-box">
                  <form method="dialog">
                    {/* if there is a button in form, it will close the modal */}
                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                      ✕
                    </button>
                  </form>
                  <h3 className="font-bold text-lg">Hello!</h3>
                  <p className="py-4">
                    Press ESC key or click on ✕ button to close
                  </p>
                </div>
              </dialog>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDetails;
