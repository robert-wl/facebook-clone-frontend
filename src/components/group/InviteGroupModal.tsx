import { Dispatch, SetStateAction, useContext, useEffect, useState } from "react";
import { User } from "../../../gql/graphql.ts";
import { useMutation, useQuery } from "@apollo/client";
import { AuthContext } from "../context/AuthContextProvider.tsx";
import { debouncedError } from "../../controller/errorHandler.ts";
import styles from "../../assets/styles/shareModal.module.scss";
import { AiOutlineClose, AiOutlineSearch } from "react-icons/ai";
import { MdOutlineArrowForwardIos } from "react-icons/md";
import { GET_GROUP_INVITE } from "../../../lib/query/group/getGroupInvite.graphql.ts";
import { useParams } from "react-router-dom";
import { INVITE_TO_GROUP } from "../../../lib/query/group/inviteToGroup.graphql.ts";
import userProfileLoader from "../../controller/userProfileLoader.ts";

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
    const [inviteToGroup] = useMutation(INVITE_TO_GROUP);
    const { auth } = useContext(AuthContext);

    useEffect(() => {
        if (data && auth) {
            setFriends(data.getGroupInvite);
            setFilteredFriends(data.getGroupInvite);
        }
    }, [data]);

    const handleFilter = (filter: string) => {
        const filtered = friends.filter((user) => {
            const name = user.firstName + " " + user.lastName;
            return name.toLowerCase().includes(filter.toLowerCase());
        });

        setFilteredFriends(filtered);
    };

    const handleInvite = async (userID: string) => {
        await inviteToGroup({
            variables: {
                groupId: groupId,
                userId: userID,
            },
        }).catch(debouncedError);
        setInviteModalState(false);
    };

    return (
        <>
            {inviteModalState && (
                <div className={styles.background}>
                    <div className={styles.box}>
                        <header>
                            <h2>Invite to group</h2>
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
                                        onClick={() => handleInvite(user.id)}
                                    >
                                        <div>
                                            <img
                                                src={userProfileLoader(user.profile)}
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
