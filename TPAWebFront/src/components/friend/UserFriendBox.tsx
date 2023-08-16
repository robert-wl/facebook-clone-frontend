import styles from "../../assets/styles/friends/userFriendBox.module.scss";
import { Link } from "react-router-dom";
import { User } from "../../../gql/graphql.ts";

interface UserFriendBox {
    friend: User;
    username: string;
}
export default function UserFriendBox({ username, friend }: UserFriendBox) {
    return (
        <>
            {username == friend.username.toString() ? (
                <div className={styles.container}>
                    <header>
                        <Link to={"/user/" + friend.username}>
                            <img
                                src={friend.profile ? friend.profile : "../src/assets/default-profile.jpg"}
                                alt={""}
                            />
                        </Link>
                    </header>
                    <div className={styles.content}>
                        <h4>
                            {friend.firstName} {friend.lastName}
                        </h4>
                        <p>{friend.username}</p>
                    </div>
                </div>
            ) : (
                <div className={styles.container}>
                    <header>
                        <Link to={"/user/" + friend.username}>
                            <img
                                src={friend.profile ? friend.profile : "../src/assets/default-profile.jpg"}
                                alt={""}
                            />
                        </Link>
                    </header>
                    <div className={styles.content}>
                        <h4>
                            {friend.firstName} {friend.lastName}
                        </h4>
                        <p>{friend.username}</p>
                    </div>
                </div>
            )}
        </>
    );
}
