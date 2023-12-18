import React from "react";
import { useForm } from "react-hook-form";
import { MdVerified } from "react-icons/md";

const CehckWebStatus = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  return (
    <>
      <div className="w-full">
        {/* You can open the modal using document.getElementById('ID').showModal() method */}

        <button
          className="btn btn-outline btn-md bg-emerald-400 w-full"
          onClick={() => document.getElementById("my_modal_3").showModal()}
        >
          <MdVerified className="text-xl" />
          Check Status
        </button>
        <dialog id="my_modal_3" className="modal">
          <div className="modal-box">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                ✕
              </button>
            </form>
            <h3 className="font-bold text-lg">Hello!</h3>
            <p className="py-4">Press ESC key or click on ✕ button to close</p>
          </div>
        </dialog>
      </div>
    </>
  );
};

export default CehckWebStatus;
