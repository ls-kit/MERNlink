import axios from "axios";
import React, { useState } from "react";
import { parentUrl } from "../Api/baseUrl";
import ReqLinkTbRow from "../Componetns/ReqLinkTbRow";
import Pagination from "../Componetns/Pagination";
import { useQuery } from "react-query";
import { loacalServerURL } from "../Api/localURL";

const ReqBackLink = () => {
  // const [links, setLinks] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [linksPerPage, setlinksPerPage] = useState(3);

  // filter
  const [type, setType] = useState();

  const loadDataByFilter = (filter) => {
    console.log(filter);
    if (filter === "") {
      setType(null);
      refetch();
    }
    setType(filter);
    refetch();
  };

  const fetchLinks = async () => {
    const res = await axios.get(`${loacalServerURL}/offer-backlink`);
    return res.data;
  };

  const {
    data: links,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["links"],
    queryFn: fetchLinks,
  });

  if (isLoading) {
    return <p className="px-10 py-10 text-center">Loading...</p>;
  }

  if (error) {
    return <p className="px-10 py-10 text-center">{error.message}</p>;
  }
  // get current posts
  const indexOfLastPost = currentPage * linksPerPage;
  const indexOfFirstPost = indexOfLastPost - linksPerPage;
  const currentPost = links.slice(indexOfFirstPost, indexOfLastPost);

  // change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="font-roboto">
      {/* search and filter elements */}
      <div className="py-4 px-5 flex gap-10 items-center">
        <div className="join">
          <input
            className="input input-bordered input-md join-item"
            placeholder="Search by site name"
          />
          <button className="btn btn-md btn-outline join-item rounded-r-full">
            Search
          </button>
        </div>
        {/* pagination */}
        <Pagination
          linksPerPage={linksPerPage}
          totalLinks={links.length}
          paginate={paginate}
        />
        {/* filter */}
        <details className="dropdown">
          <summary className="m-1 btn">Filter By</summary>
          <ul className="p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-52">
            <li>
              <button type="button" onClick={() => loadDataByFilter("Follow")}>
                Follow
              </button>
            </li>
            <li>
              <button
                type="button"
                onClick={() => loadDataByFilter("Not follow")}
              >
                Not Follow
              </button>
            </li>
            <li>
              <button type="button" onClick={() => loadDataByFilter("")}>
                Show All
              </button>
            </li>
          </ul>
        </details>
      </div>
      {/* table data */}
      <div className="overflow-x-auto overflow-y-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>index</th>
              <th>Action</th>
              <th>Site</th>
              <th>Launch Date</th>
            </tr>
          </thead>
          {currentPost.map((item, i) => (
            <ReqLinkTbRow
              key={i}
              url={item.addedSite}
              index={i + 1}
              lanchDate={item.launchDate}
              id={item._id}
            />
          ))}
        </table>
      </div>
    </div>
  );
};

export default ReqBackLink;
