import styles from "../../assets/styles/friends/friendBox.module.scss";
import { Link } from "react-router-dom";
import { User } from "../../../gql/graphql.ts";

interface FriendBox {
    friend: User;
    handleAccept: (friend: User) => void;
    handleDeny: (friend: User) => void;
}

export default function FriendBox({ friend, handleAccept, handleDeny }: FriendBox) {
    return (
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
                <button onClick={() => handleAccept(friend)}>Accept</button>
                <button onClick={() => handleDeny(friend)}>Decline</button>
            </div>
        </div>
    );
}
