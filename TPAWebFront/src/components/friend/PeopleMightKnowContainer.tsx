import styles from "../../assets/styles/user/user.module.scss";
import { useQuery } from "@apollo/client";
import { GET_PEOPLE_MIGHT_KNOW } from "../../../lib/query/friend/getPeopleMightKnow.graphql.ts";
import { debouncedError } from "../../../controller/errorHandler.ts";
import { User } from "../../../gql/graphql.ts";
import { useState } from "react";
import RecommendFriendBox from "./RecommendFriendBox.tsx";

export default function PeopleMightKnowContainer() {
    const [people, setPeople] = useState<User[]>([]);

    useQuery(GET_PEOPLE_MIGHT_KNOW, {
        onError: debouncedError,
        fetchPolicy: "no-cache",
        onCompleted: (data) => {
            const ppl = data.getPeopleMightKnow as User[];
            setPeople(ppl);
        },
    });
    return (
        <div className={styles.peopleMightKnow}>
            <h3>People you may know</h3>
            <div className={styles.content}>
                {people.map((person) => {
                    return (
                        <>
                            <RecommendFriendBox
                                key={person.id}
                                friend={person}
                                setFriends={setPeople}
                            />
                        </>
                    );
                })}
            </div>
        </div>
    );
}
