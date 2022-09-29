import "./follow-details.css";
import { useSelector } from "react-redux";
import { selectUserById } from "../../../app/api-slices/usersApiSlice";
import { openEngagedUsersList } from "../../../app/actions/homeActions";
import { capitalize, showPopupOnOpaqueOverlay } from "../../../util/functions";
import {
  engagedUsersListType,
  followersType,
  followingType,
} from "../../../util/types";

export default function FollowDetails() {
  // #3
  const authUser = useSelector((state) => selectUserById(state, 1));

  const followTypes = [followingType, followersType];

  const handleClick = (e) => {
    const type = e.currentTarget.id;
    showPopupOnOpaqueOverlay(openEngagedUsersList, engagedUsersListType, {
      type,
      userIds: authUser[type] ?? [],
    });
  };

  const content = followTypes.map((type, index) => {
    console.log();
    return (
      <div
        id={type}
        key={index}
        className="follow-detail-item"
        onClick={handleClick}
      >
        <span className="count">{(authUser?.[type] || []).length}</span>
        <span className="text">{capitalize(type)}</span>
      </div>
    );
  });

  return <div className="follow-detail">{content}</div>;
}
