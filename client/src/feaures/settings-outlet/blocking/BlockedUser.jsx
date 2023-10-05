import "./blocking.css";
import { useDispatch, useSelector } from "react-redux";
import {
  selectFetchedUsersById,
  useBlockUserMutation,
} from "../../../app/api-slices/usersApiSlice";
import UserCameo from "../../../components/user-cameo/UserCameo";
import { getBlockArgs } from "../../posts/block-user/BlockUser";
import { useContext } from "react";
import { GeneralContext } from "../../../routes/Router";
import { showConfirmation } from "../../../app/actions/layoutActions";

//There should be no need for this component since i've already created userCameo

export const BlockedUser = ({ userId, date, searchText }) => {
  const { authUser } = useContext(GeneralContext);
  const dispatch = useDispatch();
  const user = useSelector((state) => selectFetchedUsersById(state, userId));
  const { displayName, username, profileImage } = user;

  const [block, { error: blockError, data: blockResponse }] =
    useBlockUserMutation();

  const handleUnblock = (e) => {
    e && e.preventDefault();
    const args = getBlockArgs(authUser, user);
    block(args);
    dispatch(
      showConfirmation({
        type: "block",
        progress: 100,
        message: `You Unblocked @${username}`,
      })
    );
  };

  const cameoProp = {
    userId,
    header: displayName || username,
    sub: username,
    main: `Blocked ${new Date(date).toLocaleDateString()}`,
    avatarProp: { size: "3", src: profileImage },
    buttonType: "unblock",
    buttonAction: handleUnblock,
  };

  if (
    !displayName.toLowerCase().includes(searchText.toLowerCase()) &&
    !username.toLowerCase().includes(searchText.toLowerCase())
  ) {
    return null;
  }
  return <UserCameo {...cameoProp} />;
};
