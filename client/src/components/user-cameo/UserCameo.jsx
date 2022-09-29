import HomeUserAvatar from "../home-user-avatar/HomeUserAvatar";
import "./user-cameo.css";
import { useSelector } from "react-redux";
import { selectUserById } from "../../app/api-slices/usersApiSlice";
import { capitalize } from "../../util/functions";

export default function UserCameo({
  userId,
  buttonType,
  icon,
  space,
  avatarProp,
  header,
  sub,
  main,
  aside,
  single,
}) {
  const user = useSelector((state) => selectUserById(state, userId));
  const authUser = useSelector((state) => selectUserById(state, 1));

  const following = (authUser?.following || []).includes(userId);

  const text1 = header === 0 ? "" : header ? header : user?.displayName;
  const text2 = sub === 0 ? "" : sub ? sub : user?.username;
  const text3 = main === 0 ? "" : main ? main : user?.bio;

  return (
    <article
      className="user-cameo-container"
      style={{ marginBottom: single ? "" : "1.2rem" }}
    >
      <section>
        <HomeUserAvatar {...{ ...avatarProp, userId }} />
      </section>
      <section>
        <div style={{ alignItems: icon ? "center" : "" }} className="cameo-top">
          <div
            style={{ justifyContent: space ? "space-between" : "" }}
            className={buttonType ? "button-based" : icon ? "icon-based" : ""}
          >
            <div
              className={
                !aside ? "cameo-header-no-aside" : "cameo-header-aside"
              }
            >
              <header>{text1}</header>
              <span>{aside || ""}</span>
            </div>
            <div className="cameo-sub-header">@{text2}</div>
          </div>
          {/* followed style can be found in profile.css */}
          {buttonType && (
            <button
              className={`round-button ${
                buttonType === "follow" ? (following ? "followed" : "") : ""
              } ${buttonType === "unblock" ? "unblock" : ""}`}
            >
              {buttonType === "follow"
                ? following
                  ? "Following"
                  : "Follow"
                : capitalize(buttonType)}
            </button>
          )}
          {icon || ""}
        </div>
        <div>{text3}</div>
      </section>
    </article>
  );
}
