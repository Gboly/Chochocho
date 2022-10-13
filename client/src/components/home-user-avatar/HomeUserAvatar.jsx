import "./home-user-avatar.css";
import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import defaultProfileImage from "../../assets/account.png";
import NavigateWithScrollCache from "../../feaures/scroll-cache/NavigateWithScrollCache";

const HomeUserAvatar = ({ userId, src, size, style, noLink, action }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [route, setRoute] = useState(false);

  const userProfileRoute = `/profile/${userId}`;
  const dimension = `${size ?? 1}rem`;

  const [fetchedSrc, setSrc] = useState(src);

  // Thought this shouldn't be neccessary until i realized that previous src where cached and on routing to a new page(profile), it retains the former image instead of updating it.
  useEffect(() => {
    setSrc(src);
  }, [src]);

  const handleClick = (e) => {
    e && e.stopPropagation && e.stopPropagation();
    // some avatars shouldn't navigate to a new route. This would be passed as prop(noLink)
    // So, only when noLink is not available should the following code run
    // Also, no need for routing when you're already on the route
    !noLink && location.pathname !== userProfileRoute
      ? setRoute(true)
      : action && action();
  };

  const handleRouting = () => navigate(userProfileRoute);
  const cleanUp = () => setRoute(false);

  return (
    <>
      <NavigateWithScrollCache
        clicked={route}
        handleRouting={handleRouting}
        cleanUp={cleanUp}
        action={action}
      />
      <img
        src={fetchedSrc || ""}
        onError={() => {
          src !== defaultProfileImage && setSrc(defaultProfileImage);
        }}
        alt="User avatar"
        className="home-user-avatar"
        style={{ width: dimension, height: dimension, ...style }}
        onClick={(e) => handleClick(e)}
      />
    </>
  );
};

export default HomeUserAvatar;
