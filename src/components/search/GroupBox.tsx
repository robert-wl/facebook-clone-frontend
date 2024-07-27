import styles from "../../assets/styles/search/search.module.scss";
import { Group } from "../../../gql/graphql.ts";
import groupBackgroundLoader from "../../../controller/groupBackgroundLoader.ts";
import { Link } from "react-router-dom";
import { debouncedError } from "../../../controller/errorHandler.ts";
import { useMutation } from "@apollo/client";
import { HANDLE_REQUEST } from "../../../lib/query/group/handleRequest.graphql.ts";
import { Dispatch, SetStateAction } from "react";

interface GroupBox {
    group: Group;
    setGroupData: Dispatch<SetStateAction<Group[]>>;
}

export default function GroupBox({ group, setGroupData }: GroupBox) {
    const [handleRequest] = useMutation(HANDLE_REQUEST);
    const handleJoin = async () => {
        if (group.joined == "not joined" || group.joined == "not accepted") {
            setGroupData((prev) => {
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
        }

        await handleRequest({
            variables: {
                id: group.id,
            },
        }).catch(debouncedError);
    };

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
            <div className={styles.right}>
                {group.joined == "pending" && (
                    <>
                        <button disabled={true}>Pending</button>
                    </>
                )}
                {group.joined == "not joined" && (
                    <>
                        <button onClick={() => handleJoin()}>Join</button>
                    </>
                )}
                {group.joined == "not accepted" && (
                    <>
                        <button disabled={true}>Pending</button>
                    </>
                )}
                {group.joined == "joined" && (
                    <>
                        <button disabled={true}>Joined</button>
                    </>
                )}
            </div>
        </div>
    );
}
