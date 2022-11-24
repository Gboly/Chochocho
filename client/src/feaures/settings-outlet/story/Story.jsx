import "./story.css";
import React, { useContext, useState } from "react";
import FormRadioOptions from "../../../components/form-radio-options/FormRadioOptions";
import Searchbar from "../../../components/searchbar/Searchbar";
import { SettingsHeader } from "../../../pages/settings/Settings";
import { GeneralContext } from "../../../routes/Router";
import { useGetUsersByIdQuery } from "../../../app/api-slices/usersApiSlice";
import { prepareUserIdsForQuery } from "../../../util/functions";
import MutedStoryAuthors from "./MutedStoryAuthors";

const style = {
  fontSize: "1rem",
  fontWeight: "700",
  opacity: "0.9",
  fontFamily: "inherit",
};

const Story = () => {
  const [valueId, setValueId] = useState(0);
  const [searchText, setSearchText] = useState("");

  const handleChange = (e) => setSearchText(e.target.value);

  const {
    authUser: { mutedStoryAuthors },
  } = useContext(GeneralContext);

  const [{ skip, limit }, setRefetch] = useState({ skip: 0, limit: 10 });

  const mutedStoryAuthorsIds = mutedStoryAuthors.map((user) => user.userId);

  const {
    isLoading: mutedStoryAuthorsFetchIsLoading,
    data: mutedStoryAuthorsFetchResult,
  } = useGetUsersByIdQuery({
    userIds: prepareUserIdsForQuery(mutedStoryAuthorsIds),
    start: skip,
    end: limit,
  });

  const isFetched = (userId) =>
    (mutedStoryAuthorsFetchResult || []).ids?.includes(userId) || false;

  return (
    <div className="settings-viewing">
      <SettingsHeader text={"Story"} />
      <section>
        <header>Who can view your story?</header>
        <FormRadioOptions
          options={["Friends", "Mutuals", "Custom select", "Custom exempt"]}
          labelStyle={style}
          valueId={valueId}
          setValue={(valId) => setValueId(valId)}
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
  );
};

export default Story;
