import "./post-options.css";

import { useDispatch, useSelector } from "react-redux";
import { selectPostById } from "../../../app/api-slices/postsApiSlice";

import {
  othersPostOptions,
  userPostOptions,
} from "../../../util/iconDescContent";
import { showPopupOnOpaqueOverlay } from "../../../util/functions";
import { capitalize } from "../../../util/functions";
import { postNotifcationType } from "../../../util/types";

export default function PostOptions({ postId }) {
  const dispatch = useDispatch();
  const post = useSelector((state) => selectPostById(state, postId));
  const userId = post?.userId;

  //#3
  const postOptions = userId === 1 ? userPostOptions : othersPostOptions;

  const handleClick = (current) => {
    const { desc, action } = current;
    current?.dispatch
      ? dispatch(action(postId))
      : showPopupOnOpaqueOverlay(action, desc, postId);
  };

  const content = postOptions.reduce((accum, current, index) => {
    const { desc, icon } = current;
    desc === postNotifcationType
      ? accum.push(
          // #4
          <div key={index} className="post-option">
            <i className="post-option-icon">{icon}</i>
            <span className="post-option-desc">{capitalize(desc)}</span>
          </div>
        )
      : accum.push(
          <div
            key={index}
            className="post-option"
            onClick={() => handleClick(current)}
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
