import styles from "@/assets/styles/search/search.module.scss";
import { useQuery } from "@apollo/client";
import { GET_FILTERED_GROUPS } from "@/lib/query/search/getFilteredGroups.graphql.ts";
import { debouncedError } from "@/utils/error-handler.ts";
import { Group } from "@/gql/graphql.ts";
import { Dispatch, SetStateAction, useState } from "react";
import GroupBox from "./GroupBox.tsx";
import GroupSearchSkeleton from "./GroupSearchSkeleton.tsx";

interface GroupSearch {
  filter: string;
  setTab: Dispatch<SetStateAction<string>>;
  setAnyGroupResult: Dispatch<SetStateAction<boolean>>;
}

export default function GroupSearch({ filter, setTab, setAnyGroupResult }: GroupSearch) {
  const [groupData, setGroupData] = useState<Group[]>([]);
  const { loading } = useQuery(GET_FILTERED_GROUPS, {
    variables: {
      filter: filter,
      pagination: {
        start: 0,
        limit: 4,
      },
    },
    fetchPolicy: "cache-and-network",
    onError: debouncedError,
    onCompleted: (data) => {
      setGroupData(data.getFilteredGroups);
    },
  });

  if (loading)
    return (
      <>
        <GroupSearchSkeleton />
        <GroupSearchSkeleton />
      </>
    );
  if (!loading && groupData.length == 0) {
    setAnyGroupResult(false);
    return <></>;
  }

  return (
    <div className={styles.groupSearch}>
      <header>
        <h3>Group</h3>
      </header>
      <article>
        {groupData.map((group) => {
          return (
            <GroupBox
              group={group}
              setGroupData={setGroupData}
              key={group.id}
            />
          );
        })}
      </article>
      {groupData.length < 3 && (
        <footer>
          <button onClick={() => setTab("groups")}>See More</button>
        </footer>
      )}
    </div>
  );
}
