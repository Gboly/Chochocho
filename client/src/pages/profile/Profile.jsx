import "./profile.css";
import ProfileDetails from "../../feaures/users/profile-details/ProfileDetails";
import FollowDetails from "../../feaures/users/follow-details/FollowDetails";
import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";
import { iconStyle } from "../../util/iconDescContent";
import { useDispatch } from "react-redux";
import { openFullscreen } from "../../app/actions/homeActions";
import { openEditProfile } from "../../app/actions/profileActions";
import BlockIcon from "@mui/icons-material/Block";
import { useParams, useNavigate } from "react-router-dom";
import {
  useBlockUserMutation,
  useFollowUserMutation,
  useGetUserByIdQuery,
} from "../../app/api-slices/usersApiSlice";
import HomeUserAvatar from "../../components/home-user-avatar/HomeUserAvatar";
import {
  findByIdKey,
  newRange,
  showPopupOnOpaqueOverlay,
} from "../../util/functions";
import {
  blockedYouMessage,
  defaultcoverPhoto,
  editProfileType,
  profilePageType,
  youBlockedMessage,
} from "../../util/types";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { ScrollCache } from "../../feaures/scroll-cache/ScrollCache";
import { createContext, useContext, useImperativeHandle } from "react";
import Spinner from "../../components/Spinner/Spinner";
import { GeneralContext } from "../../routes/Router";
import PostList from "../../feaures/posts/post-list/PostList";
import { useGetPostsByUserIdQuery } from "../../app/api-slices/postsApiSlice";
import { getFollowArgs } from "../../feaures/posts/follow-unfollow-poster/followUnfollowPoster";
import { getBlockArgs } from "../../feaures/posts/block-user/BlockUser";

export const ProfileContext = createContext();
const initialPage = { skip: 0, limit: 10 };
export const Profile = () => {
  const { userId } = useParams();
  const { isLoading: userIsLoading, data: user } = useGetUserByIdQuery(userId);

  return (
    <>
      {user && <ProfileComponent {...{ user, userId }} />}
      {userIsLoading && <Spinner />}
    </>
  );
};

function ProfileComponent({ user, userId }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const profileNode = useRef();
  const { pageNodes, isFollowing, isAuth, authUser, isBlocked } =
    useContext(GeneralContext);

  const [follow, { error: followError }] = useFollowUserMutation();
  const [block, { error: blockError, data: blockResponse }] =
    useBlockUserMutation();

  const [postRange, setPostRange] = useState(initialPage);
  const {
    isLoading: userPostsIsLoading,
    data,
    refetch,
  } = useGetPostsByUserIdQuery({
    userId,
    ...postRange,
  });

  const fetchMore = useCallback(() => {
    !userPostsIsLoading &&
      data.ids.length &&
      setPostRange(({ skip, limit }) => newRange(skip, limit, initialPage));
  }, [userPostsIsLoading, data]);

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

  const handleFollow = (e) => {
    e && e.preventDefault();
    const args = getFollowArgs(authUser, user);
    follow(args);
  };
  const handleBlock = (e) => {
    e && e.preventDefault();
    const args = getBlockArgs(authUser, user);
    block(args);
  };

  const isBlockedByYou = useMemo(
    () => findByIdKey(authUser?.youBlocked, "userId", userId),
    [authUser, userId]
  );

  useEffect(() => {
    // When you have successfully unblocked a user, and there are no pending posts, Fetch posts buy making a refetch of the query.
    blockResponse?.success &&
      blockResponse?.isUnblock &&
      !data.ids.length &&
      refetch();
  }, [refetch, blockResponse, data]);

  return (
    <>
      <ScrollCache ref={profileNode} fetchMore={fetchMore}>
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
                src={coverPhoto || defaultcoverPhoto}
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
                {isAuth(userId) ? (
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
                    {!isBlocked(userId) && (
                      <button className="round-button" onClick={handleBlock}>
                        <i>
                          <BlockIcon />
                        </i>
                      </button>
                    )}
                    <button
                      className={`square-button ${
                        isFollowing(userId) ? "followed" : ""
                      }`}
                      onClick={isBlocked(userId) ? handleBlock : handleFollow}
                    >
                      {isBlocked(userId)
                        ? isBlockedByYou
                          ? "Unblock"
                          : "Block"
                        : isFollowing(userId)
                        ? "Following"
                        : "Follow"}
                    </button>
                  </div>
                )}
              </div>
              <p className="profile-username">{displayName || username}</p>
              <p>@{username}</p>
              <p className="profile-bio">{bio}</p>
            </div>
            <div className="profile-bottom">
              <div>
                <ProfileDetails user={user} />
                <FollowDetails {...{ following, followers }} />
                {/* #3 */}
                {isAuth(userId) && (
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
                {isBlocked(userId) ? (
                  <BlockedProfile />
                ) : (
                  <>
                    <PostList loadComponent={<Spinner />} />
                    {userPostsIsLoading && <Spinner />}
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </ScrollCache>
    </>
  );
}

const BlockedProfile = () => {
  const {
    authUser: { blockedYou, youBlocked },
  } = useContext(GeneralContext);
  const { userId } = useParams();

  const blockMessage = findByIdKey(blockedYou, "userId", userId)
    ? blockedYouMessage
    : findByIdKey(youBlocked, "userId", userId) && youBlockedMessage;

  return <section className="blocked-profile">{blockMessage}</section>;
};

export default Profile;
