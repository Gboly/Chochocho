import "./notifications.css";
import RightBar from "../../feaures/right-bar/RightBar";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import { iconStyle } from "../../util/iconDescContent";
import NotificationBlock from "../../feaures/notification-block/NotificationBlock";
import { notificationOptions } from "../../util/iconDescContent";
import NotificationOptions from "../../feaures/notification-block/NotificationOptions";

import { useSelector, useDispatch } from "react-redux";
import { getNotificationOptionsState } from "./notificationSlice";
import { openNotificationOptions } from "../../app/actions/notificationActions";

const notifications = [
  {
    userId: 4,
    type: "like",
    postId: 3,
    viewed: false,
    snippet: "",
    mediaType: "video",
  },
  {
    userId: 2,
    type: "repost",
    postId: 3,
    viewed: true,
    snippet: "Life is good",
    mediaType: "video",
  },
  {
    userId: 5,
    type: "follow",
    viewed: true,
    followed: true,
  },
  {
    userId: 2,
    type: "mention",
    postId: 4,
    viewed: false,
  },
  {
    userId: 3,
    type: "comment",
    postId: 1,
    viewed: false,
    snippet: "",
    mediaType: "image",
  },
  {
    userId: 4,
    type: "post",
    postId: 6,
    viewed: false,
    snippet: "Good old Bil",
    mediaType: "image",
  },
  {
    userId: 5,
    type: "like",
    postId: 1,
    viewed: false,
    snippet: "",
    mediaType: "video",
  },
  {
    userId: 2,
    type: "follow",
    viewed: false,
    followed: true,
  },
  {
    userId: 3,
    type: "follow",
    viewed: false,
    followed: true,
  },
  {
    userId: 2,
    type: "mention",
    postId: 2,
    viewed: false,
  },
  {
    userId: 3,
    type: "comment",
    postId: 3,
    viewed: true,
    snippet: "",
    mediaType: "image",
  },
  {
    userId: 2,
    type: "mention",
    postId: 3,
    viewed: false,
  },
  {
    userId: 4,
    type: "follow",
    viewed: true,
    followed: true,
  },
  {
    userId: 2,
    type: "post",
    postId: 5,
    viewed: true,
    snippet: "Good old Bil",
    mediaType: "image",
  },
  {
    userId: 3,
    type: "like",
    postId: 5,
    viewed: false,
    snippet: "",
    mediaType: "video",
  },
  {
    userId: 5,
    type: "post",
    postId: 4,
    viewed: true,
    snippet: "Good old Bil",
    mediaType: "image",
  },
];

export default function Notifications() {
  const dispatch = useDispatch();
  const { isOpen: notificationOptionsIsOpen } = useSelector(
    getNotificationOptionsState
  );

  const content = notifications.map((item, index) => {
    return (
      <NotificationBlock
        key={index}
        {...{
          userId: item?.userId,
          type: item?.type,
          postId: item?.postId,
          viewed: item?.viewed,
          snippet: item?.snippet,
          mediaType: item?.mediaType,
          followed: item?.followed,
        }}
      />
    );
  });
  return (
    <>
      <div className="notification-wrapper">
        <div>
          <header>
            <span>Notification</span>
            <i onClick={() => dispatch(openNotificationOptions())}>
              <SettingsOutlinedIcon style={iconStyle} />
            </i>
            <div className="post-options-container notification-options-conatiner">
              {notificationOptionsIsOpen && (
                <NotificationOptions options={notificationOptions} />
              )}
            </div>
          </header>
          {content}
          <div className="nots-void"></div>
        </div>
      </div>
      <div className="rightbar-container">
        <RightBar />
      </div>
    </>
  );
}
