import styles from "../assets/styles/home/home.module.scss"
import Navbar from "../../components/navbar/Navbar.tsx";
import ProfilePicture from "../../components/ProfilePicture.tsx";
import NewPostModal from "../../components/post/NewPostModal.tsx";
import {useState} from "react";
import PostBox from "../../components/post/PostBox.tsx";
import {GET_POSTS} from "../../lib/query/post/getPosts.graphql.ts";
import {useQuery} from "@apollo/client";
import {Post} from "../../gql/graphql.ts";


export default function Home(){
    const [modalState, setModalState] = useState(false);
    const { data, refetch: getPosts } = useQuery(GET_POSTS);

    return (
        <>
            <NewPostModal
                modalState={modalState}
                setModalState={setModalState}
                refetch={getPosts}
            />
            <div className={styles.page}>
                <Navbar />
                <div className={styles.content}>
                    <div className={styles.myBox}>
                        aa
                    </div>
                    <div className={styles.inputBox}>
                        <div className={styles.inputHeader}>
                            <ProfilePicture />
                            <button
                                onClick={() => setModalState(true)}
                            >
                                What's on your mind?
                            </button>
                        </div>
                    </div>
                    <div>
                        {
                            data && data.getPosts.map((post: Post) => (
                                <PostBox key={post.id} post={post} />
                            ))
                        }
                    </div>
                </div>
            </div>
        </>
    );
}
