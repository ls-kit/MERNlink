import React from "react";
import { FaTrash, FaUserEdit } from "react-icons/fa";
import { PiRadioactiveFill } from "react-icons/pi";

const AllSiteTableRow = ({
  index,
  addedSite,
  category,
  monthlyVisit,
  launchDate,
  keywords,
  requestedCount,
}) => {
  return (
    <>
      <tr>
        <th>{index}</th>
        <td>{addedSite}</td>
        <td>{category}</td>
        <td>{monthlyVisit}</td>
        <td>{launchDate}</td>
        <td>{requestedCount}</td>
        <td className="flex gap-3">
          {/* edit */}
          <button className="btn btn-outline btn-sm bg-emerald-300">
            <FaUserEdit /> <p>Edit</p>
          </button>
          {/* delete */}
          {/* Open the modal using document.getElementById('ID').showModal() method */}
          <button
            className="btn btn-outline btn-sm bg-red-300"
            onClick={() => document.getElementById("my_modal_2").showModal()}
          >
            <FaTrash /> Delete
          </button>
          <dialog id="my_modal_2" className="modal">
            <div className="modal-box">
              <h3 className="font-bold text-lg">Delete permanently🗑️</h3>
              <p className="pt-4">Account holder: Name</p>
              <p className="text-xs py-1">This can not be undone</p>
              <div className="modal-action flex justify-start">
                <button
                  onClick={() => handleDelete(id)}
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
            onClick={() => handleDeactivate(id)}
            // disabled={userStatus === "deactivated" ? true : false}
            className={"btn btn-outline btn-sm bg-yellow-300"}
          >
            <PiRadioactiveFill /> Deactivate
          </button>
        </td>
      </tr>
    </>
  );
};

export default AllSiteTableRow;
