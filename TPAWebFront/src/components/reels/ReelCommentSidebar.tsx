import styles from "../../assets/styles/reels/reelCommentSidebar.module.scss";
import { IoSend } from "react-icons/io5";
import { useContext, useState } from "react";
import { Reel, ReelComment } from "../../../gql/graphql.ts";
import { AuthContext } from "../context/AuthContextProvider";
import { debouncedError } from "../../../controller/errorHandler.ts";
import { useMutation, useQuery } from "@apollo/client";
import { CREATE_REEL_COMMENT } from "../../../lib/query/reels/createReelComment.graphql.ts";
import ReelCommentBox from "./ReelComment.tsx";
import { GET_REEL_COMMENTS } from "../../../lib/query/reels/getReelComments.graphql.ts";

interface ReelCommentSidebar {
    reelData: Reel;
}
export default function ReelCommentSidebar({ reelData }: ReelCommentSidebar) {
    const { auth } = useContext(AuthContext);
    const [createReelComment] = useMutation(CREATE_REEL_COMMENT);
    useQuery(GET_REEL_COMMENTS, {
        variables: {
            id: reelData.id,
        },
        onError: (e) => {
            if (!e.message.includes("record not")) debouncedError(e);
        },
        onCompleted: (data) => {
            console.log(data.getReelComments);
            setComments(data.getReelComments);
        },
    });
    const [comments, setComments] = useState<ReelComment[]>([]);
    const [comment, setComment] = useState("");

    const handleComment = () => {
        if (comment.length > 0) {
            createReelComment({
                variables: {
                    comment: {
                        content: comment,
                        parentReel: reelData?.id,
                    },
                },
            })
                .then((data) => {
                    if (comments.length > 0) {
                        setComments([data.data.createReelComment, ...comments]);
                    } else {
                        setComments([data.data.createReelComment]);
                    }
                })
                .catch(debouncedError);
        }
        setComment("");
    };

    return (
        <div className={styles.comments}>
            <header>
                <div className={styles.profile}>
                    <img
                        src={reelData?.user.profile ? reelData?.user.profile : "../src/assets/default-profile.jpg"}
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
                {comments?.map((cmnt) => {
                    return (
                        <ReelCommentBox
                            comment={cmnt}
                            reply={true}
                        />
                    );
                })}
            </div>
            <div className={styles.commentInput}>
                <img
                    src={auth?.profile ? auth.profile : "../src/assets/default-profile.jpg"}
                    alt={""}
                />
                <div className={styles.commentContainer}>
                    <textarea
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        placeholder={"Write a comment..."}
                    />
                    <div
                        onClick={() => handleComment()}
                        className={styles.commentFooter}
                    >
                        <IoSend
                            color={comment.length > 0 ? "blue" : ""}
                            size={"1rem"}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
