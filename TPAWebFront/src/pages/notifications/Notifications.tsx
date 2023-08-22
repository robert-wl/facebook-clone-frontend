import styles from "../../assets/styles/notification/notification.module.scss";
import Navbar from "../../components/navbar/Navbar.tsx";
import NotificationBox from "../../components/notification/NotificationBox.tsx";

export default function Notifications() {
    return (
        <div
            className={styles.page}
            // ref={pageRef}
        >
            <Navbar />
            <div className={styles.content}>
                <NotificationBox />
            </div>
        </div>
    );
}
