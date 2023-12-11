import axios from "axios";
import React from "react";
import { useQuery } from "react-query";
import { parentUrl } from "../Api/baseUrl";
import { toast } from "sonner";
import AllSiteTableRow from "../Componetns/AllSiteTableRow";

const AllWebsites = () => {
  // gell all sites
  const getAllSites = async () => {
    const res = await axios.get(`${parentUrl}/offer-backlink`);
    return res.data;
  };

  const { data: allSites = [], isLoading } = useQuery({
    queryKey: ["allSites"],
    queryFn: getAllSites,
  });

  if (isLoading) {
    return <p className="px-10 py-10 text-center">Loading...</p>;
  }

  return (
    <>
      <div className="overflow-x-auto">
        <table className="table table-xs">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Added Site</th>
              <th>Category</th>
              <th>Monthly Visit</th>
              <th>Launch Date</th>
              <th>Times Requested</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {allSites.map((item, i) => (
              <AllSiteTableRow
                key={i}
                index={i + 1}
                addedSite={item.addedSite}
                category={item.category}
                monthlyVisit={item.monthlyOrgVisit}
                launchDate={item.launchDate}
                requestedCount={item.count}
              />
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default AllWebsites;
