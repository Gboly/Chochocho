import "./blocking.css";
import { SettingsHeader } from "../../../pages/settings/Settings";
import { BlockedUser } from "./BlockedUser";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSelector } from "react-redux";
import {
  selectFetchedUsersIds,
  selectUserById,
  useGetUsersByIdQuery,
} from "../../../app/api-slices/usersApiSlice";
import { useState, useEffect, useContext } from "react";
import Searchbar from "../../../components/searchbar/Searchbar";
import {
  prepareIdsForQuery,
  prepareUserIdsForQuery,
} from "../../../util/functions";
import Spinner from "../../../components/Spinner/Spinner";
import { GeneralContext } from "../../../routes/Router";

const initialPage = { skip: 0, limit: 1 };
export default function Blocking() {
  const {
    authUser: { blocked },
  } = useContext(GeneralContext);

  const [postRange, setPostRange] = useState(initialPage);

  const { isLoading: blockedUsersFetchIsLoading } = useGetUsersByIdQuery({
    userIds: prepareIdsForQuery(blocked, "userId"),
    ...postRange,
  });

  useEffect(() => {
    const timeout = setTimeout(
      () =>
        setPostRange(({ limit }) => ({
          skip: limit,
          limit: limit + initialPage.limit,
        })),
      10000
    );
    return () => clearTimeout(timeout);
  }, []);

  const fetchedUserIds = useSelector(selectFetchedUsersIds);
  const isFetched = (userId) =>
    (fetchedUserIds || []).includes(userId) || false;

  const [searchText, setSearchText] = useState("");

  const handleChange = (e) => setSearchText(e.target.value);

  return (
    <main className="settings-blocking">
      <SettingsHeader text={"Block users"} />
      <p>
        Once you block someone, that person can no longer see things you post on
        your timeline, tag you, start a conversation with you or add you as a
        friend.
      </p>
      <section>
        <Searchbar
          {...{ searchText, handleChange, placeholder: "Search blocked user" }}
        />
        <p>Blocked users list</p>
        <ul className="no-bullet">
          {(blocked || []).map((user, index) => {
            const { userId, date } = user;
            return (
              isFetched(userId) && (
                <BlockedUser key={index} {...{ userId, date, searchText }} />
              )
            );
          })}
        </ul>
        {blockedUsersFetchIsLoading && <Spinner />}
      </section>
    </main>
  );
}
