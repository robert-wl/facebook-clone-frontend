import styles from "@/assets/styles/notification/notification.module.scss";
import { Notification } from "@/gql/graphql.ts";
import getTimeDiff from "@/utils/time-utils.ts";
import { Link } from "react-router-dom";
import SafeImage from "@/components/SafeImage.tsx";

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
          <SafeImage
            src={notification.sender.profile}
            type={"user-profile"}
            alt={"profile picture"}
          />
        </Link>
      </div>
      <Link
        className={styles.content}
        to={getNotificationLink(notification)}>
        <div className={styles.content}>
          <p>{notification.message}</p>
          <span>{getTimeDiff(notification.createdAt)}</span>
        </div>
      </Link>
    </div>
  );
}
