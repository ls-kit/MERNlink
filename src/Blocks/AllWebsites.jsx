import axios from "axios";
import React from "react";
import { useQuery } from "react-query";
import { parentUrl } from "../Api/baseUrl";

const AllWebsites = () => {
  // gell all sites
  const getAllSites = async () => {
    const res = await axios.get(`${parentUrl}/offer-backlink`);
    return res.data;
  };

  const {
    data: allSites,
    isLoading,
    error,
    refetch,
  } = useQuery({ queryKey: ["allSites"], queryFn: getAllSites });

  return (
    <>
      <h1 className="px-20 py-20 text-center">{allSites.length}</h1>
    </>
  );
};

export default AllWebsites;
