import styles from "@/assets/styles/group/groupDetail.module.scss";
import Navbar from "@/components/navbar/Navbar.tsx";
import GroupDetailSidebar from "@/components/group/GroupDetailSidebar.tsx";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery } from "@apollo/client";
import { GET_GROUP } from "@/lib/query/group/getGroup.graphql.ts";
import { debouncedError } from "@/utils/error-handler.ts";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { Group, Post } from "@/../gql/graphql.ts";
import PostBox from "@/components/post/PostBox.tsx";
import NewGroupPostModal from "@/components/group/NewGroupPostModal.tsx";
import InviteGroupModal from "@/components/group/InviteGroupModal.tsx";
import ShareModal from "@/components/ShareModal.tsx";
import GroupSidebar from "@/components/group/GroupSidebar.tsx";
import { IoMdReverseCamera } from "react-icons/io";
import uploadStorage from "@/lib/firebase/storage.ts";
import { UPDATE_GROUP_BACKGROUND } from "@/lib/query/group/updateGroupBackground.graphql.ts";
import GroupFileBox from "@/components/group/GroupFileBox.tsx";
import JoinRequestsModal from "@/components/group/JoinRequestsModal.tsx";
import MembersModal from "@/components/group/MembersModal.tsx";
import GroupUser from "@/components/group/GroupUser.tsx";
import { HANDLE_REQUEST } from "@/lib/query/group/handleRequest.graphql.ts";
import { LEAVE_GROUP } from "@/lib/query/group/leaveGroup.graphql.ts";
import { toast } from "react-toastify";
import promiseToast from "@/lib/toast/promiseToast.ts";
import useAuth from "@/hooks/use-auth.ts";
import SafeImage from "@/components/SafeImage.tsx";

export default function GroupDetail() {
  const navigate = useNavigate();
  const [currPost, setCurrPost] = useState<Post | null>(null);
  const [newGroupModalState, setNewGroupModalState] = useState(false);
  const [shareModalState, setShareModalState] = useState(false);
  const [inviteGroupModalState, setInviteGroupModalState] = useState(false);
  const [joinRequestModalState, setJoinRequestModalState] = useState(false);
  const [membersModalState, setMembersModalState] = useState(false);
  const [group, setGroup] = useState<Group>({} as Group);
  const [tab, setTab] = useState("discussion");
  const [updateGroupBackground] = useMutation(UPDATE_GROUP_BACKGROUND);
  const [handleRequest] = useMutation(HANDLE_REQUEST);
  const [leaveGroup] = useMutation(LEAVE_GROUP);
  const backgroundInputRef = useRef<HTMLInputElement>(null);
  const { auth } = useAuth();
  const { groupId } = useParams();
  const { data, refetch, loading } = useQuery(GET_GROUP, {
    variables: {
      id: groupId,
    },
    fetchPolicy: "network-only",
    onError: debouncedError,
  });

  console.log(data);
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

      if (!file.type.includes("image")) return;
      const url = await uploadStorage("group/background", file);

      if (group) {
        setGroup({
          ...group,
          background: url,
        });
        await updateGroupBackground({
          variables: {
            id: groupId,
            background: url,
          },
        }).catch(debouncedError);

        toast.success("Successfully updated group background");
      }
    }
  };

  const handleRequestJoin = async () => {
    await handleRequest({
      variables: {
        id: group.id,
      },
    }).catch(debouncedError);
    await refetch().catch(debouncedError);
  };

  const handleLeave = async () => {
    const data = await leaveGroup({
      variables: {
        group: group.id,
      },
    }).catch(debouncedError);

    const result = data?.data?.leaveGroup;

    if (result == "success") {
      toast.success("Successfully left group");
      navigate(`/group`);
    } else if (result == "not allowed") {
      toast.error("You are not allowed to leave this group");
    }
  };

  console.log(!loading, group?.members?.length == 0);
  if (!loading && group?.members?.length == 0) return <Navigate to={`${import.meta.env.VITE_ROOT_URL}/group`} />;

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
      <NewGroupPostModal
        modalState={newGroupModalState}
        setModalState={setNewGroupModalState}
        setGroup={setGroup}
      />
      {shareModalState && (
        <ShareModal
          setShareModalState={setShareModalState}
          currPost={currPost}
        />
      )}
      <div
        key={"mainPage"}
        className={styles.page}>
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
              setFilter={handleFilter}
              filter={""}
              redirect={true}
            />
          )}
          <div className={styles.contentCenter}>
            <header>
              <div className={styles.imageBox}>
                {group.isAdmin && (
                  <IoMdReverseCamera
                    onClick={() => handleBackgroundInput()}
                    color={"black"}
                    size={"1.5rem"}
                  />
                )}
                <input
                  id={"backgroundInput"}
                  className={"fileInput"}
                  type={"file"}
                  multiple={false}
                  hidden={true}
                  ref={backgroundInputRef}
                  onChange={(e) => promiseToast(() => handleBackgroundFile(e))}
                  accept={"image/*"}
                />
                <SafeImage
                  src={group.background}
                  type={"group-background"}
                />
              </div>
              <div className={styles.info}>
                <div className={styles.top}>
                  <h2>{group?.name}</h2>
                  {group?.joined == "joined" && <button onClick={() => promiseToast(handleLeave)}>Leave Group</button>}
                  {group?.joined == "pending" && (
                    <button
                      onClick={() => setInviteGroupModalState(true)}
                      disabled={true}>
                      Requested
                    </button>
                  )}
                  {group?.joined == "not accepted" && <button onClick={() => handleRequestJoin()}>Accept Invite</button>}
                  {group?.joined == "not joined" && <button onClick={() => handleRequestJoin()}>Request</button>}
                </div>
                <hr />
                <nav>
                  {group?.joined == "joined" ? (
                    <>
                      <button
                        className={tab == "discussion" ? styles.tabContentActive : styles.tabContent}
                        onClick={() => setTab("discussion")}>
                        Discussion
                      </button>
                      <button
                        className={tab == "files" ? styles.tabContentActive : styles.tabContent}
                        onClick={() => setTab("files")}>
                        Files
                      </button>
                      <button
                        className={tab == "people" ? styles.tabContentActive : styles.tabContent}
                        onClick={() => setTab("people")}>
                        People
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        className={tab == "about" ? styles.tabContentActive : styles.tabContent}
                        onClick={() => setTab("about")}>
                        About
                      </button>
                      <button
                        className={tab == "people" ? styles.tabContentActive : styles.tabContent}
                        onClick={() => setTab("people")}>
                        People
                      </button>
                    </>
                  )}
                </nav>
              </div>
            </header>
            <article>
              {tab == "people" && (
                <>
                  <GroupUser
                    key={"groupUser rawrr"}
                    group={group}
                  />
                </>
              )}
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
                          <SafeImage
                            src={auth?.profile}
                            type={"user-profile"}
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
                              setGroup={setGroup}
                              isAdmin={group.isAdmin}
                            />
                          );
                      })}
                      {group.posts?.length == 0 && (
                        <>
                          <h4>No Posts</h4>
                        </>
                      )}
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
