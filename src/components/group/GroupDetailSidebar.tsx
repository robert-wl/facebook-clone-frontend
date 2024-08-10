import styles from "@/assets/styles/group/groupDetailSidebar.module.scss";
import { Group } from "@/gql/graphql.ts";
import { Dispatch, SetStateAction, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_JOINED_GROUPS } from "@/lib/query/group/getJoinedGroups.graphql.ts";
import { debouncedError } from "@/utils/error-handler.ts";
import { BsPersonPlus } from "react-icons/bs";
import { MdPeopleOutline } from "react-icons/md";
import { HiMiniHome } from "react-icons/hi2";
import { FaCompass } from "react-icons/fa";
import { Optional } from "@/types/utils";
import PeopleArtIcon from "@/components/icons/art/PeopleArtIcon.tsx";
import SafeImage from "@/components/SafeImage.tsx";

interface IProps {
  group: Optional<Group>;
  setInviteGroupModalState: Dispatch<SetStateAction<boolean>>;
  setJoinRequestsModalState: Dispatch<SetStateAction<boolean>>;
  setMembersModalState: Dispatch<SetStateAction<boolean>>;
}

export default function GroupDetailSidebar({ group, setInviteGroupModalState, setJoinRequestsModalState, setMembersModalState }: IProps) {
  const [tab, setTab] = useState("browse");
  const navigate = useNavigate();
  const { data } = useQuery(GET_JOINED_GROUPS, {
    fetchPolicy: "cache-and-network",
    onError: debouncedError,
  });

  const handleTab = (nav: string) => {
    setTab(nav);
    navigate(`${import.meta.env.VITE_ROOT_URL}/group?tab=${nav}`);
  };

  return (
    <>
      <div className={styles.barSpace} />
      <div className={styles.bar}>
        <div
          className={styles.content}
          style={{ height: tab === "browse" ? "100%" : "fit-content" }}>
          <div
            className={styles.container}
            onClick={() => handleTab("feed")}>
            <div className={styles.logo}>
              <HiMiniHome size={"1.5rem"} />
            </div>
            <h4>Your Feed</h4>
          </div>
          <div
            className={styles.container}
            onClick={() => handleTab("discover")}>
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
          <SafeImage
            src={group?.background}
            type={"group-background"}
          />
          <div className={styles.bio}>
            <h4>{group?.name}</h4>
            <p>
              {group?.privacy} • {group?.memberCount} Members
            </p>
          </div>
        </header>
        <div className={styles.buttons}>
          <Link to={"/messages/" + group?.chat?.id}>
            <button>Chat</button>
          </Link>
          <button onClick={() => setInviteGroupModalState(true)}>+ Invite</button>
        </div>
        <div className={styles.content}>
          {group?.isAdmin && (
            <nav>
              <button
                className={tab == "browse" ? styles.tabActive : styles.tab}
                onClick={() => setTab("browse")}>
                Browse
              </button>
              <button
                className={tab == "manage" ? styles.tabActive : styles.tab}
                onClick={() => setTab("manage")}>
                Manage
              </button>
            </nav>
          )}
          {tab == "browse" && (
            <>
              <h3>Groups you've joined</h3>
              <div className={styles.groupList}>
                {data?.getJoinedGroups.length > 0 ? (
                  data.getJoinedGroups.map((group: Group) => {
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
                  })
                ) : (
                  <div>
                    <PeopleArtIcon />
                    <h3>You haven't joined any groups yet.</h3>
                  </div>
                )}
                <div style={{ height: "10rem" }} />
              </div>
            </>
          )}
          {tab == "manage" && (
            <>
              <div
                className={styles.tools}
                onClick={() => setJoinRequestsModalState(true)}>
                <BsPersonPlus size={"1.5rem"} />
                <button>Join requests</button>
              </div>
              <div
                className={styles.tools}
                onClick={() => setMembersModalState(true)}>
                <MdPeopleOutline size={"1.5rem"} />
                <button>Members</button>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}
