import "./profile.css";
import ProfileDetails from "../../feaures/users/profile-details/ProfileDetails";
import FollowDetails from "../../feaures/users/follow-details/FollowDetails";
import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";
import { iconStyle } from "../../util/iconDescContent";
import { useDispatch } from "react-redux";
import { openFullscreen } from "../../app/actions/homeActions";
import { openEditProfile } from "../../app/actions/profileActions";
import LocalPostOfficeOutlinedIcon from "@mui/icons-material/LocalPostOfficeOutlined";
import { useParams, useNavigate } from "react-router-dom";
import { useGetUserByIdQuery } from "../../app/api-slices/usersApiSlice";
import HomeUserAvatar from "../../components/home-user-avatar/HomeUserAvatar";
import { showPopupOnOpaqueOverlay } from "../../util/functions";
import { editProfileType, profilePageType } from "../../util/types";
import { useEffect, useRef, useState } from "react";
import { ScrollCache } from "../../feaures/scroll-cache/ScrollCache";
import { createContext, useContext, useImperativeHandle } from "react";
import Spinner from "../../components/Spinner/Spinner";
import { GeneralContext } from "../../routes/Router";
import PostList from "../../feaures/posts/post-list/PostList";
import { useGetPostsByUserIdQuery } from "../../app/api-slices/postsApiSlice";
import { postSkeletons } from "../../feaures/posts/post-excerpt/PostExcerpt";

export const ProfileContext = createContext();
const initialPage = { skip: 0, limit: 1 };
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
  const { pageNodes, isFollowing, isAuth } = useContext(GeneralContext);

  const [postRange, setPostRange] = useState(initialPage);
  const { isLoading: userPostsIsLoading } = useGetPostsByUserIdQuery({
    userId,
    ...postRange,
  });

  useEffect(() => {
    const timeout = setTimeout(
      () =>
        setPostRange(({ limit }) => ({
          skip: limit,
          limit: limit + initialPage.limit,
        })),
      10000
    );
    return () => clearTimeout(timeout);
  }, []);

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
                src={coverPhoto || "https://www.colorhexa.com/c32aa3.png"}
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
                <PostList loadComponent={<Spinner />} />
                {userPostsIsLoading && <Spinner />}
              </div>
            </div>
          </div>
        </div>
      </ScrollCache>
    </>
  );
}

export default Profile;
