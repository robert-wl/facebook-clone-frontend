import styles from "../../assets/styles/friends/friends.module.scss";
import NoFriendBox from "./NoFriendBox.tsx";
import AccFriendBox from "./AccFriendBox.tsx";
import { User } from "../../../gql/graphql.ts";

interface AllFriendsSection {
    friends: User[];
}

export default function AllFriendsSection({ friends }: AllFriendsSection) {
    return (
        <>
            <h2>All Friends</h2>
            <div className={styles.friendList}>
                {friends.map((req, index) => {
                    return (
                        <>
                            <AccFriendBox
                                key={"friend" + index}
                                friend={req}
                            />
                        </>
                    );
                })}
                {friends.length == 0 && <NoFriendBox description={"No Friend"} />}
            </div>
        </>
    );
}
