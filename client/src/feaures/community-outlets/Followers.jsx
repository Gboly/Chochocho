import "./community-outlet.css";
import {
  selectFetchedUsersIds,
  useGetUsersByIdQuery,
} from "../../app/api-slices/usersApiSlice";
import CommunityBlock from "./CommunityBlock";
import { useOutletContext } from "react-router-dom";
import { useCallback, useState } from "react";
import Spinner from "../../components/Spinner/Spinner";
import {
  getAnArrayOfSpecificKeyPerObjectInArray,
  newRange,
  prepareIdsForQuery,
} from "../../util/functions";
import { useSelector } from "react-redux";
import { ScrollCache } from "../scroll-cache/ScrollCache";

const initialPage = { skip: 0, limit: 10 };
export default function Followers() {
  const {
    authUser: { followers },
    communityNode,
  } = useOutletContext();
  const [{ skip, limit }, setRefetch] = useState(initialPage);

  const { isLoading: followersFetchIsLoading, data: followersResult } =
    useGetUsersByIdQuery({
      userIds: prepareIdsForQuery(followers, "userId"),
      start: skip,
      end: limit,
    });

  const fetchMore = useCallback(() => {
    !followersFetchIsLoading &&
      followersResult.ids.length &&
      setRefetch(({ skip, limit }) => newRange(skip, limit, initialPage));
  }, [followersFetchIsLoading, followersResult]);

  const fetchedUserIds = useSelector(selectFetchedUsersIds);
  const isFetched = (userId) =>
    (fetchedUserIds || []).includes(userId) || false;

  return (
    <>
      <ScrollCache ref={communityNode} fetchMore={fetchMore} />
      {getAnArrayOfSpecificKeyPerObjectInArray(followers, "userId").map(
        (userId, index) =>
          isFetched(userId) && <CommunityBlock key={index} {...{ userId }} />
      )}
      {followersFetchIsLoading && <Spinner />}
      <div
        className="nots-void"
        style={{ height: "1rem", padding: "7rem" }}
      ></div>
    </>
  );
}
