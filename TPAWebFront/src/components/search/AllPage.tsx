import styles from "../../assets/styles/search/search.module.scss";
import { Dispatch, RefObject, SetStateAction, useState } from "react";
import { Post } from "../../../gql/graphql.ts";
import GroupSearchSkeleton from "./GroupSearchSkeleton.tsx";
import UserPage from "./UserPage.tsx";
import GroupPage from "./GroupPage.tsx";
import PostPage from "./PostPage.tsx";

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
                key={11}
                pageRef={pageRef}
                setFinished={setUserFinished}
                finished={userFinished}
            />
            {userFinished && (
                <>
                    <GroupPage
                        key={"masdasd"}
                        pageRef={pageRef}
                        setFinished={setGroupFinished}
                        finished={groupFinished}
                    />
                </>
            )}
            {!groupFinished && <GroupSearchSkeleton key={1} />}
            {!groupFinished && <GroupSearchSkeleton key={4} />}
            {groupFinished && (
                <PostPage
                    key={"asdkahjsjkashg"}
                    setCurrPost={setCurrPost}
                    setShareModalState={setShareModalState}
                    pageRef={pageRef}
                    searchQuery={searchQuery}
                />
            )}
        </div>
    );
}
