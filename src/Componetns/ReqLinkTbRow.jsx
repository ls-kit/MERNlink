import React, { useContext } from "react";
import { AuthContext } from "../Poveiders/AuthProvider";

const ReqLinkTbRow = ({ index, url, lanchDate }) => {
  // logged in user data
  const { user } = useContext(AuthContext);

  return (
    <tbody>
      {/* row 1 */}
      <tr>
        <th>{index}</th>
        <td>
          <button
            className="btn"
            onClick={() => document.getElementById("my_modal_1").showModal()}
          >
            open modal
          </button>
          <dialog id="my_modal_1" className="modal">
            <div className="modal-box">
              <h3 className="font-bold text-lg">Hello!</h3>
              <p className="py-4">
                Press ESC key or click the button below to close
              </p>
              <div className="modal-action">
                <form method="dialog">
                  {/* if there is a button in form, it will close the modal */}
                  <button className="btn">Close</button>
                </form>
              </div>
            </div>
          </dialog>
        </td>
        <td>{url}</td>
        <td>{lanchDate}</td>
      </tr>
    </tbody>
  );
};

export default ReqLinkTbRow;
