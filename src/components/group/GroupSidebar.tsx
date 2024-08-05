import styles from "@/assets/styles/group/groupSidebar.module.scss";
import { AiOutlineSearch } from "react-icons/ai";
import { HiMiniHome } from "react-icons/hi2";
import { FaCompass } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_JOINED_GROUPS } from "@/lib/query/group/getJoinedGroups.graphql.ts";
import { debouncedError } from "@/controller/errorHandler.ts";
import { Group } from "@/gql/graphql.ts";
import PeopleArtIcon from "@/components/icons/art/PeopleArtIcon.tsx";
import SafeImage from "@/components/SafeImage.tsx";

interface IProps {
  redirect: boolean;
  filter: string;
  setFilter?: (filter: string) => void;
  currentTab?: string;
  setCurrentTab?: (tab: string) => void;
}

export default function GroupSidebar({ filter, setFilter, redirect, currentTab, setCurrentTab }: IProps) {
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
            {!redirect && setFilter && (
              <div className={styles.search}>
                <AiOutlineSearch />
                <input
                  type={"text"}
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                  placeholder={"Find groups..."}
                />
              </div>
            )}
          </div>
        </header>
        <div className={styles.content}>
          <div
            className={currentTab == "feed" ? styles.containerActive : styles.container}
            onClick={() => handleTab("feed")}>
            <div className={styles.logo}>
              <HiMiniHome size={"1.5rem"} />
            </div>
            <h4>Your Feed</h4>
          </div>
          <div
            className={currentTab == "discover" ? styles.containerActive : styles.container}
            onClick={() => handleTab("discover")}>
            <div className={styles.logo}>
              <FaCompass size={"1.5rem"} />
            </div>
            <h4>Discover</h4>
          </div>

          <Link
            className={styles.createGroup}
            to={"/group/create"}>
            <button>+ Create new group</button>
          </Link>

          <hr />
          <h3>Groups you've joined</h3>
          {data?.getJoinedGroups.length > 0 ? (
            <div className={styles.groupList}>
              {data.getJoinedGroups.map((group: Group) => {
                return (
                  <Link
                    to={`/group/${group.id}`}
                    key={group.id}>
                    <div className={styles.group}>
                      <SafeImage
                        src={group.background}
                        type={"group-cover"}
                      />
                      <h4>{group.name}</h4>
                    </div>
                  </Link>
                );
              })}
              <div style={{ height: "10rem" }} />
            </div>
          ) : (
            <div>
              <PeopleArtIcon />
              <h3>You haven't joined any groups yet.</h3>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
