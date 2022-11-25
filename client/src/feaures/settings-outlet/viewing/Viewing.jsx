import "./viewing.css";
import FormRadioOptions from "../../../components/form-radio-options/FormRadioOptions";
import { SettingsHeader } from "../../../pages/settings/Settings";
// import { visibilityOptions } from "../../../util/formRadioOptions";
import { useState } from "react";
import {
  changeVisibilityType,
  openSelectUser,
} from "../../../app/actions/storyActions";
import { useDispatch } from "react-redux";
import {
  customTypes,
  visibilityOptionsData,
} from "../../../util/iconDescContent";
import { showPopupOnOpaqueOverlay } from "../../../util/functions";
import { selectUsersType } from "../../../util/types";

const style = {
  fontSize: "1rem",
  fontWeight: "700",
  opacity: "0.9",
  fontFamily: "inherit",
};

const visibilityOptions = ["Everyone", "Followers", "Only me"];
const switchTypes = ["on", "off"];
const storyVisibilityOptions = [
  "Followers",
  "Mutuals",
  "Custom select",
  "Custom exempt",
];

const viewingSettingOptions = [
  {
    section: "post",
    heading: "Who can see your post?",
    options: visibilityOptions,
  },
  {
    section: "profile",
    heading: "Who can see your profile?",
    options: visibilityOptions,
  },
  {
    section: "repost",
    heading: "Allow others to repost your post on their timeline?",
    options: switchTypes,
  },
  {
    section: "follow",
    heading: "Who can follow you?",
    options: [visibilityOptions[0], switchTypes[1]],
  },
  {
    section: "story",
    heading: "Who can view your story?",
    options: storyVisibilityOptions,
  },
];

const initialState = viewingSettingOptions.reduce((accum, current) => {
  // This needs to updated so that the default is generated from the backend
  accum = { ...accum, [current.section]: 0 };
  return accum;
}, {});

export default function Viewing() {
  const dispatch = useDispatch();
  const [valueIds, setValueIds] = useState(initialState);

  const setValue = (optionIndex) => {
    const selectedOption = visibilityOptionsData[optionIndex].type;
    dispatch(changeVisibilityType(selectedOption));
    customTypes.includes(selectedOption) &&
      showPopupOnOpaqueOverlay(openSelectUser, selectUsersType);
  };

  return (
    <main className="settings-viewing">
      <SettingsHeader text={"Viewing and sharing"} />

      {viewingSettingOptions.map((option, index) => {
        const { heading, options, section } = option;

        return (
          <section>
            <header>{heading}</header>
            <FormRadioOptions
              options={options}
              labelStyle={style}
              valueId={valueIds[section]}
              setValue={(valId) => {
                setValueIds((prev) => ({ ...prev, [section]: valId }));
                section === "story" && setValue(valId);
              }}
            />
          </section>
        );
      })}
    </main>
  );
}
