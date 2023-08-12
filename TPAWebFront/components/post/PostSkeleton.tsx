import styles from "../../src/assets/styles/post/postSkeleton.module.scss";

export default function PostSkeleton() {
    return (
        <div className={styles.myBox}>
            <header>
                <div className={styles.profilePic} />
                <div className={styles.bio}>
                    <h4>a</h4>
                    <p>a</p>
                </div>
            </header>
            <div className={styles.content}>
                <p>a</p>
                <p>a</p>
                <p>a</p>
                <div className={styles.image}>a</div>
            </div>
        </div>
    );
}
