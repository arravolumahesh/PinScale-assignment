import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faRightFromBracket,
  faArrowUpRightFromSquare,
} from "@fortawesome/free-solid-svg-icons";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";

import "./index.css";

const Logout = (props) => {
  const { navigate } = props;

  const logout = () => {
    const user_id = Cookies.get("user_id");
    Cookies.remove("user_id");

    navigate("/login");
  };

  return (
    <Popup
      trigger={
        <button className="icon-btn">
          <FontAwesomeIcon
            icon={faArrowUpRightFromSquare}
            className="profile-link"
          />
        </button>
      }
      modal
    >
      {(close) => (
        <div className="modal">
          <div className="header">
            <FontAwesomeIcon
              icon={faRightFromBracket}
              className="delete-icon-popup"
            />
            <p className="head4"> Are you sure you want to Logout?</p>
          </div>

          <div className="actions">
            <button
              className="button1"
              onClick={() => {
                logout();
                close();
                console.log("modal closed ");
              }}
            >
              Yes,LogOut
            </button>
            <button
              className="button2"
              onClick={() => {
                console.log("modal closed ");
                close();
              }}
            >
              cancel
            </button>
          </div>
        </div>
      )}
    </Popup>
  );
};

export function LogoutRouter(props) {
  console.log(props);
  const navigate = useNavigate();
  return <Logout navigate={navigate} />;
}

export default Logout;
