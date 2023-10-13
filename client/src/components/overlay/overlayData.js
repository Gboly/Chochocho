import {
  editPostType,
  blockPosterType,
  unfollowPosterType,
  deletePostType,
  writeAltType,
  createPostType,
  sidebarType,
  altMessageType,
  editProfileType,
  editProfileImageType,
  engagedUsersListType,
  postOptionsType,
  postShareType,
  playbackSpeedType,
  notificationOptionsType,
  outletOptionsType,
  friendsOptionsType,
  storyOptionsType,
  muteStoryType,
  storyVisibilitySettingsType,
  selectUsersType,
  logOutType,
  reportType,
  deleteStoryType,
} from "../../util/types";
import WriteAlt from "../../feaures/posts/write-alt/WriteAlt";
import Report from "../../feaures/report/Report";
import EditPost from "../../feaures/posts/edit-post/EditPost";
import DeletePost from "../../feaures/posts/delete-post/DeletePost";
import BlockUser from "../../feaures/posts/block-user/BlockUser";
import FollowUnfollowPoster from "../../feaures/posts/follow-unfollow-poster/followUnfollowPoster";
import EditProfileImage from "../../feaures/users/edit-profile-image/EditProfileImage";
import {
  closeAltMessage,
  closeBlockPoster,
  closeCreatePost,
  closeDeletePost,
  closeEditPost,
  closeEngagedUsersList,
  closeFollowPoster,
  closePlaybackSpeed,
  closePostOption,
  closePostShare,
  closeWriteAlt,
} from "../../app/actions/homeActions";
import {
  closeLogOut,
  closeReport,
  closeSidebarNav,
} from "../../app/actions/layoutActions";
import PostImageAlt from "../../feaures/posts/post-image-alt/PostImageAlt";
import EditProfile from "../../feaures/users/edit-profile/EditProfile";
import {
  closeEditProfile,
  closeEditProfileImage,
} from "../../app/actions/profileActions";
import EngagedUsersList from "../../feaures/posts/engaged-users-list/EngagedUsersList";
import PostOptions from "../../feaures/posts/post-options/PostOptions";
import PostShare from "../../feaures/posts/post-share/PostShare";
import PlayBackSpeed from "../../feaures/custom-video/playback-speed/PlaybackSpeed";
import { closeNotificationOptions } from "../../app/actions/notificationActions";
import { closeOutletOptions } from "../../app/actions/communityActions";
import FriendsOption from "../../feaures/right-bar/friends/FriendsOption";
import { closeFriendsOptions } from "../../app/actions/rightbarActions";
import NotificationOptions from "../../feaures/notification-block/NotificationOptions";
import StoryOptions from "../../pages/story/StoryOptions";
import {
  closeDeleteStory,
  closeMuteStoryAuthor,
  closeSelectUserAsCancel,
  closeSettings,
  closeStoryOptions,
} from "../../app/actions/storyActions";
import MuteStoryAuthor from "../../pages/story/MuteStoryAuthor";
import StoryVisibilitySettings from "../../pages/story/StoryVisibilitySettings";
import SelectUsers from "../../pages/story/SelectUsers";
import LogOut from "../../feaures/logout/LogOut";
import DeleteStory from "../../pages/story/DeleteStory";

export const opaqueOverlayComponents = [
  {
    type: createPostType,
    component: "",
    closeAction: closeCreatePost,
  },
  {
    type: editPostType,
    component: <EditPost />,
    closeAction: closeEditPost,
  },
  {
    type: writeAltType,
    component: <WriteAlt />,
    closeAction: closeWriteAlt,
  },
  {
    type: reportType,
    component: <Report />,
    closeAction: closeReport,
  },
  {
    type: deletePostType,
    component: <DeletePost />,
    closeAction: closeDeletePost,
  },
  {
    type: blockPosterType,
    component: <BlockUser />,
    closeAction: closeBlockPoster,
  },
  {
    type: unfollowPosterType,
    component: <FollowUnfollowPoster />,
    closeAction: closeFollowPoster,
  },
  {
    type: sidebarType,
    component: "",
    closeAction: closeSidebarNav,
  },
  {
    type: altMessageType,
    component: <PostImageAlt />,
    closeAction: closeAltMessage,
  },
  {
    type: editProfileType,
    component: <EditProfile />,
    closeAction: closeEditProfile,
  },
  {
    type: editProfileImageType,
    component: <EditProfileImage />,
    closeAction: closeEditProfileImage,
  },
  {
    type: engagedUsersListType,
    component: <EngagedUsersList />,
    closeAction: closeEngagedUsersList,
  },
  {
    type: muteStoryType,
    component: <MuteStoryAuthor />,
    closeAction: closeMuteStoryAuthor,
  },
  {
    type: storyVisibilitySettingsType,
    component: <StoryVisibilitySettings />,
    closeAction: closeSettings,
  },
  {
    type: selectUsersType,
    component: <SelectUsers />,
    closeAction: closeSelectUserAsCancel,
  },
  {
    type: logOutType,
    component: <LogOut />,
    closeAction: closeLogOut,
  },
  {
    type: deleteStoryType,
    component: <DeleteStory />,
    closeAction: closeDeleteStory,
  },
];

export const TransparentOverlayComponents = [
  {
    type: postOptionsType,
    component: <PostOptions />,
    closeAction: closePostOption,
  },
  {
    type: postShareType,
    component: <PostShare />,
    closeAction: closePostShare,
  },
  {
    type: playbackSpeedType,
    component: <PlayBackSpeed />,
    closeAction: closePlaybackSpeed,
  },
  {
    type: notificationOptionsType,
    component: <NotificationOptions />,
    closeAction: closeNotificationOptions,
  },
  {
    type: outletOptionsType,
    component: "",
    closeAction: closeOutletOptions,
  },
  {
    type: friendsOptionsType,
    component: <FriendsOption />,
    closeAction: closeFriendsOptions,
  },
  {
    type: storyOptionsType,
    component: <StoryOptions />,
    closeAction: closeStoryOptions,
  },
];
