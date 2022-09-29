import IconGradient from "../../components/icon-gradient/IconGradient";
import "./notification-block.css";
import avi2 from "../../assets/avatar-square.png";
import CircleIcon from "@mui/icons-material/Circle";
import { iconStyle } from "../../util/iconDescContent";
import { description } from "../../util/notificationTypes";

import { useSelector } from "react-redux";
import { selectUserById } from "../../app/api-slices/usersApiSlice";
import { selectPostById } from "../../app/api-slices/postsApiSlice";
import HomeUserAvatar from "../../components/home-user-avatar/HomeUserAvatar";

export default function NotificationBlock({ type, userId, viewed, postId }) {
  const user = useSelector((state) => selectUserById(state, userId));
  const authUser = useSelector((state) => selectUserById(state, 1));

  const followed = authUser?.following.includes(userId);

  const post = useSelector((state) => selectPostById(state, postId));
  const postContent = post?.content;
  const mediaType = post?.mediaType;
  const snippet = postContent ? postContent.slice(0, 11) : "";

  const content = description.reduce((accum, current, index) => {
    if (type === current.type) {
      accum.push(
        <p key={index}>
          {user?.displayName} {current.text}{" "}
          {type !== "mention" && type !== "follow"
            ? snippet
              ? `post ${"  "} "${snippet}..."`
              : mediaType === "image"
              ? "photo"
              : "video"
            : ""}
        </p>
      );
    }

    return accum;
  }, []);

  return (
    <div className="notification-block-container">
      <div>
        <IconGradient type={type} />
        <HomeUserAvatar
          userId={userId}
          size={2.5}
          style={{ marginRight: "0.6rem", marginLeft: "1rem" }}
        />
        <div className={viewed ? "viewed-notification" : ""}>
          {content}
          <span>2 mins ago</span>
        </div>
      </div>
      {type === "follow" ? (
        followed ? (
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
  );
}
