import Header from "./header/Header";
import { Outlet } from "react-router-dom";
import Sidebar from "./sidebar/Sidebar";
import PostImageFullscreen from "../feaures/posts/post-img-fullscreen/PostImgFullscreen";
import {
  OpaqueOverlay,
  TransparentOverlay,
} from "../components/overlay/Overlay";
import { useSelector, useDispatch } from "react-redux";
import {
  getPostOptionState,
  getPostShareState,
  getFullscreenState,
  getPlaybackRateState,
} from "../feaures/posts/post-excerpt/postExcerptSlice";
import { getNotificationOptionsState } from "../pages/notifications/notificationSlice";
import { getOutletOptionState } from "../pages/community/communitySlice";
import { getConfirmationState } from "./layoutSlice";
import {
  closePostOption,
  closePostShare,
  closePlaybackSpeed,
} from "../app/actions/homeActions";
import { closeNotificationOptions } from "../app/actions/notificationActions";
import { closeOutletOptions } from "../app/actions/communityActions";

import "./layout.css";

import { createContext, useEffect, useRef, useState } from "react";
import Confirmation from "../components/confirmation/Confirmation";
import { motion, AnimatePresence } from "framer-motion";

import { getOpaqueOverlayState } from "./layoutSlice";
import { useGetUserByIdQuery } from "../app/api-slices/usersApiSlice";
import Spinner from "../components/Spinner/Spinner";

export const LayoutContext = createContext();

export default function Layout() {
  const dispatch = useDispatch();
  const pageNodes = useRef();
  const [pageRefresh, setPageRefresh] = useState(false);

  const { isOpen: opaqueOverlayIsOpen } = useSelector(getOpaqueOverlayState);

  // #3
  const authUserId = 1;
  const { data: authUser } = useGetUserByIdQuery(authUserId);
  const isFollowing = (userId) => (authUser?.following || []).includes(userId);
  const isFollower = (userId) => (authUser?.followers || []).includes(userId);

  const { isOpen: fullscreenIsOpen } = useSelector(getFullscreenState);
  const { isOpen: postOptionsIsOpen } = useSelector(getPostOptionState);
  const { isOpen: postShareIsOpen } = useSelector(getPostShareState);
  const { isOpen: playbackSpeedIsOpen } = useSelector(getPlaybackRateState);
  const { isOpen: notificationOptionsIsOpen } = useSelector(
    getNotificationOptionsState
  );
  const { isOpen: outletOptionIsOpen } = useSelector(getOutletOptionState);
  const { isOpen: confirmationIsOpen, type: confirmationType } =
    useSelector(getConfirmationState);

  const [transparentLayer, setTransparentLayer] = useState(false);

  useEffect(() => {
    postOptionsIsOpen ||
    postShareIsOpen ||
    playbackSpeedIsOpen ||
    notificationOptionsIsOpen ||
    outletOptionIsOpen
      ? setTransparentLayer(true)
      : setTransparentLayer(false);
  }, [
    outletOptionIsOpen,
    notificationOptionsIsOpen,
    playbackSpeedIsOpen,
    postShareIsOpen,
    postOptionsIsOpen,
  ]);

  const removeTransparentOverlay = () => {
    postOptionsIsOpen && dispatch(closePostOption());
    postShareIsOpen && dispatch(closePostShare());
    playbackSpeedIsOpen && dispatch(closePlaybackSpeed());
    notificationOptionsIsOpen && dispatch(closeNotificationOptions());
    outletOptionIsOpen && dispatch(closeOutletOptions());
  };

  return (
    <>
      {authUser ? (
        <LayoutContext.Provider
          value={{
            pageNodes,
            pageRefresh,
            setPageRefresh,
            authUser,
            isFollowing,
            isFollower,
          }}
        >
          <Header />
          <div className="main-container">
            <div className="sidebar-container-flex">
              {/* #1  */}
              <Sidebar size="lg" />
              {/* <AnimatePresence>
            {sidebarIsOpen && <Sidebar key={sidebarIsOpen} size="sm" />}
          </AnimatePresence> */}
            </div>
            <Outlet context={opaqueOverlayIsOpen} />
          </div>
          {/* #2 */}
          {fullscreenIsOpen && <PostImageFullscreen />}
          {confirmationIsOpen && <Confirmation type={confirmationType} />}

          {opaqueOverlayIsOpen && <OpaqueOverlay />}
          {transparentLayer && (
            <div onClick={removeTransparentOverlay}>
              <TransparentOverlay />
            </div>
          )}
        </LayoutContext.Provider>
      ) : (
        // This should be replaced with a loading animation screen(twitter-like)
        <Spinner />
      )}
    </>
  );
}
