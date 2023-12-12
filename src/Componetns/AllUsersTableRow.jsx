import { FaTrash, FaUserEdit } from "react-icons/fa";
import { PiRadioactiveFill } from "react-icons/pi";
import { toast } from "sonner";
import { parentUrl } from "../Api/baseUrl";
import { useForm } from "react-hook-form";
import countriesWithFlag from "../Api/country";
import axios from "axios";

const AllUsersTableRow = ({
  index,
  Name,
  email,
  country,
  phone,
  id,
  userStatus,
  refetch,
}) => {
  // hookform
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  // onSubmit Edit data
  const onSubmit = (data) => {
    console.log(data);
    reset();
  };

  // activate user
  const activateUser = (userID) => {
    axios
      .patch(`${parentUrl}/users/activate/${userID}`)
      .then((res) => {
        toast.success(res.status);
        refetch();
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  // handle delete operation
  const handleDelete = (userID) => {
    // todo: delete from backend
    fetch(`${parentUrl}/users/delete/${userID}`, {
      method: "DELETE",
    })
      .then((res) => {
        console.log(res.status);
        toast.warning(`Deleted ${Name}`);
        // setBtnDisable(true);
        refetch();
      })
      .catch((error) => {
        console.log(error);
      });
    console.log(`Deleted ${Name}, userID: ${userID}`);

    // setBtnDisable(true);
  };

  //   handle deactivate
  const handleDeactivate = (userId) => {
    // todo: add a deactivate account status in backend
    fetch(`${parentUrl}/users/deactivate/${userId}`, {
      method: "PATCH",
    })
      .then((res) => {
        console.log(res.status);
        toast.warning(`Deactivated ${Name}`);
        refetch();
      })
      .catch((err) => {
        console.log(err.message);
        toast.error(`Error: ${err.message}`);
      });
  };

  return (
    <>
      <tr>
        <th>{index}</th>
        <td>{Name}</td>
        <td>{email}</td>
        <td>{country}</td>
        <td>{phone}</td>
        <td className="flex gap-3">
          {/* edit */}
          <div>
            {/* You can open the modal using document.getElementById('ID').showModal() method */}
            <button
              className="btn btn-outline btn-sm bg-emerald-300"
              onClick={() =>
                document.getElementById(`my_modal_${index}`).showModal()
              }
            >
              <FaUserEdit /> Edit
            </button>
            <dialog id={`my_modal_${index}`} className="modal">
              <div className="modal-box">
                <form method="dialog">
                  {/* if there is a button in form, it will close the modal */}
                  <button className="btn btn-sm btn-circle btn-ghost hover:bg-red-400 absolute right-2 top-2">
                    <img src="/cross.svg" alt="cross" />
                  </button>
                </form>
                <h3 className="font-bold text-lg">Edit {Name}'s Info ⌨</h3>
                <form className="py-4" onSubmit={handleSubmit(onSubmit)}>
                  <div className="flex flex-col gap-3">
                    <select
                      className="select select-bordered w-full"
                      {...register("country", { required: true })}
                    >
                      <option
                        className="text-lg text-slate-500"
                        disabled
                        selected
                      >
                        Select users country
                      </option>
                      {countriesWithFlag.map((country, i) => (
                        <option key={i}>{country}</option>
                      ))}
                    </select>

                    <input
                      type="text"
                      placeholder="Update phone number"
                      className="input input-bordered w-full"
                      {...register("phone", { required: true })}
                    />
                    <input
                      type="email"
                      placeholder="Update Email Address"
                      className="input input-bordered w-full"
                      {...register("email", { required: true })}
                    />
                  </div>
                  <div className="flex gap-x-3 pt-5">
                    <button
                      type="submit"
                      className="btn btn-sm btn-outline bg-green-300"
                    >
                      Upadate User
                    </button>
                    <button
                      onClick={() => activateUser(id)}
                      className="btn btn-sm btn-outline bg-cyan-300"
                    >
                      Activate User
                    </button>
                  </div>
                </form>
                {/* action buttons */}
              </div>
            </dialog>
          </div>
          {/* delete */}
          <div>
            {/* Open the modal using document.getElementById('ID').showModal() method */}
            <button
              className="btn btn-outline btn-sm bg-red-300"
              onClick={() =>
                document.getElementById(`my_modal_${Name}`).showModal()
              }
            >
              <FaTrash /> Delete
            </button>
            <dialog id={`my_modal_${Name}`} className="modal">
              <div className="modal-box">
                <h3 className="font-bold text-lg">Delete permanently🗑️</h3>
                <p className="pt-4">Account holder: {Name}</p>
                <p className="text-xs py-1">This can not be undone</p>
                <div className="modal-action flex justify-start">
                  <button
                    onClick={() => handleDelete(id)}
                    //   disabled={btnDisable}
                    className={"btn btn-outline btn-sm bg-red-300"}
                  >
                    Yes, Delete
                  </button>
                  <form method="dialog">
                    {/* if there is a button in form, it will close the modal */}
                    <button className="btn btn-outline btn-sm">Close</button>
                  </form>
                </div>
              </div>
            </dialog>
          </div>
          {/* deactivate */}
          <button
            onClick={() => handleDeactivate(id)}
            disabled={userStatus === "deactivated" ? true : false}
            className={"btn btn-outline btn-sm bg-yellow-300"}
          >
            <PiRadioactiveFill />{" "}
            <p>{userStatus === "deactivated" ? "Deactivated" : "Deactivate"}</p>
          </button>
        </td>
      </tr>
    </>
  );
};

export default AllUsersTableRow;
