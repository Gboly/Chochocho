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

export {
  getMutuals,
  deriveSnippet,
  getAnArrayOfSpecificKeyPerObjectInArray,
  findById,
};
