import styles from "@/assets/styles/group/groupBox.module.scss";
import { Group } from "@/gql/graphql.ts";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { HANDLE_REQUEST } from "@/lib/query/group/handleRequest.graphql.ts";
import { debouncedError } from "@/utils/error-handler.ts";
import { Dispatch, SetStateAction } from "react";
import SafeImage from "@/components/SafeImage.tsx";

interface GroupBox {
  group: Group;
  setGroups: Dispatch<SetStateAction<Group[]>>;
}

export default function GroupBox({ group, setGroups }: GroupBox) {
  const [handleRequest] = useMutation(HANDLE_REQUEST);
  const handleRequestFunc = async () => {
    if (group.joined == "not joined") {
      setGroups((prev) => {
        return prev.map((g) => {
          if (g.id == group.id) {
            return {
              ...g,
              joined: "pending",
            };
          }
          return g;
        });
      });
    } else if (group.joined == "not accepted") {
      setGroups((prev) => {
        return prev.map((g) => {
          if (g.id == group.id) {
            return {
              ...g,
              joined: "joined",
            };
          }
          return g;
        });
      });
    }

    await handleRequest({
      variables: {
        id: group.id,
      },
    }).catch(debouncedError);
  };
  return (
    <div className={styles.box}>
      <Link to={`/group/${group.id}`}>
        <SafeImage
          src={group.background}
          type={"group-cover"}
        />
      </Link>
      <h3>{group.name}</h3>
      <p>{group.memberCount} members</p>
      <p className={styles.about}>{group.about}</p>
      <div className={styles.button}>
        {group.joined == "joined" && <button className={styles.joined}>Joined</button>}
        {group.joined == "not joined" && (
          <button
            key={1}
            onClick={() => handleRequestFunc()}>
            Join Group
          </button>
        )}
        {group.joined == "not accepted" && (
          <button
            key={1}
            onClick={() => handleRequestFunc()}>
            Accept Invite
          </button>
        )}
        {group.joined == "pending" && <button className={styles.joined}>Requested</button>}
      </div>
    </div>
  );
}
