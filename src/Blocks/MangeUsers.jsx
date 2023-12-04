import React, { useEffect, useState } from "react";
import axios from "axios";
import { parentUrl } from "../Api/baseUrl";
import TableRow from "../Componetns/TableRow";
import { useQuery } from "react-query";

const MangeUsers = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios
      .get(`${parentUrl}/users`)
      .then((res) => {
        console.log(res.status);
        setUsers(res.data);
      })
      .catch((error) => console.log(error.message));
  }, [parentUrl]);

  /* const { data: users = [], refetch } = useQuery(["users"], async () => {
    const res = await fetch(`${parentUrl}/users`);
    return res.json;
  }); */

  return (
    <div className="overflow-x-auto">
      <table className="table">
        <thead>
          <tr>
            <th>
              <label>No</label>
            </th>
            <th>Name</th>
            <th>Email & Username</th>
            <th>Phone</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((item, i) => (
            <TableRow
              key={i}
              index={i + 1}
              fullName={item.fullName}
              country={item.country}
              email={item.email}
              userName={item.userName}
              phone={item.phone}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MangeUsers;
