import React, { useEffect } from "react";
import {
  useGetAuthUserQuery,
  useGetUserByIdQuery,
} from "./app/api-slices/usersApiSlice";
import { useMemo, useState, useRef, createContext } from "react";
import {
  findByIdKey,
  getStoryAuthors,
  sortByViewedStatus,
} from "./util/functions";
import { GeneralContext } from "./routes/Router";
import Spinner from "./components/Spinner/Spinner";
import PostImageFullscreen from "./feaures/posts/post-img-fullscreen/PostImgFullscreen";
import Confirmation from "./components/confirmation/Confirmation";
import {
  OpaqueOverlay,
  TransparentOverlay,
} from "./components/overlay/Overlay";
import {
  getConfirmationState,
  getOpaqueOverlayState,
  getTransparentOverlayState,
} from "./layout/layoutSlice";
import { useDispatch, useSelector } from "react-redux";
import { getFullscreenState } from "./feaures/posts/post-excerpt/postExcerptSlice";
import AuthError from "./pages/sign-in/AuthError";
import { useLocation } from "react-router-dom";
import { setCurrentPage } from "./app/actions/routerActions";

export default function App({ children }) {
  // I realized here that the context i had created within the Layout component would not be accessible to the story page. I failed to put this into consideration at the time.
  // There are components that needs to be used in the story component and this component makes use of a value from the LayoutContext.
  const { data, error } = useGetAuthUserQuery();

  const dispatch = useDispatch();
  const location = useLocation();
  useEffect(() => {
    dispatch(setCurrentPage(location.pathname));
  }, [location, dispatch]);

  const {
    authUser,
    isFollowing,
    isFollower,
    isBlocked,
    isAuth,
    isBookmarked,
    groupedUsers,
    isViewedStory,
  } = useMemo(() => {
    const authUser = JSON.parse(JSON.stringify(data || ""));
    const isFollowing = (userId) =>
      findByIdKey(authUser?.following, "userId", userId);
    const isFollower = (userId) =>
      findByIdKey(authUser?.followers, "userId", userId);
    const isAuth = (userId) => authUser?.id === userId;
    const isBlocked = (userId) =>
      findByIdKey(
        [...authUser?.youBlocked, ...authUser?.blockedYou],
        "userId",
        userId
      );
    const isBookmarked = (postId) =>
      findByIdKey(authUser?.bookmarks, "postId", postId);

    const isViewedStory = (storyId, isAuthStory) =>
      authUser[isAuthStory ? "myStories" : "otherStories"].some(
        (story) => story.storyId === storyId && story.viewed
      );

    // The temporary json-server had otherStoryAuthors in the user schema. I worked with this. I Withdrew this from the mongoDB schema, so in order to avoid modifying the codebase, I would simply mutate the authUser to include this property.
    authUser &&
      (authUser.otherStoryAuthors = getStoryAuthors(
        authUser?.otherStories,
        isFollowing,
        authUser?.mutedStoryAuthors
      ));
    const groupedUsers = sortByViewedStatus(authUser);

    return {
      authUser,
      isFollowing,
      isFollower,
      isBlocked,
      isAuth,
      isBookmarked,
      groupedUsers,
      isViewedStory,
    };
  }, [data]);

  const pageNodes = useRef();
  const videoPostNode = useRef();
  const [pageRefresh, setPageRefresh] = useState(false);

  const { isOpen: opaqueOverlayIsOpen } = useSelector(getOpaqueOverlayState);
  const { isOpen: TransparentOverlayIsOpen } = useSelector(
    getTransparentOverlayState
  );
  const { isOpen: fullscreenIsOpen } = useSelector(getFullscreenState);
  const {
    isOpen: confirmationIsOpen,
    type: confirmationType,
    message,
    progress,
  } = useSelector(getConfirmationState);

  return (
    <GeneralContext.Provider
      value={{
        authUser,
        isFollowing,
        isFollower,
        isBlocked,
        isAuth,
        isBookmarked,
        isViewedStory,
        pageNodes,
        pageRefresh,
        setPageRefresh,
        viewedUsers: groupedUsers?.viewed,
        activeUsers: groupedUsers?.active,
        videoPostNode,
        opaqueOverlayIsOpen,
      }}
    >
      {authUser ? (
        children
      ) : (
        <main className="loading-auth">
          <Spinner />
        </main>
      )}
      {/* #2 */}
      {fullscreenIsOpen && <PostImageFullscreen />}
      {confirmationIsOpen && (
        <Confirmation
          type={confirmationType}
          progress={progress}
          message={message}
        />
      )}

      {opaqueOverlayIsOpen && <OpaqueOverlay />}
      {TransparentOverlayIsOpen && <TransparentOverlay />}

      <AuthError error={error} />
    </GeneralContext.Provider>
  );
}
