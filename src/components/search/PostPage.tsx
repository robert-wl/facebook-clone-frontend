import { Dispatch, RefObject, SetStateAction, useState } from "react";
import { Post } from "@/gql/graphql.ts";
import { useQuery } from "@apollo/client";
import { debouncedError } from "@/utils/error-handler.ts";
import styles from "@/assets/styles/search/search.module.scss";
import PostSkeleton from "@/components/post/PostSkeleton.tsx";
import PostBox from "@/components/post/PostBox.tsx";
import { GET_FILTERED_POSTS } from "@/lib/query/search/getFilteredPosts.graphql.ts";
import useInfiniteScroll from "@/hooks/use-infinite-scroll.ts";

interface PostPage {
  setCurrPost: Dispatch<SetStateAction<Post | null>>;
  setShareModalState: Dispatch<SetStateAction<boolean>>;
  pageRef: RefObject<HTMLDivElement>;
  searchQuery: string;
  setFinished?: Dispatch<SetStateAction<boolean>>;
}

const paginationLimit = 10;

export default function PostPage({ setCurrPost, setShareModalState, pageRef, searchQuery, setFinished }: PostPage) {
  const [postData, setPostData] = useState<Post[]>([]);
  const [stop, setStop] = useState(false);
  const [currPostIndex, setCurrPostIndex] = useState(0);
  const { loading } = useQuery(GET_FILTERED_POSTS, {
    variables: {
      filter: searchQuery ? searchQuery : "",
      pagination: {
        start: currPostIndex,
        limit: paginationLimit,
      },
    },
    fetchPolicy: "cache-and-network",
    onCompleted: (data) => {
      const result = data.getFilteredPosts;

      if (result.length < 4) {
        setStop(true);
        if (setFinished) {
          setFinished(true);
        }
      }
      setPostData([...postData, ...result]);
    },
    onError: debouncedError,
  });

  const handleFetch = () => {
    setCurrPostIndex((prev) => prev + paginationLimit);
  };

  useInfiniteScroll<HTMLDivElement>({
    callback: handleFetch,
    pageRef,
  });

  if (!loading && postData.length == 0 && !setFinished)
    return (
      <div className={styles.search}>
        <h4 className={styles.noResult}>No posts found</h4>
      </div>
    );

  return (
    <div className={styles.search}>
      {postData.map((post) => {
        return (
          <PostBox
            key={post.id}
            post={post}
            setCurrPost={setCurrPost}
            setShareModalState={setShareModalState}
            setPostList={setPostData}
            isGroup={!!post.group}
          />
        );
      })}
      {loading && !stop && <PostSkeleton />}
      {!stop && <PostSkeleton />}
    </div>
  );
}
