import "./post-options.css";
import { useDispatch } from "react-redux";
import {
  othersPostOptions,
  userPostOptions,
} from "../../../util/iconDescContent";
import { showPopupOnOpaqueOverlay } from "../../../util/functions";
import { capitalize } from "../../../util/functions";
import { postNotifcationType } from "../../../util/types";
import { useContext } from "react";
import { GeneralContext } from "../../../routes/Router";

export default function PostOptions({ postId, userId }) {
  const dispatch = useDispatch();
  const { isAuth } = useContext(GeneralContext);
  const postOptions = isAuth(userId) ? userPostOptions : othersPostOptions;

  const handleClick = (e, option) => {
    e && e.stopPropagation && e.stopPropagation();
    const { desc, action } = option;
    if (action) {
      option?.dispatch
        ? dispatch(action(postId))
        : showPopupOnOpaqueOverlay(action, desc, postId);
    }
  };

  const content = postOptions.reduce((accum, current, index) => {
    const { desc, icon } = current;
    desc === postNotifcationType
      ? accum.push(
          // #4
          <div
            key={index}
            className="post-option"
            onClick={(e) => handleClick(e, current)}
          >
            <i className="post-option-icon">{icon}</i>
            <span className="post-option-desc">{capitalize(desc)}</span>
          </div>
        )
      : accum.push(
          <div
            key={index}
            className="post-option"
            onClick={(e) => handleClick(e, current)}
          >
            <i className="post-option-icon">{icon}</i>
            <span className="post-option-desc">{capitalize(desc)}</span>
          </div>
        );

    return accum;
  }, []);

  return (
    <div className="post-options-container">
      <div className="post-options-wrapper">{content}</div>
    </div>
  );
}
