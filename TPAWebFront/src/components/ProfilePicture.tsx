import styles from "../assets/styles/profilePicture.module.scss";
import { User } from "../../gql/graphql.ts";
import { Link } from "react-router-dom";
import { useRef } from "react";
import userProfileLoader from "../../controller/userProfileLoader.ts";

interface ProfilePicture {
    user: User | null;
    showBox: boolean;
}

// { src: Maybe<string> | undefined}
export default function ProfilePicture({ user, showBox }: ProfilePicture) {
    const ref = useRef<HTMLImageElement>(null);
    const boxRef = useRef<HTMLDivElement>(null);

    return (
        <div className={styles.imageBox}>
            {showBox}
            <Link to={"/user/" + user?.username}>
                <img
                    ref={ref}
                    src={userProfileLoader(user?.profile)}
                    alt={""}
                />
            </Link>
            <div
                ref={boxRef}
                className={styles.profile}
            >
                <div className={styles.content}>
                    <Link to={"/user/" + user?.username}>
                        <img
                            src={userProfileLoader(user?.profile)}
                            alt={""}
                        />
                    </Link>
                    <div className={styles.bio}>
                        <h4>
                            {user?.firstName} {user?.lastName}
                        </h4>
                        <p>{user?.username}</p>
                        <p>{user?.gender}</p>
                        <p>{user?.email}</p>
                        <p>{new Date(user?.dob).toLocaleDateString()}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
