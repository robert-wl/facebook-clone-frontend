import styles from "../../assets/styles/shareModal.module.scss";
import { AiOutlineClose, AiOutlineSearch } from "react-icons/ai";
import { Dispatch, SetStateAction, useContext, useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import { GET_FRIENDS } from "../../../lib/query/friend/getFriends.graphql.ts";
import { Friend, User } from "../../../gql/graphql.ts";
import { AuthContext } from "../context/AuthContextProvider.tsx";

interface TagFriendModal {
    setTagModalState: Dispatch<SetStateAction<boolean>>;
    tagList: User[];
    setTagList: Dispatch<SetStateAction<User[]>>;
}
export default function TagFriendModal({ setTagModalState, tagList, setTagList }: TagFriendModal) {
    const [friends, setFriends] = useState<User[]>([]);
    const [filteredFriends, setFilteredFriends] = useState<User[]>([]);
    const { auth } = useContext(AuthContext);
    const { data } = useQuery(GET_FRIENDS);

    useEffect(() => {
        if (data && auth) {
            const friendList = data.getFriends.map((friend: Friend) => {
                if (friend.sender.id.toString() != auth.id.toString()) {
                    return friend.sender;
                }
                return friend.receiver;
            });
            setFriends(friendList);
            setFilteredFriends(friendList);
        }
    }, [data, auth]);

    const handleCheck = (user: User) => {
        if (tagList.includes(user)) {
            const newList = tagList.filter((u) => u.id.toString() != user.id.toString());
            setTagList(newList);
        } else {
            setTagList([...tagList, user]);
        }
    };

    const handleFilter = (value: string) => {
        const filtered = friends.filter((user) => {
            const name = `${user.firstName} ${user.lastName}`;
            return name.toLowerCase().includes(value.toLowerCase());
        });
        setFilteredFriends(filtered);
    };
    return (
        <>
            <div className={styles.background}>
                <div className={styles.box}>
                    <header>
                        <h2>Tag Friends</h2>
                        <AiOutlineClose
                            size={"1.5rem"}
                            onClick={() => setTagModalState(false)}
                        />
                    </header>
                    <hr />
                    <div>
                        <div className={styles.content}>
                            <AiOutlineSearch size={"1.2rem"} />
                            <input
                                type={"text"}
                                placeholder={"Search friends..."}
                                onChange={(e) => handleFilter(e.target.value)}
                            />
                        </div>
                        <h4 onClick={() => setTagModalState(false)}>Done</h4>
                    </div>
                    <div className={styles.friendList}>
                        {filteredFriends.map((user, index) => {
                            return (
                                <div
                                    key={index}
                                    className={styles.friend}
                                    onClick={() => handleCheck(user)}
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
                                    <input
                                        checked={tagList.includes(user)}
                                        type={"checkbox"}
                                        value={user.id}
                                        onChange={() => handleCheck(user)}
                                    />
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </>
    );
}
