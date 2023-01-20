import "./community-outlet.css";
import CommunityBlock from "./CommunityBlock";
import { useOutletContext } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  selectUserIdsByArgs,
  useGetUsersByIdExceptionsQuery,
} from "../../app/api-slices/usersApiSlice";
import Spinner from "../../components/Spinner/Spinner";
import {
  prepareIdsForQuery,
  prepareUserIdsForQuery,
} from "../../util/functions";
import { exemptionType, suggestedUsersType } from "../../util/types";
import { useSelector } from "react-redux";

export default function Suggested() {
  const { followings, followers, authUser } = useOutletContext();
  const [{ skip, limit }, setRefetch] = useState({ skip: 0, limit: 10 });

  const friends = [{ userId: authUser?.id }, ...followings, ...followers];

  const queryArgs = {
    userIds: prepareIdsForQuery(friends, "userId", exemptionType),
    start: skip,
    end: limit,
    type: suggestedUsersType,
  };
  const { isLoading: suggestedFetchIsLoading, data: suggestedResult } =
    useGetUsersByIdExceptionsQuery(queryArgs);

  const fetchedUserIds = useSelector((state) =>
    selectUserIdsByArgs(state, queryArgs)
  );

  return (
    <>
      {(fetchedUserIds || []).map((userId, index) => (
        <CommunityBlock key={index} {...{ userId }} />
      ))}
      {suggestedFetchIsLoading && <Spinner />}
      <div
        className="nots-void"
        style={{ height: "1rem", padding: "7rem" }}
      ></div>
    </>
  );
}
