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

export default function Router() {
  return (
    <Routes>
      <Route path="/auth" element={<LayoutGen />}>
        <Route index element={<SignUp />} />
        <Route path="sign-up" element={<SignUp />} />
        <Route path="sign-in" element={<SignIn />} />
        <Route path="reset-password" element={<ForgotPassword />} />
        <Route path="settings/reset-password" element={<ForgotPassword />} />
      </Route>
      <Route path="/" element={<Layout />}>
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
    </Routes>
  );
}
