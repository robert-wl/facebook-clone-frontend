import Loading from "../../components/Loading.tsx";
import styles from "../assets/styles/friends/friends.module.scss";
import Navbar from "../../components/navbar/Navbar.tsx";
import {useContext, useState} from "react";
import {AuthContext} from "../../components/context/AuthContextProvider.tsx";
import Sidebar from "../../components/sidebar/Sidebar.tsx";
import FriendBox from "../../components/friend/FriendBox.tsx";
import {useQuery} from "@apollo/client";
import {GET_FRIENDS} from "../../lib/query/friend/getFriends.graphql.ts";
import {Friend} from "../../gql/graphql.ts";
import errorHandler from "../../controller/errorHandler.ts";


export default function Friends(){
    const [loading, setLoading] = useState(false);
    const [friends, setFriends] = useState<Friend[]>([]);
    useQuery(GET_FRIENDS, {
        onCompleted: (data) => {
            setFriends(data.getFriends)
        },
        onError: errorHandler
    })
    const auth = useContext(AuthContext);

    return (
        <>
            {
                loading && <Loading />
            }
            <div id={"page"} className={styles.page}>
                <Navbar />
                <div className={styles.content}>
                    <Sidebar />
                    <div className={styles.contentBox}>
                        <h2>
                            Friend Requests
                        </h2>
                        <div className={styles.friendList}>
                            {
                                friends.map((friend) => {
                                    if(!friend.accepted){
                                        return (
                                            <FriendBox friend={friend} />
                                        )
                                    }
                                })
                            }
                        </div>
                        <h2>
                            Friend Recommendation
                        </h2>
                        <div className={styles.friendList}>
                            {
                                friends.map((friend) => {
                                    if(!friend.accepted){
                                        return (
                                            <FriendBox friend={friend} />
                                        )
                                    }
                                })
                            }
                        </div>
                        <h2>
                            All Friends
                        </h2>
                        <div className={styles.friendList}>
                            {
                                friends.map((friend) => {
                                    if(friend.accepted){
                                        return (
                                            <FriendBox friend={friend} />
                                        )
                                    }
                                })
                            }
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
