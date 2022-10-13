import "./profile.css";
import ProfileDetails from "../../feaures/users/profile-details/ProfileDetails";
import FollowDetails from "../../feaures/users/follow-details/FollowDetails";
import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";
import { iconStyle } from "../../util/iconDescContent";
import { useDispatch, useSelector } from "react-redux";
import { openFullscreen } from "../../app/actions/homeActions";
import { openEditProfile } from "../../app/actions/profileActions";
import LocalPostOfficeOutlinedIcon from "@mui/icons-material/LocalPostOfficeOutlined";
import { useParams, useNavigate } from "react-router-dom";
import {
  selectUserById,
  useGetUserByIdQuery,
} from "../../app/api-slices/usersApiSlice";
import PostListLoader from "../../feaures/posts/post-list/postListLoader";
import HomeUserAvatar from "../../components/home-user-avatar/HomeUserAvatar";
import { showPopupOnOpaqueOverlay } from "../../util/functions";
import { editProfileType, profilePageType } from "../../util/types";
import { useRef } from "react";
import { ScrollCache } from "../../feaures/scroll-cache/ScrollCache";
import { createContext, useContext, useImperativeHandle } from "react";
import { LayoutContext } from "../../layout/Layout";
import Spinner from "../../components/Spinner/Spinner";

export const ProfileContext = createContext();

export const Profile = () => {
  const {
    authUser: { id: authUserId },
  } = useContext(LayoutContext);
  const { userId: id } = useParams();
  const userId = Number(id);
  //const user = useSelector((state) => selectUserById(state, userId));
  const { isLoading: userIsLoading, data: user } = useGetUserByIdQuery(userId);

  const authenticated = userId === authUserId;

  return (
    <>
      {user && <ProfileComponent {...{ authenticated, user, userId }} />}
      {userIsLoading && <Spinner />}
    </>
  );
};

function ProfileComponent({ authenticated, user, userId }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const profileNode = useRef();
  const { pageNodes, isFollowing } = useContext(LayoutContext);

  // #16, #17
  useImperativeHandle(
    pageNodes,
    () => ({
      profileNode: profileNode.current,
    }),
    [profileNode]
  );

  const {
    displayName,
    username,
    bio,
    profileImage,
    coverPhoto,
    following,
    followers,
  } = user;

  return (
    <>
      <ScrollCache ref={profileNode}>
        <div
          className="profile-container"
          ref={profileNode}
          id={profilePageType}
        >
          <div className="profile-wrapper">
            <div className="profile-top">
              <button
                className="profile-back-button"
                onClick={() => navigate(-1)}
              >
                <i>
                  <ArrowBackOutlinedIcon style={iconStyle} />
                </i>
              </button>
              <img
                src={coverPhoto}
                alt="profile cover"
                className="profile-coverphoto"
                onClick={() => dispatch(openFullscreen(coverPhoto))}
              />
              <div className="profile-top-absolute">
                <HomeUserAvatar
                  {...{
                    size: 7,
                    style: { border: "3px solid #fff", marginTop: "-4rem" },
                    userId,
                    src: profileImage,
                    noLink: true,
                    action: () => dispatch(openFullscreen(profileImage)),
                    // #8
                  }}
                />
                {/* #3 */}
                {authenticated ? (
                  <button
                    className="edit-profile"
                    onClick={() =>
                      showPopupOnOpaqueOverlay(openEditProfile, editProfileType)
                    }
                  >
                    Edit profile
                  </button>
                ) : (
                  <div>
                    <button>
                      <i>
                        <LocalPostOfficeOutlinedIcon />
                      </i>
                    </button>
                    <button
                      className={`square-button ${
                        isFollowing(userId) ? "followed" : ""
                      }`}
                    >
                      {isFollowing(userId) ? "Following" : "Follow"}
                    </button>
                  </div>
                )}
              </div>
              <p className="profile-username">{displayName}</p>
              <p>@{username}</p>
              <p className="profile-bio">{bio}</p>
            </div>
            <div className="profile-bottom">
              <div>
                <ProfileDetails user={user} />
                <FollowDetails {...{ following, followers }} />
                {/* #3 */}
                {authenticated && (
                  <button
                    onClick={() =>
                      showPopupOnOpaqueOverlay(openEditProfile, editProfileType)
                    }
                  >
                    Edit details
                  </button>
                )}
              </div>
              <div>
                <PostListLoader />
              </div>
            </div>
          </div>
        </div>
      </ScrollCache>
    </>
  );
}

export default Profile;
