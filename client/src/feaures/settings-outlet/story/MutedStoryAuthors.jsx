import React from "react";
import { useSelector } from "react-redux";
import { selectFetchedUsersById } from "../../../app/api-slices/usersApiSlice";
import UserCameo from "../../../components/user-cameo/UserCameo";

const MutedStoryAuthors = ({ userId, date, searchText }) => {
  const { displayName, username, profileImage } = useSelector((state) =>
    selectFetchedUsersById(state, userId)
  );

  const cameoProp = {
    userId,
    header: displayName,
    sub: username,
    main: `Muted ${date}`,
    avatarProp: { size: "3", src: profileImage },
    buttonType: "unmute",
  };

  if (
    !displayName.toLowerCase().includes(searchText.toLowerCase()) &&
    !username.toLowerCase().includes(searchText.toLowerCase())
  ) {
    return null;
  }
  return <UserCameo {...cameoProp} />;
};

export default MutedStoryAuthors;
