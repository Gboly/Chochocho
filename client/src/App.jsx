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
import { useSelector } from "react-redux";
import { getFullscreenState } from "./feaures/posts/post-excerpt/postExcerptSlice";
import AuthError from "./pages/sign-in/AuthError";

export default function App({ children }) {
  // I realized here that the context i had created within the Layout component would not be accessible to the story page. I failed to put this into consideration at the time.
  // There are components that needs to be used in the story component and this component makes use of a value from the LayoutContext.
  const { data, error } = useGetAuthUserQuery();

  const { authUser, isFollowing, isFollower, isAuth, groupedUsers } =
    useMemo(() => {
      const authUser = JSON.parse(JSON.stringify(data || ""));
      const isFollowing = (userId) =>
        findByIdKey(authUser?.following, "userId", userId);
      const isFollower = (userId) =>
        findByIdKey(authUser?.followers, "userId", userId);
      const isAuth = (userId) => authUser?.id === userId;

      // The temporary json-server had otherStoryAuthors in the user schema. I worked with this. I Withdrew this from the mongoDB schema, so in order to avoid modifying the codebase, I would simply mutate the authUser to include this property.
      authUser &&
        (authUser.otherStoryAuthors = getStoryAuthors(authUser?.otherStories));
      const groupedUsers = sortByViewedStatus(authUser);

      return { authUser, isFollowing, isFollower, isAuth, groupedUsers };
    }, [data]);

  const pageNodes = useRef();
  const videoPostNode = useRef();
  const [pageRefresh, setPageRefresh] = useState(false);

  const { isOpen: opaqueOverlayIsOpen } = useSelector(getOpaqueOverlayState);
  const { isOpen: TransparentOverlayIsOpen } = useSelector(
    getTransparentOverlayState
  );
  const { isOpen: fullscreenIsOpen } = useSelector(getFullscreenState);
  const { isOpen: confirmationIsOpen, type: confirmationType } =
    useSelector(getConfirmationState);

  return (
    <GeneralContext.Provider
      value={{
        authUser,
        isFollowing,
        isFollower,
        isAuth,
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
      {confirmationIsOpen && <Confirmation type={confirmationType} />}

      {opaqueOverlayIsOpen && <OpaqueOverlay />}
      {TransparentOverlayIsOpen && <TransparentOverlay />}

      <AuthError error={error} />
    </GeneralContext.Provider>
  );
}
