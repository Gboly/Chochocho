import CoPresentIcon from "@mui/icons-material/CoPresent";
import VolumeMuteIcon from "@mui/icons-material/VolumeMute";
import { iconStyle } from "../../../util/iconDescContent";
import CustomSwitch from "../../../components/custom-switch/CustomSwitch";
import { useContext, useState } from "react";
import { activeStatusType, messageSoundType } from "../../../util/types";
import { GeneralContext } from "../../../routes/Router";

const optionsContent = [
  {
    id: 1,
    type: messageSoundType,
    icon: <VolumeMuteIcon style={iconStyle} />,
    desc: "Message sound",
  },
  {
    id: 2,
    type: activeStatusType,
    icon: <CoPresentIcon style={iconStyle} />,
    desc: "Active status",
  },
];

const FriendsOption = () => {
  const {
    authUser: { settings },
  } = useContext(GeneralContext);

  const initialState = optionsContent.reduce((accum, { type }) => {
    accum = { ...accum, [type]: settings[type] };
    return accum;
  }, {});

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
