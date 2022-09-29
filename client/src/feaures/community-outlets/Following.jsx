import "./community-outlet.css";

import CommunityBlock from "./CommunityBlock";
import { useSelector } from "react-redux";
import { selectUserById } from "../../app/api-slices/usersApiSlice";

export default function Following() {
  const authUser = useSelector((state) => selectUserById(state, 1));
  const following = authUser?.following;

  return (
    <>
      {following &&
        following.map((userId, index) => (
          <CommunityBlock key={index} {...{ userId }} />
        ))}
      <div
        className="nots-void"
        style={{ height: "1rem", padding: "7rem" }}
      ></div>
    </>
  );
}
