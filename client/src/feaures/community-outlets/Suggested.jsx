import "./community-outlet.css";
import CommunityBlock from "./CommunityBlock";
import { useOutletContext } from "react-router-dom";
import { useGetUsersByIdExceptionsQuery } from "../../app/api-slices/usersApiSlice";
import Spinner from "../../components/Spinner/Spinner";
import {
  getAnArrayOfSpecificKeyPerObjectInArray,
  prepareUserIdsForQuery,
} from "../../util/functions";
import { exemptionType, suggestedUsersType } from "../../util/types";
import { useSelector } from "react-redux";
import { ScrollCache } from "../scroll-cache/ScrollCache";
import { getIgnoredUserIds } from "../../pages/community/communitySlice";

export default function Suggested() {
  const {
    authUser: { id: authUserId, following, followers },
    communityNode,
  } = useOutletContext();
  const ignoredUserIds = useSelector(getIgnoredUserIds);

  const friends = [
    authUserId,
    ...getAnArrayOfSpecificKeyPerObjectInArray(
      [...following, ...followers],
      "userId"
    ),
    ...ignoredUserIds,
  ];

  const queryArgs = {
    userIds: prepareUserIdsForQuery(friends, exemptionType),
    start: 0,
    end: 12,
    type: suggestedUsersType,
  };

  const { isLoading: suggestedFetchIsLoading, data: suggestedResult } =
    useGetUsersByIdExceptionsQuery(queryArgs);

  return (
    <>
      <ScrollCache ref={communityNode} />
      {(suggestedResult?.ids || [])
        .filter(
          (id) =>
            // This is more or less an optimistic update. Although the query is refetched whenever a user is ignored or followed, this ensures a better ux. The change is seen immediately and doesn't have to wait for the query to be successful.
            !ignoredUserIds.includes(id) &&
            !getAnArrayOfSpecificKeyPerObjectInArray(following).includes(id)
        )
        .map((userId, index) => (
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
