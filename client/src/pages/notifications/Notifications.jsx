import "./notifications.css";
import RightBar from "../../feaures/right-bar/RightBar";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import { iconStyle } from "../../util/iconDescContent";
import NotificationBlock from "../../feaures/notification-block/NotificationBlock";
import { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { openNotificationOptions } from "../../app/actions/notificationActions";
import { ScrollCache } from "../../feaures/scroll-cache/ScrollCache";
import { useRef, useContext, useImperativeHandle } from "react";
import {
  notificationOptionsType,
  notificationsBasePathType,
} from "../../util/types";
import {
  selectNotificationsIds,
  useGetNotificationsQuery,
} from "../../app/api-slices/notificationsApiSlice";
import {
  newRange,
  showPopupOnTransparentOverlay,
  sortByDate,
} from "../../util/functions";
import Spinner from "../../components/Spinner/Spinner";
import { GeneralContext } from "../../routes/Router";

const initialPage = { skip: 0, limit: 3 };
export default function Notifications() {
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

  const [pageRange, setPageRange] = useState(initialPage);

  useEffect(() => {
    const timeout = setTimeout(
      () =>
        setPageRange(({ skip, limit }) => newRange(skip, limit, initialPage)),
      10000
    );
    return () => clearTimeout(timeout);
  }, []);

  const { isLoading: notificationsIsLoading } =
    useGetNotificationsQuery(pageRange);

  const notificationIds = useSelector(selectNotificationsIds);
  const isFetched = useCallback(
    (notId) => {
      return notificationIds.includes(notId);
    },
    [notificationIds]
  );

  const content = sortByDate(notifications).map(
    ({ notificationId, viewed }) =>
      isFetched(notificationId) && (
        <NotificationBlock
          key={notificationId}
          notificationId={notificationId}
          viewed={viewed}
        />
      )
  );

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
