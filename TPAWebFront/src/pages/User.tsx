import Loading from "../../components/Loading.tsx";
import styles from "../assets/styles/user/user.module.scss";
import Navbar from "../../components/navbar/Navbar.tsx";
import { ChangeEvent, useContext, useEffect, useState } from "react";
import { LiaBirthdayCakeSolid, LiaUserFriendsSolid } from "react-icons/lia";
import { BsFillPersonPlusFill, BsGenderAmbiguous } from "react-icons/bs";
import { MdOutlineMarkEmailRead } from "react-icons/md";
import { Friend, FriendInput, Maybe, Post } from "../../gql/graphql.ts";
import { User } from "../../gql/graphql";
import PostBox from "../../components/post/PostBox.tsx";
import { useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery } from "@apollo/client";
import { GET_USER } from "../../lib/query/user/getUser.graphql.ts";
import { BiSolidMessageRoundedDetail, BiSolidPencil } from "react-icons/bi";
import { IoMdReverseCamera } from "react-icons/io";
import uploadStorage from "../../controller/firebase/storage.ts";
import { UPDATE_USER_PROFILE } from "../../lib/query/user/updateUserProfile.graphql.ts";
import { UPDATE_USER_BACKGROUND } from "../../lib/query/user/updateUserBackground.graphql.ts";
import errorHandler from "../../controller/errorHandler.ts";
import EditUserModal from "../../components/user/EditUserModal.tsx";
import { AuthContext } from "../../components/context/AuthContextProvider.tsx";
import { ADD_FRIEND } from "../../lib/query/friend/addFriend.graphql.ts";
import { GET_FRIENDS } from "../../lib/query/friend/getFriends.graphql.ts";
import AccFriendBox from "../../components/friend/AccFriendBox.tsx";
import NoFriendBox from "../../components/friend/NoFriendBox.tsx";
import { CREATE_CONVERSATION } from "../../lib/query/message/createConversation.graphql.ts";
import ShareModal from "../../components/ShareModal.tsx";

export default function User() {
    const { username } = useParams();
    const [user, setUser] = useState<User | null>(null);
    const [isPost, setIsPost] = useState(true);
    const [friends, setFriends] = useState<Friend[]>([]);
    const [modalState, setModalState] = useState(false);
    const [currPost, setCurrPost] = useState<Post | null>(null);
    const [shareModalState, setShareModalState] = useState(false);
    const friendCount = {
        all: 0,
        mutuals: 0,
    };
    const { loading } = useQuery(GET_USER, {
        variables: {
            username: username,
        },
        onCompleted: (dat) => {
            setUser(dat.getUser);
        },
        onError: errorHandler,
    });
    const { refetch: getFriends } = useQuery(GET_FRIENDS, {
        skip: true,
    });
    const { auth } = useContext(AuthContext);
    const [updateProfile] = useMutation(UPDATE_USER_PROFILE);
    const [updateBackground] = useMutation(UPDATE_USER_BACKGROUND);
    const [addFriend] = useMutation(ADD_FRIEND);
    const [createConversation] = useMutation(CREATE_CONVERSATION);
    const navigate = useNavigate();

    const handleProfileInput = () => {
        const fileInput = document.getElementById("profileInput") as HTMLInputElement;
        fileInput.click();
    };

    const handleFriend = () => {
        if (user && auth) {
            const friendInput: FriendInput = {
                receiver: user.id,
                sender: auth.id,
            };
            addFriend({
                variables: {
                    friendInput: friendInput,
                },
            })
                .then(() => {
                    if (user.friended == "friends")
                        setUser({
                            ...user,
                            friended: "not friends",
                        });
                    else if (user.friended == "pending")
                        setUser({
                            ...user,
                            friended: "not friends",
                        });
                    else if (user.friended == "not friends")
                        setUser({
                            ...user,
                            friended: "pending",
                        });
                })
                .catch(errorHandler);
        }
    };

    const handleBackgroundInput = () => {
        const fileInput = document.getElementById("backgroundInput") as HTMLInputElement;
        fileInput.click();
    };

    const handleProfileFile = async (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const file = e.target.files[0] as File;

            const url = await uploadStorage("profile", file);

            if (user)
                setUser({
                    ...user,
                    profile: url,
                });

            updateProfile({
                variables: {
                    profile: url,
                },
            });
        }
    };

    const handleBackgroundFile = async (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const file = e.target.files[0] as File;

            const url = await uploadStorage("background", file);

            if (user)
                setUser({
                    ...user,
                    background: url,
                });

            updateBackground({
                variables: {
                    background: url,
                },
            });
        }
    };

    const handleSendMessage = () => {
        createConversation({
            variables: {
                username: username,
            },
        })
            .then((data) => {
                navigate("/messages/" + data.data.createConversation.id);
            })
            .catch(errorHandler);
        // navigate("/message/" + data.data.createConversation.id)
    };

    useEffect(() => {
        if (friends.length == 0 && !isPost) {
            getFriends({
                username: username,
            })
                .then((data) => {
                    setFriends(data.data.getFriends);
                })
                .catch(errorHandler);
        }
    }, [isPost]);

    if (loading) return <></>;
    return (
        <>
            {modalState && (
                <EditUserModal
                    userDat={user!}
                    setUserDat={setUser}
                    setModalState={setModalState}
                />
            )}
            <ShareModal
                shareModalState={shareModalState}
                setShareModalState={setShareModalState}
                currPost={currPost}
            />
            {loading && <Loading />}
            <div
                id={"page"}
                className={styles.page}
            >
                <Navbar />
                <header className={styles.header}>
                    <div className={styles.headerContent}>
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
                            onChange={handleBackgroundFile}
                            accept={"image/*, video/*"}
                        />
                        <img
                            src={user?.background ? user?.background : "https://picsum.photos/200/300"}
                            alt={"profile picture"}
                        />
                        <img
                            src={user?.profile ? user?.profile : "../src/assets/default-profile.jpg"}
                            alt={""}
                        />
                        <div className={styles.circular}>
                            <IoMdReverseCamera
                                onClick={() => handleProfileInput()}
                                color={"black"}
                                size={"1.5rem"}
                            />
                            <input
                                id={"profileInput"}
                                className={"fileInput"}
                                type={"file"}
                                multiple={false}
                                hidden={true}
                                onChange={handleProfileFile}
                                accept={"image/*, video/*"}
                            />
                        </div>
                    </div>
                    <div className={styles.profile}>
                        <div className={styles.text}>
                            <h1>{user?.username}</h1>
                            <p>
                                {user?.firstName} {user?.lastName}
                            </p>
                        </div>
                        {auth?.username == username ? (
                            <button onClick={() => setModalState(true)}>
                                <BiSolidPencil />
                                Edit Profile
                            </button>
                        ) : (
                            <div className={styles.container}>
                                {user?.friended == "friends" && (
                                    <button onClick={() => handleFriend()}>
                                        <BsFillPersonPlusFill />
                                        Remove Friend
                                    </button>
                                )}
                                {user?.friended == "not friends" && (
                                    <button onClick={() => handleFriend()}>
                                        <BsFillPersonPlusFill />
                                        Add Friend
                                    </button>
                                )}
                                {user?.friended == "pending" && (
                                    <button onClick={() => handleFriend()}>
                                        <BsFillPersonPlusFill />
                                        Cancel Request
                                    </button>
                                )}
                                <button onClick={() => handleSendMessage()}>
                                    <BiSolidMessageRoundedDetail
                                        color={"black"}
                                        size={"1rem"}
                                    />
                                    Message
                                </button>
                            </div>
                        )}
                    </div>
                    <div className={styles.info}>
                        <p>
                            <BsGenderAmbiguous
                                color={"black"}
                                size={"1.3rem"}
                            />
                            {user?.gender}
                        </p>
                        <p>
                            <MdOutlineMarkEmailRead
                                color={"black"}
                                size={"1.3rem"}
                            />
                            {user?.email}
                        </p>
                        <p>
                            <LiaBirthdayCakeSolid
                                color={"black"}
                                size={"1.3rem"}
                            />
                            {new Date(user?.dob).toLocaleDateString("en-us", {
                                day: "2-digit",
                                month: "long",
                                year: "numeric",
                            })}
                        </p>
                        <p>
                            <LiaUserFriendsSolid
                                color={"black"}
                                size={"1.3rem"}
                            />
                            {user?.friendCount}
                        </p>
                    </div>
                    <div className={styles.buttons}>
                        <button
                            className={isPost ? styles.active : ""}
                            onClick={() => setIsPost(true)}
                        >
                            Posts
                        </button>
                        <button
                            className={!isPost ? styles.active : ""}
                            onClick={() => setIsPost(false)}
                        >
                            Friends
                        </button>
                    </div>
                </header>
                <div className={isPost ? styles.content : styles.contentFriend}>
                    {isPost ? (
                        <>
                            <div>
                                {user &&
                                    user.posts?.map((post: Maybe<Post>) => {
                                        if (post)
                                            return (
                                                <PostBox
                                                    key={post.id}
                                                    post={post}
                                                    setCurrPost={setCurrPost}
                                                    setShareModalState={setShareModalState}
                                                />
                                            );
                                    })}
                            </div>
                        </>
                    ) : (
                        <div className={styles.contentBox}>
                            <h2>Friend List</h2>
                            <div className={styles.friendList}>
                                {friends.map((friend, index) => {
                                    if (friend.accepted) {
                                        friendCount.all += 1;
                                        return (
                                            <AccFriendBox
                                                key={index}
                                                friend={friend}
                                            />
                                        );
                                    }
                                })}
                                {friendCount.all == 0 && <NoFriendBox description={"You Have no Friends"} />}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}
