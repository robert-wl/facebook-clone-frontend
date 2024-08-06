import styles from "@/assets/styles/home/home.module.scss";
import Navbar from "@/components/navbar/Navbar.tsx";
import ProfilePicture from "@/components/ProfilePicture.tsx";
import NewPostModal from "@/components/post/NewPostModal.tsx";
import { useState } from "react";
import PostBox from "@/components/post/PostBox.tsx";
import { GET_POSTS } from "@/lib/query/post/getPosts.graphql.ts";
import { useQuery } from "@apollo/client";
import { Post, User } from "@/gql/graphql.ts";
import { debouncedError } from "@/utils/error-handler.ts";
import Loading from "@/components/Loading.tsx";
import PostSkeleton from "@/components/post/PostSkeleton.tsx";
import ShareModal from "@/components/ShareModal.tsx";
import HomeTop from "@/components/home/HomeTop.tsx";
import TagFriendModal from "@/components/post/TagFriendModal.tsx";
import VisibilityModal from "@/components/post/VisibilityModal.tsx";
import useAuth from "@/hooks/use-auth.ts";
import useInfiniteScroll from "@/hooks/use-infinite-scroll.ts";
import { Nullable } from "@/types/utils";
import EmptyPost from "@/components/post/EmptyPost.tsx";

const paginationLimit = 5;

export default function Home() {
  const [modalState, setModalState] = useState(false);
  const [shareModalState, setShareModalState] = useState(false);
  const [tagModalState, setTagModalState] = useState(false);
  const [visibilityModalState, setVisibilityModalState] = useState(false);
  const [data, setData] = useState<Post[]>([]);
  const [hideSkeleton, setHideSkeleton] = useState(false);
  const [currPost, setCurrPost] = useState<Nullable<Post>>(null);
  const [tagList, setTagList] = useState<User[]>([]);
  const [visibilityList, setVisibilityList] = useState<User[]>([]);
  const [currPostIndex, setCurrPostIndex] = useState(0);
  useQuery(GET_POSTS, {
    variables: {
      pagination: {
        start: currPostIndex,
        limit: paginationLimit,
      },
    },
    fetchPolicy: "cache-and-network",
    onCompleted: (dat) => {
      const result = dat.getPosts;

      if (result.length == 0) setHideSkeleton(true);
      setData((data) => [...data, ...result]);
    },
    onError: debouncedError,
  });
  const [loading, setLoading] = useState(false);
  const { auth } = useAuth();

  const handleFetch = async () => {
    setCurrPostIndex((prev) => prev + paginationLimit);
  };

  const { ref } = useInfiniteScroll<HTMLDivElement>({
    callback: handleFetch,
  });

  return (
    <>
      {loading && <Loading />}
      <NewPostModal
        modalState={modalState}
        setModalState={setModalState}
        setData={setData}
        data={data}
        setLoading={setLoading}
        setTagModalState={setTagModalState}
        setTagList={setTagList}
        tagList={tagList}
        setVisibilityModalState={setVisibilityModalState}
        setVisibilityList={setVisibilityList}
        visibilityList={visibilityList}
      />
      {shareModalState && (
        <ShareModal
          setShareModalState={setShareModalState}
          currPost={currPost}
        />
      )}
      {tagModalState && (
        <TagFriendModal
          setTagModalState={setTagModalState}
          tagList={tagList}
          setTagList={setTagList}
        />
      )}
      {visibilityModalState && (
        <VisibilityModal
          setVisibilityModalState={setVisibilityModalState}
          visibilityList={visibilityList}
          setVisibilityList={setVisibilityList}
        />
      )}
      <div
        className={styles.page}
        ref={ref}>
        <Navbar />
        <div className={styles.content}>
          <HomeTop />
          <div className={styles.inputBox}>
            <div className={styles.inputHeader}>
              <ProfilePicture
                user={auth}
                showBox={false}
                zIndex={5}
              />
              <button onClick={() => setModalState(true)}>What's on your mind?</button>
            </div>
          </div>
          <div>
            {data.map((post, index) => (
              <PostBox
                key={index}
                post={post}
                setCurrPost={setCurrPost}
                setPostList={setData}
                setShareModalState={setShareModalState}
                isGroup={!!post.group}
              />
            ))}
            {!hideSkeleton && (
              <>
                <PostSkeleton />
              </>
            )}
            {!hideSkeleton && <EmptyPost />}
          </div>
        </div>
      </div>
    </>
  );
}
