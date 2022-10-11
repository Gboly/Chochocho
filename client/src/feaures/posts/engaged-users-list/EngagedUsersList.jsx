import Searchbar from "../../../components/searchbar/Searchbar";
import SimpleHeader from "../../../components/simple-header/SimpleHeader";
import { SettingsHeader } from "../../../pages/settings/Settings";
import "./engaged-users-list.css";
import { useState } from "react";
import { capitalize, closePopupOnOpaqueOverlay } from "../../../util/functions";
import { closeEngagedUsersList } from "../../../app/actions/homeActions";
import UserCameo from "../../../components/user-cameo/UserCameo";
import { selectUserById } from "../../../app/api-slices/usersApiSlice";
import { useSelector } from "react-redux";
import { getEngagedUsersListState } from "../post-excerpt/postExcerptSlice";

const followTypes = ["following", "followers"];

export default function EngagedUsersList() {
  const { type, userIds } = useSelector(getEngagedUsersListState);
  const [searchText, setSearchText] = useState("");

  const handleClose = () => closePopupOnOpaqueOverlay(closeEngagedUsersList);

  const avatarProp = {
    size: "3",
    action: handleClose,
  };
  const header = `${capitalize(type)} ${
    !followTypes.includes(type) ? "by" : ""
  }`;

  const handleChange = (e) => setSearchText(e.target.value);

  const EngagedUser = ({ userId }) => {
    const user = useSelector((state) => selectUserById(state, userId));
    // #3
    const authUserId = 1;
    const displayName = user?.displayName || "";
    const username = user?.username || "";

    if (
      !displayName.toLowerCase().includes(searchText.toLowerCase()) &&
      !username.toLowerCase().includes(searchText.toLowerCase())
    ) {
      return null;
    }
    return (
      <UserCameo
        {...{
          userId,
          buttonType: userId === authUserId ? "" : "follow",
          avatarProp,
        }}
      />
    );
  };

  // #10
  const usersList = userIds.map((userId, index) => (
    <EngagedUser key={index} userId={userId} />
  ));

  return (
    <div className="popup-scroll">
      <div className="lg-header">
        <SimpleHeader
          desc={header}
          fontSize={"1.3rem"}
          closeAction={handleClose}
          overlay={true}
        />
      </div>
      <div className="sm-header">
        <SettingsHeader text={header} closePopup={handleClose} overlay={true} />
      </div>
      <Searchbar
        {...{
          searchText,
          handleChange,
          placeholder: "Search User",
          maxWidth: "28rem",
        }}
      />
      <ul className="no-bullet">{usersList}</ul>
    </div>
  );
}
