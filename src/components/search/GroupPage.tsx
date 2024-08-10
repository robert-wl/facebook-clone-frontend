import { Dispatch, RefObject, SetStateAction, useState } from "react";
import { useParams } from "react-router-dom";
import { Group } from "@/gql/graphql.ts";
import { useQuery } from "@apollo/client";
import { debouncedError } from "@/utils/error-handler.ts";
import GroupSearchSkeleton from "./GroupSearchSkeleton.tsx";
import styles from "@/assets/styles/search/search.module.scss";
import GroupLoneBox from "./GroupLoneBox.tsx";
import { GET_FILTERED_GROUPS } from "@/lib/query/search/getFilteredGroups.graphql.ts";
import useInfiniteScroll from "@/hooks/use-infinite-scroll.ts";

interface GroupPage {
  pageRef: RefObject<HTMLDivElement>;
  setFinished?: Dispatch<SetStateAction<boolean>>;
  finished?: boolean;
}

const paginationLimit = 10;

export default function GroupPage({ pageRef, setFinished, finished }: GroupPage) {
  const { searchQuery } = useParams();
  const [currFinished, setCurrFinished] = useState(false);
  const [groupData, setGroupData] = useState<Group[]>([]);
  const [currPostIndex, setCurrPostIndex] = useState(0);
  const { loading } = useQuery(GET_FILTERED_GROUPS, {
    variables: {
      filter: searchQuery ? searchQuery : "",
      pagination: {
        start: currPostIndex,
        limit: paginationLimit,
      },
    },
    fetchPolicy: "cache-and-network",
    onError: debouncedError,
    onCompleted: (data) => {
      const result = data.getFilteredGroups;

      if (result < 10) {
        setFinished ? setFinished(true) : setCurrFinished(true);
        return;
      }
      setGroupData([...groupData, ...result]);
    },
  });

  const handleFetch = () => {
    if (finished) return;
    setCurrPostIndex((prev) => prev + paginationLimit);
  };

  useInfiniteScroll<HTMLDivElement>({
    callback: handleFetch,
    pageRef,
  });

  if (!loading && groupData.length == 0 && !setFinished)
    return (
      <div className={styles.search}>
        <h4 className={styles.noResult}>No groups found</h4>
      </div>
    );
  return (
    <>
      <div className={styles.search}>
        {groupData.map((group, index) => {
          return (
            <GroupLoneBox
              group={group}
              setGroupData={setGroupData}
              key={index}
            />
          );
        })}
      </div>
      {loading && !(finished || currFinished) && (
        <>
          <GroupSearchSkeleton />
          <GroupSearchSkeleton />
        </>
      )}
    </>
  );
}
