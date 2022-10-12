import "./community-outlet.css";
import { useGetUsersByIdQuery } from "../../app/api-slices/usersApiSlice";
import CommunityBlock from "./CommunityBlock";
import { useOutletContext } from "react-router-dom";
import { useEffect, useState } from "react";
import Spinner from "../../components/Spinner/Spinner";
import { prepareUserIdsForQuery } from "../../util/functions";

export default function Followers() {
  const { followers } = useOutletContext();
  const [{ skip, limit }, setRefetch] = useState({ skip: 0, limit: 10 });

  const { isLoading: followersFetchIsLoading, data: followersResult } =
    useGetUsersByIdQuery({
      userIds: prepareUserIdsForQuery(followers),
      start: skip,
      end: limit,
    });

  const isFetched = (userId) =>
    (followersResult || []).ids?.includes(userId) || false;

  return (
    <>
      {followers.map(
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
