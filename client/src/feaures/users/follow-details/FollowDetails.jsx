import "./follow-details.css";
import { openEngagedUsersList } from "../../../app/actions/homeActions";
import { capitalize, showPopupOnOpaqueOverlay } from "../../../util/functions";
import {
  engagedUsersListType,
  followersType,
  followingType,
} from "../../../util/types";

export default function FollowDetails(followDetails) {
  const followTypes = [followingType, followersType];

  const handleClick = (e) => {
    const type = e.currentTarget.id;
    showPopupOnOpaqueOverlay(openEngagedUsersList, engagedUsersListType, {
      type,
      userIds: followDetails[type],
    });
  };

  const content = followTypes.map((type, index) => {
    return (
      <div
        id={type}
        key={index}
        className="follow-detail-item"
        onClick={handleClick}
      >
        <span className="count">{followDetails[type].length}</span>
        <span className="text">{capitalize(type)}</span>
      </div>
    );
  });

  return <div className="follow-detail">{content}</div>;
}
