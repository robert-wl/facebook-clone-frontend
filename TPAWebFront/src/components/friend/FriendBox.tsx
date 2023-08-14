import styles from "../../assets/styles/friends/friendBox.module.scss";
import { Link } from "react-router-dom";
import { Friend } from "../../../gql/graphql.ts";

interface FriendBox {
    friend: Friend;
    handleAccept: (friend: Friend) => void;
    handleDeny: (friend: Friend) => void;
}

export default function FriendBox({ friend, handleAccept, handleDeny }: FriendBox) {
    return (
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
                <button onClick={() => handleAccept(friend)}>Accept</button>
                <button onClick={() => handleDeny(friend)}>Decline</button>
            </div>
        </div>
    );
}
