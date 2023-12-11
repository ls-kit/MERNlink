import React from "react";
import { FaTrash, FaUserEdit } from "react-icons/fa";
import { PiRadioactiveFill } from "react-icons/pi";

const AllUsersTableRow = ({ index, Name, email }) => {
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
          <button className="btn btn-outline bg-red-300">
            <FaTrash /> <p>Delete</p>
          </button>
          {/* deactivate */}
          <button className="btn btn-outline bg-yellow-300">
            <PiRadioactiveFill /> <p>Deactivate</p>
          </button>
        </td>
      </tr>
    </>
  );
};

export default AllUsersTableRow;
