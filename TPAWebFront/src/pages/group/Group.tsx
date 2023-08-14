import styles from "../../assets/styles/group/group.module.scss";
import Navbar from "../../components/navbar/Navbar.tsx";
import GroupSidebar from "../../components/group/GroupSidebar.tsx";
import GroupBox from "../../components/group/GroupBox.tsx";
import { useState } from "react";
import { useQuery } from "@apollo/client";
import { GET_GROUPS } from "../../../lib/query/group/getGroups.graphql.ts";
import { debouncedError } from "../../../controller/errorHandler.ts";
import { Group } from "../../../gql/graphql.ts";

export default function Group() {
    const [groups, setGroups] = useState<Group[]>([]);
    const [filteredGroups, setFilteredGroups] = useState<Group[]>([]);
    useQuery(GET_GROUPS, {
        onCompleted: (data) => {
            setGroups(data.getGroups);
            setFilteredGroups(data.getGroups);
        },
        onError: debouncedError,
    });

    const handleFilter = (filter: string) => {
        console.log(filter);
        if (filter.length == 0) {
            return setFilteredGroups(groups);
        }
        const filtered = groups.filter((group) => {
            return group.name.toLowerCase().includes(filter.toLowerCase());
        });
        console.log(filtered);
        setFilteredGroups(filtered);
    };

    return (
        <div className={styles.page}>
            <Navbar />
            <div className={styles.content}>
                <GroupSidebar handleFilter={handleFilter} />
                <div className={styles.main}>
                    <div className={styles.grid}>
                        {filteredGroups.length > 0 &&
                            filteredGroups.map((group) => {
                                return <GroupBox group={group} />;
                            })}
                    </div>
                </div>
            </div>
        </div>
    );
}
