import styles from "@/assets/styles/group/group.module.scss";
import Navbar from "@/components/navbar/Navbar.tsx";
import GroupSidebar from "@/components/group/GroupSidebar.tsx";
import GroupBox from "@/components/group/GroupBox.tsx";
import { useMemo, useRef, useState } from "react";
import { useQuery } from "@apollo/client";
import { GET_GROUPS } from "@/lib/query/group/getGroups.graphql.ts";
import { debouncedError } from "@/utils/error-handler.ts";
import type { Group, Post } from "@/gql/graphql.ts";
import ShareModal from "@/components/ShareModal.tsx";
import GroupFeed from "@/components/group/GroupFeed.tsx";
import { useSearchParams } from "react-router-dom";

export default function Group() {
  const [params, setParams] = useSearchParams();
  const [groups, setGroups] = useState<Group[]>([]);
  const [filter, setFilter] = useState<string>("");
  const [currentTab, setCurrentTab] = useState(() => {
    return params.get("tab") || "feed";
  });
  const [shareModalState, setShareModalState] = useState(false);
  const [currPost, setCurrPost] = useState<Post | null>(null);
  const pageRef = useRef<HTMLDivElement>(null);
  useQuery(GET_GROUPS, {
    onCompleted: (data) => {
      setGroups(data.getGroups);
    },
    fetchPolicy: "network-only",
    onError: debouncedError,
  });

  const setTab = (tab: string) => {
    setCurrentTab(tab);
    setParams({ tab: tab });
  };

  const filteredGroups = useMemo(() => {
    return groups.filter((group) => {
      return group.name.toLowerCase().includes(filter.toLowerCase());
    });
  }, [filter, groups]);

  const setGroupFilter = (filter: string) => {
    setTab("discover");
    setFilter(filter);
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
            setFilter={setGroupFilter}
            redirect={false}
            filter={filter}
            currentTab={currentTab}
            setCurrentTab={setTab}
          />
          <div
            className={styles.main}
            ref={pageRef}>
            {currentTab == "discover" && (
              <div className={styles.grid}>
                {filteredGroups.length > 0 &&
                  filteredGroups.map((group) => {
                    return (
                      <GroupBox
                        key={group.id}
                        group={group}
                        setGroups={setGroups}
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
