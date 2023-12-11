import axios from "axios";
import { parentUrl } from "../Api/baseUrl";
import TableRow from "../Componetns/TableRow";
import { useQuery } from "react-query";

const MangeUsers = () => {
  const {
    data: users = [],
    refetch,
    error,
    isLoading,
  } = useQuery(["users"], async () => {
    const res = await axios.get(`${parentUrl}/users`);
    return res.data;
  });

  if (isLoading) {
    return <p className="text-center px-20 py-20">Loading...</p>;
  }

  if (error) {
    return <p className="text-center px-20 py-20">{error.message}</p>;
  }

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
            <th>Admin Feature</th>
          </tr>
        </thead>
        <tbody>
          {users.map((item, i) => (
            <TableRow
              refetch={refetch}
              id={item._id}
              role={item.role}
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
