import styles from "../../assets/styles/reels/reelsSidebar.module.scss";
import { Dispatch, SetStateAction, useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../context/AuthContextProvider";
import { RiVideoAddFill } from "react-icons/ri";
import createToast from "../../../controller/toast/handler.ts";

interface ReelsSidebar {
    setVideo: Dispatch<SetStateAction<File | null>>;
    content: string;
    setContent: Dispatch<SetStateAction<string>>;
    handleSubmit: () => void;
}

export default function ReelsSidebar({ setVideo, content, setContent, handleSubmit }: ReelsSidebar) {
    const { auth } = useContext(AuthContext);
    const videoInputRef = useRef<HTMLInputElement>(null);
    const [currVideo, setCurrVideo] = useState<File | null>(null);
    const handleInputClick = () => {
        if (videoInputRef.current) {
            videoInputRef.current.click();
        }
    };

    useEffect(() => {
        if (currVideo) {
            if (currVideo && currVideo.type !== "video/mp4") {
                createToast("Error: video must be in mp4 format", "red");
                return;
            }

            const videoHTML = document.createElement("video");

            videoHTML.onloadedmetadata = () => {
                if (videoHTML.duration > 60) {
                    createToast("Error: video must be less than 60 seconds", "red");
                    return;
                } else if (videoHTML.duration < 1) {
                    createToast("Error: video must be at least 1 second", "red");
                    return;
                }
                setVideo(currVideo);
            };
            videoHTML.src = URL.createObjectURL(currVideo);
        }
    }, [currVideo]);

    return (
        <>
            <div className={styles.barSpace} />
            <div className={styles.bar}>
                <header>
                    <div className={styles.bio}>
                        <h2>Create Reels</h2>
                    </div>
                </header>
                <div className={styles.profile}>
                    <img
                        src={auth?.profile ?? ""}
                        alt={""}
                    />
                    <h3>{auth?.username}</h3>
                </div>
                <hr />
                <div
                    className={styles.content}
                    onClick={() => handleInputClick()}
                >
                    <div>
                        <RiVideoAddFill size={"1.75rem"} />
                        <h4>Upload a Video</h4>
                    </div>
                    <input
                        ref={videoInputRef}
                        type={"file"}
                        accept={"video/*"}
                        hidden={true}
                        onChange={(e) => setCurrVideo(e.target.files ? e.target.files[0] : null)}
                    />
                </div>
                <textarea
                    className={styles.caption}
                    placeholder={"Describe your reel..."}
                    onChange={(e) => setContent(e.target.value)}
                />
                <footer>
                    <hr />
                    <div className={styles.buttons}>
                        <button>Cancel</button>
                        <button
                            disabled={content == ""}
                            onClick={() => handleSubmit()}
                        >
                            Post
                        </button>
                    </div>
                </footer>
            </div>
        </>
    );
}
