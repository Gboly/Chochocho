import MoreHorizOutlinedIcon from "@mui/icons-material/MoreHorizOutlined";

import PosterInfo from "../../../components/post/poster-info/PosterInfo";

import "./post-excerpt.css";
import PostContent from "../../../components/post/post-content/PostContent";
import Likes from "../../../components/post/post-engagements/Likes";
import Others from "../../../components/post/post-engagements/Others";
import PostReaction from "../post-reaction/PostReaction";
import PostOptions from "../post-options/PostOptions";
import PostShare from "../post-share/PostShare";
import ReportPost from "../report-post/ReportPost";
import FollowUnfollowPoster from "../follow-unfollow-poster/followUnfollowPoster";

import { useSelector, useDispatch } from "react-redux";
import { selectPostById } from "../../../app/api-slices/postsApiSlice";
import { openPostOption } from "../../../app/actions/homeActions";
import {
  getPostOptionState,
  getPostShareState,
  getReportPostState,
  getFollowPosterstate,
  getBlockPosterstate,
  getDeletePostState,
} from "./postExcerptSlice";
import { closePostOption } from "../../../app/actions/homeActions";
import { getEditPostState } from "../create-post/createPostSlice";
import DeletePost from "../delete-post/DeletePost";
import EditPost from "../edit-post/EditPost";
import { useEffect, useState } from "react";
import BlockUser from "../block-user/BlockUser";
import { iconStyle } from "../../../util/iconDescContent";
import UserCameo from "../../../components/user-cameo/UserCameo";
import { convertToUserFriendlyTime } from "../../../util/functions";

export default function PostExcerpt({ postId }) {
  const dispatch = useDispatch();
  const post = useSelector((state) => selectPostById(state, postId));
  const { isOpen: optionsIsOpen, id: optionsId } =
    useSelector(getPostOptionState);
  const { isOpen: shareIsOpen, id: shareId } = useSelector(getPostShareState);
  const { isOpen: reportIsOpen } = useSelector(getReportPostState);
  const { isOpen: followPosterIsOpen, id: followPosterId } =
    useSelector(getFollowPosterstate);
  const { isOpen: blockPosterIsOpen, id: blockPosterId } =
    useSelector(getBlockPosterstate);
  const { isOpen: deletePostIsOpen, id: deletePostId } =
    useSelector(getDeletePostState);
  const { isOpen: editPostIsOpen, id: editPostId } =
    useSelector(getEditPostState);

  const [isPopUp, setIsPopUp] = useState(false);

  useEffect(() => {
    editPostIsOpen && dispatch(closePostOption());
  }, [editPostIsOpen, dispatch]);

  useEffect(() => {
    optionsIsOpen ||
    shareIsOpen ||
    reportIsOpen ||
    followPosterIsOpen ||
    blockPosterIsOpen ||
    deletePostIsOpen ||
    editPostIsOpen
      ? setIsPopUp(true)
      : setIsPopUp(false);
  }, [
    optionsIsOpen,
    shareIsOpen,
    reportIsOpen,
    followPosterIsOpen,
    blockPosterIsOpen,
    deletePostIsOpen,
    editPostIsOpen,
  ]);

  const {
    userId,
    content,
    mediaType,
    media,
    likes,
    reposts,
    visibleFor,
    date,
  } = post;

  const postOptionIcon = (
    <i className="ptr-icon" onClick={() => dispatch(openPostOption(postId))}>
      <MoreHorizOutlinedIcon style={iconStyle} />
    </i>
  );

  return (
    <main
      className={`post-container ${!isPopUp ? "post-container-Wpopup" : ""}`}
      id={postId}
    >
      {optionsIsOpen && optionsId === postId && <PostOptions {...{ postId }} />}
      {shareIsOpen && shareId === postId && <PostShare postId={shareId} />}

      <div className="post-wrapper">
        <div className="post-top">
          <UserCameo
            {...{
              userId,
              icon: postOptionIcon,
              avatarProp: { size: 3 },
              aside: `${convertToUserFriendlyTime(date)}.`,
              main: 0,
              single: true,
            }}
          />
        </div>
        <PostContent {...{ content, mediaType, media, postId }} />
        <div className="post-engagements">
          <Likes {...{ likes, userId }} />
          <Others {...{ postId, reposts }} />
        </div>
        <hr className="post-hr" />
        <PostReaction postId={postId} visibleFor={visibleFor} />
      </div>
    </main>
  );
}
