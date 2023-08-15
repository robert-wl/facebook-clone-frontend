import styles from "../../assets/styles/group/groupDetail.module.scss";
import Navbar from "../../components/navbar/Navbar.tsx";
import GroupDetailSidebar from "../../components/group/GroupDetailSidebar.tsx";
import groupBackgroundLoader from "../../../controller/groupBackgroundLoader.ts";
import { useParams } from "react-router-dom";
import { useMutation, useQuery } from "@apollo/client";
import { GET_GROUP } from "../../../lib/query/group/getGroup.graphql.ts";
import { debouncedError } from "../../../controller/errorHandler.ts";
import { ChangeEvent, useContext, useEffect, useRef, useState } from "react";
import { Group, Post } from "../../../gql/graphql.ts";
import userProfileLoader from "../../../controller/userProfileLoader.ts";
import { AuthContext } from "../../components/context/AuthContextProvider.tsx";
import PostBox from "../../components/post/PostBox.tsx";
import NewGroupPostModal from "../../components/group/NewGroupPostModal.tsx";
import InviteGroupModal from "../../components/group/InviteGroupModal.tsx";
import ShareModal from "../../components/ShareModal.tsx";
import GroupSidebar from "../../components/group/GroupSidebar.tsx";
import { IoMdReverseCamera } from "react-icons/io";
import uploadStorage from "../../../controller/firebase/storage.ts";
import { UPDATE_GROUP_BACKGROUND } from "../../../lib/query/group/updateGroupBackground.graphql.ts";
import GroupFileBox from "../../components/group/GroupFileBox.tsx";
import JoinRequestsModal from "../../components/group/JoinRequestsModal.tsx";
import MembersModal from "../../components/group/MembersModal.tsx";

export default function GroupDetail() {
    const [currPost, setCurrPost] = useState<Post | null>(null);
    const [newGroupModalState, setNewGroupModalState] = useState(false);
    const [shareModalState, setShareModalState] = useState(false);
    const [inviteGroupModalState, setInviteGroupModalState] = useState(false);
    const [joinRequestModalState, setJoinRequestModalState] = useState(false);
    const [membersModalState, setMembersModalState] = useState(false);
    const [group, setGroup] = useState<Group>();
    const [tab, setTab] = useState("discussion");
    const [updateGroupBackground] = useMutation(UPDATE_GROUP_BACKGROUND);
    const backgroundInputRef = useRef<HTMLInputElement>(null);
    const { auth } = useContext(AuthContext);
    const { groupId } = useParams();
    const { data } = useQuery(GET_GROUP, {
        variables: {
            id: groupId,
        },
        fetchPolicy: "network-only",
        onError: debouncedError,
    });

    useEffect(() => {
        if (data) {
            setGroup(data.getGroup);
            setTab(data.getGroup.joined == "joined" ? "discussion" : "about");
        }
    }, [data]);

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const handleFilter = (filter: string) => {};

    const handleBackgroundInput = () => {
        if (backgroundInputRef.current) {
            backgroundInputRef.current.click();
        }
    };

    const handleBackgroundFile = async (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const file = e.target.files[0] as File;

            const url = await uploadStorage("group/background", file);

            if (group) {
                setGroup({
                    ...group,
                    background: url,
                });
                updateGroupBackground({
                    variables: {
                        id: groupId,
                        background: url,
                    },
                }).catch(debouncedError);
            }
        }
    };

    return (
        <>
            {inviteGroupModalState && (
                <InviteGroupModal
                    key={group?.id}
                    inviteModalState={inviteGroupModalState}
                    setInviteModalState={setInviteGroupModalState}
                />
            )}
            {joinRequestModalState && <JoinRequestsModal setJoinRequestsModalState={setJoinRequestModalState} />}
            {membersModalState && (
                <MembersModal
                    setMembersModalState={setMembersModalState}
                    members={group?.members}
                />
            )}
            {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
            {/*// @ts-ignore*/}
            <NewGroupPostModal
                modalState={newGroupModalState}
                setModalState={setNewGroupModalState}
                data={data}
            />
            <ShareModal
                shareModalState={shareModalState}
                setShareModalState={setShareModalState}
                currPost={currPost}
            />
            <div
                key={"mainPage"}
                className={styles.page}
            >
                <Navbar />
                <div className={styles.content}>
                    {group?.joined == "joined" ? (
                        <GroupDetailSidebar
                            group={group}
                            setInviteGroupModalState={setInviteGroupModalState}
                            setMembersModalState={setMembersModalState}
                            setJoinRequestsModalState={setJoinRequestModalState}
                        />
                    ) : (
                        <GroupSidebar
                            handleFilter={handleFilter}
                            redirect={true}
                        />
                    )}
                    <div className={styles.contentCenter}>
                        <header>
                            <div className={styles.imageBox}>
                                <IoMdReverseCamera
                                    onClick={() => handleBackgroundInput()}
                                    color={"black"}
                                    size={"1.5rem"}
                                />
                                <input
                                    id={"backgroundInput"}
                                    className={"fileInput"}
                                    type={"file"}
                                    multiple={false}
                                    hidden={true}
                                    ref={backgroundInputRef}
                                    onChange={handleBackgroundFile}
                                    accept={"image/*, video/*"}
                                />
                                <img
                                    src={groupBackgroundLoader(group?.background)}
                                    alt={""}
                                />
                            </div>
                            <div className={styles.info}>
                                <div className={styles.top}>
                                    <h2>{group?.name}</h2>
                                    {group?.joined == "joined" && (
                                        <button onClick={() => setInviteGroupModalState(true)}>
                                            <h4>+ Invite</h4>
                                        </button>
                                    )}
                                    {group?.joined == "pending" && (
                                        <button onClick={() => setInviteGroupModalState(true)}>
                                            <h4>Requested</h4>
                                        </button>
                                    )}
                                    {group?.joined == "not accepted" && (
                                        <button onClick={() => setInviteGroupModalState(true)}>
                                            <h4>Accept Invite</h4>
                                        </button>
                                    )}
                                    {group?.joined == "not joined" && (
                                        <button onClick={() => setInviteGroupModalState(true)}>
                                            <h4>Request</h4>
                                        </button>
                                    )}
                                </div>
                                <hr />
                                <nav>
                                    {group?.joined == "joined" ? (
                                        <>
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
                                        </>
                                    ) : (
                                        <div
                                            className={tab == "about" ? styles.tabContentActive : styles.tabContent}
                                            onClick={() => setTab("about")}
                                        >
                                            About
                                        </div>
                                    )}
                                </nav>
                            </div>
                        </header>
                        <article>
                            {tab == "about" && (
                                <div className={styles.about}>
                                    <div className={styles.aboutBox}>
                                        <h3>About</h3>
                                        <p>{group?.about}</p>
                                        <p>
                                            {group?.privacy} • {group?.memberCount} Members
                                        </p>
                                    </div>
                                </div>
                            )}
                            {tab == "discussion" && (
                                <>
                                    <div className={styles.content}>
                                        {group?.joined == "joined" && (
                                            <div className={styles.inputBox}>
                                                <div className={styles.inputHeader}>
                                                    <img
                                                        src={userProfileLoader(auth?.profile)}
                                                        alt={""}
                                                    />
                                                    <button onClick={() => setNewGroupModalState(true)}>What's on your mind?</button>
                                                </div>
                                            </div>
                                        )}
                                        <div className={styles.posts}>
                                            {group?.posts?.map((post, index) => {
                                                if (post)
                                                    return (
                                                        <PostBox
                                                            key={index}
                                                            post={post}
                                                            setCurrPost={setCurrPost}
                                                            setShareModalState={setShareModalState}
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
                            {tab == "files" && (
                                <GroupFileBox
                                    key={group?.id + "file"}
                                    group={group}
                                />
                            )}
                        </article>
                    </div>
                </div>
            </div>
        </>
    );
}
