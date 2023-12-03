import { useContext } from "react";
import { AuthContext } from "../Poveiders/AuthProvider";
import { useQuery } from "react-query";
import axios from "axios";

const useAdmin = () => {
  const { user } = useContext(AuthContext);
  const { data: isAdmin, isLoading: isAdminLoading } = useQuery({
    queryKey: ["isAdmin", user?.email],
    queryFn: async () => {
      const res = await axios.get(`/heregoesUsersApiWhoWillBeCheckedifAdmin`);
      console.log(`is admin`, res);

      return res.data.admin;
    },
  });

  return [isAdmin, isAdminLoading];
};

export default useAdmin;
