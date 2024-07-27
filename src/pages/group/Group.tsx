import styles from "../../assets/styles/group/group.module.scss";
import Navbar from "../../components/navbar/Navbar.tsx";
import GroupSidebar from "../../components/group/GroupSidebar.tsx";
import GroupBox from "../../components/group/GroupBox.tsx";
import { useRef, useState } from "react";
import { useQuery } from "@apollo/client";
import { GET_GROUPS } from "../../../lib/query/group/getGroups.graphql.ts";
import { debouncedError } from "../../controller/errorHandler.ts";
import { Group, Post } from "../../../gql/graphql.ts";
import ShareModal from "../../components/ShareModal.tsx";
import GroupFeed from "../../components/group/GroupFeed.tsx";

export default function Group() {
    const [groups, setGroups] = useState<Group[]>([]);
    const [filteredGroups, setFilteredGroups] = useState<Group[]>([]);
    const [currentTab, setCurrentTab] = useState("feed");
    const [shareModalState, setShareModalState] = useState(false);
    const [currPost, setCurrPost] = useState<Post | null>(null);
    const pageRef = useRef<HTMLDivElement>(null);
    useQuery(GET_GROUPS, {
        onCompleted: (data) => {
            setGroups(data.getGroups);
            setFilteredGroups(data.getGroups);
        },
        fetchPolicy: "network-only",
        onError: debouncedError,
    });

    const handleFilter = (filter: string) => {
        if (filter.length == 0) {
            return setFilteredGroups(groups);
        }
        const filtered = groups.filter((group) => {
            return group.name.toLowerCase().includes(filter.toLowerCase());
        });
        setFilteredGroups(filtered);
    };

    return (
        <>
            {shareModalState && (
                <ShareModal
                    setShareModalState={setShareModalState}
                    currPost={currPost}
                />
            )}
            <div className={styles.page}>
                <Navbar />
                <div className={styles.content}>
                    <GroupSidebar
                        key={Date.now()}
                        handleFilter={handleFilter}
                        redirect={false}
                        currentTab={currentTab}
                        setCurrentTab={setCurrentTab}
                    />
                    <div
                        className={styles.main}
                        ref={pageRef}
                    >
                        {currentTab == "discover" && (
                            <div className={styles.grid}>
                                {filteredGroups.length > 0 &&
                                    filteredGroups.map((group) => {
                                        return (
                                            <GroupBox
                                                key={group.id}
                                                group={group}
                                            />
                                        );
                                    })}
                            </div>
                        )}
                        {currentTab == "feed" && (
                            <GroupFeed
                                setShareModalState={setShareModalState}
                                setCurrPost={setCurrPost}
                                pageRef={pageRef}
                            />
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}
