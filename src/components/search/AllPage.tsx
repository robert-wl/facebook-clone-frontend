import styles from "@/assets/styles/search/search.module.scss";
import { Dispatch, RefObject, SetStateAction, useState } from "react";
import { Post } from "@/gql/graphql.ts";
import UserPage from "./UserPage.tsx";
import GroupPage from "@/components/search/GroupPage.tsx";
import PostPage from "@/components/search/PostPage.tsx";

interface AllPage {
  setCurrPost: Dispatch<SetStateAction<Post | null>>;
  setShareModalState: Dispatch<SetStateAction<boolean>>;
  pageRef: RefObject<HTMLDivElement>;
  searchQuery: string;
}

export default function AllPage({ setCurrPost, setShareModalState, pageRef, searchQuery }: AllPage) {
  const [userFinished, setUserFinished] = useState(false);
  const [groupFinished, setGroupFinished] = useState(false);

  return (
    <div className={styles.search}>
      <UserPage
        pageRef={pageRef}
        setFinished={setUserFinished}
        finished={userFinished}
      />
      {userFinished && (
        <GroupPage
          pageRef={pageRef}
          setFinished={setGroupFinished}
          finished={groupFinished}
        />
      )}
      {groupFinished && (
        <PostPage
          setCurrPost={setCurrPost}
          setShareModalState={setShareModalState}
          pageRef={pageRef}
          searchQuery={searchQuery}
        />
      )}
    </div>
  );
}
