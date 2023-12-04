import React from "react";

const TableRow = ({ index, fullName, country, userName, email, phone }) => {
  return (
    <tr>
      <th>
        <label>
          <p>{index}</p>
        </label>
      </th>
      <td>
        <div className="flex items-end gap-3">
          <div className="avatar">
            <div className="w-12 rounded-full">
              <img
                src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
                alt="Tailwind-CSS-Avatar-component"
              />
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
      <th>
        <button className="btn rounded-full">Make Admin</button>
      </th>
    </tr>
  );
};

export default TableRow;
