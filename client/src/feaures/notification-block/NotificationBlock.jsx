import IconGradient from "../../components/icon-gradient/IconGradient";
import "./notification-block.css";
import CircleIcon from "@mui/icons-material/Circle";
import { iconStyle } from "../../util/iconDescContent";
import { description } from "../../util/notificationTypes";

import { useSelector } from "react-redux";
import { useGetUserByIdQuery } from "../../app/api-slices/usersApiSlice";
import HomeUserAvatar from "../../components/home-user-avatar/HomeUserAvatar";
import {
  commentType,
  followType,
  mentionType,
  otherLikeType,
  otherRepostType,
  photoType,
  postType,
  videoType,
} from "../../util/types";
import { selectNotificationById } from "../../app/api-slices/notificationsApiSlice";
import { useContext, useState } from "react";
import { convertToUserFriendlyTime } from "../../util/functions";
import { useNavigate } from "react-router-dom";
import { GeneralContext } from "../../routes/Router";
import NavigateWithScrollCache from "../scroll-cache/NavigateWithScrollCache";

const mediaSnippet = [photoType, videoType];
const snippetExcluded = [mentionType, followType];
const profileRouteTypes = [followType];
const viewPostRouteTypes = [
  otherLikeType,
  otherRepostType,
  commentType,
  mentionType,
  postType,
];
export default function NotificationBlock({ notificationId, viewed }) {
  const navigate = useNavigate();

  const { isFollowing } = useContext(GeneralContext);

  const { postId, userId, date, type, snippet } = useSelector((state) =>
    selectNotificationById(state, notificationId)
  );

  const { data: user } = useGetUserByIdQuery(userId);

  const { text } = description.find((item) => item.type === type);

  // Ensure the scroll height is cached when leaving page just so it is maintained on return.
  const handleRouting = () =>
    navigate(
      profileRouteTypes.includes(type)
        ? `/profile/${userId}`
        : viewPostRouteTypes.includes(type)
        ? `/${user?.username}/post/${postId}`
        : "/"
    );

  const [route, setRoute] = useState(false);

  const handleClick = (e) => {
    e && e.stopPropagation && e.stopPropagation();
    setRoute(true);
  };

  const cleanUp = () => setRoute(false);

  return (
    <>
      <NavigateWithScrollCache
        clicked={route}
        handleRouting={handleRouting}
        cleanUp={cleanUp}
      />
      {user && (
        <div className="notification-block-container" onClick={handleClick}>
          <div>
            <IconGradient type={type} />
            <HomeUserAvatar
              userId={userId}
              src={user.profileImage}
              size={2.5}
              style={{ marginRight: "0.6rem", marginLeft: "1rem" }}
            />
            <div className={viewed ? "viewed-notification" : ""}>
              <p>
                {`${user.displayName || user.username} ${text} ${
                  mediaSnippet.includes(snippet) ||
                  snippetExcluded.includes(type)
                    ? //? `${capitalize(snippet)}`
                      ""
                    : `Post "${snippet}..."`
                }`}
              </p>
              <span>{convertToUserFriendlyTime(date)}</span>
            </div>
          </div>
          {type === followType ? (
            isFollowing(userId) ? (
              <button id="following">Following</button>
            ) : (
              <button>Follow Back</button>
            )
          ) : !viewed ? (
            <i>
              <CircleIcon style={iconStyle} />
            </i>
          ) : (
            ""
          )}
        </div>
      )}
    </>
  );
}
