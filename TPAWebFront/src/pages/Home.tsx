import styles from "../assets/styles/home/home.module.scss";
import Navbar from "../../components/navbar/Navbar.tsx";
import ProfilePicture from "../../components/ProfilePicture.tsx";
import NewPostModal from "../../components/post/NewPostModal.tsx";
import { useContext, useEffect, useState } from "react";
import PostBox from "../../components/post/PostBox.tsx";
import { GET_POSTS } from "../../lib/query/post/getPosts.graphql.ts";
import { useQuery } from "@apollo/client";
import { Post } from "../../gql/graphql.ts";
import { debouncedError } from "../../controller/errorHandler.ts";
import Loading from "../../components/Loading.tsx";
import { AuthContext } from "../../components/context/AuthContextProvider.tsx";
import { debounce } from "../../controller/debouncer.ts";
import PostSkeleton from "../../components/post/PostSkeleton.tsx";
import HomeTop from "../../components/home/HomeTop.tsx";
import ShareModal from "../../components/ShareModal.tsx";

export default function Home() {
    const [modalState, setModalState] = useState(false);
    const [shareModalState, setShareModalState] = useState(false);
    const [data, setData] = useState<Post[]>([]);
    const [hideSkeleton, setHideSkeleton] = useState(false);
    const [currPost, setCurrPost] = useState<Post | null>(null);
    let start = 3;
    const { refetch: getPosts } = useQuery(GET_POSTS, {
        variables: {
            pagination: {
                start: 0,
                limit: 3,
            },
        },
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
                console.log(start);
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
        scrollElement = document.getElementById("page");

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
            />
            <ShareModal
                shareModalState={shareModalState}
                setShareModalState={setShareModalState}
                currPost={currPost}
            />
            <div
                id={"page"}
                className={styles.page}
            >
                <Navbar />
                <div className={styles.content}>
                    <HomeTop />
                    <div className={styles.inputBox}>
                        <div className={styles.inputHeader}>
                            <ProfilePicture
                                user={auth}
                                showBox={false}
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
                                setShareModalState={setShareModalState}
                            />
                        ))}
                        {!hideSkeleton && <PostSkeleton />}
                    </div>
                </div>
            </div>
        </>
    );
}
