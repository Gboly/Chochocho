import "./community-outlet.css";
import { useSelector } from "react-redux";
import { selectUserById } from "../../app/api-slices/usersApiSlice";
import CommunityBlock from "./CommunityBlock";

export default function Followers() {
  const authUser = useSelector((state) => selectUserById(state, 1));
  const followers = authUser?.followers;

  return (
    <>
      {followers &&
        followers.map((userId, index) => (
          <CommunityBlock key={index} {...{ userId, type: "followers" }} />
        ))}
      <div
        className="nots-void"
        style={{ height: "1rem", padding: "7rem" }}
      ></div>
    </>
  );
}
