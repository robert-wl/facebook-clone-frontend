import { useParams } from "react-router-dom";
import { Dispatch, RefObject, SetStateAction, useEffect, useState } from "react";
import { Post } from "../../../gql/graphql.ts";
import { useQuery } from "@apollo/client";
import { debouncedError } from "../../../controller/errorHandler.ts";
import { debounce } from "../../../controller/debouncer.ts";
import styles from "../../assets/styles/search/search.module.scss";
import PostSkeleton from "../post/PostSkeleton.tsx";
import PostBox from "../post/PostBox.tsx";
import { GET_FILTERED_POSTS } from "../../../lib/query/search/getFilteredPosts.graphql.ts";

interface PostPage {
    setCurrPost: Dispatch<SetStateAction<Post | null>>;
    setShareModalState: Dispatch<SetStateAction<boolean>>;
    pageRef: RefObject<HTMLDivElement>;
}

export default function PostPage({ setCurrPost, setShareModalState, pageRef }: PostPage) {
    const { searchQuery } = useParams();
    const [postData, setPostData] = useState<Post[]>([]);
    const [stop, setStop] = useState(false);
    let start = 0;
    const { loading, refetch: getPosts } = useQuery(GET_FILTERED_POSTS, {
        variables: {
            filter: searchQuery ? searchQuery : "",
            pagination: {
                start: 0,
                limit: 4,
            },
        },
        onCompleted: (data) => {
            const result = data.getFilteredPosts;

            if (result.length < 4) setStop(true);
            setPostData([...postData, ...result]);
        },
        onError: debouncedError,
    });

    const handleFetch = () => {
        getPosts({
            filter: searchQuery ? searchQuery : "",
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
        <div className={styles.search}>
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
                            />
                        );
                    })}
                </>
            )}
            {loading && !stop && <PostSkeleton />}
            {!stop && <PostSkeleton />}
        </div>
    );
}
