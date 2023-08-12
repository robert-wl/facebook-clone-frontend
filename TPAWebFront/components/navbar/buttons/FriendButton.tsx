import styles from "../../../src/assets/styles/navbar/navbarButtons.module.scss";
import { Link, useLocation } from "react-router-dom";
import { BsFillPersonFill, BsPerson } from "react-icons/bs";

export default function FriendButton() {
    const location = useLocation();

    return (
        <Link to={"/friends"}>
            <div className={location.pathname === "/friends" ? styles.buttonActive : styles.button}>
                {location.pathname === "/friends" ? (
                    <BsFillPersonFill
                        color={"#1877f2"}
                        size={"1.5rem"}
                    />
                ) : (
                    <BsPerson
                        color={"black"}
                        size={"1.5rem"}
                    />
                )}
            </div>
        </Link>
    );
}
