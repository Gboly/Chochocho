import { Routes, Route } from "react-router-dom";
import Layout from "../layout/Layout";
import Home from "../pages/home/Home";
import Notifications from "../pages/notifications/Notifications";
import Profile from "../pages/profile/Profile";
import Community from "../pages/community/Community";
import Followers from "../feaures/community-outlets/Followers";
import Following from "../feaures/community-outlets/Following";
import Suggested from "../feaures/community-outlets/Suggested";
import Settings from "../pages/settings/Settings";
import EditProfile from "../feaures/settings-outlet/edit-profile/EditProfile";
import Notification from "../feaures/settings-outlet/notification/Notification";
import Blocking from "../feaures/settings-outlet/blocking/Blocking";
import Security from "../feaures/settings-outlet/security/Security";
import Viewing from "../feaures/settings-outlet/viewing/Viewing";
import LayoutGen from "../layout-gen/LayoutGen";
import SignUp from "../pages/sign-up/SignUp";
import SignIn from "../pages/sign-in/SignIn";
import ForgotPassword from "../pages/forgot-password/ForgotPassword";
import ViewPost from "../pages/view post/ViewPost";
import Story from "../pages/story/Story";
import StoryLayout from "../pages/story/StoryLayout";
import { useGetUserByIdQuery } from "../app/api-slices/usersApiSlice";
import { createContext, useRef, useState } from "react";

export const GeneralContext = createContext();
export default function Router() {
  // I realized here that the context i had created within the Layout component would not be accessible to the story page. I failed to put this into consideration at the time.
  // There are components that needs to be used in the story component and this component makes use of a value from the LayoutContext.
  // #3
  const authUserId = 1;
  const { data: authUser } = useGetUserByIdQuery(authUserId);
  const isFollowing = (userId) => (authUser?.following || []).includes(userId);
  const isFollower = (userId) => (authUser?.followers || []).includes(userId);
  const isAuth = (userId) => authUser?.id === userId;

  const pageNodes = useRef();
  const [pageRefresh, setPageRefresh] = useState(false);

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
      }}
    >
      <Routes>
        <Route path="/auth" element={<LayoutGen />}>
          <Route index element={<SignUp />} />
          <Route path="sign-up" element={<SignUp />} />
          <Route path="sign-in" element={<SignIn />} />
          <Route path="reset-password" element={<ForgotPassword />} />
          <Route path="settings/reset-password" element={<ForgotPassword />} />
        </Route>
        <Route path="/" element={<Layout authUser={authUser} />}>
          <Route index element={<Home />} />
          <Route path=":username/post/:postId" element={<ViewPost />} />
          {/* #12 */}
          <Route path="profile/:userId" element={<Profile />} />
          <Route path="notifications" element={<Notifications />} />
          <Route path="community" element={<Community />}>
            <Route index element={<Followers />} />
            <Route path="followers" element={<Followers />} />
            <Route path="following" element={<Following />} />
            <Route path="suggested" element={<Suggested />} />
          </Route>
          <Route path="settings" element={<Settings />}>
            <Route index element={<EditProfile />} />
            <Route path="profile" element={<EditProfile />} />
            <Route path="notification" element={<Notification />} />
            <Route path="blocking" element={<Blocking />} />
            <Route path="security" element={<Security />} />
            <Route path="viewing" element={<Viewing />} />
          </Route>
        </Route>
        <Route path="/story" element={<StoryLayout authUser={authUser} />}>
          <Route />
          <Route
            path=":username/:storyId"
            element={<Story authUser={authUser} />}
          />
        </Route>
      </Routes>
    </GeneralContext.Provider>
  );
}
