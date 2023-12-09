import React, { useContext } from "react";
import { AuthContext } from "../Poveiders/AuthProvider";
import { useForm } from "react-hook-form";

const ReqLinkTbRow = ({ index, url, lanchDate }) => {
  // logged in user data
  const { user } = useContext(AuthContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  //   submitted data from modal
  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <tbody>
      {/* row 1 */}
      <tr>
        <th>{index}</th>
        <td>
          <button
            className="btn btn-outline"
            onClick={() => document.getElementById("my_modal_1").showModal()}
          >
            Request Back-Link
          </button>
          <dialog id="my_modal_1" className="modal">
            <div className="modal-box">
              <div className="">
                <form onSubmit={handleSubmit(onSubmit)}>
                  <label className="form-control w-full">
                    <div className="label">
                      <span className="label-text">Given Back-Link URL</span>
                    </div>
                    <input
                      type="text"
                      placeholder="Type here"
                      className="input input-bordered w-full"
                      {...register("requestedBackLink", {
                        required: true,
                        pattern: /^www\..+\.(com|net|org|io|info|co|edu)$/,
                      })}
                    />
                    {errors.requestedBackLink &&
                      errors.requestedBackLink?.type === "pattern" && (
                        <span className="text-xs py-2 font-semibold text-red-400">
                          Start with www. and end with .com or TLDs
                        </span>
                      )}
                  </label>
                  <label className="form-control pt-1">
                    <div className="label">
                      <span className="label-text">Your Message</span>
                    </div>
                    <textarea
                      className="textarea textarea-bordered h-24"
                      placeholder="Bio"
                      {...register("message")}
                    ></textarea>
                  </label>
                  {/* if there is a button in form, it will close the modal */}
                  {/* <button className="btn">Close</button> */}
                  <div className="flex items-center gap-x-2 mt-3">
                    <input
                      className="btn btn-outline"
                      type="submit"
                      value={"Send Request"}
                    />
                    <form method="dialog">
                      <button className="btn btn-outline">Close</button>
                    </form>
                  </div>
                </form>
              </div>
            </div>
          </dialog>
        </td>
        <td>{url}</td>
        <td>{lanchDate}</td>
      </tr>
    </tbody>
  );
};

export default ReqLinkTbRow;
