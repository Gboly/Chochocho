import "./community-outlet.css";
import CommunityBlock from "./CommunityBlock";
import {
  selectFetchedUsersIds,
  useGetUsersByIdQuery,
} from "../../app/api-slices/usersApiSlice";
import { useOutletContext } from "react-router-dom";
import { useState, useEffect, useCallback } from "react";
import Spinner from "../../components/Spinner/Spinner";
import {
  getAnArrayOfSpecificKeyPerObjectInArray,
  newRange,
  prepareIdsForQuery,
  prepareUserIdsForQuery,
} from "../../util/functions";
import { useSelector } from "react-redux";
import { ScrollCache } from "../scroll-cache/ScrollCache";

const initialPage = { skip: 0, limit: 10 };
export default function Following() {
  const {
    authUser: { following },
    communityNode,
  } = useOutletContext();
  const [{ skip, limit }, setRefetch] = useState(initialPage);

  const { isLoading: followingsFetchIsLoading, data: followingsResult } =
    useGetUsersByIdQuery({
      userIds: prepareIdsForQuery(following, "userId"),
      start: skip,
      end: limit,
    });

  const fetchMore = useCallback(() => {
    !followingsFetchIsLoading &&
      followingsResult.ids.length &&
      setRefetch(({ skip, limit }) => newRange(skip, limit, initialPage));
  }, [followingsFetchIsLoading, followingsResult]);

  const fetchedUserIds = useSelector(selectFetchedUsersIds);
  const isFetched = (userId) =>
    (fetchedUserIds || []).includes(userId) || false;

  return (
    <>
      <ScrollCache ref={communityNode} fetchMore={fetchMore} />
      {getAnArrayOfSpecificKeyPerObjectInArray(following, "userId").map(
        (userId, index) =>
          isFetched(userId) && <CommunityBlock key={index} {...{ userId }} />
      )}
      {followingsFetchIsLoading && <Spinner />}
      <div
        className="nots-void"
        style={{ height: "1rem", padding: "7rem" }}
      ></div>
    </>
  );
}
