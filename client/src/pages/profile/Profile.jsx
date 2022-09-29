import "./profile.css";
import ProfileDetails from "../../feaures/users/profile-details/ProfileDetails";
import FollowDetails from "../../feaures/users/follow-details/FollowDetails";
import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";
import coverPhoto from "../../assets/cover-photo.png";
import { iconStyle } from "../../util/iconDescContent";
import { useDispatch, useSelector } from "react-redux";
import { openFullscreen } from "../../app/actions/homeActions";
import { openEditProfile } from "../../app/actions/profileActions";
import { getEditProfileState, getEditProfileImageState } from "./profileSlice";
import EditProfileImage from "../../feaures/users/edit-profile-image/EditProfileImage";
import LocalPostOfficeOutlinedIcon from "@mui/icons-material/LocalPostOfficeOutlined";
import { useParams, useNavigate } from "react-router-dom";
import { selectUserById } from "../../app/api-slices/usersApiSlice";
import PostListLoader from "../../feaures/posts/post-list/postListLoader";
import HomeUserAvatar from "../../components/home-user-avatar/HomeUserAvatar";
import { showPopupOnOpaqueOverlay } from "../../util/functions";
import { editProfileType } from "../../util/types";

export default function Profile() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isOpen: editProfileImageIsOpen } = useSelector(
    getEditProfileImageState
  );

  const { userId: id } = useParams();
  const userId = Number(id);
  const user = useSelector((state) => selectUserById(state, userId));
  const authUser = useSelector((state) => selectUserById(state, 1));

  const following = authUser?.following.includes(userId);

  return (
    <>
      {/* {editProfileImageIsOpen && <EditProfileImage />} */}
      <div className="profile-container">
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
                  noLink: true,
                  action: () =>
                    dispatch(openFullscreen(user?.profileImage || "")),
                  // #8
                }}
              />
              {/* #3 */}
              {userId === 1 && (
                <button
                  className="edit-profile"
                  onClick={() =>
                    showPopupOnOpaqueOverlay(openEditProfile, editProfileType)
                  }
                >
                  Edit profile
                </button>
              )}
              {/* #3 */}
              {userId !== 1 && (
                <div>
                  <button>
                    <i>
                      <LocalPostOfficeOutlinedIcon />
                    </i>
                  </button>
                  <button
                    className={`square-button ${following ? "followed" : ""}`}
                  >
                    {following ? "Following" : "Follow"}
                  </button>
                </div>
              )}
            </div>
            <p className="profile-username">{user?.displayName || ""}</p>
            <p>@{user?.username || ""}</p>
            <p className="profile-bio">{user?.bio || ""}</p>
          </div>
          <div className="profile-bottom">
            <div>
              <ProfileDetails />
              <FollowDetails />
              {/* #3 */}
              {userId === 1 && (
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
    </>
  );
}
