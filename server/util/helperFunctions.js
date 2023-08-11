const getMutuals = (followers, followings) => {
  const mutuals = followers.filter((follower) =>
    // The regualar equality (===) doesn't work with objectIds. The equals method fixes this.
    followings.some((following) => following.userId.equals(follower.userId))
  );
  const mutualsIds = getAnArrayOfSpecificKeyPerObjectInArray(mutuals, "userId");
  return mutualsIds;
};

const deriveSnippet = (content, mediaType) => {
  return content
    ? content.slice(0, 11)
    : mediaType === "image"
    ? "photo"
    : "video";
};

const getAnArrayOfSpecificKeyPerObjectInArray = (
  originalArray,
  specificKey
) => {
  return (originalArray || []).map((item) => item[specificKey]);
};

const findById = (array, idKey, id) =>
  array.find((record) => record[idKey].equals(id));

const customExemptUsersFromStory = (followers, users) => {
  const followersIds = getAnArrayOfSpecificKeyPerObjectInArray(
    followers,
    "userId"
  );
  const target = followersIds.filter(
    (follower) => !findById(users, "userId", follower)
  );

  return target;
};

const deriveStoryQueryIds = (authUser, visibilityPerStory) => {
  const { storyVisibility: visibilityPerUser, followers, following } = authUser;

  // The whole perUser and perStory is done to ensure that users who got the stories are the same ones that would be pulled from when deleting.
  const storyVisibility = visibilityPerStory || visibilityPerUser;
  const { type, users } = storyVisibility;

  const idKey = "userId";
  const queryIds =
    type === "followers"
      ? getAnArrayOfSpecificKeyPerObjectInArray(followers, idKey)
      : type === "mutuals"
      ? getMutuals(followers, following)
      : type === "custom select"
      ? getAnArrayOfSpecificKeyPerObjectInArray(users, idKey)
      : type === "custom exempt" &&
        customExemptUsersFromStory(followers, users);

  return queryIds;
};

const extractMentionedUsers = (content) => {
  const matches = content.match(/\s@\w+/g);
  return (matches || []).map((item) => item.slice(2));
};

const removeFromArray = (array, itemToRemove) =>
  array.filter((item) => item !== itemToRemove);

const getUpdateMutualData = (
  [{ authType, authUser }, { userType, user }],
  updateType
) => {
  const idKey = "userId";
  const updateData = [
    {
      queryId: authUser._id,
      existingRecord: findById(authUser[authType], idKey, user._id),
      update: { [authType]: { userId: user._id } },
    },
    {
      queryId: user._id,
      existingRecord: findById(user[userType], idKey, authUser._id),
      update: { [userType]: { userId: authUser._id } },
    },
  ];

  const updates = updateData
    .map(({ queryId, existingRecord, update }) => ({
      updateOne: {
        filter: { _id: queryId },
        update: existingRecord
          ? updateType !== "push only" && { $pull: update }
          : updateType !== "pull only" && {
              $push: update,
            },
      },
    }))
    .filter(({ updateOne: { update } }) => update);

  return { updateData, updates };
};

const getBlockedUserIds = (authUser) => {
  const { youBlocked, blockedYou } = authUser;
  return [
    ...new Set([
      ...getAnArrayOfSpecificKeyPerObjectInArray(blockedYou, "userId"),
      ...getAnArrayOfSpecificKeyPerObjectInArray(youBlocked, "userId"),
    ]),
  ];
};

const excludeBlocked = (query, authUser) => {
  if (query) {
    const blockedUserIds = getBlockedUserIds(authUser);
    return Array.isArray(query)
      ? query.filter((userId) => !blockedUserIds.includes(userId))
      : blockedUserIds.some((userId) => userId.equals(query))
      ? []
      : query;
  }
};

const returnShortForBlockedUsers = (posts, authUser) => {
  const blockedUserIds = getBlockedUserIds(authUser);
  return posts.map((post) => {
    const { _id, userId } = post;
    return blockedUserIds.some((blockedUserId) => blockedUserId.equals(userId))
      ? { _id, userId }
      : post;
  });
};

export {
  getMutuals,
  deriveSnippet,
  getAnArrayOfSpecificKeyPerObjectInArray,
  findById,
  customExemptUsersFromStory,
  deriveStoryQueryIds,
  extractMentionedUsers,
  removeFromArray,
  getUpdateMutualData,
  excludeBlocked,
  getBlockedUserIds,
  returnShortForBlockedUsers,
};
