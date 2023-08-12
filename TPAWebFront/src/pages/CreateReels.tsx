import styles from "../assets/styles/reels/createReels.module.scss";
import Navbar from "../../components/navbar/Navbar.tsx";
import ReelsSidebar from "../../components/reels/ReelsSIdebar.tsx";
import { useState } from "react";
import createToast from "../../controller/toast/handler.ts";
import uploadStorage from "../../controller/firebase/storage.ts";
import { useMutation } from "@apollo/client";
import { CREATE_REEL } from "../../lib/query/reels/createReel.graphql.ts";
import { debouncedError } from "../../controller/errorHandler.ts";

export default function CreateReels() {
    const [video, setVideo] = useState<File | null>(null);
    const [content, setContent] = useState("");
    const [createReel] = useMutation(CREATE_REEL);
    const handleSubmit = async () => {
        if (video && content) {
            const url = await uploadStorage("reels", video);
            await createReel({
                variables: {
                    reel: {
                        content: content,
                        video: url,
                    },
                },
            })
                .then(() => console.log("yay"))
                .catch(debouncedError);
        } else {
            createToast("Error: please fill all the fields", "red");
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
                    <ReelsSidebar
                        setVideo={setVideo}
                        setContent={setContent}
                        handleSubmit={handleSubmit}
                    />
                    <div className={styles.content}>
                        <div className={styles.container}>
                            <div className={styles.containerHor}>
                                <div className={styles.story}>
                                    <div className={video ? styles.storyView : styles.storyEmpty}>
                                        <div className={styles.background}>
                                            {!video && <h3>Insert your video</h3>}
                                            {video && (
                                                <video
                                                    autoPlay={true}
                                                    loop={true}
                                                >
                                                    <source src={URL.createObjectURL(video)} />
                                                </video>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
