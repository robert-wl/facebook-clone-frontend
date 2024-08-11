import styles from "@/assets/styles/home/home-side.module.scss";
import useAuth from "@/hooks/use-auth.ts";

interface ISidebarContent {
  title: string;
  image: string;
  url: string;
  width?: number;
  height?: number;
}

const sidebarContent: ISidebarContent[] = [
  {
    image: `${import.meta.env.VITE_ROOT_URL}/icons/friend-icon.png`,
    title: "Friends",
    url: `${import.meta.env.VITE_ROOT_URL}/friends`,
  },
  {
    image: `${import.meta.env.VITE_ROOT_URL}/icons/groups-icon.png`,
    title: "Groups",
    url: `${import.meta.env.VITE_ROOT_URL}/group`,
  },
  {
    image: `${import.meta.env.VITE_ROOT_URL}/icons/story-icon.png`,
    title: "Stories",
    url: `${import.meta.env.VITE_ROOT_URL}/stories`,
    width: 30,
    height: 30,
  },
  {
    image: `${import.meta.env.VITE_ROOT_URL}/icons/reel-icon.png`,
    title: "Reels",
    url: `${import.meta.env.VITE_ROOT_URL}/reels`,
  },
  {
    image: `${import.meta.env.VITE_ROOT_URL}/icons/notification-icon.png`,
    title: "Notification",
    url: `${import.meta.env.VITE_ROOT_URL}/notification`,
    width: 28,
    height: 28,
  },
  {
    image: `${import.meta.env.VITE_ROOT_URL}/icons/messenger-icon.png`,
    title: "Messenger",
    url: `${import.meta.env.VITE_ROOT_URL}/messages`,
    width: 28,
    height: 28,
  },
];

export default function HomeSide() {
  const { auth } = useAuth();

  const completeContent: ISidebarContent[] = [
    {
      image: auth!.profile!,
      title: auth!.username!,
      url: `${import.meta.env.VITE_ROOT_URL}/user/${auth!.username}`,
    },
    ...sidebarContent,
  ];

  return (
    <div className={styles.container}>
      {completeContent.map(({ title, image, url, width, height }) => (
        <a
          href={url}
          className={styles.selection}
          key={title}>
          <div>
            <img
              style={{ width: width, height: height }}
              src={image}
              alt={title}
              className={styles.image}
            />
          </div>
          <p>{title}</p>
        </a>
      ))}
    </div>
  );
}
