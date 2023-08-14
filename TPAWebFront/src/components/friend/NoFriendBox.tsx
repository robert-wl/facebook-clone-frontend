import styles from "../../assets/styles/friends/noFriendBox.module.scss";

interface NoFriendBox {
    description: string;
}
export default function NoFriendBox({ description }: NoFriendBox) {
    return (
        <div className={styles.container}>
            <h3>{description}</h3>
        </div>
    );
}
