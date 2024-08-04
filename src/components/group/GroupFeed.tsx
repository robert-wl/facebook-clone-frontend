import styles from "@/assets/styles/group/group.module.scss";
import PostSkeleton from "@/components/post/PostSkeleton.tsx";
import PostBox from "@/components/post/PostBox.tsx";
import { useQuery } from "@apollo/client";
import { GET_GROUP_HOME_POSTS } from "@/lib/query/group/getGroupHomePosts.graphql.ts";
import { debouncedError } from "@/controller/errorHandler.ts";
import { Post } from "@/gql/graphql.ts";
import { Dispatch, RefObject, SetStateAction, useEffect, useState } from "react";
import { debounce } from "@/utils/debouncer.ts";

interface GroupFeed {
  setShareModalState: Dispatch<SetStateAction<boolean>>;
  setCurrPost: Dispatch<SetStateAction<Post | null>>;
  pageRef: RefObject<HTMLDivElement>;
}

export default function GroupFeed({ setShareModalState, setCurrPost, pageRef }: GroupFeed) {
  const [postData, setPostData] = useState<Post[]>([]);
  const [stop, setStop] = useState(false);
  let start = 0;
  const { loading, refetch: getGroupHomePosts } = useQuery(GET_GROUP_HOME_POSTS, {
    variables: {
      pagination: {
        start: 0,
        limit: 4,
      },
    },
    onCompleted: (data) => {
      const result = data.getGroupHomePosts;

      if (result.length == 0) setStop(true);
      setPostData([...postData, ...result]);
    },
    onError: debouncedError,
  });

  const handleFetch = () => {
    getGroupHomePosts({
      pagination: {
        start: start,
        limit: 4,
      },
    })
      .then(() => {
        start += 4;
      })
      .catch(debouncedError);
  };

  const debouncedHandleScroll = debounce(handleFetch, 50);
  let scrollElement: HTMLElement | null;
  const handleScroll = () => {
    if (scrollElement) {
      const scrollTop = scrollElement.scrollTop;
      const windowHeight = window.innerHeight || document.documentElement.clientHeight;
      const totalHeight = scrollElement.scrollHeight;

      if (!(scrollTop + windowHeight + 200 >= totalHeight)) {
        return;
      }
      debouncedHandleScroll();
    }
  };

  useEffect(() => {
    scrollElement = pageRef.current!;
    if (scrollElement) {
      scrollElement.addEventListener("scroll", handleScroll);
      return () => {
        scrollElement!.addEventListener("scroll", handleScroll);
      };
    }
  }, []);

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
    </div>
  );
}
