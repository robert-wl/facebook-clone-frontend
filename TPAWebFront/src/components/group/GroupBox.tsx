import styles from "../../assets/styles/group/groupBox.module.scss";
import { Group } from "../../../gql/graphql.ts";
import { Link } from "react-router-dom";

interface GroupBox {
    group: Group;
}
export default function GroupBox({ group }: GroupBox) {
    return (
        <div className={styles.box}>
            <Link to={`/group/${group.id}`}>
                <img
                    src={group.background ? group.background : "src/assets/default-group-cover.png"}
                    alt={""}
                />
            </Link>
            <h3>{group.name}</h3>
            <p>{group.about}</p>
            <p>{group.memberCount} members</p>
            <div className={styles.button}>{group.joined ? <button className={styles.joined}>Joined</button> : <button>Join Group</button>}</div>
        </div>
    );
}
