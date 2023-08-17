import styles from "../../assets/styles/search/search.module.scss";
import { Link } from "react-router-dom";
import userProfileLoader from "../../../controller/userProfileLoader.ts";
import { User } from "../../../gql/graphql.ts";

interface UserLoneBox {
    user: User;
}

export default function UserLoneBox({ user }: UserLoneBox) {
    return (
        <div className={styles.userLoneBox}>
            <div className={styles.left}>
                <Link to={"/user/" + user.username}>
                    <img
                        src={userProfileLoader(user.profile)}
                        alt={""}
                    />
                </Link>
            </div>
            <div className={styles.center}>
                <h4>
                    {user.firstName} {user.lastName}
                </h4>
            </div>
            <div className={styles.right}>{user.friended ? <button>Unfriend</button> : <button>Add Friend</button>}</div>
        </div>
    );
}
