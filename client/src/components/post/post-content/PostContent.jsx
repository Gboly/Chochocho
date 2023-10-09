import CustomVideo from "../../../feaures/custom-video/CustomVideo";
import "./post-content.css";
import { useDispatch } from "react-redux";
import {
  openFullscreen,
  openAltMessage,
} from "../../../app/actions/homeActions";
import { showPopupOnOpaqueOverlay } from "../../../util/functions";
import { altMessageType } from "../../../util/types";
import { useCallback, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import NavigateWithScrollCache from "../../../feaures/scroll-cache/NavigateWithScrollCache";

export default function PostContent({
  content,
  mediaType,
  media,
  postId,
  mentionedUsers,
  blocked,
}) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const MentionedUser = ({ username }) => {
    const user = mentionedUsers.find(
      (user) => username.slice(2) === user.username
    );

    const [route, setRoute] = useState(false);

    const handleClick = (e) => {
      if (user) {
        e && e.stopPropagation && e.stopPropagation();
        // No need for routing when you're already on the route
        location.pathname !== userProfileRoute && setRoute(true);
      }
    };

    const userProfileRoute = `/profile/${user?.userId}`;
    const [handleRouting, cleanUp] = useMemo(() => {
      const handleRouting = () => navigate(userProfileRoute);
      const cleanUp = () => setRoute(false);
      return [handleRouting, cleanUp];
    }, [userProfileRoute]);

    return (
      <>
        <NavigateWithScrollCache
          clicked={route}
          handleRouting={handleRouting}
          cleanUp={cleanUp}
        />
        <div
          className={`mentioned-user ${!user && "invalid-username"}`}
          onClick={handleClick}
        >
          {username}
        </div>
      </>
    );
  };

  const highlightMentionedUsers = useMemo(() => {
    const usernames = content.match(/\s@\w+/g);
    const nonUsernames = content.split(/\s@\w+/g);

    if (!usernames) return content;

    const result = nonUsernames.reduce((accum, current, id) => {
      const text = (
        <div style={{ display: "inline-block" }} key={current}>
          {current}
        </div>
      );
      const user = (
        <MentionedUser key={usernames[id]} username={usernames[id]} />
      );

      accum.push(text);
      usernames[id] && accum.push(user);

      return accum;
    }, []);

    return result;
  }, [content]);

  return (
    <div className="post-center">
      <div className={`post-text ${blocked ? "block-message" : ""}`}>
        {highlightMentionedUsers}
      </div>
      {!blocked && (
        <div
          className="post-media-container"
          onClick={(e) => e && e.stopPropagation && e.stopPropagation()}
        >
          {mediaType.startsWith("video") && (
            <CustomVideo src={media[0].src} postId={postId} />
          )}
          {mediaType.startsWith("image") &&
            media &&
            media.map(({ src, alt }, idx) => (
              <div key={idx}>
                <img
                  src={src}
                  alt={alt}
                  className="post-media"
                  onClick={() => dispatch(openFullscreen(src))}
                />
                {alt && (
                  <button
                    className="post-img-alt-button"
                    onClick={() =>
                      showPopupOnOpaqueOverlay(
                        openAltMessage,
                        altMessageType,
                        alt
                      )
                    }
                  >
                    ALT
                  </button>
                )}
              </div>
            ))}
        </div>
      )}
    </div>
  );
}
