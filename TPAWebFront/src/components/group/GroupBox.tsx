import styles from "../../assets/styles/group/groupBox.module.scss";
import { Group } from "../../../gql/graphql.ts";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { HANDLE_REQUEST } from "../../../lib/query/group/handleRequest.graphql.ts";
import { debouncedError } from "../../../controller/errorHandler.ts";
import { useState } from "react";

interface GroupBox {
    group: Group;
}
export default function GroupBox({ group }: GroupBox) {
    const [currGroup, setCurrGroup] = useState<Group>(group);
    const [handleRequest] = useMutation(HANDLE_REQUEST);
    const handleRequestFunc = async () => {
        if (group.joined == "not joined") {
            setCurrGroup({
                ...group,
                joined: "pending",
            });
        } else if (group.joined == "not accepted") {
            setCurrGroup({
                ...group,
                joined: "joined",
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
            <Link to={`/group/${currGroup.id}`}>
                <img
                    src={currGroup.background ? currGroup.background : "src/assets/default-group-cover.png"}
                    alt={""}
                />
            </Link>
            <h3>{currGroup.name}</h3>
            <p>{currGroup.about}</p>
            <p>{currGroup.memberCount} members</p>
            <div className={styles.button}>
                {currGroup.joined == "joined" && <button className={styles.joined}>Joined</button>}
                {currGroup.joined == "not joined" && (
                    <button
                        key={1}
                        onClick={() => handleRequestFunc()}
                    >
                        Join Group
                    </button>
                )}
                {currGroup.joined == "not accepted" && (
                    <button
                        key={1}
                        onClick={() => handleRequestFunc()}
                    >
                        Accept Invite
                    </button>
                )}
                {currGroup.joined == "pending" && <button className={styles.joined}>Requested</button>}
            </div>
        </div>
    );
}
