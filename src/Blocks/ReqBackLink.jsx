import axios from "axios";
import React, { useEffect, useState } from "react";
import { parentUrl } from "../Api/baseUrl";
import ReqLinkTbRow from "../Componetns/ReqLinkTbRow";
import Pagination from "../Componetns/Pagination";

const ReqBackLink = () => {
  const [links, setLinks] = useState([]);
  const [loading, setLoading] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [linksPerPage, setlinksPerPage] = useState(1);

  // filter
  const [type, setType] = useState("");

  useEffect(() => {
    const fetchLinks = async () => {
      setLoading(true);
      console.log(type);
      const res = await axios.get(`${parentUrl}/offer-backlink/${type}`);
      /* .then((res) => console.log(res.status))
        .then((error) => console.log(error)); */
      setLinks(res.data);
      setLoading(false);
    };

    fetchLinks();
  }, [type]);

  // get current posts
  const indexOfLastPost = currentPage * linksPerPage;
  const indexOfFirstPost = indexOfLastPost - linksPerPage;
  const currentPost = links.slice(indexOfFirstPost, indexOfLastPost);

  // change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div>
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
              <button onClick={() => setType("Follow")}>Follow</button>
            </li>
            <li>
              <button onClick={() => setType("Not follow")}>Not Follow</button>
            </li>
            <li>
              <button onClick={() => setType("")}>Show All</button>
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
