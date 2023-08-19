import styles from "../../assets/styles/reels/reelCommentSidebar.module.scss";
import { IoSend } from "react-icons/io5";
import { Dispatch, SetStateAction, useContext, useState } from "react";
import { Reel, ReelComment } from "../../../gql/graphql.ts";
import { AuthContext } from "../context/AuthContextProvider";
import { debouncedError } from "../../../controller/errorHandler.ts";
import { useMutation, useQuery } from "@apollo/client";
import { CREATE_REEL_COMMENT } from "../../../lib/query/reels/createReelComment.graphql.ts";
import ReelCommentBox from "./ReelComment.tsx";
import { GET_REEL_COMMENTS } from "../../../lib/query/reels/getReelComments.graphql.ts";
import RichText from "../richText/RichText.tsx";
import userProfileLoader from "../../../controller/userProfileLoader.ts";

interface ReelCommentSidebar {
    reelData: Reel;
    setReelData: Dispatch<SetStateAction<Reel | null | undefined>>;
}
export default function ReelCommentSidebar({ reelData, setReelData }: ReelCommentSidebar) {
    const { auth } = useContext(AuthContext);
    const [createReelComment] = useMutation(CREATE_REEL_COMMENT);
    useQuery(GET_REEL_COMMENTS, {
        variables: {
            id: reelData.id,
        },
        fetchPolicy: "network-only",
        onError: (e) => {
            if (!e.message.includes("record not")) debouncedError(e);
        },
        onCompleted: (data) => {
            setReelData((prev) => {
                if (!prev) return prev;
                return {
                    ...prev,
                    commentCount: data.getReelComments.length,
                };
            });
            setComments(data.getReelComments);
        },
    });
    const [comments, setComments] = useState<ReelComment[]>([]);
    const [comment, setComment] = useState("");
    const [reset, setReset] = useState(0);

    const handleComment = async () => {
        const commentContent = comment;

        // return console.log(commentContent);
        setComment("");

        if (commentContent.length > 8) {
            const data = await createReelComment({
                variables: {
                    comment: {
                        content: commentContent,
                        parentReel: reelData?.id,
                    },
                },
            }).catch(debouncedError);

            if (!data) return;

            setComments([data.data.createReelComment, ...comments]);
            setReelData((prev) => {
                if (!prev) return prev;
                return {
                    ...prev,
                    commentCount: prev?.commentCount + 1,
                };
            });

            setReset(reset + 1);
        }
    };

    return (
        <div className={styles.comments}>
            <header>
                <div className={styles.profile}>
                    <img
                        src={userProfileLoader(reelData?.user.profile)}
                        alt={""}
                    />
                    <h5>
                        {reelData?.user.firstName} {reelData?.user.lastName}
                    </h5>
                </div>
                <p>{reelData?.content}</p>
                <hr />
            </header>
            <div className={styles.content}>
                {comments?.map((cmnt, index) => {
                    return (
                        <>
                            <ReelCommentBox
                                key={index + cmnt.id}
                                comment={cmnt}
                                reply={true}
                            />
                        </>
                    );
                })}
                {comments.length == 0 && <h5>No comments</h5>}
            </div>
            <div className={styles.commentInput}>
                <img
                    src={userProfileLoader(auth?.profile)}
                    alt={""}
                />
                <div className={styles.commentContainer}>
                    <div className={styles.textarea}>
                        <RichText
                            key={reset}
                            setText={setComment}
                            placeholder={"Write a comment..."}
                            resize={"vertical"}
                            maxWidth={"20rem"}
                        />
                    </div>
                    <div
                        onClick={() => handleComment()}
                        className={comment.length > 8 ? styles.commentFooter : styles.commentFooterDisabled}
                    >
                        <IoSend
                            color={comment.length > 8 ? "rgb(0, 100, 254)" : ""}
                            size={"1rem"}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
