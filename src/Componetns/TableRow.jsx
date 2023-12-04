import React, { useState } from "react";
import { parentUrl } from "../Api/baseUrl";
import { Toaster, toast } from "sonner";

const TableRow = ({
  index,
  fullName,
  country,
  userName,
  email,
  phone,
  id,
  refetch,
  role,
}) => {
  const toggleAdmin = () => {
    fetch(`${parentUrl}/users/admin/${id}`, {
      method: "PATCH",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount) {
          toast.success(`${fullName} is an admin now!`);
        }
        refetch();
      });
  };

  return (
    <>
      <Toaster position="top-center" richColors />
      <tr>
        <th>
          <label>
            <p>{index}</p>
          </label>
        </th>
        <td>
          <div className="flex items-end gap-3">
            <div className="avatar placeholder">
              <div className="bg-neutral text-neutral-content rounded-full w-12">
                <span className="text-sm">
                  {fullName[0] + fullName[1].toUpperCase()}
                </span>
              </div>
            </div>
            <div>
              <div className="font-bold">{fullName}</div>
              <div className="text-sm opacity-50">{country}</div>
            </div>
          </div>
        </td>
        <td>
          {email}
          <br />
          <span className="badge badge-ghost badge-sm">{userName}</span>
        </td>
        <td>{phone}</td>
        <th className="flex flex-col items-center">
          <button onClick={() => toggleAdmin()} className="btn">
            {" "}
            {role === "admin" ? "Remove Admin" : "Make Admin"}
          </button>
        </th>
      </tr>
    </>
  );
};

export default TableRow;
