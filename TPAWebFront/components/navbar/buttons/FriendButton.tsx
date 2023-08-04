import styles from "../../../src/assets/styles/navbar/navbarButtons.module.scss"
import {Link, useLocation} from "react-router-dom";


export default function FriendButton(){
    const location = useLocation();

    return (
        <Link to={"/friends"}>
            <div className={location.pathname === "/friends" ? styles.buttonActive : styles.button}>
                <svg xmlns="http://www.w3.org/2000/svg" width="2rem" height="2rem" fill={location.pathname === "/friends" ? "blue" : "black"}
                     className="bi bi-person-fill" viewBox="0 0 16 16">
                    <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3Zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"/>
                </svg>
            </div>
        </Link>
    );
}


