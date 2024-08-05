import styles from "@/assets/styles/post/emptyPost.module.scss";
import MessageArtIcon from "@/components/icons/art/MessageArtIcon.tsx";

export default function EmptyPost() {
  return (
    <div className={styles.myBox}>
      <MessageArtIcon />
      <p className={styles.message}>No more posts found</p>
    </div>
  );
}
