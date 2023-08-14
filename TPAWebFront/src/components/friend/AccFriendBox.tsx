import styles from "../../assets/styles/friends/accFriendBox.module.scss";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContextProvider.tsx";
import { Friend } from "../../../gql/graphql.ts";

interface AccFriendBox {
    friend: Friend;
}

export default function AccFriendBox({ friend }: AccFriendBox) {
    const { auth } = useContext(AuthContext);

    return (
        <>
            {auth?.id.toString() == friend.sender.id.toString() ? (
                <div className={styles.container}>
                    <header>
                        <Link to={"/user/" + friend.receiver.username}>
                            <img
                                src={friend.receiver.profile ? friend.receiver.profile : "../src/assets/default-profile.jpg"}
                                alt={""}
                            />
                        </Link>
                    </header>
                    <div className={styles.content}>
                        <h4>
                            {friend.receiver.firstName} {friend.receiver.lastName}
                        </h4>
                        <p>{friend.receiver.username}</p>
                    </div>
                </div>
            ) : (
                <div className={styles.container}>
                    <header>
                        <Link to={"/user/" + friend.sender.username}>
                            <img
                                src={friend.sender.profile ? friend.sender.profile : "../src/assets/default-profile.jpg"}
                                alt={""}
                            />
                        </Link>
                    </header>
                    <div className={styles.content}>
                        <h4>
                            {friend.sender.firstName} {friend.sender.lastName}
                        </h4>
                        <p>{friend.sender.username}</p>
                    </div>
                </div>
            )}
        </>
    );
}
