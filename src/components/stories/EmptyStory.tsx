import styles from "@/assets/styles/story/createStories.module.scss";

export default function EmptyStory() {
  return (
    <div className={styles.content}>
      <div className={styles.container}>
        <h3 className={styles.emptyTitle}>Welcome to the stories page</h3>
        <p>please create or choose a story to view</p>
      </div>
    </div>
  );
}
