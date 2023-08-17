import styles from "../../assets/styles/search/search.module.scss";
import { Group } from "../../../gql/graphql.ts";
import groupBackgroundLoader from "../../../controller/groupBackgroundLoader.ts";
import { Link } from "react-router-dom";

interface GroupBox {
    group: Group;
}

export default function GroupBox({ group }: GroupBox) {
    return (
        <div className={styles.groupBox}>
            <div className={styles.left}>
                <Link to={"/group/" + group.id}>
                    <img
                        src={groupBackgroundLoader(group.background)}
                        alt={""}
                    />
                </Link>
            </div>
            <div className={styles.center}>
                <h4>{group.name}</h4>
                <p>
                    {group.privacy} • {group.memberCount} members
                </p>
                <p>{group.about}</p>
            </div>
            <div className={styles.right}>{group.joined ? <button>Joined</button> : <button>Join</button>}</div>
        </div>
    );
}
