import styles from "../assets/styles/story/stories.module.scss";
import Navbar from "../../components/navbar/Navbar.tsx";
import Sidebar from "../../components/sidebar/Sidebar.tsx";
import SidebarButton from "../../components/sidebar/SidebarButton.tsx";
import {FaUserFriends} from "react-icons/fa";
import {useState} from "react";
import {IoAddOutline} from "react-icons/io5";
import {useParams} from "react-router-dom";
import {useQuery} from "@apollo/client";
import {GET_STORIES} from "../../lib/query/story/getStories.graphql.ts";
import {Story} from "../../gql/graphql.ts";
import StoryBox from "../../components/stories/StoryBox.tsx";


export default function Stories(){
    const { username } = useParams();
    const [tab, setTab] = useState("create");
    const [stories, setStories] = useState<Story[]>([]);
    useQuery(GET_STORIES, {
        variables: {
            username: username
        },
        onError: (error) => {
            console.log(error);
        },
        onCompleted: (data) => {
            console.log(data)
            setStories(data.getStories);
        }
    })


    return (
        <>
            <div id={"page"} className={styles.page}>
                <Navbar />
                <div className={styles.content}>
                    <>
                        <Sidebar title={"Stories"}>
                            <>
                                <div className={styles.top}>
                                    My Stories
                                </div>
                                <div
                                    onClick={() => setTab("create")}
                                >
                                    <SidebarButton active={tab == "create"} text={"Create a Story"}>
                                        <IoAddOutline
                                            color={"black"}
                                            size={"1.5rem"}
                                        />
                                    </SidebarButton>
                                </div>
                                <div className={styles.top}>
                                    All Stories
                                </div>
                                <div
                                    onClick={() => setTab("all")}
                                >
                                    <SidebarButton active={tab == "create"} text={"All"}>
                                        <FaUserFriends
                                            color={"black"}
                                            size={"1.5rem"}
                                        />
                                    </SidebarButton>
                                </div>
                            </>
                        </Sidebar>
                    </>
                    <StoryBox stories={stories} />
                </div>
            </div>
        </>
    );
}
