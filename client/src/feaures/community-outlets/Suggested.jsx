import "./community-outlet.css";
import CommunityBlock from "./CommunityBlock";
import { useOutletContext } from "react-router-dom";
import { useState, useEffect } from "react";
import { useGetUsersByIdExceptionsQuery } from "../../app/api-slices/usersApiSlice";
import Spinner from "../../components/Spinner/Spinner";
import { prepareUserIdsForQuery } from "../../util/functions";
import { exemptionType } from "../../util/types";

export default function Suggested() {
  const { followings, followers, authUser } = useOutletContext();
  const [{ skip, limit }, setRefetch] = useState({ skip: 0, limit: 10 });

  const friends = [authUser?.id, ...followings, ...followers];

  const { isLoading: suggestedFetchIsLoading, data: suggestedResult } =
    useGetUsersByIdExceptionsQuery({
      userIds: prepareUserIdsForQuery(friends, exemptionType),
      start: skip,
      end: limit,
    });

  const isFetched = (userId) =>
    (suggestedResult || []).ids?.includes(userId) || false;

  return (
    <>
      {(suggestedResult?.ids || []).map(
        (userId, index) =>
          isFetched(userId) && <CommunityBlock key={index} {...{ userId }} />
      )}
      {suggestedFetchIsLoading && <Spinner />}
      <div
        className="nots-void"
        style={{ height: "1rem", padding: "7rem" }}
      ></div>
    </>
  );
}
