import styles from "../../assets/styles/friends/friends.module.scss";
import NoFriendBox from "./NoFriendBox.tsx";
import { useQuery } from "@apollo/client";
import { GET_PEOPLE_MIGHT_KNOW } from "../../../lib/query/friend/getPeopleMightKnow.graphql.ts";
import { debouncedError } from "../../controller/errorHandler.ts";
import { useState } from "react";
import { User } from "../../../gql/graphql.ts";
import RecommendFriendBox from "./RecommendFriendBox.tsx";

export default function PeopleMightKnowSection() {
    const [people, setPeople] = useState<User[]>([]);
    useQuery(GET_PEOPLE_MIGHT_KNOW, {
        fetchPolicy: "cache-and-network",
        onError: debouncedError,
        onCompleted: (data) => {
            setPeople(data.getPeopleMightKnow);
        },
    });
    return (
        <>
            <h2>People you might know</h2>
            <div className={styles.friendList}>
                {people.map((req, index) => {
                    return (
                        <RecommendFriendBox
                            key={index}
                            friend={req}
                            setFriends={setPeople}
                        />
                    );
                })}
                {people.length == 0 && <NoFriendBox description={"No Recommendations"} />}
            </div>
        </>
    );
}
