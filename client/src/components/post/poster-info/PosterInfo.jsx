import mude from "../../../assets/mude.png";
import "./poster-info.css";
import { convertToUserFriendlyTime } from "../../../util/functions";
import { useSelector } from "react-redux";
import { selectUserById } from "../../../app/api-slices/usersApiSlice";
import HomeUserAvatar from "../../home-user-avatar/HomeUserAvatar";
import { useNavigate } from "react-router-dom";
import MoreHorizOutlinedIcon from "@mui/icons-material/MoreHorizOutlined";
import { iconStyle } from "../../../util/iconDescContent";
import { useDispatch } from "react-redux";
import { openPostOption } from "../../../app/actions/homeActions";
import UserCameo from "../../user-cameo/UserCameo";

export default function PosterInfo({ userId, visibleFor, date, postId }) {
  const poster = useSelector((state) => selectUserById(state, userId));

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const avatarProp = { size: 3 };

  const icon = (
    <i className="ptr-icon" onClick={() => dispatch(openPostOption(postId))}>
      <MoreHorizOutlinedIcon style={iconStyle} />
    </i>
  );

  const main = `${convertToUserFriendlyTime(date)}. ${visibleFor}`;

  return (
    <UserCameo
      {...{ userId, icon, avatarProp, main: 0, noMarginBottom: true }}
    />
  );
}
