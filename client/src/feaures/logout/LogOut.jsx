//import "../follow-unfollow-poster/follow-unfollow-poster.css";
import { closePopupOnOpaqueOverlay } from "../../util/functions";
import { closeLogOut } from "../../app/actions/layoutActions";

export default function LogOut() {
  const logOut = () => {
    sessionStorage.removeItem("authToken");
    closePopupOnOpaqueOverlay(closeLogOut);
    // I need a page refresh for everytime is logged out just so data does not remain cached. Hence, the use of the native js navigation instead of the useNavigate.
    window.location.href = "/auth/sign-in";
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
