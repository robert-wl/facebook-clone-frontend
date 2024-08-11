import styles from "@/assets/styles/reels/reelComment.module.scss";
import { ReelComment } from "@/gql/graphql.ts";
import { IoSend } from "react-icons/io5";
import { Dispatch, SetStateAction, useState } from "react";
import { useMutation } from "@apollo/client";
import { LIKE_REEL_COMMENT } from "@/lib/query/reels/likeReelComment.graphql.ts";
import { debouncedError } from "@/utils/error-handler.ts";
import { CREATE_REEL_COMMENT } from "@/lib/query/reels/createReelComment.graphql.ts";
import { PiArrowBendDownRightDuotone } from "react-icons/pi";
import RichText from "@/components/richText/RichText.tsx";
import { Link } from "react-router-dom";
import LikeLabel from "@/components/post/LikeLabel.tsx";
import useAuth from "@/hooks/use-auth.ts";
import SafeImage from "@/components/SafeImage.tsx";
import { domPurify } from "@/utils/rich-text-utils.ts";

interface IProps {
  comment: ReelComment;
  parent?: ReelComment;
  reply: boolean;
  setComment?: Dispatch<SetStateAction<ReelComment>>;
}

export default function ReelCommentBox({ comment: iComment, reply, parent, setComment: setParentComment }: IProps) {
  const { auth } = useAuth();
  const [comment, setComment] = useState<ReelComment>(iComment);
  const [showReplyInput, setShowReplyInput] = useState(false);
  const [LikeReelComment] = useMutation(LIKE_REEL_COMMENT);
  const [createReelComment] = useMutation(CREATE_REEL_COMMENT);
  const [commentInput, setCommentInput] = useState("");
  const [showReply, setShowReply] = useState(false);
  const [reset, setReset] = useState(0);

  const handleLike = async () => {
    await LikeReelComment({
      variables: {
        id: comment.id,
      },
    }).catch(debouncedError);

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
  };

  const handleComment = async () => {
    if (reply) {
      const data = await createReelComment({
        variables: {
          comment: {
            content: commentInput,
            parentComment: comment.id,
          },
        },
      }).catch(debouncedError);

      setCommentInput("");
      setReset(reset + 1);

      if (!data) {
        return;
      }

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
    } else {
      if (!parent) return;
      const replyContent = commentInput;
      const tag = `<a href="/user/${parent.user.username}" class="wysiwyg-mention" data-mention data-value="${parent.user.username}">@${parent.user.username}</a>&nbsp;`;

      const modifiedString = replyContent.slice(0, 3) + tag + replyContent.slice(3);
      const data = await createReelComment({
        variables: {
          comment: {
            content: modifiedString,
            parentComment: parent.id,
          },
        },
      }).catch(debouncedError);

      setCommentInput("");
      setReset(reset + 1);
      if (!data) return;
      if (!setParentComment) return;

      setParentComment((prev) => {
        if (!prev) return prev;
        if (prev.comments) {
          return {
            ...prev,
            comments: [data.data.createReelComment, ...prev.comments],
          };
        } else {
          return {
            ...prev,
            comments: [data.data.createReelComment],
          };
        }
      });
    }
  };

  return (
    <>
      <div className={styles.container}>
        <div className={styles.left}>
          <Link to={"/user/" + comment.user.username}>
            <SafeImage
              src={comment.user.profile}
              type={"user-profile"}
              alt={"profile picture"}
            />
          </Link>
        </div>
        <div className={styles.content}>
          <div className={styles.chat}>
            <h4>
              {comment.user.firstName}
              {" " + comment.user.lastName}
            </h4>
            <div dangerouslySetInnerHTML={{ __html: domPurify(comment.content) }} />
            {!!comment?.likeCount && comment?.likeCount > 0 && <LikeLabel count={comment.likeCount} />}
          </div>
          <div className={styles.buttons}>
            <p
              onClick={() => handleLike()}
              className={comment?.liked ? styles.liked : ""}>
              Like
            </p>
            <p onClick={() => setShowReplyInput(!showReplyInput)}>Reply</p>
          </div>
          {!showReply && !!comment?.comments?.length && comment?.comments?.length > 0 && (
            <p
              className={styles.reply}
              onClick={() => setShowReply(true)}>
              <PiArrowBendDownRightDuotone size={"1rem"} />
              {comment?.comments?.length} Replies
            </p>
          )}
          {showReplyInput && (
            <div className={styles.commentInput}>
              <SafeImage
                src={auth?.profile}
                type={"user-profile"}
                alt={"profile picture"}
              />
              <div className={styles.commentContainer}>
                <div className={styles.textarea}>
                  <RichText
                    key={reset}
                    setText={setCommentInput}
                    placeholder={"Write a comment..."}
                  />
                </div>
                <div
                  onClick={() => handleComment()}
                  className={commentInput.length > 8 ? styles.commentFooter : styles.commentFooterDisabled}>
                  <IoSend
                    color={commentInput.length > 8 ? "rgb(0, 100, 254)" : ""}
                    size={"1rem"}
                  />
                </div>
              </div>
            </div>
          )}
          {showReply &&
            comment.comments?.map((comment) => {
              if (comment)
                return (
                  <ReelCommentBox
                    key={comment.id}
                    comment={comment}
                    reply={false}
                    parent={iComment}
                    setComment={setComment}
                  />
                );
            })}
        </div>
      </div>
    </>
  );
}
