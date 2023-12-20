import React, { useContext, useEffect, useState } from "react";
import { parentURL } from "../Api/baseUrl";
import axios from "axios";
import { AuthContext } from "../Poveiders/AuthProvider";
import PendingTableRow from "../Componetns/PendingTableRow";

const PendingRequests = () => {
  // get email from Auth
  const { user } = useContext(AuthContext);
  const [pendingData, setPendingData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios
        .get(`${parentURL}/requested-backlink/pending/${user?.email}`)
        .then((res) => {
          console.log(res);
          setPendingData(res.data);
        })
        .catch((error) => {
          console.log(error);
        });
      //   setPendingData(res.data);
    };

    fetchData();
  }, [parentURL]);

  return (
    <>
      <div className="overflow-x-auto font-roboto">
        <table className="table table-sm">
          <thead>
            <tr>
              <th>Index</th>
              <th>Your Given Link</th>
              <th>Requested to</th>
              <th>Status</th>
              <th>Email</th>
              <th>Date Requested</th>
              <th>Requested By</th>
            </tr>
          </thead>
          {pendingData.map((pendingItem, i) => (
            <PendingTableRow
              key={i + 0.01}
              index={i + 1}
              givenLink={pendingItem.reqBackLink}
              requestedTo={pendingItem.selectedUrl4Request}
              status={pendingItem.status}
              email={pendingItem.reqUserEmail}
              date={pendingItem.date}
              requestedBy={pendingItem.reqUser}
            />
          ))}
        </table>
      </div>
    </>
  );
};

export default PendingRequests;
