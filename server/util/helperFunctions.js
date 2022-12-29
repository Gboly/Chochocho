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
  return originalArray.map((item) => item[specificKey]);
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
  return matches.map((item) => item.slice(2));
};

export {
  getMutuals,
  deriveSnippet,
  getAnArrayOfSpecificKeyPerObjectInArray,
  findById,
  customExemptUsersFromStory,
  deriveStoryQueryIds,
  extractMentionedUsers,
};
