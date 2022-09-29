import "./blocking.css";
import { useSelector } from "react-redux";
import { selectUserById } from "../../../app/api-slices/usersApiSlice";
import { useEffect } from "react";
import HomeUserAvatar from "../../../components/home-user-avatar/HomeUserAvatar";
import UserCameo from "../../../components/user-cameo/UserCameo";

//There should be no need for this component since i've already created userCameo

export const BlockedUser = ({ userId, date, searchText }) => {
  const user = useSelector((state) => selectUserById(state, userId));

  const cameoProp = {
    userId,
    main: `Blocked ${date}`,
    avatarProp: { size: "3" },
    buttonType: "unblock",
  };

  if (
    !user?.displayName.toLowerCase().includes(searchText.toLowerCase()) &&
    !user?.username.toLowerCase().includes(searchText.toLowerCase())
  ) {
    return null;
  }
  return <UserCameo {...cameoProp} />;
};
