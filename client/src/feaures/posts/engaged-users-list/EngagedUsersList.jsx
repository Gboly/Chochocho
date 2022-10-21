import Searchbar from "../../../components/searchbar/Searchbar";
import SimpleHeader from "../../../components/simple-header/SimpleHeader";
import { SettingsHeader } from "../../../pages/settings/Settings";
import "./engaged-users-list.css";
import { useContext, useState } from "react";
import {
  capitalize,
  closePopupOnOpaqueOverlay,
  prepareUserIdsForQuery,
} from "../../../util/functions";
import { closeEngagedUsersList } from "../../../app/actions/homeActions";
import UserCameo from "../../../components/user-cameo/UserCameo";
import {
  selectFetchedUsersById,
  useGetUsersByIdQuery,
} from "../../../app/api-slices/usersApiSlice";
import { useSelector } from "react-redux";
import { getEngagedUsersListState } from "../post-excerpt/postExcerptSlice";
import { followersType, followingType } from "../../../util/types";
import Spinner from "../../../components/Spinner/Spinner";
import { GeneralContext } from "../../../routes/Router";

const followTypes = [followingType, followersType];
const header = (type) =>
  `${capitalize(type)} ${!followTypes.includes(type) ? "by" : ""}`;

export default function EngagedUsersList() {
  const { type, userIds } = useSelector(getEngagedUsersListState);
  const [searchText, setSearchText] = useState("");

  const [{ skip, limit }, setRefetch] = useState({ skip: 0, limit: 10 });

  const { isLoading: usersFetchIsLoading, data: usersFetchResult } =
    useGetUsersByIdQuery({
      userIds: prepareUserIdsForQuery(userIds),
      start: skip,
      end: limit,
    });

  const isFetched = (userId) =>
    (usersFetchResult || []).ids?.includes(userId) || false;

  const handleClose = () => closePopupOnOpaqueOverlay(closeEngagedUsersList);

  // ********************************************* #10

  const EngagedUser = ({ userId }) => {
    const { displayName, username, profileImage, bio } = useSelector((state) =>
      selectFetchedUsersById(state, userId)
    );

    const { isAuth } = useContext(GeneralContext);

    // Better search algorithm needs to be implemented
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
          buttonType: isAuth(userId) ? "" : "follow",
          avatarProp: {
            size: "3",
            action: handleClose,
            src: profileImage,
          },
          header: displayName,
          sub: username,
          main: bio,
        }}
      />
    );
  };

  // **********************************************

  const usersList = userIds.map(
    (userId, index) =>
      isFetched(userId) && <EngagedUser key={index} userId={userId} />
  );

  const handleChange = (e) => setSearchText(e.target.value);

  return (
    <div className="popup-scroll">
      <div className="lg-header">
        <SimpleHeader
          desc={header(type)}
          fontSize={"1.3rem"}
          closeAction={handleClose}
          overlay={true}
        />
      </div>
      <div className="sm-header">
        <SettingsHeader
          text={header(type)}
          closePopup={handleClose}
          overlay={true}
        />
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
      {usersFetchIsLoading && <Spinner />}
    </div>
  );
}
