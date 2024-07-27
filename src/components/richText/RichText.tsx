import styles from "@/assets/styles/richText/richText.module.scss";
import {Editor} from "react-draft-wysiwyg";
import {Dispatch, SetStateAction, useEffect, useState} from "react";
import {convertToRaw, EditorState} from "draft-js";
import {useQuery} from "@apollo/client";
import {GET_USERS} from "@/lib/query/user/getUsers.graphql.ts";
import {User} from "@/gql/graphql.ts";
import draftToHtml from "draftjs-to-html";

export interface MentionSuggestion {
  text: string;
  value: string;
  url: string;
}

interface RichText {
  setText: Dispatch<SetStateAction<string>>;
  placeholder: string;
  height?: string;
  width?: string;
  overflow?: "hidden";
  minHeight?: string;
  maxWidth?: string;
  resize?: "vertical" | "horizontal" | "none";
}

export default function RichText({
                                   setText,
                                   height,
                                   width,
                                   overflow,
                                   minHeight,
                                   placeholder,
                                   resize,
                                   maxWidth
                                 }: RichText) {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [suggestion, setSuggestion] = useState<MentionSuggestion[]>([]);
  const {data} = useQuery(GET_USERS);

  useEffect(() => {
    if (data) {
      const users = data.getUsers as User[];
      const suggestionList: MentionSuggestion[] = [];
      for (const user of users) {
        const suggestion: MentionSuggestion = {
          text: user.username,
          url: "/user/" + user.username,
          value: user.username,
        };

        suggestionList.push(suggestion);
      }

      setSuggestion(suggestionList);
    }
  }, [data]);

  useEffect(() => {
    const rawContentState = convertToRaw(editorState.getCurrentContent());
    const markup = draftToHtml(rawContentState, {
      trigger: "#",
      separator: " ",
    });
    setText(markup);
  }, [editorState]);

  return (
    <>
      <Editor
        editorState={editorState}
        onEditorStateChange={(editorState) => setEditorState(editorState)}
        editorClassName={styles.editor}
        editorStyle={{
          paddingLeft: "0",
          height: height ? height : "fit-content",
          margin: "0",
          padding: "0",
          width: width ? width : "100%",
          overflowY: overflow ? overflow : "auto",
          overflowWrap: "anywhere",
          resize: resize ? resize : "vertical",
          maxWidth: maxWidth ? maxWidth : "100%",
          minHeight: minHeight ? minHeight : "fit-content",
          zIndex: "20",
        }}
        placeholder={placeholder}
        wrapperStyle={{
          margin: "0",
          padding: "0",
        }}
        toolbarStyle={{
          display: "none",
          backgroundColor: "transparent",
        }}
        toolbarClassName={styles.toolbar}
        toolbar={{
          options: [],
        }}
        mention={{
          separator: " ",
          trigger: "@",
          suggestions: suggestion,
        }}
        hashtag={{
          separator: " ",
          trigger: "#",
        }}
      />
    </>
  );
}
