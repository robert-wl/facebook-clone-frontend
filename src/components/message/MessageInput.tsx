import styles from "@/assets/styles/messages/messageInput.module.scss";
import { FaImages } from "react-icons/fa6";
import { BiSolidMicrophoneAlt } from "react-icons/bi";
import { BsSendFill } from "react-icons/bs";
import { ChangeEvent, Dispatch, SetStateAction, useRef, useState } from "react";
import { useMutation } from "@apollo/client";
import { SEND_MESSAGE } from "@/lib/query/message/sendMessage.graphql.ts";
import uploadStorage from "@/lib/firebase/storage.ts";
import { RxCross2 } from "react-icons/rx";
import { Conversation } from "@/gql/graphql.ts";

interface IProps {
  conversationID: string;
  setConversations: Dispatch<SetStateAction<Conversation[]>>;
}

export default function MessageInput({ setConversations, conversationID }: IProps) {
  const [text, setText] = useState<string>("");
  const imageInputRef = useRef<HTMLInputElement>(null);
  const [sendMessage] = useMutation(SEND_MESSAGE);
  const [image, setImage] = useState<File | null>(null);

  const handleSubmit = async () => {
    if (!image && text.length == 0) {
      return;
    }

    if (image) {
      const url = await uploadStorage("messages", image);
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
          message: text,
        },
      });
    }

    setText("");
    setImage(null);
    setConversations((prev) => {
      return prev.map((conv) => {
        if (conv.id == conversationID) {
          return {
            ...conv,
            lastSentMessageTime: new Date().toISOString(),
            lastMessage: text.length > 0 ? text : "Sent an image",
          };
        }
        return conv;
      });
    });
  };

  const handleImageInput = () => {
    if (imageInputRef.current) {
      imageInputRef.current.click();
    }
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];

      if (!file.type.includes("image")) return;

      setImage(e.target.files[0]);
    }
  };

  return (
    <>
      <div className={styles.inputBoxHolder}>aaa</div>
      <div
        className={styles.imageHolder}
        hidden={!image}
      />
      <div className={styles.inputBox}>
        <FaImages
          size={"1.75rem"}
          onClick={() => handleImageInput()}
        />
        <BiSolidMicrophoneAlt size={"1.75rem"} />
        <input
          type={"text"}
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder={"Aa"}
          accept={"image/*"}
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
          size={"1.5rem"}
        />
        <div
          className={styles.imageUpload}
          hidden={!image}>
          <img
            src={image ? URL.createObjectURL(image) : ""}
            alt={""}
            hidden={!image}
          />
          <RxCross2
            size={"1.3rem"}
            onClick={() => setImage(null)}
          />
        </div>
      </div>
    </>
  );
}
