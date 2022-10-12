import HomeUserAvatar from "../home-user-avatar/HomeUserAvatar";
import "./user-cameo.css";
import { capitalize } from "../../util/functions";
import { useContext } from "react";
import { LayoutContext } from "../../layout/Layout";

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
  const { isFollowing } = useContext(LayoutContext);

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
              <header>{header || ""}</header>
              <span>{aside || ""}</span>
            </div>
            <div className="cameo-sub-header">@{sub || ""}</div>
          </div>
          {/* followed style can be found in profile.css */}
          {buttonType && (
            <button
              className={`round-button ${
                buttonType === "follow"
                  ? isFollowing(userId)
                    ? "followed"
                    : ""
                  : ""
              } ${buttonType === "unblock" ? "unblock" : ""}`}
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
        <div>{main || ""}</div>
      </section>
    </article>
  );
}
