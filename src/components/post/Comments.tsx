import styles from "@/assets/styles/post/comment.module.scss";
import { Comment, Maybe } from "@/gql/graphql.ts";
import { useState } from "react";
import { IoSend } from "react-icons/io5";
import { useMutation } from "@apollo/client";
import { CREATE_COMMENT } from "@/lib/query/post/createComment.graphql.ts";
import { debouncedError } from "@/controller/errorHandler.ts";
import Reply from "./Reply.tsx";
import { LIKE_COMMENT } from "@/lib/query/post/likeComment.graphql.ts";
import { PiArrowBendDownRightDuotone } from "react-icons/pi";
import { AiFillLike } from "react-icons/ai";
import RichText from "@/components/richText/RichText.tsx";
import domPurify from "@/controller/domPurify.ts";
import useAuth from "@/hooks/use-auth.ts";
import ProfilePicture from "@/components/ProfilePicture.tsx";
import SafeImage from "@/components/SafeImage.tsx";

interface Comments {
  comment: Comment | Maybe<Comment>;
}

export default function Comments({ comment }: Comments) {
  const [showReplyInput, setShowReplyInput] = useState(false);
  const [showReply, setShowReply] = useState(false);
  const [commentContent, setCommentContent] = useState("");
  const [currComment, setCurrComment] = useState(comment);
  const [reset, setReset] = useState(0);
  const { auth } = useAuth();
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
      .catch(debouncedError);
    setReset(reset + 1);
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
      .catch(debouncedError);
  };

  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <ProfilePicture
          user={auth}
          showBox={false}
        />
        <div className={styles.content}>
          <div className={styles.contentBox}>
            <h4>
              {comment?.user.firstName} {comment?.user.lastName}
            </h4>
            {comment?.content && (
              <div
                className={styles.text}
                dangerouslySetInnerHTML={{ __html: domPurify(comment.content) }}
              />
            )}
            {currComment?.likeCount != undefined && currComment?.likeCount > 0 && (
              <div className={styles.like}>
                <AiFillLike size={"1rem"} />
                {currComment?.likeCount}
              </div>
            )}
          </div>
          <div className={styles.buttons}>
            <p
              onClick={() => handleLike()}
              className={currComment?.liked ? styles.liked : ""}>
              Like
            </p>
            <p
              onClick={() => {
                setShowReplyInput(!showReplyInput);
                setShowReply(!showReplyInput);
              }}>
              Reply
            </p>
          </div>
          <>
            {!showReply && currComment?.comments?.length != undefined && currComment?.comments?.length > 0 && (
              <p
                className={styles.reply}
                onClick={() => setShowReply(true)}>
                <PiArrowBendDownRightDuotone size={"1rem"} />
                {currComment?.comments?.length} Replies
              </p>
            )}
            {showReply &&
              currComment?.comments?.map((com) => {
                if (com)
                  return (
                    <Reply
                      key={com.id}
                      c={com}
                      parentId={currComment?.id ? currComment.id : ""}
                      setCurrComment={setCurrComment}
                    />
                  );
              })}
            {showReplyInput && (
              <div className={styles.commentInput}>
                <div className={styles.image}>
                  <SafeImage
                    src={auth?.profile}
                    type={"user-profile"}
                    alt={"profile picture"}
                  />
                </div>
                <div className={styles.commentContainer}>
                  <RichText
                    key={reset}
                    setText={setCommentContent}
                    width={"31rem"}
                    overflow={"hidden"}
                    placeholder={"Write a comment..."}
                  />
                  <div className={styles.commentFooter}>
                    <IoSend
                      size={"1rem"}
                      onClick={() => handleReply()}
                      color={commentContent.length > 8 ? "rgb(0, 100, 244)" : ""}
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
