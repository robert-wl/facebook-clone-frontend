import styles from "@/assets/styles/group/group.module.scss";
import PostSkeleton from "@/components/post/PostSkeleton.tsx";
import PostBox from "@/components/post/PostBox.tsx";
import { useQuery } from "@apollo/client";
import { GET_GROUP_HOME_POSTS } from "@/lib/query/group/getGroupHomePosts.graphql.ts";
import { debouncedError } from "@/controller/errorHandler.ts";
import { Post } from "@/gql/graphql.ts";
import { Dispatch, MutableRefObject, SetStateAction, useState } from "react";
import useInfiniteScroll from "@/hooks/use-infinite-scroll.ts";
import EmptyPost from "@/components/post/EmptyPost.tsx";

interface GroupFeed {
  setShareModalState: Dispatch<SetStateAction<boolean>>;
  setCurrPost: Dispatch<SetStateAction<Post | null>>;
  pageRef: MutableRefObject<HTMLDivElement>;
}

const paginationLimit = 5;

export default function GroupFeed({ setShareModalState, setCurrPost, pageRef }: GroupFeed) {
  const [postData, setPostData] = useState<Post[]>([]);
  const [stop, setStop] = useState(false);
  const [currPostIndex, setCurrPostIndex] = useState(0);
  const { loading } = useQuery(GET_GROUP_HOME_POSTS, {
    variables: {
      pagination: {
        start: currPostIndex,
        limit: paginationLimit,
      },
    },
    fetchPolicy: "cache-and-network",
    onCompleted: (data) => {
      const result = data.getGroupHomePosts;

      if (result.length == 0) setStop(true);
      setPostData((data) => [...data, ...result]);
    },
    onError: debouncedError,
  });

  const handleFetch = async () => {
    setCurrPostIndex((prev) => prev + paginationLimit);
  };

  useInfiniteScroll<HTMLDivElement>({
    callback: handleFetch,
    pageRef,
  });

  if (!loading && postData.length == 0)
    return (
      <div className={styles.search}>
        <h4 className={styles.noResult}>No posts found</h4>
      </div>
    );

  return (
    <div className={styles.groupFeed}>
      {postData.length == 0 ? (
        <>
          <PostSkeleton />
        </>
      ) : (
        <>
          {postData.map((post) => {
            return (
              <PostBox
                key={post.id}
                post={post}
                setCurrPost={setCurrPost}
                setShareModalState={setShareModalState}
                setPostList={setPostData}
                isGroup={true}
              />
            );
          })}
        </>
      )}
      {!stop && <PostSkeleton />}
      {stop && <EmptyPost />}
    </div>
  );
}
