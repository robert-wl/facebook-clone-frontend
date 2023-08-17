import styles from "../../assets/styles/search/search.module.scss";
import { RefObject, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { User } from "../../../gql/graphql.ts";
import { useQuery } from "@apollo/client";
import { GET_FILTERED_USERS } from "../../../lib/query/search/getFilteredUsers.graphql.ts";
import { debouncedError } from "../../../controller/errorHandler.ts";
import GroupSearchSkeleton from "./GroupSearchSkeleton.tsx";
import UserLoneBox from "./UserLoneBox.tsx";
import { debounce } from "../../../controller/debouncer.ts";

interface UserPage {
    pageRef: RefObject<HTMLDivElement>;
}
export default function UserPage({ pageRef }: UserPage) {
    const { searchQuery } = useParams();
    const [userData, setUserData] = useState<User[]>([]);
    let start = 0;
    const { loading, refetch: getUsers } = useQuery(GET_FILTERED_USERS, {
        variables: {
            filter: searchQuery ? searchQuery : "",
            pagination: {
                start: 0,
                limit: 10,
            },
        },
        onError: debouncedError,
        onCompleted: (data) => {
            const result = data.getFilteredUsers;

            setUserData([...userData, ...result]);
        },
    });

    const handleFetch = () => {
        getUsers({
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
                scrollElement!.addEventListener("scroll", handleScroll);
            };
        }
    }, []);

    if (loading)
        return (
            <>
                <GroupSearchSkeleton key={1} />
                <GroupSearchSkeleton key={2} />
            </>
        );

    if (!loading && userData.length == 0)
        return (
            <div className={styles.search}>
                <h4 className={styles.noResult}>No users found</h4>
            </div>
        );
    return (
        <div className={styles.search}>
            {userData.map((user, index) => {
                return (
                    <UserLoneBox
                        user={user}
                        key={index}
                    />
                );
            })}
        </div>
    );
}
