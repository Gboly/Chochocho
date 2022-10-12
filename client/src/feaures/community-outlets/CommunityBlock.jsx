import React from "react";
import avi2 from "../../assets/avatar-square.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGlobe } from "@fortawesome/free-solid-svg-icons";
import {
  faFacebook,
  faTwitter,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";
import { useSelector } from "react-redux";
import {
  selectFetchedUsersById,
  selectUserById,
} from "../../app/api-slices/usersApiSlice";
import HomeUserAvatar from "../../components/home-user-avatar/HomeUserAvatar";
import { useOutletContext } from "react-router-dom";

const iconLink = [faGlobe, faFacebook, faTwitter, faInstagram];

export default function CommunityBlock({ userId }) {
  const { followers, followings } = useOutletContext();

  const {
    bio,
    displayName,
    username,
    website,
    profileImage,
    facebook,
    twitter,
    instagram,
  } = useSelector((state) => selectFetchedUsersById(state, userId));

  const userLinks = [website, facebook, twitter, instagram];

  const following = followings.includes(userId);
  const followed = followers.includes(userId);
  const followStatus = following ? "unfollow" : "follow";

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
            <p>{displayName}</p>
            <span>@{username}</span>
          </div>
          <div>{iconContent}</div>
        </article>
      </div>
      <p>{bio}</p>
      <div>
        <button className={`outlet-button ${followStatus}-outlet-button1`}>
          {!followed && !following ? "Ignore" : "Message"}
        </button>
        <button className={`outlet-button ${followStatus}-outlet-button2`}>
          {followStatus}
        </button>
      </div>
    </section>
  );
}
