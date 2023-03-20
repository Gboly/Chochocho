import MoreHorizOutlinedIcon from "@mui/icons-material/MoreHorizOutlined";
import "./post-excerpt.css";
import PostContent from "../../../components/post/post-content/PostContent";
import Likes from "../../../components/post/post-engagements/Likes";
import Others from "../../../components/post/post-engagements/Others";
import PostReaction from "../post-reaction/PostReaction";
import PostShare from "../post-share/PostShare";
import { useSelector, useDispatch } from "react-redux";
import {
  selectPostById,
  useGetPostByIdQuery,
} from "../../../app/api-slices/postsApiSlice";
import { openPostOption } from "../../../app/actions/homeActions";
import { getPostOptionState, getPostShareState } from "./postExcerptSlice";
import { closePostOption } from "../../../app/actions/homeActions";
import { getEditPostState } from "../create-post/createPostSlice";
import { useContext, useEffect, useMemo, useState } from "react";
import { iconStyle } from "../../../util/iconDescContent";
import UserCameo from "../../../components/user-cameo/UserCameo";
import {
  convertToUserFriendlyTime,
  findByIdKey,
  showPopupOnTransparentOverlay,
} from "../../../util/functions";
import { useNavigate } from "react-router-dom";
import { useGetUserByIdQuery } from "../../../app/api-slices/usersApiSlice";
import NavigateWithScrollCache from "../../scroll-cache/NavigateWithScrollCache";
import Spinner from "../../../components/Spinner/Spinner";
import {
  authUserType,
  otherUsersType,
  postOptionsType,
} from "../../../util/types";
import { GeneralContext } from "../../../routes/Router";

export default function PostExcerpt({ postId, viewPost, comment }) {
  const { userId, type, originalPostId, originalUserId, cachedId } =
    useSelector((state) => selectPostById(state, postId));

  const isRepost = type === "repost";

  const originalPostIsFetched = useSelector((state) =>
    selectPostById(state, originalPostId)
  );
  // Original posts from reposts may have not been fetched, this ensures that they are.
  const { data: originalPost, isLoading: originalPostIsLoading } =
    useGetPostByIdQuery(
      { id: originalPostId },
      { skip: !originalPostId || originalPostIsFetched }
    );

  const {
    data: user,
    isLoading: userFetchIsLoading,
    isSuccess: userFetchIsSuccesfull,
  } = useGetUserByIdQuery(isRepost ? originalUserId : userId);

  return (
    <>
      {(userFetchIsLoading || (isRepost ? originalPostIsLoading : false)) && (
        // This should be skeleton
        <Spinner />
      )}
      {/* The originalPost would be null when this post is not a repost or the post has already been fetched, So this condition provides an immediate truthy response for the question "Has the post been fetched?" */}
      {(isRepost && !originalPostIsFetched ? originalPost : true) &&
        userFetchIsSuccesfull &&
        user && (
          <Excerpt
            {...{
              // The cachedId represents the actual Id of a particular post which have been pre-fetched (cached) already and there's no need to populate the cached state with it
              postId: originalPostId || cachedId || postId,
              viewPost,
              comment,
              user,
              ...(isRepost ? { rePostId: postId } : {}),
            }}
          />
        )}
    </>
  );
}

const Excerpt = ({ postId, viewPost, comment, user, rePostId }) => {
  const {
    isAuth,
    authUser: { _id: authUserId },
  } = useContext(GeneralContext);
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

  const { username, displayName, profileImage: src } = user;

  const showPostOptions = (e) => {
    e && e.stopPropagation && e.stopPropagation();
    const overlayParams = {
      type: postOptionsType,
      x: e.clientX,
      y: e.clientY,
    };
    const postOptionsParams = {
      postId,
      optionType: isAuth(userId) ? authUserType : otherUsersType,
    };
    showPopupOnTransparentOverlay(
      openPostOption,
      overlayParams,
      postOptionsParams
    );
  };

  const postOptionIcon = (
    <i className="ptr-icon" onClick={showPostOptions}>
      <MoreHorizOutlinedIcon style={iconStyle} />
    </i>
  );

  const handleClick = (e) => {
    e && e.stopPropagation && e.stopPropagation();
    // When a truthy viewPost prop is passed then do not navigate.
    !viewPost && setRoute(true);
  };

  const handleRouting = () => navigate(`/${username}/post/${postId}`);
  const cleanUp = () => setRoute(false);

  //Get user who made the repost
  const { data: repostUser } = useGetUserByIdQuery(userId);
  const showReposter = useMemo(
    () =>
      // check if its a repost and also if the reposter is actually still reposting it at the point
      rePostId &&
      repostUser &&
      findByIdKey(reposts, "userId", userId) && (
        <div className="reposted-by">
          {userId === authUserId ? "You" : repostUser.username} reposted
        </div>
      ),
    [rePostId, userId, reposts, authUserId, repostUser]
  );

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
        <div className="post-wrapper" onClick={(e) => handleClick(e)}>
          {showReposter}
          <div className="post-top">
            <UserCameo
              {...{
                userId,
                icon: postOptionIcon,
                avatarProp: { size: 3, src },
                aside: !viewPost && convertToUserFriendlyTime(date),
                header: displayName || username,
                sub: username,
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
            username={username}
            // visibleFor={visibleFor}
            comment={comment}
            rePostId={rePostId}
          />
        </div>
      </main>
    </>
  );
};

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
