import React, { useState } from "react";
import { FaTrash, FaUserEdit } from "react-icons/fa";
import { PiRadioactiveFill } from "react-icons/pi";
import { toast } from "sonner";
import { parentUrl } from "../Api/baseUrl";

const AllUsersTableRow = ({ index, Name, email, id, userStatus, refetch }) => {
  //   const [btnDisable, setBtnDisable] = useState(false);

  // handle delete operation
  const handleDelete = (userID) => {
    // todo: delete from backend
    fetch(`${parentUrl}/users/delete/${userID}`, {
      method: "DELETE",
    })
      .then((res) => {
        console.log(res.status);
        toast.warning(`Deleted ${Name}`);
        // setBtnDisable(true);
        refetch();
      })
      .catch((error) => {
        console.log(error);
      });
    console.log(`Deleted ${Name}, userID: ${userID}`);

    // setBtnDisable(true);
  };

  //   handle deactivate
  const handleDeactivate = (userId) => {
    // todo: add a deactivate account status in backend
    fetch(`${parentUrl}/users/deactivate/${userId}`, {
      method: "PATCH",
    })
      .then((res) => {
        console.log(res.status);
        toast.warning(`Deactivated ${Name}`);
        // refetch();
      })
      .catch((err) => {
        console.log(err.message);
        toast.error(`Error: ${err.message}`);
      });
  };

  return (
    <>
      <tr>
        <th>{index}</th>
        <td>{Name}</td>
        <td>{email}</td>
        <td className="flex gap-3">
          {/* edit */}
          <button className="btn btn-outline bg-emerald-300">
            <FaUserEdit /> <p>Edit</p>
          </button>
          {/* delete */}
          {/* Open the modal using document.getElementById('ID').showModal() method */}
          <button
            className="btn btn-outline bg-red-300"
            onClick={() => document.getElementById("my_modal_1").showModal()}
          >
            <FaTrash /> Delete
          </button>
          <dialog id="my_modal_1" className="modal">
            <div className="modal-box">
              <h3 className="font-bold text-lg">Delete permanently🗑️</h3>
              <p className="pt-4">Account holder: {Name}</p>
              <p className="text-xs py-1">This can not be undone</p>
              <div className="modal-action flex justify-start">
                <button
                  onClick={() => handleDelete(id)}
                  //   disabled={btnDisable}
                  className={"btn btn-outline bg-red-300"}
                >
                  Yes, Delete
                </button>
                <form method="dialog">
                  {/* if there is a button in form, it will close the modal */}
                  <button className="btn btn-outline">Close</button>
                </form>
              </div>
            </div>
          </dialog>
          {/* deactivate */}
          <button
            onClick={() => handleDeactivate(id)}
            disabled={userStatus === "deactivated" ? true : false}
            className={"btn btn-outline bg-yellow-300"}
          >
            <PiRadioactiveFill />{" "}
            <p>{userStatus === "deactivated" ? "Deactivated" : "Deactivate"}</p>
          </button>
        </td>
      </tr>
    </>
  );
};

export default AllUsersTableRow;
