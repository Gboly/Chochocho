import { useContext, useEffect, useMemo } from "react";
import { useCallback, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { LayoutContext } from "../../layout/Layout";
import { updateScrollCache } from "../../util/functions";

const NavigateWithScrollCache = ({
  children,
  clicked,
  handleRouting,
  cleanUp,
  action,
}) => {
  const location = useLocation();
  const { userId } = useParams();
  const [{ homeNode, profileNode, viewPostNode, notificationsNode }, setNodes] =
    useState({
      homeNode: "",
      profileNode: "",
      viewPostNode: "",
      notificationsNode: "",
    });

  const { pageNodes, isAuth } = useContext(LayoutContext);

  useEffect(() => {
    setNodes({
      homeNode: pageNodes?.current?.homeNode,
      profileNode: pageNodes?.current?.profileNode,
      viewPostNode: pageNodes?.current?.viewPostNode,
      notificationsNode: pageNodes?.current?.notificationsNode,
    });
    // using location as a dependency because of the sidebar routing which is not an actual page therefore, the pageNodes ref in layout component doesn't rerender on onClick. So, by doing this, everytime the location changes, useEffect runs again with updated value of pageNodes
  }, [pageNodes, location]);

  const ref = useMemo(() => {
    //since these nodes are gotten using useContext hook and this component must be a child element of the context Provider before it gives an actual value, else it's undefined. Then all i'm doing here is checking for the node that is valid and choosing it as the current page node.
    return homeNode || profileNode || viewPostNode || notificationsNode;
  }, [homeNode, profileNode, viewPostNode, notificationsNode]);

  const handleClick = useCallback(() => {
    if (ref) {
      const scrollTop = ref.scrollTop;
      // Checking to see if i'm in the viewPost route. If true, use the location.key as the property name for the scrollTop value. This is to ensure that only when a back button is used in navigating to this route should the scroll be restored. I've also included profile pages(asides authorized user page) to this condition
      // Location.pathname should be used for other routes. They're main routes and would be navigated through the sidebar. This would generate a new key which isnt what i need.
      //#3
      const key =
        // #3
        viewPostNode || (!isAuth(Number(userId)) && profileNode)
          ? location.key
          : location.pathname;
      updateScrollCache(key, scrollTop);
    }
    handleRouting();
    action && action();
  }, [
    ref,
    location,
    userId,
    handleRouting,
    profileNode,
    viewPostNode,
    isAuth,
    action,
  ]);

  useEffect(() => {
    clicked && handleClick();

    // This cleanup is basically setting the click back to false to ensure that it only runs once after click.
    return () => cleanUp();
  }, [clicked, handleClick, cleanUp]);

  return <>{children}</>;
};

export default NavigateWithScrollCache;
