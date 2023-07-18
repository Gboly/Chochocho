import "./story.css";
import React, { useCallback, useContext, useState } from "react";
import FormRadioOptions from "../../../components/form-radio-options/FormRadioOptions";
import Searchbar from "../../../components/searchbar/Searchbar";
import { SettingsHeader } from "../../../pages/settings/Settings";
import { GeneralContext } from "../../../routes/Router";
import { useGetUsersByIdQuery } from "../../../app/api-slices/usersApiSlice";
import {
  newRange,
  prepareIdsForQuery,
  prepareUserIdsForQuery,
  showPopupOnOpaqueOverlay,
} from "../../../util/functions";
import MutedStoryAuthors from "./MutedStoryAuthors";
import {
  customTypes,
  visibilityOptionsData,
} from "../../../util/iconDescContent";
import { useDispatch } from "react-redux";
import {
  changeVisibilityType,
  openSelectUser,
} from "../../../app/actions/storyActions";
import { selectUsersType } from "../../../util/types";
import { useOutletContext } from "react-router-dom";
import { ScrollCache } from "../../scroll-cache/ScrollCache";

const style = {
  fontSize: "1rem",
  fontWeight: "700",
  opacity: "0.9",
  fontFamily: "inherit",
};

const initialPage = { skip: 0, limit: 10 };
const Story = () => {
  const dispatch = useDispatch();
  const [valueId, setValueId] = useState(0);
  const [searchText, setSearchText] = useState("");

  const handleChange = (e) => setSearchText(e.target.value);

  const {
    authUser: { mutedStoryAuthors },
  } = useContext(GeneralContext);

  const { settingsNode } = useOutletContext();

  const [{ skip, limit }, setRefetch] = useState(initialPage);

  const setValue = (optionIndex) => {
    const selectedOption = visibilityOptionsData[optionIndex].type;
    dispatch(changeVisibilityType(selectedOption));
    customTypes.includes(selectedOption) &&
      showPopupOnOpaqueOverlay(openSelectUser, selectUsersType);
  };

  const {
    isLoading: mutedStoryAuthorsFetchIsLoading,
    data: mutedStoryAuthorsResult,
  } = useGetUsersByIdQuery({
    userIds: prepareIdsForQuery(mutedStoryAuthors, "userId"),
    start: skip,
    end: limit,
  });

  const fetchMore = useCallback(() => {
    !mutedStoryAuthorsFetchIsLoading &&
      mutedStoryAuthorsResult.ids.length &&
      setRefetch(({ skip, limit }) => newRange(skip, limit, initialPage));
  }, [mutedStoryAuthorsFetchIsLoading, mutedStoryAuthorsResult]);

  const isFetched = (userId) =>
    (mutedStoryAuthorsResult || []).ids?.includes(userId) || false;

  return (
    <ScrollCache ref={settingsNode} fetchMore={fetchMore}>
      <div className="settings-viewing">
        <SettingsHeader text={"Story"} />
        <section>
          <header>Who can view your story?</header>
          <FormRadioOptions
            options={["Friends", "Mutuals", "Custom select", "Custom exempt"]}
            labelStyle={style}
            valueId={valueId}
            setValue={(valId) => {
              setValueId(valId);
              setValue(valId);
            }}
          />
        </section>
        <section className="muted-story-authors">
          <header>Muted users</header>
          <Searchbar
            {...{
              searchText,
              handleChange,
              placeholder: "Search muted users",
            }}
          />
          <ul className="no-bullet">
            {(mutedStoryAuthors || []).map((user, index) => {
              const { userId, date } = user;
              return (
                isFetched(userId) && (
                  <MutedStoryAuthors
                    key={index}
                    {...{ userId, date, searchText }}
                  />
                )
              );
            })}
          </ul>
        </section>
      </div>
    </ScrollCache>
  );
};

export default Story;
