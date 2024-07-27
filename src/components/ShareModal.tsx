import styles from "../assets/styles/shareModal.module.scss";
import { AiOutlineClose, AiOutlineSearch } from "react-icons/ai";
import { useMutation, useQuery } from "@apollo/client";
import { GET_FRIENDS } from "../../lib/query/friend/getFriends.graphql.ts";
import { Dispatch, SetStateAction, useContext, useEffect, useState } from "react";
import { Post, User } from "../../gql/graphql.ts";
import { AuthContext } from "././context/AuthContextProvider";
import { MdOutlineArrowForwardIos } from "react-icons/md";
import { SHARE_POST } from "../../lib/query/post/sharePost.graphql.ts";
import { debouncedError } from "../../controller/errorHandler.ts";
import userProfileLoader from "../../controller/userProfileLoader.ts";

interface ShareModal {
    setShareModalState: Dispatch<SetStateAction<boolean>>;
    currPost: Post | null;
}

export default function ShareModal({ setShareModalState, currPost }: ShareModal) {
    const [friends, setFriends] = useState<User[]>([]);
    const [filteredFriends, setFilteredFriends] = useState<User[]>([]);
    const [sharePost] = useMutation(SHARE_POST);
    const { data } = useQuery(GET_FRIENDS);
    const { auth } = useContext(AuthContext);

    useEffect(() => {
        if (data && auth) {
            const friends: User[] = [];
            for (const user of data.getFriends) {
                friends.push(user);
            }
            setFriends(friends);
            setFilteredFriends(friends);
        }
        console.log(data);
    }, [data]);

    const handleFilter = (filter: string) => {
        const filtered = friends.filter((user) => {
            const name = user.firstName + " " + user.lastName;
            return name.toLowerCase().includes(filter.toLowerCase());
        });

        setFilteredFriends(filtered);
    };

    const handleShare = (userID: string) => {
        setShareModalState(false);
        if (currPost)
            sharePost({
                variables: {
                    user: userID,
                    post: currPost?.id,
                },
            }).catch(debouncedError);
    };

    return (
        <>
            <div className={styles.background}>
                <div className={styles.box}>
                    <header>
                        <h2>Send in Messenger</h2>
                        <AiOutlineClose
                            size={"1.5rem"}
                            onClick={() => setShareModalState(false)}
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
        </>
    );
}
