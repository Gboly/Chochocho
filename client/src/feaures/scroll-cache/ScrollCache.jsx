import React, { useContext, useLayoutEffect } from "react";
import { forwardRef } from "react";
import { getSessionStorageItem } from "../../util/functions";
import {
  profilePageType,
  scrollCacheType,
  viewPostPageType,
} from "../../util/types";
import { useLocation, useParams } from "react-router-dom";
import { LayoutContext } from "../../layout/Layout";

export const ScrollCache = forwardRef(({ children, defaultScrollTop }, ref) => {
  const location = useLocation();
  const { userId } = useParams();
  const { pageRefresh, setPageRefresh } = useContext(LayoutContext);

  useLayoutEffect(() => {
    const scrollCache = getSessionStorageItem(scrollCacheType);
    const key =
      ref.current.id === viewPostPageType ||
      // #3
      (userId !== "1" && ref.current.id === profilePageType)
        ? location.key
        : location.pathname;

    ref.current.scrollTop = scrollCache[key] || defaultScrollTop || 0;

    // cleanup function.
    return () => setPageRefresh(false);
  }, [location, ref, userId, pageRefresh, setPageRefresh, defaultScrollTop]);

  return <>{children}</>;
});
