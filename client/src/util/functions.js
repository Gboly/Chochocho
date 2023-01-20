import { parseISO, formatDistanceToNowStrict } from "date-fns";
import { playbackSpeedOptions } from "./formRadioOptions";
import { communityRoutes } from "./formRadioOptions";
import { store } from "../app/store";
import {
  showConfirmation,
  closeConfirmation,
  openOpaqueOverlay,
  closeOpaqueOverlay,
  openTransparentOverlay,
  closeTransparentOverlay,
} from "../app/actions/layoutActions";
import { openEditProfileImage } from "../app/actions/profileActions";
import {
  editProfileImageType,
  scrollCacheType,
  exemptionType,
  onlineType,
  offlineType,
} from "./types";

export const convertToUserFriendlyTime = (date) => {
  const ISOdate = parseISO(date);
  const timeDiff = formatDistanceToNowStrict(ISOdate);

  const spaceIndex = timeDiff.indexOf(" ");
  const result = timeDiff.slice(0, spaceIndex + 2).replace(" ", "");
  if (result === "0s") {
    return "now";
  }
  return result;
};

export const truncateLikesEngagements = (value) => {
  if (value < 1000) {
    return value;
  }
  if (value < 10000) {
    const modifiedValue = Math.floor((value / 1000) * 10) / 10;
    return `${modifiedValue}K`;
  }
  if (value < 1000000) {
    const modifiedValue = Math.floor(value / 1000);
    return `${modifiedValue}K`;
  }
  if (value < 1000000000) {
    const modifiedValue = Math.floor(value / 1000000);
    return `${modifiedValue}M`;
  }
  return "♾";
};

export const truncateEngagements = (value) => {
  if (value < 1000) {
    return value;
  }
  if (value < 1000000) {
    const modifiedValue = Math.floor((value / 1000) * 10) / 10;
    return `${modifiedValue}K`;
  }
  if (value < 1000000000) {
    const modifiedValue = Math.floor((value / 1000000) * 10) / 10;
    return `${modifiedValue}M`;
  }
};

export const handleMediaUpload = (e, action) => {
  const fileObject = e.target.files[0];
  const { type, size } = fileObject;

  if (size > 152 * 1024 * 1024) {
    return alert("File is too large");
  }

  const reader = new FileReader();
  reader.addEventListener("loadstart", (e) => {
    store.dispatch(action({ reading: true }));
  });
  reader.addEventListener("load", (e) => {
    const src = e.target.result;
    store.dispatch(action({ type, src }));
  });
  reader.readAsDataURL(fileObject);
};

export const handleprofileImageUpload = (e, payload) => {
  const fileObject = e.target.files[0];
  const { size } = fileObject;

  if (size > 152 * 1024 * 1024) {
    return alert("File is too large");
  }

  const reader = new FileReader();
  reader.addEventListener("loadstart", (e) => {
    showPopupOnOpaqueOverlay(openEditProfileImage, editProfileImageType, {
      reading: true,
    });
  });
  reader.addEventListener("load", (e) => {
    const src = e.target.result;
    showPopupOnOpaqueOverlay(openEditProfileImage, editProfileImageType, {
      src,
      ...payload,
    });
  });
  reader.readAsDataURL(fileObject);
};

export const timing = (time) => {
  const min = Math.floor(time / 60);
  const sec = Math.round(time % 60);

  if (sec > 9) {
    return `${min}:${sec}`;
  }
  return `${min}:0${sec}`;
};

export const playbackSpeedInNumber = (valueId) => {
  const value = playbackSpeedOptions[valueId];
  const numberReady = value.replace("x", "");
  return Number(numberReady);
};

export const getCommunityOutletIndexFromLocation = (locationPath) => {
  const locationArray = locationPath.split("/");
  const currentPath =
    locationArray[locationArray.length - 1] ||
    locationArray[locationArray.length - 2];
  if (currentPath === "community") {
    return 0;
  }
  return communityRoutes.indexOf(currentPath);
};

export const capitalize = (word) =>
  word ? `${word[0].toUpperCase()}${word.slice(1)}` : "";

export const copyTextToClipboard = async (text) => {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (error) {
    return false;
  }
};

export const getCurrentUrl = () => window.location.href;

export const displayConfirmation = (type) => {
  store.dispatch(showConfirmation(type));
  setTimeout(() => store.dispatch(closeConfirmation()), 3000);
};

// Recursive function
export const convertToCamelCasing = (value, n) => {
  const spaceIndex = value.indexOf(" ");
  if (spaceIndex === -1) {
    return value;
  }
  const starter = value.slice(0, spaceIndex);
  const remainder = value.slice(spaceIndex + 1);

  const capitalizedRemainder = capitalize(remainder);
  const pascalized = starter + capitalizedRemainder;

  return convertToCamelCasing(pascalized, n - 1);
};

export const showPopupOnOpaqueOverlay = (popupAction, type, parameter) => {
  store.dispatch(openOpaqueOverlay(type));
  store.dispatch(popupAction(parameter));
};

export const closePopupOnOpaqueOverlay = (closeAction, parameter) => {
  store.dispatch(closeOpaqueOverlay());
  store.dispatch(closeAction(parameter));
};

export const closeNestedPopupOnOpaqueOverlay = (
  closeAction,
  parentType,
  parameter
) => {
  store.dispatch(openOpaqueOverlay(parentType));
  store.dispatch(closeAction(parameter));
};
export const showPopupOnTransparentOverlay = (
  popupAction,
  overlayParam,
  popupParameter
) => {
  store.dispatch(openTransparentOverlay(overlayParam));
  store.dispatch(popupAction(popupParameter));
};

export const closePopupOnTransparentOverlay = (closeAction, parameter) => {
  store.dispatch(closeTransparentOverlay());
  store.dispatch(closeAction(parameter));
};

export const closeNestedPopupOnTransparentOverlay = (
  closeAction,
  parentType,
  parameter
) => {
  store.dispatch(openTransparentOverlay(parentType));
  store.dispatch(closeAction(parameter));
};
export const getSessionStorageItem = (key) => {
  const stringifiedValue = sessionStorage.getItem(key) ?? `{}`;
  const value = JSON.parse(stringifiedValue);
  return value;
};

export const setSessionStorageItem = (key, value) => {
  sessionStorage.setItem(key, JSON.stringify(value));
};

export const updateScrollCache = (key, value) => {
  const scrollCache = getSessionStorageItem(scrollCacheType);
  setSessionStorageItem(scrollCacheType, { ...scrollCache, [key]: value });
};

export const getBasePath = (pathName) => {
  return pathName.split("/")[1] || "";
};

export const unNormalize = (data) => {
  const values = Object.values(data.entities);
  // Object.defineProperties related methods is usually read-only. This line creates a deep clone to ensure it is read&write again
  return JSON.parse(JSON.stringify(values));
};

const argumentMatch = (originalArg, myArg) =>
  Object.entries(originalArg).every(([key, value]) => {
    if (key === "skip" || key === "limit") {
      return true;
    }
    return value === myArg[key];
  });

const selectQueriesData = (queries, selectedEndPoints, originalArgs) =>
  Object.values(queries).reduce((accum, query) => {
    const isMatch =
      selectedEndPoints.includes(query.endpointName) &&
      query.status === "fulfilled" &&
      (originalArgs ? argumentMatch(query.originalArgs, originalArgs) : true);

    isMatch && query.data && accum.push(query.data);
    return accum;
  }, []);

const mergeSelectedQueriesData = (selectedQueriesData, initialState) =>
  selectedQueriesData.reduce((accum, current) => {
    accum = {
      // Removing duplicates from ids(if any)
      ids: [...new Set([...accum.ids, ...current.ids])],
      entities: { ...accum.entities, ...current.entities },
    };
    return accum;
  }, initialState);

export const selectTotalFetchedResult = (
  state,
  selectedEndPoints,
  initialState,
  originalArgs
) => {
  const selectedQueriesData = selectQueriesData(
    state.api.queries,
    selectedEndPoints,
    originalArgs
  );
  const mergedSelectedQueriesData = mergeSelectedQueriesData(
    selectedQueriesData,
    initialState
  );
  return mergedSelectedQueriesData;
};

export const prepareUserIdsForQuery = (userIds, type) => {
  return userIds.join(`&id${type === exemptionType ? "_ne" : ""}=`) || "";
};

export const prepareIdsForQuery = (documentField, idKey, type) => {
  const ids = (documentField || []).map((item) => item[idKey]);
  const noDuplicateIds = [...new Set(ids)];
  return prepareUserIdsForQuery(noDuplicateIds, type);
};

export const getUsernameFromLink = (link) => {
  const linkArray = link.split("/");
  const username = linkArray[linkArray.length - 1];
  return username ? username : linkArray[linkArray.length - 2];
};

const usersLastSeenToISO = (usersList) =>
  usersList.map((user) => {
    user.lastSeen = new Date(user.lastSeen).toISOString();
    return user;
  });

const getSortedUsers = (usersList) =>
  usersList.sort((a, b) => b.lastSeen.localeCompare(a.lastSeen));

const getUsersBasedOnStatus = (users, online) =>
  users.filter(
    (user) =>
      (online ? user.online : !user.online) && user.settings.activeStatus
  );

const getUsersWithoutActiveStatus = (usersList) =>
  usersList.filter((user) => !user.settings.activeStatus);

export const getUsersBasedOnLastSeen = (usersList) => {
  const updatedUsersList = usersLastSeenToISO(usersList);
  const sortedUsers = getSortedUsers(updatedUsersList);
  const online = getUsersBasedOnStatus(sortedUsers, true);
  const offline = getUsersBasedOnStatus(sortedUsers, false);
  const offActiveStatus = getUsersWithoutActiveStatus(sortedUsers);
  // The idea is to ensure that those online are top, followed by those offline and then we can have those who have their active status turned off
  return [...online, ...offline, ...offActiveStatus];
};

export const sortByViewedStatus = (authUser) =>
  (authUser?.otherStoryAuthors || []).reduce(
    (accum, author) => {
      const isViewed = authUser?.otherStories
        .filter((story) => story.userId === author.userId)
        .every((story) => story.viewed);
      accum = {
        viewed: isViewed ? [...accum.viewed, author] : [...accum.viewed],
        active: isViewed ? [...accum.active] : [...accum.active, author],
      };
      return accum;
    },
    { viewed: [], active: [] }
  );

export const getStoryUserDetails = (authUser, userId) => {
  const sortedUsers = sortByViewedStatus(authUser);
  const viewedAuthors = sortedUsers.viewed;
  const activeAuthors = sortedUsers.active;
  const isAViewedAuthor = viewedAuthors.some(
    (viewedAuthor) => viewedAuthor.userId === userId
  );
  const isAnActiveAuthor = activeAuthors.some(
    (activeAuthor) => activeAuthor.userId === userId
  );
  const viewedAuthorIndex = viewedAuthors.findIndex(
    (viewedauthor) => viewedauthor.userId === userId
  );
  const activeAuthorIndex = activeAuthors.findIndex(
    (activeAuthor) => activeAuthor.userId === userId
  );
  const userIndex = isAnActiveAuthor
    ? activeAuthorIndex
    : isAViewedAuthor
    ? viewedAuthorIndex
    : -1;
  const users = isAnActiveAuthor
    ? activeAuthors
    : isAViewedAuthor
    ? viewedAuthors
    : [];

  return { userIndex, users };
};

export const findByIdKey = (array, key, id) =>
  array.some((item) => item[key] === id);

// The default identity for each document is denoted by "_id". Now, i want the identity to accessible with "id"
export const attachIdProperty = (responseData) => {
  if (Array.isArray(responseData)) {
    return responseData.map((item) => {
      item.id = item._id;
      return item;
    });
  } else {
    responseData.id = responseData._id;
    return responseData;
  }
};

export const getTransformed = (response, adapter) =>
  response &&
  (adapter
    ? adapter.setAll(adapter.getInitialState(), attachIdProperty(response))
    : attachIdProperty(response));

export const getAnArrayOfSpecificKeyPerObjectInArray = (
  originalArray,
  specificKey
) => {
  return (originalArray || []).map((item) => item[specificKey]);
};

export const getFullDate = (date, { time, day, month, year }) => {
  const fullDate = new Date(date).toLocaleString("en-US", {
    timeStyle: "short",
    dateStyle: "medium",
  });
  const fullDateArray = fullDate.split(",");
  const organizedFullDate =
    !day && !time && month && year
      ? `${fullDateArray[0].match(/[^1-9]+/)}${fullDateArray[1]}`
      : `${time ? fullDateArray[2] + " - " : ""}${
          month && (day ? fullDateArray[0] : fullDateArray[0].match(/[^1-9]+/))
        },${year ? fullDateArray[1] : ""}`;

  return organizedFullDate;
};

export const getStoryAuthors = (otherStories) => {
  const authorIds = getAnArrayOfSpecificKeyPerObjectInArray(
    otherStories,
    "userId"
  );
  const uniqueAuthorIds = [...new Set(authorIds)];
  return uniqueAuthorIds.map((userId) => ({ userId }));
};

//export const removeSessionToken = () => sessionStorage.removeItem("authToken");
