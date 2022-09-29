import "./viewing.css";
import FormRadioOptions from "../../../components/form-radio-options/FormRadioOptions";
import { SettingsHeader } from "../../../pages/settings/Settings";
// import { visibilityOptions } from "../../../util/formRadioOptions";
import { useState } from "react";

const style = {
  fontSize: "1rem",
  fontWeight: "700",
  opacity: "0.9",
  fontFamily: "inherit",
};

const visibilityOptions = ["Everyone", "Followers", "Only me"];
const switchTypes = ["on", "off"];

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
];

const initialState = viewingSettingOptions.reduce((accum, current) => {
  accum = { ...accum, [current.section]: 0 };
  return accum;
}, {});

export default function Viewing() {
  const [valueIds, setValueIds] = useState(initialState);

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
              setValue={(valId) =>
                setValueIds((prev) => ({ ...prev, [section]: valId }))
              }
            />
          </section>
        );
      })}
    </main>
  );
}
