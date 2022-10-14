import CoPresentIcon from "@mui/icons-material/CoPresent";
import VolumeMuteIcon from "@mui/icons-material/VolumeMute";
import { iconStyle } from "../../../util/iconDescContent";
import CustomSwitch from "../../../components/custom-switch/CustomSwitch";
import { useState } from "react";

const optionsContent = [
  {
    id: 1,
    type: "messageSound",
    icon: <VolumeMuteIcon style={iconStyle} />,
    desc: "Message sound",
  },
  {
    id: 2,
    type: "activeStatus",
    icon: <CoPresentIcon style={iconStyle} />,
    desc: "Active status",
  },
];

const initialState = optionsContent.reduce((accum, current) => {
  accum = { ...accum, [current.type]: false };
  return accum;
}, {});

const FriendsOption = () => {
  const [isChecked, setIsChecked] = useState(initialState);

  const handleChange = (e) => {
    setIsChecked((prev) => ({ ...prev, [e.target.name]: e.target.checked }));
  };

  const options = optionsContent.map(({ id, type, icon, desc }) => {
    return (
      <div key={id} className="friend-option-container">
        <i>{icon}</i>
        <CustomSwitch
          {...{
            label: desc,
            style: { width: "11.5rem" },
            type,
            isChecked: isChecked[type],
            handleChange,
          }}
        />
      </div>
    );
  });

  return (
    <div className="post-options-container friends-option-container">
      <div className="post-options-wrapper friends-options-wrapper">
        {options}
      </div>
    </div>
  );
};

export default FriendsOption;
