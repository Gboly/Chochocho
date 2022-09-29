import "./post-hidden.css";
import { iconStyle } from "../../../util/iconDescContent";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";

import { useDispatch } from "react-redux";
import { removePost, unhidePost } from "../../../app/actions/homeActions";

export default function PostHidden({ postId }) {
  const dispatch = useDispatch();

  return (
    <div className="post-container">
      <div className="post-wrapper hidden-wrapper">
        <div className="hidden-left">
          <i onClick={() => dispatch(unhidePost(postId))}>
            <VisibilityOffIcon style={iconStyle} />
          </i>
          <div>
            <span>Post hidden</span>
            <span>You won't see this post on your timeline.</span>
          </div>
        </div>
        <i
          className="hidden-right"
          onClick={() => dispatch(removePost(postId))}
        >
          <HighlightOffIcon style={iconStyle} />
        </i>
      </div>
    </div>
  );
}
