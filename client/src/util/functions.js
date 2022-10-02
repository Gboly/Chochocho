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
import { editProfileImageType, scrollCacheType } from "./types";

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

export const capitalize = (word) => `${word[0].toUpperCase()}${word.slice(1)}`;

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

export const setIsReturnPage = (value) => {
  const scrollCache = getSessionStorageItem(scrollCacheType);

  sessionStorage.setItem(
    scrollCacheType,
    JSON.stringify({ ...scrollCache, isReturnPage: value })
  );
};

export const updateScrollCache = (value) => {
  const scrollCache = getSessionStorageItem(scrollCacheType);
  const scrollTopStack = scrollCache?.scrollTopStack || [];

  let newScrollTopStack;
  value
    ? (newScrollTopStack = [...scrollTopStack, value])
    : (newScrollTopStack = scrollTopStack.slice(0, scrollTopStack.length - 1));

  sessionStorage.setItem(
    scrollCacheType,
    JSON.stringify({ ...scrollCache, scrollTopStack: newScrollTopStack })
  );
};
