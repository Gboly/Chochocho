import React, { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import {
  closeSelectUserAsCancel,
  closeSelectUserAsDone,
  deselectUser,
  selectUser,
  supplyCheckedUsers,
} from "../../app/actions/storyActions";
import {
  useGetUserByIdQuery,
  useGetUsersByIdQuery,
} from "../../app/api-slices/usersApiSlice";
import CustomCheckbox from "../../components/custom-checkbox/CustomCheckbox";
import Searchbar from "../../components/searchbar/Searchbar";
import Spinner from "../../components/Spinner/Spinner";
import UserCameo from "../../components/user-cameo/UserCameo";
import { GeneralContext } from "../../routes/Router";
import {
  closeNestedPopupOnOpaqueOverlay,
  closePopupOnOpaqueOverlay,
  getAnArrayOfSpecificKeyPerObjectInArray,
  prepareIdsForQuery,
  prepareUserIdsForQuery,
} from "../../util/functions";
import { storyVisibilitySettingsType } from "../../util/types";
import { getStorySettingsState } from "./storySlice";

const SelectUsers = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const {
    authUser: { storyVisibility, followers },
  } = useContext(GeneralContext);
  const { visibilityType, users } = useSelector(getStorySettingsState);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    visibilityType === storyVisibility.type &&
      dispatch(
        supplyCheckedUsers(
          getAnArrayOfSpecificKeyPerObjectInArray(
            storyVisibility.users,
            "userId"
          )
        )
      );

    return () => dispatch(supplyCheckedUsers([]));
  }, [dispatch, storyVisibility, visibilityType]);

  // searchbar
  const handleChange = (e) => {
    setSearchText(e.target.value);
  };

  const handleClose = () => {
    location.pathname.includes("settings")
      ? closePopupOnOpaqueOverlay(
          closeSelectUserAsCancel
          // storyVisibility.users
        )
      : closeNestedPopupOnOpaqueOverlay(
          closeSelectUserAsCancel,
          storyVisibilitySettingsType
          // Passing the pre registered users back
          // storyVisibility.users
        );
  };

  const handleDone = () => {
    location.pathname.includes("settings")
      ? closePopupOnOpaqueOverlay(closeSelectUserAsDone)
      : closeNestedPopupOnOpaqueOverlay(
          closeSelectUserAsDone,
          storyVisibilitySettingsType
        );
  };

  const [{ skip, limit }, setRefetch] = useState({ skip: 0, limit: 10 });

  const { isLoading: followersFetchIsLoading, data: followersFetchResult } =
    useGetUsersByIdQuery({
      userIds: prepareIdsForQuery(followers, "userId"),
      start: skip,
      end: limit,
    });

  const isFetched = (userId) =>
    (followersFetchResult || []).ids?.includes(userId) || false;

  return (
    <div className="story-visibility-settings select-user">
      <h3>Select people</h3>
      <hr />
      <Searchbar
        {...{
          searchText,
          handleChange,
          placeholder: "Search",
          maxWidth: "28.2rem",
        }}
      />
      <section>
        {/* Make this infinite scroll like */}
        {followers.map(({ userId }) => {
          return (
            isFetched(userId) && (
              <CheckboxPerUser
                key={userId}
                userId={userId}
                searchText={searchText}
              />
            )
          );
        })}
        {followersFetchIsLoading && <Spinner />}
      </section>

      <div className="report-post-bottom">
        <button className="report-cancel report-button" onClick={handleClose}>
          Cancel
        </button>
        <button className="report-submit report-button" onClick={handleDone}>
          Done
        </button>
      </div>
    </div>
  );
};

const CheckboxPerUser = ({ userId, searchText }) => {
  const dispatch = useDispatch();
  const { data: user } = useGetUserByIdQuery(userId);
  const { users } = useSelector(getStorySettingsState);

  const { displayName, username, profileImage: src } = user || [];

  const select = (id) => dispatch(selectUser(id));
  const deselect = (id) => dispatch(deselectUser(id));

  const icon = (
    <CustomCheckbox
      {...{
        label: "",
        checked: users.includes(userId),
        id: userId,
        select,
        deselect,
      }}
    />
  );

  // Better search algorithm needs to be implemented
  if (
    !(displayName || "").toLowerCase().includes(searchText.toLowerCase()) &&
    !(username || "").toLowerCase().includes(searchText.toLowerCase())
  ) {
    return null;
  }

  return (
    <>
      {
        // spinner should be replaced with skeleton
        user ? (
          <UserCameo
            {...{
              userId,
              avatarProp: { size: 3, src },
              header: displayName || username,
              sub: username,
              alignItems: true,
              single: true,
              icon,
            }}
          />
        ) : (
          <Spinner />
        )
      }
    </>
  );
};

export default SelectUsers;
