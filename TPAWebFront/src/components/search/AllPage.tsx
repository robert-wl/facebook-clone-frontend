import styles from "../../assets/styles/search/search.module.scss";
import GroupSearch from "./GroupSearch.tsx";
import UserSearch from "./UserSearch.tsx";
import PostSkeleton from "../post/PostSkeleton.tsx";
import PostBox from "../post/PostBox.tsx";
import { Dispatch, RefObject, SetStateAction, useEffect, useState } from "react";
import { Post } from "../../../gql/graphql.ts";
import { useQuery } from "@apollo/client";
import { GET_FILTERED_POSTS } from "../../../lib/query/search/getFilteredPosts.graphql.ts";
import { debouncedError } from "../../../controller/errorHandler.ts";
import { debounce } from "../../../controller/debouncer.ts";

interface AllPage {
    setTab: Dispatch<SetStateAction<string>>;
    setCurrPost: Dispatch<SetStateAction<Post | null>>;
    setShareModalState: Dispatch<SetStateAction<boolean>>;
    pageRef: RefObject<HTMLDivElement>;
    searchQuery: string;
}
export default function AllPage({ setTab, setCurrPost, setShareModalState, pageRef, searchQuery }: AllPage) {
    const [postData, setPostData] = useState<Post[]>([]);
    const [stop, setStop] = useState(false);
    const [anyGroupResult, setAnyGroupResult] = useState(true);
    const [anyUserResult, setAnyUserResult] = useState(true);
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
            // console.log(data)
            if (!(scrollTop + windowHeight + 600 >= totalHeight)) {
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

    if (!loading && postData.length == 0 && !anyGroupResult && !anyUserResult)
        return (
            <div className={styles.search}>
                <h4 className={styles.noResult}>No result found</h4>
            </div>
        );

    return (
        <div className={styles.search}>
            <GroupSearch
                filter={searchQuery ? searchQuery : ""}
                setTab={setTab}
                setAnyGroupResult={setAnyGroupResult}
            />
            <UserSearch
                filter={searchQuery ? searchQuery : ""}
                setTab={setTab}
                setAnyUserResult={setAnyUserResult}
            />
            {postData.map((post) => {
                return (
                    <PostBox
                        key={post.id}
                        post={post}
                        setCurrPost={setCurrPost}
                        setShareModalState={setShareModalState}
                        setPostList={setPostData}
                    />
                );
            })}
            {loading && !stop && <PostSkeleton />}
            {!stop && <PostSkeleton />}
        </div>
    );
}
