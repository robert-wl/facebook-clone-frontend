import styles from "../../assets/styles/group/groupDetailSidebar.module.scss";
import { Group } from "../../../gql/graphql.ts";
import groupBackgroundLoader from "../../../controller/groupBackgroundLoader.ts";
import { Dispatch, SetStateAction, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_JOINED_GROUPS } from "../../../lib/query/group/getJoinedGroups.graphql.ts";
import { debouncedError } from "../../../controller/errorHandler.ts";
import { BsPersonPlus } from "react-icons/bs";
import { MdPeopleOutline } from "react-icons/md";
import { HiMiniHome } from "react-icons/hi2";
import { FaCompass } from "react-icons/fa";

interface GroupDetailSidebar {
    group: Group | undefined;
    setInviteGroupModalState: Dispatch<SetStateAction<boolean>>;
    setJoinRequestsModalState: Dispatch<SetStateAction<boolean>>;
    setMembersModalState: Dispatch<SetStateAction<boolean>>;
}

export default function GroupDetailSidebar({ group, setInviteGroupModalState, setJoinRequestsModalState, setMembersModalState }: GroupDetailSidebar) {
    const [tab, setTab] = useState("browse");
    const navigate = useNavigate();
    const { data } = useQuery(GET_JOINED_GROUPS, {
        fetchPolicy: "cache-and-network",
        onError: debouncedError,
    });

    const handleTab = (nav: string) => {
        setTab(nav);
        navigate("/group");
    };

    return (
        <>
            <div className={styles.barSpace} />
            <div className={styles.bar}>
                <div className={styles.content}>
                    <div
                        className={styles.container}
                        onClick={() => handleTab("feed")}
                    >
                        <div className={styles.logo}>
                            <HiMiniHome size={"1.5rem"} />
                        </div>
                        <h4>Your Feed</h4>
                    </div>
                    <div
                        className={styles.container}
                        onClick={() => handleTab("discover")}
                    >
                        <div className={styles.logo}>
                            <FaCompass size={"1.5rem"} />
                        </div>
                        <h4>Discover</h4>
                    </div>
                    <button>
                        <Link to={"/group/create"}>+ Create new group</Link>
                    </button>
                    <hr />
                </div>
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
                <div className={styles.buttons}>
                    <Link to={"/messages/" + group?.chat?.id}>Chat</Link>
                    <button onClick={() => setInviteGroupModalState(true)}>+ Invite</button>
                </div>
                <div className={styles.content}>
                    {group?.isAdmin && (
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
                    )}
                    {tab == "browse" && (
                        <>
                            <h3>Groups you've joined</h3>
                            {data &&
                                data.getJoinedGroups.map((group: Group) => {
                                    return (
                                        <Link
                                            to={`/group/${group.id}`}
                                            key={group.id}
                                        >
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
                    {tab == "manage" && (
                        <>
                            <div
                                className={styles.tools}
                                onClick={() => setJoinRequestsModalState(true)}
                            >
                                <BsPersonPlus size={"1.5rem"} />
                                <p>Join requests</p>
                            </div>
                            <div
                                className={styles.tools}
                                onClick={() => setMembersModalState(true)}
                            >
                                <MdPeopleOutline size={"1.5rem"} />
                                <p>Members</p>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </>
    );
}
