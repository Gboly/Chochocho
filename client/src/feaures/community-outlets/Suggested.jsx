import "./community-outlet.css";

import CommunityBlock from "./CommunityBlock";
import { useSelector } from "react-redux";
import {
  selectUserById,
  selectUsersIds,
} from "../../app/api-slices/usersApiSlice";

export default function Suggested() {
  const authUser = useSelector((state) => selectUserById(state, 1));
  //Filtering the authUser from userIds should be done in the backend
  const userIds = useSelector(selectUsersIds);

  const following = authUser?.following;
  const followers = authUser?.followers;

  const associatedUsers =
    following && followers ? followers.concat(following) : [];

  const uniqueAssociatedUsers = [...new Set(associatedUsers)];

  const suggestedUsers = userIds.filter(
    (id) => id !== 1 && !uniqueAssociatedUsers.includes(id)
  );

  return (
    <>
      {suggestedUsers &&
        suggestedUsers.map((userId, index) => (
          <CommunityBlock key={index} {...{ userId }} />
        ))}
      <div
        className="nots-void"
        style={{ height: "1rem", padding: "7rem" }}
      ></div>
    </>
  );
}
