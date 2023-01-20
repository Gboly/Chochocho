import "./friend.css";
import MoreHorizOutlinedIcon from "@mui/icons-material/MoreHorizOutlined";
import FiberManualRecordSharpIcon from "@mui/icons-material/FiberManualRecordSharp";
import { iconStyle } from "../../../util/iconDescContent";
import { useContext } from "react";
import HomeUserAvatar from "../../../components/home-user-avatar/HomeUserAvatar";
import { useState } from "react";
import {
  useGetAuthUserQuery,
  useGetUsersByIdQuery,
} from "../../../app/api-slices/usersApiSlice";
import {
  convertToUserFriendlyTime,
  prepareUserIdsForQuery,
  unNormalize,
  getUsersBasedOnLastSeen,
  showPopupOnTransparentOverlay,
  prepareIdsForQuery,
} from "../../../util/functions";
import Spinner from "../../../components/Spinner/Spinner";
import { useDispatch, useSelector } from "react-redux";
import { getFriendsOptionsState } from "../righbarSlice";
import FriendsOption from "./FriendsOption";
import { openFriendsOptions } from "../../../app/actions/rightbarActions";
import { GeneralContext } from "../../../routes/Router";
import { friendsOptionsType } from "../../../util/types";

export default function Friends() {
  const {
    data: {
      following,
      settings: { activeStatus },
    },
  } = useGetAuthUserQuery();

  const [{ skip, limit }, setRefetch] = useState({ skip: 0, limit: 10 });

  const { isLoading: usersFetchIsLoading, data: usersFetchResult } =
    useGetUsersByIdQuery({
      userIds: prepareIdsForQuery(following, "userId"),
      start: skip,
      end: limit,
    });

  const unNormalizedResult = usersFetchResult
    ? unNormalize(usersFetchResult)
    : [];

  // The lastSeen field is updated for both online and offline users.
  // For online users. The lastSeen represents the time the user came online
  // For offline users. It represents the time the user went away.
  const followingBasedOnLastSeen = getUsersBasedOnLastSeen(unNormalizedResult);

  const friendsList = followingBasedOnLastSeen.map((user, i) => (
    <Friend key={user.id} user={user} activeStatus={activeStatus} />
  ));

  const openOptions = (e) => {
    const overlayParams = {
      type: friendsOptionsType,
      x: e.clientX,
      y: e.clientY,
    };
    showPopupOnTransparentOverlay(openFriendsOptions, overlayParams);
  };

  return (
    <>
      <div className="rightbar-friends-header">
        <span className="rfh-title">Friends</span>
        <i className="rfh-icon" onClick={openOptions}>
          <MoreHorizOutlinedIcon style={iconStyle} />
        </i>
      </div>
      {friendsList}
      {usersFetchIsLoading && <Spinner />}
    </>
  );
}

const Friend = ({ user, activeStatus: authUserActiveStatus }) => {
  const {
    id,
    displayName,
    username,
    profileImage,
    online,
    lastSeen,
    settings: { activeStatus: userActiveStatus },
  } = user;

  return (
    <div className="rfl-item">
      <div className="rfli-details">
        <HomeUserAvatar
          size={2.5}
          src={profileImage}
          userId={id}
          style={{ marginRight: "1rem" }}
        />
        <span className="rfli-name">{displayName || username}</span>
      </div>
      {authUserActiveStatus && userActiveStatus && (
        <div className="rfli-online-status">
          {online ? (
            <i>
              <FiberManualRecordSharpIcon style={iconStyle} />
            </i>
          ) : (
            convertToUserFriendlyTime(lastSeen)
          )}
        </div>
      )}
    </div>
  );
};
