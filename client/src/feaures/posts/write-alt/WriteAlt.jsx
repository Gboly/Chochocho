import "./write-alt.css";
import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";
import { useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { closeWriteAlt, setAltValue } from "../../../app/actions/homeActions";
import {
  getUploadedMedia,
  getWriteAltState,
} from "../create-post/createPostSlice";

import { iconStyle } from "../../../util/iconDescContent";
import CustomTextArea from "../../../components/custom-text-area/CustomTextArea";
import { closeNestedPopupOnOpaqueOverlay } from "../../../util/functions";

export default function WriteAlt() {
  const dispatch = useDispatch();
  const { src } = useSelector(getUploadedMedia);
  const { value, type } = useSelector(getWriteAltState);

  const [altText, setAltText] = useState(value);

  const handleInput = (textContent) => {
    setAltText(textContent);
  };

  return (
    <div className="write-alt-container">
      <div className="write-alt-wrapper">
        <div className="write-alt-top">
          <div className="wat-left">
            <div
              className="wat-left-icon"
              onClick={() =>
                closeNestedPopupOnOpaqueOverlay(closeWriteAlt, type)
              }
            >
              <ArrowBackOutlinedIcon style={iconStyle} />
            </div>
            <span className="wat-left-desc">Write an alt text</span>
          </div>
          <button
            className="wat-right"
            disabled={altText.length > 1000 ? true : false}
            onClick={() => {
              dispatch(setAltValue(altText));
              dispatch(closeWriteAlt());
            }}
          >
            Done
          </button>
        </div>
        <div className="write-alt-center">
          <img src={src} alt="write an alt for post" className="alt-picture" />
        </div>
        <div className="write-alt-bottom">
          <CustomTextArea
            {...{
              placeholder: "Describe this picture ...",
              sxx: {
                ph: "alt-custom-placeholder",
                ta: "alt-custom-textarea",
              },
              handleInput,
              content: altText,
            }}
          />
          <span className="alt-character-limit-indicator">
            {altText.length > 1000 ? (
              <span className="altText-excession">
                {`-${altText.length - 1000}`}
              </span>
            ) : (
              `${altText.length}/1000`
            )}
          </span>
        </div>
      </div>
    </div>
  );
}
