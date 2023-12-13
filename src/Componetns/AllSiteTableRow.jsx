import axios from "axios";
import React from "react";
import { FaTrash, FaUserEdit } from "react-icons/fa";
import { PiRadioactiveFill } from "react-icons/pi";
import { parentUrl } from "../Api/baseUrl";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { webCategory } from "../Api/siteCategory";

const AllSiteTableRow = ({
  index,
  siteName,
  category,
  monthlyVisit,
  launchDate,
  siteStatus,
  refetch,
  requestedCount,
  siteID,
}) => {
  // hookform
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  //* onSubmit update data to backend
  const onSubmit = (data) => {
    // console.log(data);
    const payLoad = {
      category: data.category,
      addedSite: data.addedSite,
      monthlyOrgVisit: data.monthlyVisit,
    };

    const siteID = data.siteID;

    axios
      .patch(`${parentUrl}/offer-backlink/update/${siteID}`, payLoad)
      .then((res) => {
        toast.success(`${siteName} Updated`);
        reset();
        refetch();
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  const handleDelete = (id) => {
    axios
      .delete(`${parentUrl}/offer-backlink/delete/${id}`)
      .then((res) => {
        console.log(res.status);
        toast.warning(`Site Deleted`);
        refetch();
      })
      .catch((error) => {
        toast.error(`${error.message}`);
      });
    // console.log(id);
  };

  const handleDeactivate = (id) => {
    axios
      .patch(`${parentUrl}/offer-backlink/deactivate/${id}`)
      .then((res) => {
        toast.success(`${siteName} Deactivated`);
        refetch();
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  const handleActivate = (id) => {
    axios
      .patch(`${parentUrl}/offer-backlink/activate/${id}`)
      .then((res) => {
        toast.success(`Site Activated`);
        refetch();
      })
      .catch((error) => {
        toast.error(`${error.message}`);
      });
  };

  return (
    <>
      <tr>
        <th>{index}</th>
        <td>{siteName}</td>
        <td>{category}</td>
        <td>{monthlyVisit}</td>
        <td>{launchDate}</td>
        <td>{requestedCount}</td>
        <td className="flex gap-3">
          {/* edit */}
          <div>
            {/* You can open the modal using document.getElementById('ID').showModal() method */}
            <button
              className="btn btn-outline btn-sm bg-emerald-300"
              onClick={() =>
                document.getElementById(`my_modal_${index}`).showModal()
              }
            >
              <FaUserEdit /> Edit
            </button>
            <dialog id={`my_modal_${index}`} className="modal">
              <div className="modal-box">
                <form method="dialog">
                  {/* if there is a button in form, it will close the modal */}
                  <button className="btn btn-sm btn-circle btn-ghost hover:bg-red-400 absolute right-2 top-2">
                    <img src="/cross.svg" alt="cross" />
                  </button>
                </form>
                <h3 className="font-bold text-lg">Edit {siteName}'s Info ⌨</h3>
                <form className="py-4" onSubmit={handleSubmit(onSubmit)}>
                  <div className="flex flex-col gap-3">
                    <input
                      value={siteID}
                      type="text"
                      className="input input-bordered w-full input-xs hidden"
                      {...register("siteID")}
                    />
                    <select
                      className="select select-bordered w-full"
                      {...register("category", { required: true })}
                    >
                      <option
                        className="text-lg text-slate-500"
                        disabled
                        selected
                      >
                        Select Category
                      </option>
                      {webCategory.map((country, i) => (
                        <option key={i}>{country}</option>
                      ))}
                    </select>

                    <label className="form-control w-full">
                      <div className="label">
                        <span className="label-text">Update Your URL</span>
                      </div>
                      <input
                        type="text"
                        placeholder="Type here"
                        className="input input-bordered w-full input-md"
                        {...register("addedSite", {
                          required: true,
                          pattern: /^www\..+\.(com|net|org|io|info|co|edu)$/,
                        })}
                      />
                      {errors.addedSite &&
                        errors.addedSite?.type === "pattern" && (
                          <span className="text-xs py-2 font-semibold text-red-400">
                            Start with www. and end with .com or TLDs
                          </span>
                        )}
                    </label>
                    <input
                      type="number"
                      placeholder="Update Monthly Visits"
                      className="input input-bordered w-full"
                      {...register("monthlyVisit", { required: true })}
                    />
                  </div>
                  <div className="flex gap-x-3 pt-5">
                    <button
                      // onClick={() => updateUserInfo(id)}
                      type="submit"
                      className="btn btn-sm btn-outline bg-green-300"
                    >
                      Upadate Site
                    </button>
                    <button
                      onClick={() => handleActivate(siteID)}
                      className="btn btn-sm btn-outline bg-cyan-300"
                    >
                      Activate Site
                    </button>
                  </div>
                </form>
                {/* action buttons */}
              </div>
            </dialog>
          </div>
          {/* delete */}
          {/* Open the modal using document.getElementById('ID').showModal() method */}
          <button
            className="btn btn-outline btn-sm bg-red-300"
            onClick={() => document.getElementById(`${siteID}`).showModal()}
          >
            <FaTrash /> Delete
          </button>
          <dialog id={`${siteID}`} className="modal">
            <div className="modal-box">
              <h3 className="font-bold text-lg">Delete permanently🗑️</h3>
              <p className="pt-4">{siteName}</p>
              <p className="text-xs py-1">This can not be undone</p>
              <div className="modal-action flex justify-start">
                <button
                  onClick={() => handleDelete(siteID)}
                  //   disabled={btnDisable}
                  className={"btn btn-outline btn-sm bg-red-300"}
                >
                  Yes, Delete
                </button>
                <form method="dialog">
                  {/* if there is a button in form, it will close the modal */}
                  <button className="btn btn-outline btn-sm">Close</button>
                </form>
              </div>
            </div>
          </dialog>
          {/* deactivate */}
          <button
            onClick={() => handleDeactivate(siteID)}
            disabled={siteStatus === "deactivated" ? true : false}
            className={"btn btn-outline btn-sm bg-yellow-300"}
          >
            <PiRadioactiveFill />{" "}
            <p>{siteStatus === "deactivated" ? "Deactivated" : "Deactivate"}</p>
          </button>
        </td>
      </tr>
    </>
  );
};

export default AllSiteTableRow;
