import styles from "../../assets/styles/group/groupSidebar.module.scss";
import { AiOutlineSearch } from "react-icons/ai";
import { HiMiniHome } from "react-icons/hi2";
import { FaCompass } from "react-icons/fa";
import { Dispatch, SetStateAction } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_JOINED_GROUPS } from "../../../lib/query/group/getJoinedGroups.graphql.ts";
import { debouncedError } from "../../controller/errorHandler.ts";
import { Group } from "../../../gql/graphql.ts";
import groupBackgroundLoader from "../../controller/groupBackgroundLoader.ts";

interface GroupSidebar {
    redirect: boolean;
    handleFilter?: (filter: string) => void;
    currentTab?: string;
    setCurrentTab?: Dispatch<SetStateAction<string>>;
}

export default function GroupSidebar({ handleFilter, redirect, currentTab, setCurrentTab }: GroupSidebar) {
    const { data } = useQuery(GET_JOINED_GROUPS, {
        fetchPolicy: "cache-and-network",
        onError: debouncedError,
    });
    const nav = useNavigate();

    const handleTab = (tab: string) => {
        if (setCurrentTab) setCurrentTab(tab);
        if (redirect) {
            nav("/group");
        }
    };
    return (
        <>
            <div className={styles.barSpace} />
            <div className={styles.bar}>
                <header>
                    <div className={styles.bio}>
                        <h2>Groups</h2>
                        {!redirect && handleFilter && (
                            <div className={styles.search}>
                                <AiOutlineSearch />
                                <input
                                    type={"text"}
                                    onChange={(e) => handleFilter(e.target.value)}
                                    placeholder={"Find groups..."}
                                />
                            </div>
                        )}
                    </div>
                </header>
                <div className={styles.content}>
                    <div
                        className={currentTab == "feed" ? styles.containerActive : styles.container}
                        onClick={() => handleTab("feed")}
                    >
                        <div className={styles.logo}>
                            <HiMiniHome size={"1.5rem"} />
                        </div>
                        <h4>Your Feed</h4>
                    </div>
                    <div
                        className={currentTab == "discover" ? styles.containerActive : styles.container}
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
                </div>
            </div>
        </>
    );
}
