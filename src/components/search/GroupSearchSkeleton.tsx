import styles from "@/assets/styles/search/search.module.scss";

export default function GroupSearchSkeleton() {
  return (
    <div className={styles.groupBoxSkeleton}>
      <div className={styles.left}>
        <div className={styles.image}/>
      </div>
      <div className={styles.center}>
        <p></p>
        <span></span>
      </div>
    </div>
  );
}
