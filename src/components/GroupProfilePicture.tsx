import styles from "@/assets/styles/profilePicture.module.scss";
import {Link} from "react-router-dom";
import {Group} from "@/gql/graphql.ts";
import groupBackgroundLoader from "@/controller/groupBackgroundLoader.ts";

interface GroupProfilePicture {
  group: Group;
}

export default function GroupProfilePicture({group}: GroupProfilePicture) {
  return (
    <div className={styles.imageBox}>
      <Link to={"/group/" + group?.id}>
        <img
          src={groupBackgroundLoader(group?.background)}
          alt={""}
        />
      </Link>
    </div>
  );
}
