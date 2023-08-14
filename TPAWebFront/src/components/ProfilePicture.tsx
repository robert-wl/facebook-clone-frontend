import styles from "../assets/styles/profilePicture.module.scss";
import { User } from "../../gql/graphql.ts";
import { Link } from "react-router-dom";
import { useEffect, useRef } from "react";

interface ProfilePicture {
    user: User | null;
    showBox: boolean;
}

// { src: Maybe<string> | undefined}
export default function ProfilePicture({ user, showBox }: ProfilePicture) {
    const ref = useRef<HTMLImageElement>(null);
    const boxRef = useRef<HTMLDivElement>(null);

    const hoverEventStart = (e: MouseEvent) => {
        const boxCurrRef = boxRef.current;

        if (boxCurrRef) {
            const x = (e.clientX % 100) - 2;
            boxCurrRef.style.top = `${-x}px`;
            const y = (e.clientY % 50) + 100;
            boxCurrRef.style.left = `${-y}px`;

            console.log(x, y);
        }
    };
    const hoverEventEnd = () => {
        const boxCurrRef = boxRef.current;

        if (boxCurrRef) {
            const x = -1000;
            boxCurrRef.style.top = `${x}px`;
            const y = -1000;
            boxCurrRef.style.left = `${y}px`;
        }
    };
    useEffect(() => {
        const currRef = ref.current;
        const boxCurrRef = boxRef.current;
        if (currRef && boxCurrRef) {
            currRef.addEventListener("mouseenter", hoverEventStart);
            boxCurrRef.addEventListener("mouseleave", hoverEventEnd);

            return () => {
                currRef.removeEventListener("mouseenter", hoverEventStart);

                boxCurrRef.removeEventListener("mouseleave", hoverEventEnd);
            };
        }
    }, [ref]);

    return (
        <div className={styles.imageBox}>
            <Link to={"/user/" + user?.username}>
                <img
                    ref={ref}
                    src={user?.profile ? user.profile : "../src/assets/default-profile.jpg"}
                    alt={""}
                />
            </Link>
            {showBox && (
                <div
                    ref={boxRef}
                    className={styles.profile}
                >
                    <div className={styles.content}>
                        <img
                            src={user?.profile ? user.profile : "../src/assets/default-profile.jpg"}
                            alt={""}
                        />
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
            )}
        </div>
    );
}
