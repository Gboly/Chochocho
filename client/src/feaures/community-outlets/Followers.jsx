import "./community-outlet.css";
import {
  selectFetchedUsersIds,
  useGetUsersByIdQuery,
} from "../../app/api-slices/usersApiSlice";
import CommunityBlock from "./CommunityBlock";
import { useOutletContext } from "react-router-dom";
import { useEffect, useState } from "react";
import Spinner from "../../components/Spinner/Spinner";
import {
  getAnArrayOfSpecificKeyPerObjectInArray,
  prepareIdsForQuery,
  prepareUserIdsForQuery,
} from "../../util/functions";
import { useSelector } from "react-redux";

export default function Followers() {
  const {
    authUser: { followers },
  } = useOutletContext();
  const [{ skip, limit }, setRefetch] = useState({ skip: 0, limit: 10 });

  const { isLoading: followersFetchIsLoading, data: followersResult } =
    useGetUsersByIdQuery({
      userIds: prepareIdsForQuery(followers, "userId"),
      start: skip,
      end: limit,
    });

  const fetchedUserIds = useSelector(selectFetchedUsersIds);
  const isFetched = (userId) =>
    (fetchedUserIds || []).includes(userId) || false;

  return (
    <>
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
