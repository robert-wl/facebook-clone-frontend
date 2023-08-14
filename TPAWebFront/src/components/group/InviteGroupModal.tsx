import { Dispatch, SetStateAction, useContext, useEffect, useState } from "react";
import { Post, User } from "../../../gql/graphql.ts";
import { useMutation, useQuery } from "@apollo/client";
import { SHARE_POST } from "../../../lib/query/post/sharePost.graphql.ts";
import { GET_FRIENDS } from "../../../lib/query/friend/getFriends.graphql.ts";
import { AuthContext } from "../context/AuthContextProvider.tsx";
import errorHandler, { debouncedError } from "../../../controller/errorHandler.ts";
import styles from "../../assets/styles/shareModal.module.scss";
import { AiOutlineClose, AiOutlineSearch } from "react-icons/ai";
import { MdOutlineArrowForwardIos } from "react-icons/md";
import { GET_GROUP_INVITE } from "../../../lib/query/group/getGroupInvite.graphql.ts";
import { useParams } from "react-router-dom";

interface InviteGroupModal {
    inviteModalState: boolean;
    setInviteModalState: Dispatch<SetStateAction<boolean>>;
}

export default function InviteGroupModal({ inviteModalState, setInviteModalState }: InviteGroupModal) {
    const { groupId } = useParams();
    const [friends, setFriends] = useState<User[]>([]);
    const [filteredFriends, setFilteredFriends] = useState<User[]>([]);
    const { data } = useQuery(GET_GROUP_INVITE, {
        variables: {
            id: groupId,
        },
        onError: debouncedError,
    });
    const { auth } = useContext(AuthContext);

    useEffect(() => {
        if (data && auth) {
            setFriends(data.getGroupInvite);
            setFilteredFriends(data.getGroupInvite);
        }
    }, [data]);

    console.log("hai");
    const handleFilter = (filter: string) => {
        const filtered = friends.filter((user) => {
            const name = user.firstName + " " + user.lastName;
            return name.toLowerCase().includes(filter.toLowerCase());
        });

        setFilteredFriends(filtered);
    };

    const handleShare = (userID: string) => {};

    return (
        <>
            {inviteModalState && (
                <div className={styles.background}>
                    <div className={styles.box}>
                        <header>
                            <h2>Send in Messenger</h2>
                            <AiOutlineClose
                                size={"1.5rem"}
                                onClick={() => setInviteModalState(false)}
                            />
                        </header>
                        <hr />
                        <div className={styles.content}>
                            <AiOutlineSearch size={"1.2rem"} />
                            <input
                                type={"text"}
                                placeholder={"Search friends..."}
                                onChange={(e) => handleFilter(e.target.value)}
                            />
                        </div>
                        <div className={styles.friendList}>
                            {filteredFriends.map((user, index) => {
                                return (
                                    <div
                                        key={index}
                                        className={styles.friend}
                                        onClick={() => handleShare(user.id)}
                                    >
                                        <div>
                                            <img
                                                src={user.profile ? user.profile : "../src/assets/default-profile.jpg"}
                                                alt={"profile picture"}
                                            />
                                            <span>
                                                {user.firstName} {user.lastName}
                                            </span>
                                        </div>
                                        <MdOutlineArrowForwardIos />
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
