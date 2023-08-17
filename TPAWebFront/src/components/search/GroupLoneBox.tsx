import styles from "../../assets/styles/search/search.module.scss";
import { Link } from "react-router-dom";
import groupBackgroundLoader from "../../../controller/groupBackgroundLoader.ts";
import { Group } from "../../../gql/graphql.ts";

interface GroupLoneBox {
    group: Group;
}
export default function GroupLoneBox({ group }: GroupLoneBox) {
    return (
        <div className={styles.groupLoneBox}>
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
