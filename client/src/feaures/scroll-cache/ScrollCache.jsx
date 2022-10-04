import React, { useLayoutEffect } from "react";
import { forwardRef } from "react";
import { getSessionStorageItem } from "../../util/functions";
import {
  profilePageType,
  scrollCacheType,
  viewPostPageType,
} from "../../util/types";
import { useLocation, useParams } from "react-router-dom";

export const ScrollCache = forwardRef(({ children }, ref) => {
  const location = useLocation();
  const { userId } = useParams();
  useLayoutEffect(() => {
    const scrollCache = getSessionStorageItem(scrollCacheType);
    const key =
      ref.current.id === viewPostPageType ||
      (userId !== 1 && ref.current.id === profilePageType)
        ? location.key
        : location.pathname;

    ref.current.scrollTop = scrollCache[key] || 0;
  }, [location, ref, userId]);

  return <>{children}</>;
});
