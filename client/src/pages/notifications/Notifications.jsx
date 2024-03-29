import "./notifications.css";
import RightBar from "../../feaures/right-bar/RightBar";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import { iconStyle } from "../../util/iconDescContent";
import NotificationBlock, {
  NotificationSkeleton,
} from "../../feaures/notification-block/NotificationBlock";
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
  showSkeleton,
  sortByDate,
} from "../../util/functions";
import Spinner from "../../components/Spinner/Spinner";
import { GeneralContext } from "../../routes/Router";
import { Skeleton } from "@mui/material";

const initialPage = { skip: 0, limit: 10 };
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

  const { isLoading: notificationsIsLoading, data } =
    useGetNotificationsQuery(pageRange);

  const fetchMore = useCallback(() => {
    !notificationsIsLoading &&
      data.ids.length &&
      setPageRange(({ skip, limit }) => newRange(skip, limit, initialPage));
  }, [notificationsIsLoading, data]);

  const notificationIds = useSelector(selectNotificationsIds);
  const isFetched = useCallback(
    (notId) => {
      return notificationIds.includes(notId);
    },
    [notificationIds]
  );

  const content = sortByDate(notifications).map(
    ({ notificationId, viewed }, index) =>
      // Check if the current id notification is has been fetched or being fetched. skip+limit
      index < pageRange.skip + pageRange.limit &&
      (isFetched(notificationId) ? (
        <NotificationBlock
          key={notificationId}
          notificationId={notificationId}
          viewed={viewed}
        />
      ) : (
        notificationsIsLoading && <NotificationSkeleton key={notificationId} />
      ))
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
      <ScrollCache ref={notificationsNode} fetchMore={fetchMore}>
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
            {/* {notificationsIsLoading &&
              showSkeleton(<NotificationSkeleton />, pageRange.limit)} */}
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
