import { parseISO, formatDistanceToNowStrict } from "date-fns";
import { playbackSpeedOptions } from "./formRadioOptions";
import { communityRoutes } from "./formRadioOptions";
import { store } from "../app/store";
import {
  showConfirmation,
  closeConfirmation,
  openOpaqueOverlay,
  closeOpaqueOverlay,
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

export const handleMediaUpload = (e, dispatch) => {
  const fileObject = e.target.files[0];
  const { type, size } = fileObject;

  if (size > 152 * 1024 * 1024) {
    return alert("File is too large");
  }

  const reader = new FileReader();
  reader.addEventListener("loadstart", (e) => {
    dispatch("reading");
  });
  reader.addEventListener("load", (e) => {
    const src = e.target.result;
    dispatch(false, type, src);
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

const selectQueriesData = (queries, selectedEndPoints) =>
  Object.values(queries).reduce((accum, query) => {
    selectedEndPoints.includes(query.endpointName) &&
      query.status === "fulfilled" &&
      accum.push(query.data);
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
  initialState
) => {
  const selectedQueriesData = selectQueriesData(
    state.api.queries,
    selectedEndPoints
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

export const prepareIdsForQuery = (documentField, idKey) => {
  const ids = documentField.map((item) => item[idKey]);
  return prepareUserIdsForQuery(ids);
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
