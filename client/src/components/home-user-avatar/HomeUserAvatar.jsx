import "./home-user-avatar.css";
import { useSelector } from "react-redux";
import { selectUserById } from "../../app/api-slices/usersApiSlice";
import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import defaultProfileImage from "../../assets/account.png";

export default function HomeUserAvatar({
  userId,
  size,
  style,
  noLink,
  action,
}) {
  const navigate = useNavigate();
  const location = useLocation();

  const dimension = `${size ?? 1}rem`;

  const user = useSelector((state) => selectUserById(state, userId));

  const [src, setSrc] = useState(user?.profileImage);

  useEffect(() => {
    setSrc(user?.profileImage || "");
  }, [user]);

  const handleClick = (e) => {
    e && e.stopPropagation && e.stopPropagation();
    // some avatars shouldn't navigate to a new route. This would be passed as prop(noLink)
    // So, only when noLink is not available should the following code run
    if (!noLink) {
      // no need for routing when you're already on the route
      if (location.pathname !== `/profile/${userId}`) {
        navigate(`/profile/${userId}`);
      }
    }
    action && action();
  };

  return (
    <img
      src={src}
      onError={() => {
        src !== defaultProfileImage && setSrc(defaultProfileImage);
      }}
      alt="User avatar"
      className="home-user-avatar"
      style={{ width: dimension, height: dimension, ...style }}
      onClick={(e) => handleClick(e)}
    />
  );
}
