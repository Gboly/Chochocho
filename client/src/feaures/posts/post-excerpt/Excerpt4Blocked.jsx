import { useSelector } from "react-redux";
import "./post-excerpt.css";
import { selectPostById } from "../../../app/api-slices/postsApiSlice";
import { useGetUserByIdQuery } from "../../../app/api-slices/usersApiSlice";
import { useContext, useMemo } from "react";
import { GeneralContext } from "../../../routes/Router";
import PostContent from "../../../components/post/post-content/PostContent";
import UserCameo from "../../../components/user-cameo/UserCameo";
import {
  convertToUserFriendlyTime,
  findByIdKey,
} from "../../../util/functions";
import { blockedYouMessage, youBlockedMessage } from "../../../util/types";

export default function Excerpt4Blocked({
  postId,
  user,
  viewPost,
  rePostUserId,
}) {
  const {
    authUser: { id: authUserId, blockedYou, youBlocked },
  } = useContext(GeneralContext);
  const post = useSelector((state) => selectPostById(state, postId));
  const { id: userId, username, displayName, profileImage: src } = user;

  //Get user who made the repost
  const { data: repostUser } = useGetUserByIdQuery(rePostUserId);
  const showReposter = useMemo(
    () =>
      rePostUserId &&
      repostUser && (
        <div className="reposted-by">
          {rePostUserId === authUserId ? "You" : repostUser.username} reposted
        </div>
      ),
    [rePostUserId, authUserId, repostUser]
  );

  const blockMessage = findByIdKey(blockedYou, "userId", userId)
    ? blockedYouMessage
    : findByIdKey(youBlocked, "userId", userId) && youBlockedMessage;

  return (
    <>
      <main className={`post-container`} id={postId}>
        <div className="post-wrapper">
          {showReposter}
          <div className="post-top">
            <UserCameo
              {...{
                userId,
                avatarProp: { size: 3, src },
                aside: !viewPost && convertToUserFriendlyTime(post.date),
                header: displayName || username,
                sub: username,
                single: true,
              }}
            />
          </div>
          <PostContent
            {...{
              content: blockMessage,
              postId,
              blocked: true,
            }}
          />
        </div>
      </main>
    </>
  );
}
