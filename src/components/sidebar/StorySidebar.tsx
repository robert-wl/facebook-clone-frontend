import styles from "../../assets/styles/sidebar/sidebarStory.module.scss";
import { Dispatch, SetStateAction, useContext } from "react";
import { AuthContext } from "../context/AuthContextProvider.tsx";
import ColorButton from "../stories/ColorButton.tsx";
import { Content } from "../../pages/story/CreateStory.tsx";
import userProfileLoader from "../../controller/userProfileLoader.ts";

interface Sidebar {
    title: string;
    content: Content;
    setContent: Dispatch<SetStateAction<Content>>;
    tab: string;
    setTab: Dispatch<SetStateAction<string>>;
    handleSubmit: () => void;
    loading: boolean;
}
export default function StorySidebar({ title, content, setContent, tab, setTab, handleSubmit, loading }: Sidebar) {
    const { auth } = useContext(AuthContext);

    return (
        <>
            <div className={styles.barSpace} />
            <div className={styles.bar}>
                <header>
                    <div className={styles.bio}>
                        <h2>{title}</h2>
                    </div>
                </header>
                <div className={styles.profile}>
                    <img
                        src={userProfileLoader(auth?.profile)}
                        alt={""}
                    />
                    <h3>{auth?.username}</h3>
                </div>
                <hr />
                {tab == "text" ? (
                    <div className={styles.content}>
                        <textarea
                            placeholder={"Start typing..."}
                            onChange={(e) => setContent({ ...content, text: e.target.value })}
                        />
                        <select
                            value={content.font}
                            className={content.font == "normal" ? "" : styles.roman}
                            onChange={(e) => setContent({ ...content, font: e.target.value })}
                        >
                            <option value={"normal"}>Normal</option>
                            <option value={"roman"}>Roman</option>
                        </select>
                        <div className={styles.background}>
                            <header>Background</header>
                            <div className={styles.content}>
                                <ColorButton
                                    color={"lightblue"}
                                    content={content}
                                    setContent={setContent}
                                />
                                <ColorButton
                                    color={"pink"}
                                    content={content}
                                    setContent={setContent}
                                />
                                <ColorButton
                                    color={"lightgray"}
                                    content={content}
                                    setContent={setContent}
                                />
                                <ColorButton
                                    color={"orange"}
                                    content={content}
                                    setContent={setContent}
                                />
                            </div>
                        </div>
                        <footer>
                            <div className={styles.buttons}>
                                <button onClick={() => setTab("create")}>Cancel</button>
                                <button onClick={() => handleSubmit()}>Post</button>
                            </div>
                            <hr />
                        </footer>
                    </div>
                ) : (
                    <div className={styles.contentImage}>
                        <footer>
                            <hr />
                            <div className={styles.buttons}>
                                <button onClick={() => setTab("create")}>Cancel</button>
                                <button
                                    disabled={loading}
                                    onClick={() => {
                                        setTab("image");
                                        handleSubmit();
                                    }}
                                >
                                    {loading ? "Posting..." : "Post"}
                                </button>
                            </div>
                        </footer>
                    </div>
                )}
            </div>
        </>
    );
}
