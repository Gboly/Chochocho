import "./community-outlet.css";
import CommunityBlock from "./CommunityBlock";
import {
  selectFetchedUsersIds,
  useGetUsersByIdQuery,
} from "../../app/api-slices/usersApiSlice";
import { useOutletContext } from "react-router-dom";
import { useState, useEffect } from "react";
import Spinner from "../../components/Spinner/Spinner";
import {
  getAnArrayOfSpecificKeyPerObjectInArray,
  prepareIdsForQuery,
  prepareUserIdsForQuery,
} from "../../util/functions";
import { useSelector } from "react-redux";

export default function Following() {
  const {
    authUser: { following },
  } = useOutletContext();
  const [{ skip, limit }, setRefetch] = useState({ skip: 0, limit: 10 });

  const { isLoading: followingsFetchIsLoading, data: followingsResult } =
    useGetUsersByIdQuery({
      userIds: prepareIdsForQuery(following, "userId"),
      start: skip,
      end: limit,
    });

  const fetchedUserIds = useSelector(selectFetchedUsersIds);
  const isFetched = (userId) =>
    (fetchedUserIds || []).includes(userId) || false;

  return (
    <>
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
