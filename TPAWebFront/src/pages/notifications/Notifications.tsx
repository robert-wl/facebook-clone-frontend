import styles from "../../assets/styles/notification/notification.module.scss";
import Navbar from "../../components/navbar/Navbar.tsx";
import NotificationBox from "../../components/notification/NotificationBox.tsx";
import { useContext } from "react";
import { AuthContext } from "../../components/context/AuthContextProvider.tsx";

export default function Notifications() {
    const { auth } = useContext(AuthContext);
    return (
        <div
            className={styles.page}
            // ref={pageRef}
        >
            <Navbar />
            <div className={styles.content}>
                <NotificationBox key={auth?.username} />
            </div>
        </div>
    );
}
