import styles from "@/assets/styles/friends/friendBox.module.scss";
import { Link } from "react-router-dom";
import { User } from "@/gql/graphql.ts";
import SafeImage from "@/components/SafeImage.tsx";

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
          <SafeImage
            src={friend.profile}
            type={"user-profile"}
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
