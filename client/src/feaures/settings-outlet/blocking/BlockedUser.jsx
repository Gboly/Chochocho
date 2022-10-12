import "./blocking.css";
import { useSelector } from "react-redux";
import { selectFetchedUsersById } from "../../../app/api-slices/usersApiSlice";
import UserCameo from "../../../components/user-cameo/UserCameo";

//There should be no need for this component since i've already created userCameo

export const BlockedUser = ({ userId, date, searchText }) => {
  const { displayName, username, profileImage } = useSelector((state) =>
    selectFetchedUsersById(state, userId)
  );

  const cameoProp = {
    userId,
    header: displayName,
    sub: username,
    main: `Blocked ${date}`,
    avatarProp: { size: "3", src: profileImage },
    buttonType: "unblock",
  };

  if (
    !displayName.toLowerCase().includes(searchText.toLowerCase()) &&
    !username.toLowerCase().includes(searchText.toLowerCase())
  ) {
    return null;
  }
  return <UserCameo {...cameoProp} />;
};
