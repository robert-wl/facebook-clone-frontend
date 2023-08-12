import styles from "../../src/assets/styles/post/comment.module.scss";
import { Comment, Maybe } from "../../gql/graphql.ts";
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContextProvider.tsx";
import { IoSend } from "react-icons/io5";
import { useMutation } from "@apollo/client";
import { CREATE_COMMENT } from "../../lib/query/post/createComment.graphql.ts";
import errorHandler from "../../controller/errorHandler.ts";
import Reply from "./Reply.tsx";
import { LIKE_COMMENT } from "../../lib/query/post/likeComment.ts";
import { PiArrowBendDownRightDuotone } from "react-icons/pi";
import { AiFillLike } from "react-icons/ai";

interface Comments {
    comment: Comment | Maybe<Comment>;
}
export default function Comments({ comment }: Comments) {
    const [showReplyInput, setShowReplyInput] = useState(false);
    const [showReply, setShowReply] = useState(false);
    const [commentContent, setCommentContent] = useState("");
    const [currComment, setCurrComment] = useState(comment);
    const { auth } = useContext(AuthContext);
    const [createComment] = useMutation(CREATE_COMMENT);
    const [likecomment] = useMutation(LIKE_COMMENT);

    const handleReply = () => {
        setCommentContent("");
        createComment({
            variables: {
                newComment: {
                    parentComment: comment?.id,
                    content: commentContent,
                },
            },
        })
            .then((data) => {
                if (currComment && currComment?.comments)
                    setCurrComment({
                        ...currComment,
                        comments: [...currComment.comments, data.data.createComment],
                    });
            })
            .catch(errorHandler);
    };

    const handleLike = () => {
        likecomment({
            variables: {
                id: comment?.id,
            },
        })
            .then(() => {
                if (currComment)
                    setCurrComment({
                        ...currComment,
                        liked: !currComment?.liked,
                        likeCount: currComment?.liked ? currComment?.likeCount - 1 : currComment?.likeCount + 1,
                    });
            })
            .catch(errorHandler);
    };

    return (
        <div className={styles.container}>
            <div className={styles.top}>
                <div className={styles.image}>
                    <img
                        src={comment?.user.profile ? comment.user.profile : "../src/assets/default-profile.jpg"}
                        alt={""}
                    />
                </div>
                <div className={styles.content}>
                    <div className={styles.contentBox}>
                        <h4>
                            {comment?.user.firstName} {comment?.user.lastName}
                        </h4>
                        <p>{comment?.content}</p>
                        {currComment?.likeCount != undefined && currComment?.likeCount > 0 && (
                            <div className={styles.like}>
                                <AiFillLike
                                    color={"#1877f2"}
                                    size={"1rem"}
                                />
                                {currComment?.likeCount}
                            </div>
                        )}
                    </div>
                    <div className={styles.buttons}>
                        <p
                            onClick={() => handleLike()}
                            className={currComment?.liked ? styles.liked : ""}
                        >
                            Like
                        </p>
                        <p
                            onClick={() => {
                                setShowReplyInput(true);
                                setShowReply(true);
                            }}
                        >
                            Reply
                        </p>
                    </div>
                    <>
                        {!showReply && currComment?.comments?.length != undefined && currComment?.comments?.length > 0 && (
                            <p
                                className={styles.reply}
                                onClick={() => setShowReply(true)}
                            >
                                <PiArrowBendDownRightDuotone size={"1rem"} />
                                {currComment?.comments?.length} Replies
                            </p>
                        )}
                        {showReply &&
                            currComment?.comments?.map((com) => {
                                return <Reply c={com} />;
                            })}
                        {showReplyInput && (
                            <div className={styles.commentInput}>
                                <div className={styles.image}>
                                    <img
                                        src={auth?.profile ? auth?.profile : "../src/assets/default-profile.jpg"}
                                        alt={""}
                                    />
                                </div>
                                <div className={styles.commentContainer}>
                                    <textarea
                                        value={commentContent}
                                        onChange={(e) => {
                                            setCommentContent(e.target.value);
                                            e.target.style.height = "fit-content";
                                            e.target.style.height = e.target.scrollHeight + "px";
                                        }}
                                        placeholder={"Write a comment..."}
                                    />
                                    <div className={styles.commentFooter}>
                                        <IoSend
                                            size={"1rem"}
                                            onClick={() => handleReply()}
                                            color={commentContent.length > 0 ? "blue" : ""}
                                            disabled={commentContent.length == 0}
                                        />
                                    </div>
                                </div>
                            </div>
                        )}
                    </>
                </div>
            </div>
        </div>
    );
}
