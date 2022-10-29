import React from "react";
import { useGetUserByIdQuery } from "./app/api-slices/usersApiSlice";
import { useMemo, useState, useRef } from "react";
import { sortByViewedStatus } from "./util/functions";
import { GeneralContext } from "./routes/Router";
import Spinner from "./components/Spinner/Spinner";

export default function App({ children }) {
  // I realized here that the context i had created within the Layout component would not be accessible to the story page. I failed to put this into consideration at the time.
  // There are components that needs to be used in the story component and this component makes use of a value from the LayoutContext.
  // #3
  const authUserId = 1;
  const { data: authUser } = useGetUserByIdQuery(authUserId);
  const isFollowing = (userId) => (authUser?.following || []).includes(userId);
  const isFollower = (userId) => (authUser?.followers || []).includes(userId);
  const isAuth = (userId) => authUser?.id === userId;

  const groupedUsers = useMemo(() => sortByViewedStatus(authUser), [authUser]);

  const pageNodes = useRef();
  const [pageRefresh, setPageRefresh] = useState(false);

  return (
    <GeneralContext.Provider
      value={{
        authUser,
        isFollowing,
        isFollower,
        isAuth,
        pageNodes,
        pageRefresh,
        setPageRefresh,
        viewedUsers: groupedUsers?.viewed,
        activeUsers: groupedUsers?.active,
      }}
    >
      {authUser ? (
        children
      ) : (
        <main className="loading-auth">
          <Spinner />
        </main>
      )}
    </GeneralContext.Provider>
  );
}
