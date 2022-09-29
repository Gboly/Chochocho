import "./blocking.css";
import { SettingsHeader } from "../../../pages/settings/Settings";
import { BlockedUser } from "./BlockedUser";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSelector } from "react-redux";
import { selectUserById } from "../../../app/api-slices/usersApiSlice";
import { useState, useEffect } from "react";
import Searchbar from "../../../components/searchbar/Searchbar";

export default function Blocking() {
  const authUser = useSelector((state) => selectUserById(state, 1));

  const [searchText, setSearchText] = useState("");
  const [blockedList, setBlockedList] = useState([]);

  useEffect(() => {
    authUser && setBlockedList(authUser?.blocked);
  }, [authUser]);

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
          {blockedList.map((user, index) => {
            const { userId, date } = user;
            return (
              <BlockedUser key={index} {...{ userId, date, searchText }} />
            );
          })}
        </ul>
      </section>
    </main>
  );
}
