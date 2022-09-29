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
import { selectUserById } from "../../app/api-slices/usersApiSlice";
import HomeUserAvatar from "../../components/home-user-avatar/HomeUserAvatar";

const iconLink = [faGlobe, faFacebook, faTwitter, faInstagram];

export default function CommunityBlock({ userId }) {
  const authUser = useSelector((state) => selectUserById(state, 1));
  const user = useSelector((state) => selectUserById(state, userId));

  const followings = authUser?.following;
  const followers = authUser?.followers;

  const bio = user?.bio;
  const displayName = user?.displayName;
  const username = user?.username;
  const profileImage = user?.profileImage;

  const userLinks = [
    user?.website,
    user?.facebook,
    user?.twitter,
    user?.instagram,
  ];

  const following = followings ? followings.includes(userId) : false;
  const followed = followers ? followers.includes(userId) : false;

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
        <HomeUserAvatar userId={userId} size="4.5" />
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
