import styles from "@/assets/styles/search/search.module.scss";
import { Dispatch, RefObject, SetStateAction, useState } from "react";
import { useParams } from "react-router-dom";
import { User } from "@/gql/graphql.ts";
import { useQuery } from "@apollo/client";
import { GET_FILTERED_USERS } from "@/lib/query/search/getFilteredUsers.graphql.ts";
import { debouncedError } from "@/utils/error-handler.ts";
import GroupSearchSkeleton from "./GroupSearchSkeleton.tsx";
import UserLoneBox from "./UserLoneBox.tsx";
import useInfiniteScroll from "@/hooks/use-infinite-scroll.ts";

interface UserPage {
  pageRef: RefObject<HTMLDivElement>;
  setFinished?: Dispatch<SetStateAction<boolean>>;
  finished?: boolean;
}

const paginationLimit = 10;
export default function UserPage({ pageRef, setFinished, finished }: UserPage) {
  const { searchQuery } = useParams();
  const [currFinished, setCurrFinished] = useState(false);
  const [userData, setUserData] = useState<User[]>([]);
  const [currPostIndex, setCurrPostIndex] = useState(0);
  const { loading } = useQuery(GET_FILTERED_USERS, {
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
      const result = data.getFilteredUsers;
      if (result < 10) {
        setFinished ? setFinished(true) : setCurrFinished(true);
        return;
      }
      setUserData([...userData, ...result]);
    },
  });

  const handleFetch = () => {
    if (finished || currFinished) return;
    setCurrPostIndex((prev) => prev + paginationLimit);
  };

  useInfiniteScroll<HTMLDivElement>({
    callback: handleFetch,
    pageRef,
  });

  if (!loading && userData.length == 0 && !setFinished)
    return (
      <div className={styles.search}>
        <h4 className={styles.noResult}>No users found</h4>
      </div>
    );
  return (
    <>
      <div className={styles.search}>
        {userData.map((user) => {
          return (
            <UserLoneBox
              user={user}
              setUsers={setUserData}
              key={user.id}
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
