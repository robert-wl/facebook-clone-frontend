import { Dispatch, RefObject, SetStateAction, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Group } from "../../../gql/graphql.ts";
import { useQuery } from "@apollo/client";
import { debouncedError } from "../../controller/errorHandler.ts";
import { debounce } from "../../controller/debouncer.ts";
import GroupSearchSkeleton from "./GroupSearchSkeleton.tsx";
import styles from "../../assets/styles/search/search.module.scss";
import GroupLoneBox from "./GroupLoneBox.tsx";
import { GET_FILTERED_GROUPS } from "../../../lib/query/search/getFilteredGroups.graphql.ts";

interface GroupPage {
    pageRef: RefObject<HTMLDivElement>;
    setFinished?: Dispatch<SetStateAction<boolean>>;
    finished?: boolean;
}
export default function GroupPage({ pageRef, setFinished, finished }: GroupPage) {
    const { searchQuery } = useParams();
    const [groupData, setGroupData] = useState<Group[]>([]);
    let start = 10;
    const { loading, refetch: getGroups } = useQuery(GET_FILTERED_GROUPS, {
        variables: {
            filter: searchQuery ? searchQuery : "",
            pagination: {
                start: 0,
                limit: 10,
            },
        },
        fetchPolicy: "cache-and-network",
        onError: debouncedError,
        onCompleted: (data) => {
            const result = data.getFilteredGroups;

            if (result < 10) {
                if (setFinished) setFinished(true);
            }
            setGroupData([...groupData, ...result]);
        },
    });

    const handleFetch = () => {
        if (finished) return;
        getGroups({
            filter: searchQuery ? searchQuery : "",
            pagination: {
                start: start,
                limit: 10,
            },
        })
            .then(() => {
                start += 10;
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
                scrollElement!.removeEventListener("scroll", handleScroll);
            };
        }
    }, []);

    useEffect(() => {
        scrollElement = pageRef.current!;
        if (scrollElement && finished) {
            scrollElement!.removeEventListener("scroll", handleScroll);
        }
    }, [finished]);

    if (loading)
        return (
            <>
                <GroupSearchSkeleton key={1} />
                <GroupSearchSkeleton key={2} />
            </>
        );

    if (!loading && groupData.length == 0 && !setFinished)
        return (
            <div className={styles.search}>
                <h4 className={styles.noResult}>No groups found</h4>
            </div>
        );
    return (
        <div className={styles.search}>
            {groupData.map((group, index) => {
                return (
                    <GroupLoneBox
                        group={group}
                        setGroupData={setGroupData}
                        key={index}
                    />
                );
            })}
        </div>
    );
}
