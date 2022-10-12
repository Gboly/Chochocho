import "./community-outlet.css";
import CommunityBlock from "./CommunityBlock";
import { useGetUsersByIdQuery } from "../../app/api-slices/usersApiSlice";
import { useOutletContext } from "react-router-dom";
import { useState, useEffect } from "react";
import Spinner from "../../components/Spinner/Spinner";
import { prepareUserIdsForQuery } from "../../util/functions";

export default function Following() {
  const { followings } = useOutletContext();
  const [{ skip, limit }, setRefetch] = useState({ skip: 0, limit: 10 });

  const { isLoading: followingsFetchIsLoading, data: followingsResult } =
    useGetUsersByIdQuery({
      userIds: prepareUserIdsForQuery(followings),
      start: skip,
      end: limit,
    });

  const isFetched = (userId) =>
    (followingsResult || []).ids?.includes(userId) || false;

  return (
    <>
      {followings.map(
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
