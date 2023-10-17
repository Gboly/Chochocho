import React, { useContext, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import FormRadioOptions from "../../components/form-radio-options/FormRadioOptions";
import { playbackSpeedOptionsStyle } from "../../util/formRadioOptions";
import {
  capitalize,
  closePopupOnOpaqueOverlay,
  showPopupOnOpaqueOverlay,
} from "../../util/functions";
import { useDispatch, useSelector } from "react-redux";
import {
  changeVisibilityType,
  closeSettings,
  openSelectUser,
} from "../../app/actions/storyActions";
import { getStorySettingsState } from "./storySlice";
import { selectUsersType } from "../../util/types";
import { customTypes } from "../../util/iconDescContent";
import { visibilityOptionsData } from "../../util/iconDescContent";

const VisibilityOption = ({ icon, type, desc }) => {
  return (
    <section className="story-visibility-option">
      <div>
        <i>
          <FontAwesomeIcon icon={icon} />
        </i>
      </div>
      <div>
        <h4>{capitalize(type)}</h4>
        <h6>{desc}</h6>
      </div>
    </section>
  );
};

const visibilityOptions = visibilityOptionsData.map((data) => (
  <VisibilityOption {...data} />
));

let storyVisibilityOptionsStyle = { ...playbackSpeedOptionsStyle };
storyVisibilityOptionsStyle = {
  ...storyVisibilityOptionsStyle,
  width: "100%",
  gap: 0,
  marginBottom: "1.5rem",
};

const StoryVisibilitySettings = () => {
  const dispatch = useDispatch();
  const { visibilityType } = useSelector(getStorySettingsState);

  const setValue = (optionIndex) => {
    const selectedOption = visibilityOptionsData[optionIndex].type;
    dispatch(changeVisibilityType(selectedOption));
    customTypes.includes(selectedOption) &&
      showPopupOnOpaqueOverlay(openSelectUser, selectUsersType);
  };

  const handleClose = () => closePopupOnOpaqueOverlay(closeSettings);

  return (
    <div className="story-visibility-settings">
      <h3>Story privacy</h3>
      <hr />
      <h4>Who can see your story?</h4>
      <h6>Your story will be visible for 24 hours.</h6>
      <section>
        <FormRadioOptions
          {...{
            options: visibilityOptions,
            sxx: storyVisibilityOptionsStyle,
            valueId: visibilityOptionsData.findIndex(
              (option) => option.type === visibilityType
            ),
            setValue,
            isNonTypoLabel: true,
          }}
        />
      </section>

      <div className="report-post-bottom">
        <button className="report-cancel report-button" onClick={handleClose}>
          Cancel
        </button>
        <button className="report-submit report-button">Done</button>
      </div>
    </div>
  );
};

export default StoryVisibilitySettings;
