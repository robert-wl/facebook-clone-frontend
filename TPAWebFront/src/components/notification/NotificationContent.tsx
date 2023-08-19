import styles from "../../assets/styles/notification/notification.module.scss";
import userProfileLoader from "../../../controller/userProfileLoader.ts";
import { Notification } from "../../../gql/graphql.ts";
import getTimeDiff from "../../../controller/timeConverter.ts";
import { Link } from "react-router-dom";

interface NotificationContent {
    notification: Notification;
}

export default function NotificationContent({ notification }: NotificationContent) {
    let link = "";

    console.log(notification);
    if (notification.postId) {
        link = `/search/${encodeURIComponent("&" + notification.postId)}`;
    }

    return (
        <div className={styles.notificationContent}>
            <div className={styles.left}>
                <Link to={"/user/" + notification.sender.username}>
                    <img src={userProfileLoader(notification.sender.profile)} />
                </Link>
            </div>
            <Link
                className={styles.content}
                to={link}
            >
                <div className={styles.content}>
                    <p>{notification.message}</p>
                    <span>{getTimeDiff(notification.createdAt)}</span>
                </div>
            </Link>
        </div>
    );
}
