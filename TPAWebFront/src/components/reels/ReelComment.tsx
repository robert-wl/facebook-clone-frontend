import styles from "../../assets/styles/reels/reelComment.module.scss";
import { AiFillLike } from "react-icons/ai";
import { ReelComment } from "../../../gql/graphql.ts";
import { IoSend } from "react-icons/io5";
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContextProvider";
import { useMutation } from "@apollo/client";
import { LIKE_REEL_COMMENT } from "../../../lib/query/reels/likeReelComment.graphql.ts";
import { debouncedError } from "../../../controller/errorHandler.ts";
import { CREATE_REEL_COMMENT } from "../../../lib/query/reels/createReelComment.graphql.ts";
import { PiArrowBendDownRightDuotone } from "react-icons/pi";

interface ReelCommentBox {
    comment: ReelComment;
    reply: boolean;
}
export default function ReelCommentBox({ comment: iComment, reply }: ReelCommentBox) {
    const { auth } = useContext(AuthContext);
    const [comment, setComment] = useState<ReelComment>(iComment);
    const [showReplyInput, setShowReplyInput] = useState(false);
    const [LikeReelComment] = useMutation(LIKE_REEL_COMMENT);
    const [createReelComment] = useMutation(CREATE_REEL_COMMENT);
    const [commentInput, setCommentInput] = useState("");
    const [showReply, setShowReply] = useState(false);

    const handleLike = () => {
        LikeReelComment({
            variables: {
                id: comment.id,
            },
        })
            .then(() => {
                if (comment.liked) {
                    setComment({
                        ...comment,
                        likeCount: comment.likeCount - 1,
                        liked: !comment.liked,
                    });
                } else {
                    setComment({
                        ...comment,
                        likeCount: comment.likeCount + 1,
                        liked: !comment.liked,
                    });
                }
            })
            .catch(debouncedError);
    };

    const handleComment = () => {
        if (commentInput.length > 0) {
            createReelComment({
                variables: {
                    comment: {
                        content: commentInput,
                        parentComment: comment.id,
                    },
                },
            })
                .then((data) => {
                    if (comment.comments?.length && comment.comments.length > 0) {
                        setComment({
                            ...comment,
                            comments: [...comment.comments, data.data.createReelComment],
                        });
                    } else {
                        setComment({
                            ...comment,
                            comments: [data.data.createReelComment],
                        });
                    }
                    console.log("hai");
                    setCommentInput("");
                })
                .catch(debouncedError);
        }
    };

    return (
        <>
            <div className={styles.container}>
                <div className={styles.left}>
                    <img
                        src={comment.user.profile ? comment.user.profile : "../src/assets/default-profile.jpg"}
                        alt={""}
                    />
                </div>
                <div className={styles.content}>
                    <div className={styles.chat}>
                        <h4>
                            {comment.user.firstName}
                            {" " + comment.user.lastName}
                        </h4>
                        <p>{comment.content}</p>
                        {comment?.likeCount != undefined && comment?.likeCount > 0 && (
                            <div className={styles.like}>
                                <AiFillLike
                                    color={"#1877f2"}
                                    size={"1rem"}
                                />
                                {comment?.likeCount}
                            </div>
                        )}
                    </div>
                    <div className={styles.buttons}>
                        <p
                            onClick={() => handleLike()}
                            className={comment?.liked ? styles.liked : ""}
                        >
                            Like
                        </p>
                        {!reply && (
                            <p
                                onClick={() => {
                                    setShowReplyInput(!showReplyInput);
                                }}
                            >
                                Reply
                            </p>
                        )}
                    </div>
                    {!showReply && comment?.comments?.length != undefined && comment?.comments?.length > 0 && (
                        <p
                            className={styles.reply}
                            onClick={() => setShowReply(true)}
                        >
                            <PiArrowBendDownRightDuotone size={"1rem"} />
                            {comment?.comments?.length} Replies
                        </p>
                    )}
                    {showReplyInput && (
                        <div className={styles.commentInput}>
                            <img
                                src={auth?.profile ? auth.profile : "../src/assets/default-profile.jpg"}
                                alt={""}
                            />
                            <div className={styles.commentContainer}>
                                <textarea
                                    value={commentInput}
                                    onChange={(e) => setCommentInput(e.target.value)}
                                    placeholder={"Write a comment..."}
                                />
                                <div
                                    onClick={() => handleComment()}
                                    className={styles.commentFooter}
                                >
                                    <IoSend
                                        color={commentInput.length > 0 ? "blue" : ""}
                                        size={"1rem"}
                                    />
                                </div>
                            </div>
                        </div>
                    )}
                    {showReply &&
                        comment.comments &&
                        comment.comments.length > 0 &&
                        comment.comments.map((comment) => {
                            if (comment)
                                return (
                                    <ReelCommentBox
                                        comment={comment}
                                        reply={true}
                                    />
                                );
                        })}
                </div>
            </div>
        </>
    );
}
