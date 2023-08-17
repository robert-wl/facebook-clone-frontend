import styles from "../../assets/styles/search/search.module.scss";
import GroupSearchSkeleton from "./GroupSearchSkeleton.tsx";
import { useQuery } from "@apollo/client";
import { GET_FILTERED_USERS } from "../../../lib/query/search/getFilteredUsers.graphql.ts";
import { debouncedError } from "../../../controller/errorHandler.ts";
import { User } from "../../../gql/graphql.ts";
import { Dispatch, SetStateAction, useState } from "react";
import UserBox from "./UserBox.tsx";

interface UserSearch {
    filter: string;
    setTab: Dispatch<SetStateAction<string>>;
    setAnyUserResult: Dispatch<SetStateAction<boolean>>;
}
export default function UserSearch({ filter, setTab, setAnyUserResult }: UserSearch) {
    const [userData, setUserData] = useState<User[]>([]);
    const { loading } = useQuery(GET_FILTERED_USERS, {
        variables: {
            filter: filter,
            pagination: {
                start: 0,
                limit: 4,
            },
        },
        onError: debouncedError,
        onCompleted: (data) => {
            setUserData(data.getFilteredUsers);
        },
    });
    if (loading)
        return (
            <>
                <GroupSearchSkeleton />
                <GroupSearchSkeleton />
            </>
        );

    if (!loading && userData.length == 0) {
        setAnyUserResult(false);
        return <></>;
    }

    return (
        <div className={styles.userSearch}>
            <header>
                <h3>User</h3>
            </header>
            <article>
                {userData.map((user, index) => {
                    if (index == 3) return;
                    return (
                        <UserBox
                            user={user}
                            key={user.id}
                        />
                    );
                })}
            </article>
            {userData.length > 3 && (
                <footer>
                    <button onClick={() => setTab("people")}>See More</button>
                </footer>
            )}
        </div>
    );
}
