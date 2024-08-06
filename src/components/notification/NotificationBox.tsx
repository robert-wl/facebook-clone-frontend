import styles from "@/assets/styles/notification/notification.module.scss";
import { useEffect, useState } from "react";
import NotificationContent from "./NotificationContent.tsx";
import { useMutation, useQuery } from "@apollo/client";
import { GET_NOTIFICATIONS } from "@/lib/query/notification/getNotifications.graphql.ts";
import { debouncedError } from "@/utils/error-handler.ts";
import { Notification } from "@/gql/graphql.ts";
import { GET_UNREAD_NOTIFICATIONS } from "@/lib/query/notification/getUnreadNotifications.graphql.ts";

export default function NotificationBox() {
  const [tab, setTab] = useState<"all" | "unread">("all");
  const [allNotifications, setAllNotifications] = useState<Notification[]>([]);
  const [unreadNotifications, setUnreadNotifications] = useState<Notification[]>([]);

  const { refetch } = useQuery(GET_NOTIFICATIONS, {
    onCompleted: (data) => {
      const notifList = data.getNotifications;

      setAllNotifications(notifList);
    },
    onError: debouncedError,
    fetchPolicy: "cache-and-network",
  });
  const [getUnreadNotifications] = useMutation(GET_UNREAD_NOTIFICATIONS);

  useEffect(() => {
    refetch();
    getUnreadNotifications()
      .then((data) => {
        const unreadList = data.data.getUnreadNotifications;

        setUnreadNotifications(unreadList);
      })
      .catch(debouncedError);
  }, []);

  return (
    <div className={styles.notificationBox}>
      <header>
        <h2>Notification</h2>
        <nav>
          <button
            onClick={() => setTab("all")}
            className={tab == "all" ? styles.active : ""}>
            All
          </button>
          <button
            onClick={() => setTab("unread")}
            className={tab == "unread" ? styles.active : ""}>
            Unread
          </button>
        </nav>
      </header>
      <hr />
      <article>
        {tab == "all" && (
          <>
            {allNotifications.map((notification) => {
              return (
                <NotificationContent
                  key={"all" + notification.id}
                  notification={notification}
                />
              );
            })}
          </>
        )}
        {tab == "all" && allNotifications.length == 0 && <p className={styles.empty}>No notification</p>}
        {tab == "unread" && (
          <>
            {unreadNotifications.map((notification) => {
              return (
                <NotificationContent
                  key={"unread" + notification.id}
                  notification={notification}
                />
              );
            })}
          </>
        )}
        {tab == "unread" && unreadNotifications.length == 0 && <p className={styles.empty}>No notification</p>}
      </article>
    </div>
  );
}
