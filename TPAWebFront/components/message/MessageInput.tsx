import styles from "../../src/assets/styles/messages/messageInput.module.scss";
import { FaImages } from "react-icons/fa6";
import { BiSolidMicrophoneAlt } from "react-icons/bi";
import { BsSendFill } from "react-icons/bs";
import { useRef, useState } from "react";
import { useMutation } from "@apollo/client";
import { SEND_MESSAGE } from "../../lib/query/message/sendMessage.graphql.ts";
import { AiOutlineClose } from "react-icons/ai";
import uploadStorage from "../../controller/firebase/storage.ts";

interface MessageInput {
    conversationID: string;
}

export default function MessageInput({ conversationID }: MessageInput) {
    const [text, setText] = useState<string>("");
    const imageInputRef = useRef<HTMLInputElement>(null);
    const [sendMessage] = useMutation(SEND_MESSAGE);
    const [image, setImage] = useState<File | null>(null);

    const handleSubmit = async () => {
        const currImage = image;
        const currText = text;
        setText("");
        setImage(null);
        if (currImage) {
            const url = await uploadStorage("messages", currImage);
            await sendMessage({
                variables: {
                    convID: conversationID,
                    image: url,
                },
            });
        }
        if (text.length > 0) {
            await sendMessage({
                variables: {
                    convID: conversationID,
                    message: currText,
                },
            });
        }
    };

    const handleImageInput = () => {
        if (imageInputRef.current) {
            imageInputRef.current.click();
        }
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setImage(e.target.files[0]);
        }
    };

    return (
        <>
            <div className={styles.inputBoxHolder}>aaa</div>
            <div
                className={styles.imageHolder}
                hidden={!image}
            >
                a
            </div>
            <div className={styles.inputBox}>
                <FaImages
                    size={"1.75rem"}
                    color={"blue"}
                    onClick={() => handleImageInput()}
                />
                <BiSolidMicrophoneAlt
                    size={"1.75rem"}
                    color={"blue"}
                />
                <input
                    type={"text"}
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder={"Aa"}
                    onKeyDown={(e) => {
                        if (e.key == "Enter") {
                            handleSubmit();
                        }
                    }}
                />
                <input
                    type={"file"}
                    hidden={true}
                    ref={imageInputRef}
                    multiple={false}
                    onChange={handleImageChange}
                />
                <BsSendFill
                    onClick={() => handleSubmit()}
                    size={"1.75rem"}
                    color={"blue"}
                />
                <div
                    className={styles.imageUpload}
                    hidden={!image}
                >
                    <img
                        src={image ? URL.createObjectURL(image) : ""}
                        alt={""}
                        hidden={!image}
                    />
                    <AiOutlineClose
                        size={"1.3rem"}
                        color={"black"}
                        onClick={() => setImage(null)}
                    />
                </div>
            </div>
        </>
    );
}
