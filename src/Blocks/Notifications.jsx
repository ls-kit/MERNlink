import React, { useContext } from "react";
import { AuthContext } from "../Poveiders/AuthProvider";
import axios from "axios";
import { parentUrl } from "../Api/baseUrl";
import { useQuery } from "react-query";
import ViewNotification from "../Componetns/ViewNotification";
import AOS from "aos";
import "aos/dist/aos.css"; // You can also use <link> for styles
// ..
AOS.init();

const Notifications = () => {
  const { user } = useContext(AuthContext);

  // fetchLoggedin user
  const fetchCurrentUserNotification = async () => {
    const result = await axios.get(
      `${parentUrl}/users/notifications/${user.email}`
    );
    return result.data;
    // .then((res) => {
    //   console.log(res.data);
    // })
    // .catch((error) => {
    //   console.log(error.message);
    // });
  };

  // react query
  const {
    data: notifications = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: "notifications",
    queryFn: fetchCurrentUserNotification,
  });

  return (
    <div className="px-5 py-5 font-roboto">
      <div className="grid grid-cols-1 overflow-y-auto gap-4">
        {notifications.map((item, i) => (
          <ViewNotification key={i} message={item.text} date={item.date} />
        ))}
      </div>
    </div>
  );
};

export default Notifications;
