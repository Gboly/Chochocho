import "./community-outlet.css";
import CommunityBlock from "./CommunityBlock";
import { useOutletContext } from "react-router-dom";
import { useCallback, useState } from "react";
import {
  selectUserIdsByArgs,
  useGetUsersByIdExceptionsQuery,
} from "../../app/api-slices/usersApiSlice";
import Spinner from "../../components/Spinner/Spinner";
import { newRange, prepareIdsForQuery } from "../../util/functions";
import { exemptionType, suggestedUsersType } from "../../util/types";
import { useSelector } from "react-redux";
import { ScrollCache } from "../scroll-cache/ScrollCache";

const initialPage = { skip: 0, limit: 10 };
export default function Suggested() {
  const { followings, followers, authUser, communityNode } = useOutletContext();
  const [{ skip, limit }, setRefetch] = useState(initialPage);

  const friends = [{ userId: authUser?.id }, ...followings, ...followers];

  const queryArgs = {
    userIds: prepareIdsForQuery(friends, "userId", exemptionType),
    start: skip,
    end: limit,
    type: suggestedUsersType,
  };
  const { isLoading: suggestedFetchIsLoading, data: suggestedResult } =
    useGetUsersByIdExceptionsQuery(queryArgs);

  const fetchMore = useCallback(() => {
    !suggestedFetchIsLoading &&
      suggestedResult.ids.length &&
      setRefetch(({ skip, limit }) => newRange(skip, limit, initialPage));
  }, [suggestedFetchIsLoading, suggestedResult]);

  const fetchedUserIds = useSelector((state) =>
    selectUserIdsByArgs(state, queryArgs)
  );

  return (
    <>
      <ScrollCache ref={communityNode} fetchMore={fetchMore} />
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
