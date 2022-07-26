import "./notifications.css";
import RightBar from "../../feaures/right-bar/RightBar";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import { iconStyle } from "../../util/iconDescContent";
import NotificationBlock from "../../feaures/notification-block/NotificationBlock";
import { notificationOptions } from "../../util/iconDescContent";
import NotificationOptions from "../../feaures/notification-block/NotificationOptions";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getNotificationOptionsState } from "./notificationSlice";
import { openNotificationOptions } from "../../app/actions/notificationActions";
import { ScrollCache } from "../../feaures/scroll-cache/ScrollCache";
import { useRef, useContext, useImperativeHandle } from "react";
import {
  notificationIdType,
  notificationOptionsType,
  notificationsBasePathType,
} from "../../util/types";
import {
  selectNotificationsIds,
  useGetNotificationsQuery,
} from "../../app/api-slices/notificationsApiSlice";
import { initialState } from "../../app/api-slices/notificationsApiSlice";
import {
  prepareIdsForQuery,
  showPopupOnTransparentOverlay,
} from "../../util/functions";
import Spinner from "../../components/Spinner/Spinner";
import { GeneralContext } from "../../routes/Router";

// Notifications is a collection/Model on its own. It should have its own apiSlice and should be fetched using the infinite scroll technique.
export default function Notifications() {
  const dispatch = useDispatch();
  const { isOpen: notificationOptionsIsOpen } = useSelector(
    getNotificationOptionsState
  );
  const notificationsNode = useRef();
  const {
    pageNodes,
    authUser: { notifications },
  } = useContext(GeneralContext);

  // #16, #17
  useImperativeHandle(
    pageNodes,
    () => ({
      notificationsNode: notificationsNode.current,
    }),
    [notificationsNode]
  );

  const [fetchQuery, setFetchQuery] = useState({
    queryState: initialState,
    searchQuery: prepareIdsForQuery(notifications, notificationIdType),
    start: 0,
    end: 10,
  });

  const { isLoading: notificationsIsLoading } =
    useGetNotificationsQuery(fetchQuery);

  const notificationIds = useSelector(selectNotificationsIds);

  const content = notificationIds.map((notificationId) => (
    <NotificationBlock key={notificationId} notificationId={notificationId} />
  ));

  const showOptions = (e) => {
    const overlayParams = {
      type: notificationOptionsType,
      x: e.clientX,
      y: e.clientY,
    };
    showPopupOnTransparentOverlay(openNotificationOptions, overlayParams);
  };

  return (
    <>
      <ScrollCache ref={notificationsNode}>
        <div
          ref={notificationsNode}
          className="notification-wrapper"
          id={notificationsBasePathType}
        >
          <div>
            <header>
              <span>Notification</span>
              <i onClick={showOptions}>
                <SettingsOutlinedIcon style={iconStyle} />
              </i>
              {/* {notificationOptionsIsOpen && (
                <NotificationOptions options={notificationOptions} />
              )} */}
            </header>
            {content}
            {notificationsIsLoading && <Spinner />}
            <div className="nots-void"></div>
          </div>
        </div>
        <div className="rightbar-container">
          <RightBar />
        </div>
      </ScrollCache>
    </>
  );
}
