import axios from "axios";
import React from "react";
import { useQuery } from "react-query";
import { parentUrl } from "../Api/baseUrl";
import AllUsersTableRow from "../Componetns/AllUsersTableRow";

const AllUsers = () => {
  // fetch fn
  const getUsers = async () => {
    const res = await axios.get(`${parentUrl}/users`);
    return res.data;
  };

  // show all users
  const {
    data: allusers,
    isLoading,
    error,
  } = useQuery({ queryKey: ["allusers"], queryFn: getUsers });

  // console.log(allusers);
  if (isLoading) {
    return <p className="text-center px-20 py-20">Loading...</p>;
  }

  if (error) {
    return <p className="text-center px-20 py-20">{error.message}</p>;
  }

  return (
    <>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Email</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {allusers.map((item, i) => (
              <AllUsersTableRow
                key={i}
                index={i + 1}
                Name={item.fullName}
                email={item.email}
              />
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default AllUsers;
