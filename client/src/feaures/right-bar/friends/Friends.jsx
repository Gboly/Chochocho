import "./friend.css";
import MoreHorizOutlinedIcon from "@mui/icons-material/MoreHorizOutlined";
import FiberManualRecordSharpIcon from "@mui/icons-material/FiberManualRecordSharp";
import { iconStyle } from "../../../util/iconDescContent";
import { useContext } from "react";
import { LayoutContext } from "../../../layout/Layout";
import HomeUserAvatar from "../../../components/home-user-avatar/HomeUserAvatar";
import { useState } from "react";
import { useGetUsersByIdQuery } from "../../../app/api-slices/usersApiSlice";
import {
  convertToUserFriendlyTime,
  prepareUserIdsForQuery,
  unNormalize,
  getUsersBasedOnLastSeen,
} from "../../../util/functions";
import Spinner from "../../../components/Spinner/Spinner";
import { onlineType } from "../../../util/types";
import { useDispatch, useSelector } from "react-redux";
import { getFriendsOptionsState } from "../righbarSlice";
import FriendsOption from "./FriendsOption";
import { openFriendsOptions } from "../../../app/actions/rightbarActions";

export default function Friends() {
  const {
    authUser: {
      following,
      settings: { activeStatus },
    },
  } = useContext(LayoutContext);

  const [{ skip, limit }, setRefetch] = useState({ skip: 0, limit: 10 });

  const { isLoading: usersFetchIsLoading, data: usersFetchResult } =
    useGetUsersByIdQuery({
      userIds: prepareUserIdsForQuery(following),
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

  const dispatch = useDispatch();
  const { isOpen: friendsOptionsIsOpen } = useSelector(getFriendsOptionsState);

  const openOptions = () => dispatch(openFriendsOptions());

  return (
    <>
      <div className="rightbar-friends-header">
        <span className="rfh-title">Friends</span>
        <i className="rfh-icon" onClick={openOptions}>
          <MoreHorizOutlinedIcon style={iconStyle} />
        </i>
        {friendsOptionsIsOpen && <FriendsOption />}
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
        <span className="rfli-name">{displayName}</span>
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
