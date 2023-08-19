import styles from "../../assets/styles/reels/reelComment.module.scss";
import { AiFillLike } from "react-icons/ai";

interface LikeLabel {
    count: number;
}
export default function LikeLabel({ count }: LikeLabel) {
    return (
        <div className={styles.like}>
            <AiFillLike size={"1rem"} />
            {count}
        </div>
    );
}
