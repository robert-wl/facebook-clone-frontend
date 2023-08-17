import { Comment, Maybe } from "../../../gql/graphql.ts";
import styles from "../../assets/styles/post/reply.module.scss";
import { AiFillLike } from "react-icons/ai";
import { Dispatch, SetStateAction, useContext, useState } from "react";
import errorHandler from "../../../controller/errorHandler.ts";
import { useMutation } from "@apollo/client";
import { LIKE_COMMENT } from "../../../lib/query/post/likeComment.graphql.ts";
import domPurify from "../../../controller/domPurify.ts";
import RichText from "../richText/RichText.tsx";
import { IoSend } from "react-icons/io5";
import { AuthContext } from "../context/AuthContextProvider.tsx";
import { CREATE_COMMENT } from "../../../lib/query/post/createComment.graphql.ts";

interface Reply {
    c: Comment | Maybe<Comment>;
    parentId: string;
    setCurrComment: Dispatch<SetStateAction<Comment | null>>;
}

export default function Reply({ c, parentId, setCurrComment }: Reply) {
    const [comment, setComment] = useState(c);
    const [showReplyInput, setShowReplyInput] = useState(false);
    const { auth } = useContext(AuthContext);
    const [likecomment] = useMutation(LIKE_COMMENT);
    const [replyContent, setReplyContent] = useState("");
    const [createComment] = useMutation(CREATE_COMMENT);
    const [reset, setReset] = useState(0);
    const handleLike = () => {
        likecomment({
            variables: {
                id: comment?.id,
            },
        })
            .then(() => {
                if (comment)
                    setComment({
                        ...comment,
                        liked: !comment?.liked,
                        likeCount: comment?.liked ? comment?.likeCount - 1 : comment?.likeCount + 1,
                    });
            })
            .catch(errorHandler);
    };

    const handleReply = () => {
        if (c) {
            const tag = `<a href="user/${c.user.username}" class="wysiwyg-mention" data-mention data-value="${c.user.username}">@${c.user.username}</a>&nbsp;`;

            const modifiedString = replyContent.slice(0, 3) + tag + replyContent.slice(3);
            createComment({
                variables: {
                    newComment: {
                        parentComment: parentId,
                        content: modifiedString,
                    },
                },
            })
                .then((data) => {
                    const newComment = data.data.createComment;
                    setCurrComment((comment) => {
                        console.log(comment);
                        if (comment) {
                            if (comment.comments) {
                                return { ...comment, comments: [...comment.comments, newComment] };
                            }
                            return { ...comment, comments: [newComment] };
                        }
                        return comment;
                    });
                })
                .catch(errorHandler);
            setReset(reset + 1);
        }
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
                        <div dangerouslySetInnerHTML={{ __html: domPurify(comment?.content) }} />
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
                        <p
                            onClick={() => {
                                setShowReplyInput(!showReplyInput);
                            }}
                        >
                            Reply
                        </p>
                    </div>
                    {showReplyInput && (
                        <div className={styles.commentInput}>
                            <div className={styles.image}>
                                <img
                                    src={auth?.profile ? auth?.profile : "../src/assets/default-profile.jpg"}
                                    alt={""}
                                />
                            </div>
                            <div className={styles.commentContainer}>
                                <RichText
                                    key={reset}
                                    setText={setReplyContent}
                                    width={"20rem"}
                                    overflow={"hidden"}
                                    placeholder={"Write a comment..."}
                                />
                                <div className={styles.commentFooter}>
                                    <IoSend
                                        size={"1rem"}
                                        onClick={() => handleReply()}
                                        color={replyContent.length > 8 ? "blue" : ""}
                                        disabled={replyContent.length == 0}
                                    />
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
