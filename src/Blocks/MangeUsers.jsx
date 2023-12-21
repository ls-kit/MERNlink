import axios from "axios";
import { parentURL } from "../Api/baseUrl";
import TableRow from "../Componetns/TableRow";
import { useQuery } from "react-query";
import { useState } from "react";
import ReactPaginate from "react-paginate";

const MangeUsers = () => {
  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = 3;
  const {
    data: users = [],
    refetch,
    error,
    isLoading,
  } = useQuery(["users"], async () => {
    const res = await axios.get(`${parentURL}/users`);
    return res.data;
  });

  if (isLoading) {
    return <p className="text-center px-20 py-20">Loading...</p>;
  }

  if (error) {
    return <p className="text-center px-20 py-20">{error.message}</p>;
  }

  // react pagination

  const endOffset = itemOffset + itemsPerPage;
  const currentItems = users.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(users.length / itemsPerPage);

  // Invoke when user click to request another page.
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % users.length;
    setItemOffset(newOffset);
  };

  return (
    <div>
      <div className="overflow-x-auto font-roboto">
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
            {currentItems.map((item, i) => (
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
      {/* pagination */}
      <ReactPaginate
        breakLabel="..."
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={pageCount}
        previousLabel="< prev"
        renderOnZeroPageCount={null}
        containerClassName="pagination"
        previousLinkClassName="direction"
        pageLinkClassName="page-num"
        nextLinkClassName="direction"
        activeLinkClassName="active"
      />
    </div>
  );
};

export default MangeUsers;
