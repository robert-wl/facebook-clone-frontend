import styles from "../../assets/styles/richText/richText.module.scss";
import { Editor } from "react-draft-wysiwyg";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { convertToRaw, EditorState } from "draft-js";
import { useQuery } from "@apollo/client";
import { GET_USERS } from "../../../lib/query/user/getUsers.graphql.ts";
import { User } from "../../../gql/graphql.ts";
import draftToHtml from "draftjs-to-html";

export interface MentionSuggestion {
    text: string;
    value: string;
    url: string;
}

interface RichText {
    setText: Dispatch<SetStateAction<string>>;
}

export default function RichText({ setText }: RichText) {
    const [editorState, setEditorState] = useState(EditorState.createEmpty());
    const [suggestion, setSuggestion] = useState<MentionSuggestion[]>([]);
    const { data } = useQuery(GET_USERS);

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
                    height: "9rem",
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
