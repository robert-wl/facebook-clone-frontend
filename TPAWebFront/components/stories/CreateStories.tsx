import styles from "../../src/assets/styles/story/createStories.module.scss";
import { IoImagesSharp } from "react-icons/io5";
import { PiTextAaBold } from "react-icons/pi";
import { ChangeEvent, Dispatch, SetStateAction, useRef } from "react";

interface CreateStories {
    setTab: Dispatch<SetStateAction<string>>;
    handleImage: (e: ChangeEvent<HTMLInputElement>) => void;
}

export default function CreateStories({ setTab, handleImage }: CreateStories) {
    const inputRef = useRef<HTMLInputElement>(null);
    const handleFile = () => {
        if (inputRef.current) {
            inputRef.current.click();
        }
    };

    return (
        <div className={styles.content}>
            <div className={styles.container}>
                <div className={styles.boxContainer}>
                    <div
                        className={styles.box}
                        onClick={() => handleFile()}
                    >
                        <div className={styles.button}>
                            <IoImagesSharp size={"1.5rem"} />
                            <h4>Create a Photo Story</h4>
                            <input
                                ref={inputRef}
                                type={"file"}
                                hidden={true}
                                onChange={handleImage}
                            />
                        </div>
                    </div>
                    <div
                        className={styles.box}
                        onClick={() => setTab("text")}
                    >
                        <div className={styles.button}>
                            <PiTextAaBold size={"1.5rem"} />
                            <h4>Create a Text Story</h4>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
