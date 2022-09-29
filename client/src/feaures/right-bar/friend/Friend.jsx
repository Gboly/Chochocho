import "./friend.css";
import MoreHorizOutlinedIcon from "@mui/icons-material/MoreHorizOutlined";
import FiberManualRecordSharpIcon from "@mui/icons-material/FiberManualRecordSharp";
import { iconStyle } from "../../../util/iconDescContent";
import midex from "../../../assets/midex.png";

export default function Friend() {
  const friendsList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14].map(
    (current, i) => (
      <div key={i} className="rfl-item">
        <div className="rfli-details">
          <img src={midex} alt="friend's avatar" className="rfli-avi" />
          <span className="rfli-name">Midex</span>
        </div>
        <div className="rfli-online-status">
          {[2, 5, 8, 9, 11, 13].includes(current) ? (
            <FiberManualRecordSharpIcon style={iconStyle} />
          ) : (
            "59m"
          )}
        </div>
      </div>
    )
  );

  return (
    <>
      <div className="rightbar-friends-header">
        <span className="rfh-title">Friends</span>
        <i className="rfh-icon">
          <MoreHorizOutlinedIcon style={iconStyle} />
        </i>
      </div>
      {friendsList}
    </>
  );
}
