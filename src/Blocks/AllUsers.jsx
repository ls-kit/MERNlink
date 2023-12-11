import axios from "axios";
import React, { useContext } from "react";
import { useQuery } from "react-query";
import { parentUrl } from "../Api/baseUrl";
import AllUsersTableRow from "../Componetns/AllUsersTableRow";
import { Toaster } from "sonner";
import { AuthContext } from "../Poveiders/AuthProvider";

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
    refetch,
  } = useQuery({ queryKey: ["allusers"], queryFn: getUsers });

  // console.log(allusers);
  if (isLoading) {
    return <p className="text-center px-20 py-20">Loading...</p>;
  }

  if (error) {
    return <p className="text-center px-20 py-20">{error.message}</p>;
  }

  // create newuser with google createuser and also save to db
  const { createUser } = useContext(AuthContext);
  const createNewUser = () => {
    console.log("working");
  };

  return (
    <>
      <Toaster position="top-center" richColors />
      <div className="overflow-x-auto">
        <table className="table table-xs">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Email</th>
              <th>Country</th>
              <th>Phone</th>
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
                id={item._id}
                country={item.country}
                phone={item.phone}
                userStatus={item.activeStatus}
                refetch={refetch}
              />
            ))}
          </tbody>
        </table>
        <div className="flex flex-col justify-center items-center pt-10 gap-3">
          <button className="btn btn-sm btn-circle bg-cyan-300">
            <img src="/add.svg" alt="add user" />
          </button>
          <p className="text-sm font-semibold">Add New User</p>
        </div>
      </div>
    </>
  );
};

export default AllUsers;
