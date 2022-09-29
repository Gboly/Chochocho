import "./overlay.css";
import { useSelector } from "react-redux";
import { useMemo } from "react";
import { getOpaqueOverlayState } from "../../layout/layoutSlice";
import { getWriteAltState } from "../../feaures/posts/create-post/createPostSlice";
import {
  closeNestedPopupOnOpaqueOverlay,
  closePopupOnOpaqueOverlay,
} from "../../util/functions";
import {
  closeAltMessage,
  closeBlockPoster,
  closeCreatePost,
  closeDeletePost,
  closeEditPost,
  closeEngagedUsersList,
  closeFollowPoster,
  closeReportPost,
  closeWriteAlt,
} from "../../app/actions/homeActions";
import { AnimatePresence } from "framer-motion";
import WriteAlt from "../../feaures/posts/write-alt/WriteAlt";
import ReportPost from "../../feaures/posts/report-post/ReportPost";
import EditPost from "../../feaures/posts/edit-post/EditPost";
import DeletePost from "../../feaures/posts/delete-post/DeletePost";
import BlockUser from "../../feaures/posts/block-user/BlockUser";
import FollowUnfollowPoster from "../../feaures/posts/follow-unfollow-poster/followUnfollowPoster";
import Sidebar from "../../layout/sidebar/Sidebar";
import EditProfileImage from "../../feaures/users/edit-profile-image/EditProfileImage";
import {
  editPostType,
  blockPosterType,
  unfollowPosterType,
  reportPostType,
  deletePostType,
  writeAltType,
  createPostType,
  sidebarType,
  altMessageType,
  editProfileType,
  editProfileImageType,
  engagedUsersListType,
} from "../../util/types";
import { closeSidebarNav } from "../../app/actions/layoutActions";
import PostImageAlt from "../../feaures/posts/post-image-alt/PostImageAlt";
import EditProfile from "../../feaures/users/edit-profile/EditProfile";
import {
  closeEditProfile,
  closeEditProfileImage,
} from "../../app/actions/profileActions";
import EngagedUsersList from "../../feaures/posts/engaged-users-list/EngagedUsersList";

const data = [
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
    type: reportPostType,
    component: <ReportPost />,
    closeAction: closeReportPost,
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
];

const nestedPopups = [writeAltType, editProfileImageType];
const clickExceptions = [reportPostType];

export const TransparentOverlay = () => {
  return <div className="transparent-overlay"></div>;
};

export const OpaqueOverlay = () => {
  const { type: currentType } = useSelector(getOpaqueOverlayState);

  const opaqueOverlayLibrary = useMemo(() => {
    // #7
    const updatedData = data.reduce((accum, current) => {
      if (current.type === sidebarType) {
        current.component = (
          <AnimatePresence>
            <Sidebar key={currentType} size="sm" />
          </AnimatePresence>
        );
      }
      accum.push(current);
      return accum;
    }, []);
    return updatedData;
  }, [currentType]);

  const handleClick = (e, closeAction) => {
    if (e.target.getAttribute("id") === "opaque-overlay") {
      return !nestedPopups.includes(currentType) &&
        !clickExceptions.includes(currentType)
        ? closePopupOnOpaqueOverlay(closeAction)
        : "";
    }
  };

  const content = opaqueOverlayLibrary.reduce((accum, current, index) => {
    const { type, component, closeAction } = current;

    if (type === currentType) {
      accum.push(
        <div
          key={index}
          id="opaque-overlay"
          className="opaque-overlay"
          onClick={(e) => handleClick(e, closeAction)}
        >
          {component}
        </div>
      );
    }
    return accum;
  }, []);

  return <>{content}</>;
};
