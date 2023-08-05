import styles from "../assets/styles/home/home.module.scss"
import Navbar from "../../components/navbar/Navbar.tsx";
import ProfilePicture from "../../components/ProfilePicture.tsx";
import NewPostModal from "../../components/post/NewPostModal.tsx";
import {useContext, useEffect, useState} from "react";
import PostBox from "../../components/post/PostBox.tsx";
import {GET_POSTS} from "../../lib/query/post/getPosts.graphql.ts";
import {useQuery} from "@apollo/client";
import {Post} from "../../gql/graphql.ts";
import errorHandler from "../../controller/errorHandler.ts";
import Loading from "../../components/Loading.tsx";
import {AuthContext} from "../../components/context/AuthContextProvider.tsx";
import {debounce} from "../../controller/debouncer.ts";
import PostSkeleton from "../../components/post/PostSkeleton.tsx";


export default function Home(){
    const [modalState, setModalState] = useState(false);
    const [data, setData] = useState<Post[]>([]);
    const [hideSkeleton, setHideSkeleton] = useState(false);
    let start = 3;
    const { refetch: getPosts } = useQuery(GET_POSTS, {
        variables: {
            pagination: {
                start: 0,
                limit: 3
            }
        },
        onCompleted: (dat) => {
            const result = dat.getPosts;

            if(result.length == 0) setHideSkeleton(true);
            setData([...data, ...result]);
        },
        onError: errorHandler,
        skip: start > 3
    });
    const [loading, setLoading] = useState(false);
    const auth = useContext(AuthContext)



    const handleFetch = () => {
        getPosts({
            pagination: {
                start: start,
                limit: 3
            }
        }).
        then(() => {

            console.log(start)
            start += 3;
        }).
        catch(errorHandler)
    }



    const debouncedHandleScroll = debounce(handleFetch, 50);
    let scrollElement: HTMLElement | null;
    const handleScroll = () => {

        console.log(start)
        if(scrollElement) {
            const scrollTop = scrollElement.scrollTop;
            const windowHeight = window.innerHeight || document.documentElement.clientHeight;
            const totalHeight = scrollElement.scrollHeight;

            // console.log(data)
            if(!(scrollTop + windowHeight + 700 >= totalHeight)) {
                return
            }
            debouncedHandleScroll();
        }
    }

    useEffect(() => {
        scrollElement = document.getElementById("page");
        scrollElement?.addEventListener("scroll", handleScroll);
        return () => {
            scrollElement?.addEventListener("scroll", handleScroll);
        }
    }, []);
    return (
        <>
            {
                loading && <Loading />
            }
            <NewPostModal
                modalState={modalState}
                setModalState={setModalState}
                setData={setData}
                data={data}
                setLoading={setLoading}
            />
            <div id={"page"} className={styles.page}>
                <Navbar />
                <div className={styles.content}>
                    <div className={styles.myBox}>
                        aa
                    </div>
                    <div className={styles.inputBox}>
                        <div className={styles.inputHeader}>
                            <ProfilePicture src={auth?.profile} />
                            <button
                                onClick={() => setModalState(true)}
                            >
                                What's on your mind?
                            </button>
                        </div>
                    </div>
                    <div>
                        {
                            data.map((post: Post) => (
                                <PostBox key={post.id} post={post} />
                            ))
                        }
                        {
                           !hideSkeleton && <PostSkeleton />
                        }
                    </div>
                </div>
            </div>
        </>
    );
}
