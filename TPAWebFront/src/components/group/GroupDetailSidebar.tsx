import styles from "../../assets/styles/group/groupDetailSidebar.module.scss";
import { Group } from "../../../gql/graphql.ts";
import groupBackgroundLoader from "../../../controller/groupBackgroundLoader.ts";
import { Dispatch, SetStateAction, useState } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_JOINED_GROUPS } from "../../../lib/query/group/getJoinedGroups.graphql.ts";
import { debouncedError } from "../../../controller/errorHandler.ts";

interface GroupDetailSidebar {
    group: Group | undefined;
    setInviteGroupModalState: Dispatch<SetStateAction<boolean>>;
}

export default function GroupDetailSidebar({ group, setInviteGroupModalState }: GroupDetailSidebar) {
    const [tab, setTab] = useState("browse");
    const { data } = useQuery(GET_JOINED_GROUPS, {
        onError: debouncedError,
    });
    return (
        <>
            <div className={styles.barSpace} />
            <div className={styles.bar}>
                <header>
                    <img
                        src={groupBackgroundLoader(group?.background)}
                        alt={""}
                    />
                    <div className={styles.bio}>
                        <h4>{group?.name}</h4>
                        <p>
                            {group?.privacy} • {group?.memberCount} Members
                        </p>
                    </div>
                </header>
                <button onClick={() => setInviteGroupModalState(true)}>+ Invite</button>
                <div className={styles.content}>
                    <nav>
                        <div
                            className={tab == "browse" ? styles.tabActive : styles.tab}
                            onClick={() => setTab("browse")}
                        >
                            Browse
                        </div>
                        <div
                            className={tab == "manage" ? styles.tabActive : styles.tab}
                            onClick={() => setTab("manage")}
                        >
                            Manage
                        </div>
                    </nav>
                    {tab == "browse" && (
                        <>
                            <h3>Groups you've joined</h3>
                            {data &&
                                data.getJoinedGroups.map((group: Group) => {
                                    return (
                                        <Link to={`/group/${group.id}`}>
                                            <div className={styles.group}>
                                                <img
                                                    src={groupBackgroundLoader(group.background)}
                                                    alt={""}
                                                />
                                                <h4>{group.name}</h4>
                                            </div>
                                        </Link>
                                    );
                                })}
                        </>
                    )}
                </div>
            </div>
        </>
    );
}
