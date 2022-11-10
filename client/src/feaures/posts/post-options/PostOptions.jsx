import "./post-options.css";
import { useDispatch, useSelector } from "react-redux";
import {
  othersPostOptions,
  userPostOptions,
} from "../../../util/iconDescContent";
import {
  closePopupOnTransparentOverlay,
  showPopupOnOpaqueOverlay,
} from "../../../util/functions";
import { capitalize } from "../../../util/functions";
import {
  authUserType,
  otherUsersType,
  postNotifcationType,
} from "../../../util/types";
import { useMemo } from "react";
import { getPostOptionState } from "../post-excerpt/postExcerptSlice";
import { closePostOption } from "../../../app/actions/homeActions";

const options = [
  {
    type: authUserType,
    data: userPostOptions,
  },
  {
    type: otherUsersType,
    data: othersPostOptions,
  },
];
export default function PostOptions() {
  const dispatch = useDispatch();
  const { postId, optionType } = useSelector(getPostOptionState);

  const optionData = useMemo(
    () => options.find((option) => option.type === optionType)?.data || [],
    [optionType]
  );

  const handleClick = (e, option) => {
    e && e.stopPropagation && e.stopPropagation();
    const { desc, action } = option;
    if (action) {
      option?.dispatch
        ? dispatch(action(postId))
        : showPopupOnOpaqueOverlay(action, desc, postId);
    }
    closePopupOnTransparentOverlay(closePostOption);
  };

  const content = optionData.reduce((accum, current, index) => {
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
