import styles from "../../assets/styles/home/home.module.scss";
import Navbar from "../../components/navbar/Navbar.tsx";
import ProfilePicture from "../../components/ProfilePicture.tsx";
import NewPostModal from "../../components/post/NewPostModal.tsx";
import { useContext, useEffect, useRef, useState } from "react";
import PostBox from "../../components/post/PostBox.tsx";
import { GET_POSTS } from "../../../lib/query/post/getPosts.graphql.ts";
import { useQuery } from "@apollo/client";
import { Post, User } from "../../../gql/graphql.ts";
import { debouncedError } from "../../controller/errorHandler.ts";
import Loading from "../../components/Loading.tsx";
import { debounce } from "../../controller/debouncer.ts";
import PostSkeleton from "../../components/post/PostSkeleton.tsx";
import ShareModal from "../../components/ShareModal.tsx";
import { AuthContext } from "../../components/context/AuthContextProvider.tsx";
import HomeTop from "../../components/home/HomeTop.tsx";
import TagFriendModal from "../../components/post/TagFriendModal.tsx";
import VisibilityModal from "../../components/post/VisibilityModal.tsx";

export default function Home() {
    const [modalState, setModalState] = useState(false);
    const [shareModalState, setShareModalState] = useState(false);
    const [tagModalState, setTagModalState] = useState(false);
    const [visibilityModalState, setVisibilityModalState] = useState(false);
    const [data, setData] = useState<Post[]>([]);
    const [hideSkeleton, setHideSkeleton] = useState(false);
    const [currPost, setCurrPost] = useState<Post | null>(null);
    const [tagList, setTagList] = useState<User[]>([]);
    const [visibilityList, setVisibilityList] = useState<User[]>([]);
    const pageRef = useRef<HTMLDivElement>(null);
    let start = 3;
    const { refetch: getPosts } = useQuery(GET_POSTS, {
        variables: {
            pagination: {
                start: 0,
                limit: 3,
            },
        },
        fetchPolicy: "cache-and-network",
        onCompleted: (dat) => {
            const result = dat.getPosts;

            if (result.length == 0) setHideSkeleton(true);
            setData([...data, ...result]);
        },
        onError: debouncedError,
        skip: start > 3,
    });
    const [loading, setLoading] = useState(false);
    const { auth } = useContext(AuthContext);

    const handleFetch = () => {
        getPosts({
            pagination: {
                start: start,
                limit: 3,
            },
        })
            .then(() => {
                start += 3;
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

            // console.log(data)
            if (!(scrollTop + windowHeight + 700 >= totalHeight)) {
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
                ref={pageRef}
            >
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
                        {data.map((post: Post, index) => (
                            <PostBox
                                key={index}
                                post={post}
                                setCurrPost={setCurrPost}
                                setPostList={setData}
                                setShareModalState={setShareModalState}
                                isGroup={!!post.group}
                            />
                        ))}
                        {!hideSkeleton && <PostSkeleton />}
                    </div>
                </div>
            </div>
        </>
    );
}
