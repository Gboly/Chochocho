//import "../follow-unfollow-poster/follow-unfollow-poster.css";
import { closePopupOnOpaqueOverlay } from "../../util/functions";
import { closeLogOut } from "../../app/actions/layoutActions";
import { useNavigate } from "react-router-dom";

export default function LogOut() {
  const navigate = useNavigate();
  const logOut = () => {
    sessionStorage.removeItem("authToken");
    closePopupOnOpaqueOverlay(closeLogOut);
    navigate("/auth/sign-in");
  };

  return (
    <div className="ffPost-container">
      <div className="ffPost-wrapper">
        <header className="ffPost-header create-top-description">
          Log out
        </header>
        <main className="ffPost-main">Are you sure you want to log out ?</main>
        <footer className="ffPost-footer">
          <button
            className="ffPost-button ffPost-cancel"
            onClick={() => closePopupOnOpaqueOverlay(closeLogOut)}
          >
            Cancel
          </button>
          <button className="ffPost-button ffPost-submit" onClick={logOut}>
            Log out
          </button>
        </footer>
      </div>
    </div>
  );
}
