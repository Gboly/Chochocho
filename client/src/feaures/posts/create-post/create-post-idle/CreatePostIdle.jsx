import "./create-post-idle.css";
import avi2 from "../../../../assets/avatar-square.png";
import IconDescription from "../../../../components/icon-description/IconDescription";
import { useDispatch } from "react-redux";
import { openCreatePost } from "../../../../app/actions/homeActions";
import HomeUserAvatar from "../../../../components/home-user-avatar/HomeUserAvatar";
import { showPopupOnOpaqueOverlay } from "../../../../util/functions";

export default function CreatePostIdle() {
  return (
    <div className="create-container">
      <form className="create-wrapper">
        <div className="create-middle-text">
          <HomeUserAvatar
            //#3
            userId={1}
            size="2.2"
            style={{ marginRight: "1rem" }}
          />

          <input
            type="text"
            placeholder="What's happening?"
            className="create-input"
            onFocus={() =>
              showPopupOnOpaqueOverlay(openCreatePost, "create post")
            }
          />
        </div>
        <div className="create-bottom">
          <div className="create-bottom-left">
            <IconDescription />
          </div>
          <div type="submit" className="create-bottom-right">
            <button className="cbr-button">Post</button>
          </div>
        </div>
      </form>
    </div>
  );
}
