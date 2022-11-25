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
import { useGetUserByIdQuery } from "../../app/api-slices/usersApiSlice";
import CustomCheckbox from "../../components/custom-checkbox/CustomCheckbox";
import Searchbar from "../../components/searchbar/Searchbar";
import Spinner from "../../components/Spinner/Spinner";
import UserCameo from "../../components/user-cameo/UserCameo";
import { GeneralContext } from "../../routes/Router";
import {
  closeNestedPopupOnOpaqueOverlay,
  closePopupOnOpaqueOverlay,
} from "../../util/functions";
import { storyVisibilitySettingsType } from "../../util/types";
import { getStorySettingsState } from "./storySlice";

const SelectUsers = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const {
    authUser: { storyVisibility, followers },
  } = useContext(GeneralContext);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    dispatch(supplyCheckedUsers(storyVisibility.users));
  }, [dispatch, storyVisibility]);

  // searchbar
  const handleChange = (e) => {
    setSearchText(e.target.value);
  };

  const handleClose = () => {
    location.pathname.includes("settings")
      ? closePopupOnOpaqueOverlay(
          closeSelectUserAsCancel,
          storyVisibility.users
        )
      : closeNestedPopupOnOpaqueOverlay(
          closeSelectUserAsCancel,
          storyVisibilitySettingsType,
          // Passing the pre registered users back
          storyVisibility.users
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
        {followers.map((userId) => {
          return (
            <CheckboxPerUser
              key={userId}
              userId={userId}
              searchText={searchText}
            />
          );
        })}
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

  const label = (
    <UserCameo
      {...{
        userId,
        avatarProp: { size: 3, src },
        header: displayName,
        sub: username,
        alignItems: true,
        single: true,
      }}
    />
  );

  const select = (id) => dispatch(selectUser(id));
  const deselect = (id) => dispatch(deselectUser(id));

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
          <CustomCheckbox
            {...{
              label,
              checked: users.includes(userId),
              id: userId,
              select,
              deselect,
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
