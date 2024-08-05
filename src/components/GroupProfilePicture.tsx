import styles from "@/assets/styles/profilePicture.module.scss";
import { Link } from "react-router-dom";
import { Group } from "@/gql/graphql.ts";
import { defaultGroupBackground } from "@/controller/groupBackgroundLoader.ts";
import SafeImage from "@/components/SafeImage.tsx";

interface GroupProfilePicture {
  group: Group;
}

export default function GroupProfilePicture({ group }: GroupProfilePicture) {
  return (
    <div className={styles.imageBox}>
      <Link to={"/group/" + group?.id}>
        <SafeImage
          src={group?.background}
          defaultSrc={defaultGroupBackground}
        />
      </Link>
    </div>
  );
}
