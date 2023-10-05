import HomeUserAvatar from "../home-user-avatar/HomeUserAvatar";
import "./user-cameo.css";
import { capitalize } from "../../util/functions";
import { useContext } from "react";
import { GeneralContext } from "../../routes/Router";

const darkButtons = ["unblock", "unmute"];

export default function UserCameo({
  userId,
  buttonType,
  icon,
  space,
  avatarProp,
  header,
  sub,
  notUsername,
  main,
  aside,
  single,
  alignItems,
  buttonAction,
}) {
  const { isFollowing } = useContext(GeneralContext);

  return (
    <article
      className="user-cameo-container"
      style={{
        marginBottom: single ? "" : "1.2rem",
        alignItems: alignItems ? "center" : "",
      }}
    >
      <section>
        <HomeUserAvatar {...{ ...avatarProp, userId }} />
      </section>
      <section
        style={{
          width: `calc(100% - ${Number(avatarProp.size) + 1}rem)`,
        }}
      >
        <div style={{ alignItems: icon ? "center" : "" }} className="cameo-top">
          <div
            style={{
              justifyContent: space ? "space-between" : "",
            }}
            className={`cameo-top-head ${
              buttonType ? "button-based" : icon ? "icon-based" : ""
            }`}
          >
            <div
              className={
                !aside ? "cameo-header-no-aside" : "cameo-header-aside"
              }
            >
              <header>{header || ""}</header>
              <div>{aside || ""}</div>
            </div>
            <div className="cameo-sub-header">
              {notUsername ? "" : "@"}
              {sub || ""}
            </div>
          </div>
          {/* followed style can be found in profile.css */}
          <div className="user-cameo-icon">
            {buttonType && (
              <button
                className={`cameo-button ${
                  buttonType === "follow"
                    ? isFollowing(userId)
                      ? "followed"
                      : ""
                    : ""
                } ${darkButtons.includes(buttonType) ? "dark-button" : ""}`}
                onClick={buttonAction && buttonAction}
              >
                {buttonType === "follow"
                  ? isFollowing(userId)
                    ? "Following"
                    : "Follow"
                  : capitalize(buttonType)}
              </button>
            )}
            {icon || ""}
          </div>
        </div>
        <div>{main || ""}</div>
      </section>
    </article>
  );
}
