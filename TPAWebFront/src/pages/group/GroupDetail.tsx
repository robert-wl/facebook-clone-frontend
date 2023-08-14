import styles from "../../assets/styles/group/groupDetail.module.scss";
import Navbar from "../../components/navbar/Navbar.tsx";
import GroupDetailSidebar from "../../components/group/GroupDetailSidebar.tsx";
import groupBackgroundLoader from "../../../controller/groupBackgroundLoader.ts";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_GROUP } from "../../../lib/query/group/getGroup.graphql.ts";
import { debouncedError } from "../../../controller/errorHandler.ts";
import { useContext, useEffect, useState } from "react";
import { Group } from "../../../gql/graphql.ts";
import userProfileLoader from "../../../controller/userProfileLoader.ts";
import { AuthContext } from "../../components/context/AuthContextProvider.tsx";
import PostBox from "../../components/post/PostBox.tsx";
import NewGroupPostModal from "../../components/group/NewGroupPostModal.tsx";
import InviteGroupModal from "../../components/group/InviteGroupModal.tsx";

export default function GroupDetail() {
    const [newGroupModalState, setNewGroupModalState] = useState(false);
    const [inviteGroupModalState, setInviteGroupModalState] = useState(false);
    const { auth } = useContext(AuthContext);
    const { groupId } = useParams();
    const { data } = useQuery(GET_GROUP, {
        variables: {
            id: groupId,
        },
        onError: debouncedError,
    });

    const [group, setGroup] = useState<Group>();
    const [tab, setTab] = useState("discussion");

    useEffect(() => {
        if (data) setGroup(data?.getGroup);
    }, [data]);

    return (
        <>
            {inviteGroupModalState && (
                <InviteGroupModal
                    key={group?.id}
                    inviteModalState={inviteGroupModalState}
                    setInviteModalState={setInviteGroupModalState}
                />
            )}

            <NewGroupPostModal
                modalState={newGroupModalState}
                setModalState={setNewGroupModalState}
                data={data}
            />
            <div className={styles.page}>
                <Navbar />
                <div className={styles.content}>
                    <GroupDetailSidebar
                        key={Date.now()}
                        group={group}
                        setInviteGroupModalState={setInviteGroupModalState}
                    />
                    <div className={styles.contentCenter}>
                        <header>
                            <img
                                src={groupBackgroundLoader(group?.background)}
                                alt={""}
                            />
                            <div className={styles.info}>
                                <div className={styles.top}>
                                    <h2>{group?.name}</h2>
                                    <button>
                                        <h4>+ Invite</h4>
                                    </button>
                                </div>
                                <hr />
                                <nav>
                                    <div
                                        className={tab == "discussion" ? styles.tabContentActive : styles.tabContent}
                                        onClick={() => setTab("discussion")}
                                    >
                                        Discussion
                                    </div>
                                    <div
                                        className={tab == "files" ? styles.tabContentActive : styles.tabContent}
                                        onClick={() => setTab("files")}
                                    >
                                        Files
                                    </div>
                                    <div
                                        className={tab == "people" ? styles.tabContentActive : styles.tabContent}
                                        onClick={() => setTab("people")}
                                    >
                                        People
                                    </div>
                                </nav>
                            </div>
                        </header>
                        <article>
                            {tab == "discussion" && (
                                <>
                                    <div className={styles.content}>
                                        <div className={styles.inputBox}>
                                            <div className={styles.inputHeader}>
                                                <img
                                                    src={userProfileLoader(auth?.profile)}
                                                    alt={""}
                                                />
                                                <button onClick={() => setNewGroupModalState(true)}>What's on your mind?</button>
                                            </div>
                                        </div>
                                        <div className={styles.posts}>
                                            {group?.posts?.map((post, index) => {
                                                if (post)
                                                    return (
                                                        <PostBox
                                                            key={index}
                                                            post={post}
                                                            setCurrPost={setNewGroupModalState}
                                                            setShareModalState={setNewGroupModalState}
                                                        />
                                                    );
                                            })}
                                        </div>
                                    </div>
                                    <div className={styles.about}>
                                        <div className={styles.aboutBox}>
                                            <h3>About</h3>
                                            <p>{group?.about}</p>
                                            <p>
                                                {group?.privacy} • {group?.memberCount} Members
                                            </p>
                                        </div>
                                    </div>
                                </>
                            )}
                        </article>
                    </div>
                </div>
            </div>
        </>
    );
}
