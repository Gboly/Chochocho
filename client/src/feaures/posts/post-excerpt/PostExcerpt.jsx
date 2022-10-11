import MoreHorizOutlinedIcon from "@mui/icons-material/MoreHorizOutlined";
import "./post-excerpt.css";
import PostContent from "../../../components/post/post-content/PostContent";
import Likes from "../../../components/post/post-engagements/Likes";
import Others from "../../../components/post/post-engagements/Others";
import PostReaction from "../post-reaction/PostReaction";
import PostOptions from "../post-options/PostOptions";
import PostShare from "../post-share/PostShare";

import { useSelector, useDispatch } from "react-redux";
import { selectPostById } from "../../../app/api-slices/postsApiSlice";
import { openPostOption } from "../../../app/actions/homeActions";
import { getPostOptionState, getPostShareState } from "./postExcerptSlice";
import { closePostOption } from "../../../app/actions/homeActions";
import { getEditPostState } from "../create-post/createPostSlice";
import { useEffect, useState } from "react";
import { iconStyle } from "../../../util/iconDescContent";
import UserCameo from "../../../components/user-cameo/UserCameo";
import { convertToUserFriendlyTime } from "../../../util/functions";
import { useNavigate } from "react-router-dom";
import { selectUserById } from "../../../app/api-slices/usersApiSlice";
import NavigateWithScrollCache from "../../scroll-cache/NavigateWithScrollCache";

const PostExcerpt = ({ postId, viewPost, comment }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const post = useSelector((state) => selectPostById(state, postId));
  const { isOpen: optionsIsOpen, id: optionsId } =
    useSelector(getPostOptionState);
  const { isOpen: shareIsOpen, id: shareId } = useSelector(getPostShareState);
  const { isOpen: editPostIsOpen } = useSelector(getEditPostState);

  const [isPopUp, setIsPopUp] = useState(false);
  const [route, setRoute] = useState(false);

  useEffect(() => {
    editPostIsOpen && dispatch(closePostOption());
  }, [editPostIsOpen, dispatch]);

  useEffect(() => {
    optionsIsOpen || shareIsOpen ? setIsPopUp(true) : setIsPopUp(false);
  }, [optionsIsOpen, shareIsOpen]);

  const {
    userId,
    content,
    mediaType,
    media,
    likes,
    reposts,
    comments,
    visibleFor,
    date,
  } = post;

  const user = useSelector((state) => selectUserById(state, userId));

  const postOptionIcon = (
    <i
      className="ptr-icon"
      onClick={(e) => {
        e && e.stopPropagation && e.stopPropagation();
        dispatch(openPostOption(postId));
      }}
    >
      <MoreHorizOutlinedIcon style={iconStyle} />
    </i>
  );

  const handleClick = (e) => {
    e && e.stopPropagation && e.stopPropagation();
    // When a truthy viewPost prop is passed then do not navigate.
    !viewPost && setRoute(true);
  };

  const handleRouting = () => navigate(`/${user?.username}/post/${postId}`);
  const cleanUp = () => setRoute(false);

  return (
    <>
      <NavigateWithScrollCache
        clicked={route}
        handleRouting={handleRouting}
        cleanUp={cleanUp}
      />
      <main
        className={`post-container ${
          !isPopUp && !viewPost ? "post-container-Wpopup" : ""
        }`}
        id={postId}
        onClick={(e) => handleClick(e)}
      >
        {optionsIsOpen && optionsId === postId && (
          <PostOptions {...{ postId }} />
        )}
        {shareIsOpen && shareId === postId && <PostShare postId={shareId} />}

        <div className="post-wrapper" onClick={(e) => handleClick(e)}>
          <div className="post-top">
            <UserCameo
              {...{
                userId,
                icon: postOptionIcon,
                avatarProp: { size: 3 },
                aside: viewPost ? 0 : convertToUserFriendlyTime(date),
                main: 0,
                single: true,
              }}
            />
          </div>
          <PostContent {...{ content, mediaType, media, postId }} />
          {!comment ? (
            viewPost ? (
              <>
                <FullDate {...{ date, visibleFor }} />
                <hr className="post-hr" />
                <Others {...{ postId, reposts, likes }} />
                <hr className="post-hr" />
              </>
            ) : (
              <>
                <div className="post-engagements">
                  <Likes {...{ likes, userId }} />
                  <Others {...{ postId, reposts, comments }} />
                </div>
                <hr className="post-hr" />
              </>
            )
          ) : (
            ""
          )}
          <PostReaction
            postId={postId}
            visibleFor={visibleFor}
            comment={comment}
          />
        </div>
      </main>
    </>
  );
};

export default PostExcerpt;

export const FullDate = ({ date, visibleFor }) => {
  const fullDate = new Date(date).toLocaleString("en-US", {
    timeStyle: "short",
    dateStyle: "medium",
  });
  const fullDateArray = fullDate.split(",");
  const organizedFullDate = `${fullDateArray[2]} - ${fullDateArray[0]},${fullDateArray[1]}`;

  return (
    <div className="full-date">
      {organizedFullDate} {visibleFor ? `- ${visibleFor}` : ""}
    </div>
  );
};
