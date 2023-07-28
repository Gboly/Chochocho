import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGlobe } from "@fortawesome/free-solid-svg-icons";
import {
  faFacebook,
  faTwitter,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";
import { useSelector, useDispatch } from "react-redux";
import {
  selectFetchedUsersById,
  useFollowUserMutation,
} from "../../app/api-slices/usersApiSlice";
import HomeUserAvatar from "../../components/home-user-avatar/HomeUserAvatar";
import { useContext } from "react";
import { GeneralContext } from "../../routes/Router";
import { fieldUpdate } from "../../util/functions";
import { ignoreSuggestedUser } from "../../app/actions/communityActions";

const iconLink = [faGlobe, faFacebook, faTwitter, faInstagram];

export default function CommunityBlock({ userId }) {
  const dispatch = useDispatch();
  const { isFollowing, isFollower, authUser } = useContext(GeneralContext);

  const user = useSelector((state) => selectFetchedUsersById(state, userId));
  const {
    bio,
    displayName,
    username,
    website,
    profileImage,
    facebook,
    twitter,
    instagram,
  } = user;

  const [follow, { error }] = useFollowUserMutation();

  const handleFollow = (e) => {
    e && e.preventDefault();
    const args = {
      authUserId: authUser.id,
      userId,
      updates: {
        following: fieldUpdate({
          record: authUser,
          updateFieldKey: "following",
          checkId: userId,
          checkKey: "userId",
        }),
        followers: fieldUpdate({
          record: user,
          updateFieldKey: "followers",
          checkId: authUser.id,
          checkKey: "userId",
        }),
      },
    };

    follow(args);
  };

  const handleIgnore = () => {
    dispatch(ignoreSuggestedUser(userId));
  };

  const userLinks = [website, facebook, twitter, instagram];

  const followStatus = isFollowing(userId) ? "unfollow" : "follow";
  const isSuggested = !isFollower(userId) && !isFollowing(userId);

  const iconContent = userLinks.reduce((accum, current, index) => {
    if (current) {
      accum.push(
        <i
          key={index}
          onClick={() => {
            window.open(current, "_blank");
          }}
        >
          <FontAwesomeIcon icon={iconLink[index]} />
        </i>
      );
    }

    return accum;
  }, []);

  return (
    <section>
      <div>
        <HomeUserAvatar userId={userId} size="4.5" src={profileImage} />
        <article>
          <div>
            <p>{displayName || username}</p>
            <span>@{username}</span>
          </div>
          <div>{iconContent}</div>
        </article>
      </div>
      {bio ? <p>{bio}</p> : <p style={{ opacity: 0.4 }}>Bio...</p>}
      <div>
        {isSuggested && (
          <button
            className={`outlet-button ${followStatus}-outlet-button1`}
            // Use the isSuggested condition to decided if its ignore or message
            onClick={handleIgnore}
          >
            Ignore
          </button>
        )}
        <button
          onClick={handleFollow}
          className={`outlet-button ${followStatus}-outlet-button2 ${
            isSuggested ? "" : "full-button"
          }`}
        >
          {followStatus}
        </button>
      </div>
    </section>
  );
}
