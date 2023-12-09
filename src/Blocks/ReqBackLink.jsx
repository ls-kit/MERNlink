import axios from "axios";
import React, { useEffect, useState } from "react";
import { parentUrl } from "../Api/baseUrl";
import ReqLinkTbRow from "../Componetns/ReqLinkTbRow";

const ReqBackLink = () => {
  const [links, setLinks] = useState([]);
  const [loading, setLoading] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(10);

  useEffect(() => {
    const fetchLinks = async () => {
      setLoading(true);
      const res = await axios.get(`${parentUrl}/offer-backlink`);
      /* .then((res) => console.log(res.status))
        .then((error) => console.log(error)); */
      setLinks(res.data);
      setLoading(false);
    };

    fetchLinks();
  }, []);

  return (
    <div>
      {/* search and filter elements */}
      <div className="py-4 px-5">
        <div className="join">
          <input
            className="input input-bordered join-item"
            placeholder="Search by site name"
          />
          <button className="btn join-item rounded-r-full">Search</button>
        </div>
      </div>
      {/* table data */}
      <div className="overflow-x-auto overflow-y-auto lg:px-5">
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
          {links.map((item, i) => (
            <ReqLinkTbRow
              key={i}
              url={item.addedSite}
              index={i + 1}
              lanchDate={item.launchDate}
            />
          ))}
        </table>
      </div>
    </div>
  );
};

export default ReqBackLink;
