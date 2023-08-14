import styles from "../../assets/styles/friends/friends.module.scss";
import Navbar from "../../components/navbar/Navbar.tsx";
import { useContext, useState } from "react";
import Sidebar from "../../components/sidebar/Sidebar.tsx";
import { useMutation, useQuery } from "@apollo/client";
import { GET_FRIENDS } from "../../../lib/query/friend/getFriends.graphql.ts";
import { Friend } from "../../../gql/graphql.ts";
import errorHandler from "../../../controller/errorHandler.ts";
import { ACCEPT_FRIEND } from "../../../lib/query/friend/acceptFriend.graphql.ts";
import { REJECT_FRIEND } from "../../../lib/query/friend/rejectFriend.graphql.ts";
import SidebarButton from "../../components/sidebar/SidebarButton.tsx";
import { FaUserFriends } from "react-icons/fa";
import { BsFillPersonCheckFill, BsFillPersonFill, BsFillPersonPlusFill } from "react-icons/bs";
import { AuthContext } from "../../components/context/AuthContextProvider.tsx";
import FriendBox from "../../components/friend/FriendBox.tsx";
import NoFriendBox from "../../components/friend/NoFriendBox.tsx";
import AccFriendBox from "../../components/friend/AccFriendBox.tsx";

export default function Friends() {
    const [friends, setFriends] = useState<Friend[]>([]);
    const { auth } = useContext(AuthContext);
    const [acceptFriend] = useMutation(ACCEPT_FRIEND);
    useQuery(GET_FRIENDS, {
        onCompleted: (data) => {
            setFriends(data.getFriends);
        },
        onError: errorHandler,
    });
    const [rejectFriend] = useMutation(REJECT_FRIEND);
    const [tab, setTab] = useState("all");
    const friendCount = {
        request: 0,
        recommendation: 0,
        all: 0,
    };

    const handleAccept = (friend: Friend) => {
        acceptFriend({
            variables: {
                friend: friend.sender.id,
            },
        })
            .then(() => {
                const nFriend = {
                    ...friend,
                    accepted: true,
                };
                const newFriends = friends.map((f) => {
                    if (f.sender.id.toString() === nFriend.sender.id.toString()) {
                        return nFriend;
                    }
                    return f;
                });
                setFriends(newFriends);
            })
            .catch(errorHandler);
    };

    const handleDeny = (friend: Friend) => {
        rejectFriend({
            variables: {
                friend: friend.sender.id,
            },
        })
            .then(() => {
                const newFriends = friends.filter((f) => {
                    return f.sender.id.toString() !== friend.sender.id.toString();
                });
                setFriends(newFriends);
            })
            .catch(errorHandler);
    };

    return (
        <>
            <div
                id={"page"}
                className={styles.page}
            >
                <Navbar />
                <div className={styles.content}>
                    <Sidebar title={"Friends"}>
                        <>
                            <div onClick={() => setTab("all")}>
                                <SidebarButton
                                    active={tab == "all"}
                                    text={"All"}
                                >
                                    <FaUserFriends
                                        color={"black"}
                                        size={"1.5rem"}
                                    />
                                </SidebarButton>
                            </div>
                            <div onClick={() => setTab("request")}>
                                <SidebarButton
                                    active={tab == "request"}
                                    text={"Requests"}
                                >
                                    <BsFillPersonPlusFill
                                        color={"black"}
                                        size={"1.5rem"}
                                    />
                                </SidebarButton>
                            </div>
                            <div onClick={() => setTab("recommendation")}>
                                <SidebarButton
                                    active={tab == "reccomendation"}
                                    text={"Recommendation"}
                                >
                                    <BsFillPersonCheckFill
                                        color={"black"}
                                        size={"1.5rem"}
                                    />
                                </SidebarButton>
                            </div>
                            <div onClick={() => setTab("friend")}>
                                <SidebarButton
                                    active={tab == "friend"}
                                    text={"All Friends"}
                                >
                                    <BsFillPersonFill
                                        color={"black"}
                                        size={"1.5rem"}
                                    />
                                </SidebarButton>
                            </div>
                        </>
                    </Sidebar>
                    <div className={styles.contentBox}>
                        {(tab == "all" || tab == "request") && (
                            <>
                                <h2>Friend Requests</h2>
                                <div className={styles.friendList}>
                                    {friends.map((friend, index) => {
                                        if (auth && !friend.accepted && friend.sender.id.toString() !== auth?.id.toString()) {
                                            friendCount.request += 1;
                                            return (
                                                <FriendBox
                                                    key={index}
                                                    friend={friend}
                                                    handleAccept={handleAccept}
                                                    handleDeny={handleDeny}
                                                />
                                            );
                                        }
                                    })}
                                    {friendCount.request == 0 && <NoFriendBox description={"No Friend Requests"} />}
                                </div>
                            </>
                        )}
                        {(tab == "all" || tab == "recommendation") && (
                            <>
                                <h2>Friend Recommendation</h2>
                                <div className={styles.friendList}>
                                    {friends.map((friend, index) => {
                                        if (!friend.accepted) {
                                            friendCount.recommendation += 1;
                                            return (
                                                <FriendBox
                                                    key={index}
                                                    friend={friend}
                                                    handleAccept={handleAccept}
                                                    handleDeny={handleDeny}
                                                />
                                            );
                                        }
                                    })}
                                    {friendCount.recommendation == 0 && <NoFriendBox description={"No Friend Recommendation"} />}
                                </div>
                            </>
                        )}
                        {(tab == "all" || tab == "friend") && (
                            <>
                                <h2>All Friends</h2>
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
                            </>
                        )}
                        <h1> a</h1>
                    </div>
                </div>
            </div>
        </>
    );
}
