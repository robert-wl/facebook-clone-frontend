import { ChangeEvent, useContext, useState } from "react";
import styles from "../../assets/styles/story/createStory.module.scss";
import Navbar from "../../components/navbar/Navbar.tsx";
import Sidebar from "../../components/sidebar/Sidebar.tsx";
import SidebarButton from "../../components/sidebar/SidebarButton.tsx";
import { IoAddOutline } from "react-icons/io5";
import CreateStories from "../../components/stories/CreateStories.tsx";
import StorySidebar from "../../components/sidebar/StorySidebar.tsx";
import { useMutation, useQuery } from "@apollo/client";
import { CREATE_IMAGE_STORY } from "../../../lib/query/story/createImageStory.graphql.ts";
import { CREATE_TEXT_STORY } from "../../../lib/query/story/createTextStory.graphql.ts";
import errorHandler from "../../../controller/errorHandler.ts";
import uploadStorage from "../../../controller/firebase/storage.ts";
import { User } from "../../../gql/graphql.ts";
import { GET_USER_WITH_STORIES } from "../../../lib/query/story/getUserWithStories.graphql.ts";
import { Link } from "react-router-dom";
import { AuthContext } from "../../components/context/AuthContextProvider.tsx";

export interface Content {
    text: string;
    font: string;
    color: string;
}

export default function CreateStory() {
    const [tab, setTab] = useState("create");
    const [content, setContent] = useState<Content>({
        text: "Start typing...",
        font: "normal",
        color: "lightblue",
    });
    const [image, setImage] = useState<File>();
    const [createTextStory] = useMutation(CREATE_TEXT_STORY);
    const [createImageStory] = useMutation(CREATE_IMAGE_STORY);
    const [friends, setFriends] = useState<User[]>([]);
    const { auth } = useContext(AuthContext);

    useQuery(GET_USER_WITH_STORIES, {
        onCompleted: (data) => {
            console.log(data);
            setFriends(Array.from(new Set(data.getUserWithStories)));
        },
        onError: errorHandler,
    });

    const handleImage = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const file = e.target.files[0];
            setImage(file);
            setTab("image");
        }
    };

    const handleSubmit = async () => {
        if (tab == "text") {
            createTextStory({
                variables: {
                    story: {
                        text: content.text,
                        font: content.font,
                        color: content.color,
                    },
                },
            })
                .then(() => {
                    setTab("create");
                })
                .catch(errorHandler);
        } else if (tab == "image") {
            if (image) {
                const url = await uploadStorage("story", image);
                createImageStory({
                    variables: {
                        story: {
                            image: url,
                        },
                    },
                })
                    .then(() => {
                        console.log("udah");
                        setTab("create");
                    })
                    .catch(errorHandler);
            }
        }
    };

    return (
        <>
            <div
                id={"page"}
                className={styles.page}
            >
                <Navbar />
                <div className={styles.content}>
                    {tab == "create" && (
                        <>
                            <Sidebar title={"Stories"}>
                                <>
                                    <div className={styles.top}>My Stories</div>
                                    <div onClick={() => setTab("all")}>
                                        <SidebarButton
                                            active={true}
                                            text={"Create a Story"}
                                        >
                                            <IoAddOutline
                                                color={"black"}
                                                size={"1.5rem"}
                                            />
                                        </SidebarButton>
                                    </div>
                                    {friends.length > 0 &&
                                        friends.map((friend, index) => {
                                            if (auth?.username == friend.username)
                                                return (
                                                    <div
                                                        key={index}
                                                        className={styles.friend}
                                                        onClick={() => setTab("all")}
                                                    >
                                                        <Link to={"/stories/" + friend.username}>
                                                            <SidebarButton
                                                                active={false}
                                                                text={friend.firstName + " " + friend.lastName}
                                                            >
                                                                <img
                                                                    src={friend.profile!}
                                                                    alt={""}
                                                                />
                                                            </SidebarButton>
                                                        </Link>
                                                    </div>
                                                );
                                        })}
                                    <div className={styles.top}>All Stories</div>
                                    {friends.length > 0 &&
                                        friends.map((friend, index) => {
                                            if (auth?.username != friend.username)
                                                return (
                                                    <div
                                                        key={index}
                                                        className={styles.friend}
                                                        onClick={() => setTab("all")}
                                                    >
                                                        <Link to={"/stories/" + friend.username}>
                                                            <SidebarButton
                                                                active={false}
                                                                text={friend.firstName + " " + friend.lastName}
                                                            >
                                                                <img
                                                                    src={friend.profile!}
                                                                    alt={""}
                                                                />
                                                            </SidebarButton>
                                                        </Link>
                                                    </div>
                                                );
                                        })}
                                </>
                            </Sidebar>
                            <CreateStories
                                setTab={setTab}
                                handleImage={handleImage}
                            />
                        </>
                    )}
                    {tab == "text" && (
                        <>
                            <StorySidebar
                                title={"Stories"}
                                content={content}
                                setContent={setContent}
                                tab={tab}
                                setTab={setTab}
                                handleSubmit={handleSubmit}
                            />
                            <div className={styles.content}>
                                <div className={styles.container}>
                                    <div className={styles.containerHor}>
                                        <div className={styles.story}>
                                            <div className={styles.storyView}>
                                                <div
                                                    style={{
                                                        backgroundColor: content.color,
                                                        fontFamily: content.font == "roman" ? "Times New Roman" : "Arial, serif",
                                                    }}
                                                    className={styles.background}
                                                >
                                                    <p>{content.text}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </>
                    )}
                    {tab == "image" && (
                        <>
                            <StorySidebar
                                title={"Stories"}
                                content={content}
                                setContent={setContent}
                                tab={tab}
                                setTab={setTab}
                                handleSubmit={handleSubmit}
                            />
                            <div className={styles.content}>
                                <div className={styles.container}>
                                    <div className={styles.containerHor}>
                                        <div className={styles.story}>
                                            <div className={styles.storyView}>
                                                <div
                                                    style={{
                                                        backgroundColor: tab == "image" ? "black" : content.color,
                                                        fontFamily: content.font == "roman" ? "Times New Roman" : "normal",
                                                    }}
                                                    className={styles.background}
                                                >
                                                    {image && (
                                                        <img
                                                            src={URL.createObjectURL(image)}
                                                            alt={""}
                                                        />
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </>
    );
}
