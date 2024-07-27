import styles from "../../assets/styles/notification/notification.module.scss";
import userProfileLoader from "../../../controller/userProfileLoader.ts";
import { Notification } from "../../../gql/graphql.ts";
import getTimeDiff from "../../../controller/timeConverter.ts";
import { Link } from "react-router-dom";

interface NotificationContent {
    notification: Notification;
}

function getNotificationLink(notification: Notification) {
    if (notification.postId) {
        return `/search/${encodeURIComponent("&" + notification.postId)}`;
    } else if (notification.groupId) {
        return `/group/${notification.groupId}`;
    } else if (notification.reelId) {
        return `/reels/${notification.reelId}`;
    } else if (notification.storyId) {
        return `/stories/${notification.sender.username}`;
    } else if (notification.message.includes("friend request")) {
        return `/friends`;
    }

    return "";
}

export default function NotificationContent({ notification }: NotificationContent) {
    return (
        <div className={styles.notificationContent}>
            <div className={styles.left}>
                <Link to={"/user/" + notification.sender.username}>
                    <img src={userProfileLoader(notification.sender.profile)} />
                </Link>
            </div>
            <Link
                className={styles.content}
                to={getNotificationLink(notification)}
            >
                <div className={styles.content}>
                    <p>{notification.message}</p>
                    <span>{getTimeDiff(notification.createdAt)}</span>
                </div>
            </Link>
        </div>
    );
}
