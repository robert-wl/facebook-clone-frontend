import styles from "@/assets/styles/post/post.module.scss";
import ProfilePicture from "@/components/ProfilePicture.tsx";
import { AiFillLike, AiOutlineLike } from "react-icons/ai";
import { GoComment } from "react-icons/go";
import { PiShareFatThin } from "react-icons/pi";
import { Comment, Group, Post } from "@/gql/graphql.ts";
import getTimeDiff from "@/controller/timeConverter.ts";
import ImageCarousel from "@/components/ImageCarousel.tsx";
import { IoSend } from "react-icons/io5";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import Comments from "./Comments.tsx";
import { useMutation, useQuery } from "@apollo/client";
import { GET_COMMENT_POST } from "@/lib/query/post/getCommentPost.graphql.ts";
import { debouncedError } from "@/controller/errorHandler.ts";
import { CREATE_COMMENT } from "@/lib/query/post/createComment.graphql.ts";
import { LIKE_POST } from "@/lib/query/post/likePost.graphql.ts";
import RichText from "@/components/richText/RichText.tsx";
import domPurify from "@/controller/domPurify.ts";
import { FiTrash2 } from "react-icons/fi";
import { DELETE_POST } from "@/lib/query/post/deletePost.graphql.ts";
import GroupProfilePicture from "@/components/GroupProfilePicture.tsx";
import useAuth from "@/hooks/use-auth.ts";

interface PostBox {
  post: Post;
  setCurrPost: Dispatch<SetStateAction<Post | null>>;
  setShareModalState: Dispatch<SetStateAction<boolean>>;
  setPostList?: Dispatch<SetStateAction<Post[]>>;
  setGroup?: Dispatch<SetStateAction<Group>>;
  isAdmin?: boolean;
  isGroup?: boolean;
}

export default function PostBox({ post: postN, setCurrPost, setShareModalState, setPostList, setGroup, isAdmin, isGroup }: PostBox) {
  const [post, setPost] = useState<Post | null>(null);
  const [comment, setComment] = useState("");
  const [showComment, setShowComment] = useState(false);
  const [comments, setComments] = useState<Comment[]>([]);
  const { refetch: getCommentPost } = useQuery(GET_COMMENT_POST, {
    skip: true,
    onError: debouncedError,
  });
  const { auth } = useAuth();
  const [createComment] = useMutation(CREATE_COMMENT);
  const [likePost] = useMutation(LIKE_POST);
  const [deletePost] = useMutation(DELETE_POST);
  const [reset, setReset] = useState(0);

  const handleShowComment = () => {
    getCommentPost({
      postId: post?.id,
    })
      .then((data) => {
        const comments = data.data.getCommentPost;
        setComments(comments);
        setShowComment(true);
      })
      .catch(debouncedError);
  };

  const handleComment = () => {
    setComment("");
    createComment({
      variables: {
        newComment: {
          parentPost: post?.id,
          content: comment,
        },
      },
    })
      .then((data) => {
        const comment = data.data.createComment;
        setComments([...comments, comment]);
      })
      .catch(debouncedError);

    setReset(reset + 1);
  };

  useEffect(() => {
    if (postN) {
      setPost(postN);
    }
  }, [postN]);

  const handleLike = () => {
    likePost({
      variables: {
        id: post?.id,
      },
    }).catch(debouncedError);
    if (post?.liked)
      setPost((prev) => {
        if (!prev) return prev;
        return {
          ...prev,
          likeCount: prev!.likeCount - 1,
          liked: false,
        };
      });
    else
      setPost((prev) => {
        if (!prev) return prev;
        return {
          ...prev,
          likeCount: prev!.likeCount + 1,
          liked: true,
        };
      });
  };

  const handleShare = () => {
    setCurrPost(post);
    setShareModalState(true);

    if (post)
      setPost({
        ...post,
        shareCount: post.shareCount + 1,
      });
  };

  const handleDelete = async () => {
    await deletePost({
      variables: {
        id: post?.id,
      },
    }).catch(debouncedError);

    if (setPostList) {
      setPostList((prev) => {
        return prev.filter((p) => p.id != post?.id);
      });
    } else if (setGroup) {
      setGroup((prev) => {
        if (!prev) return prev;
        return {
          ...prev,
          posts: prev.posts!.filter((p) => p!.id != post?.id),
        };
      });
    }
  };

  if (post)
    return (
      <div className={styles.myBox}>
        <header>
          {isGroup ? (
            <>
              <GroupProfilePicture group={post!.group!} />
            </>
          ) : (
            <>
              <ProfilePicture
                user={post!.user!}
                showBox={false}
              />
            </>
          )}
          {(auth?.username == post?.user.username || isAdmin) && (
            <div className={styles.delete}>
              <FiTrash2
                size={"1.5rem"}
                onClick={() => handleDelete()}
              />
            </div>
          )}
          <div className={styles.bio}>
            <h4>
              {isGroup ? (
                <>{post?.group?.name}</>
              ) : (
                <>
                  {post?.user.firstName} {post?.user.lastName}
                  {!!post.postTags?.length && !!post.postTags[0] && (
                    <>
                      {post.postTags?.length > 0 && <span> is with </span>}
                      {post.postTags?.length == 1 && <>{post.postTags[0].user.firstName + " " + post.postTags[0].user.lastName}</>}
                      {post.postTags.length > 1 && (
                        <>
                          <b>{post.postTags[0].user.firstName + " " + post.postTags[0].user.lastName} </b>{" "}
                          <span>and {post.postTags.length - 1} others</span>
                        </>
                      )}
                    </>
                  )}
                </>
              )}
            </h4>
            <p>{getTimeDiff(post?.createdAt)}</p>
          </div>
        </header>
        <div className={styles.content}>
          <div
            className={styles.text}
            dangerouslySetInnerHTML={{ __html: domPurify(post?.content) }}
          />
          {post?.files && post?.files.length > 0 && (
            <ImageCarousel
              key={post.id}
              files={post.files}
            />
          )}
          <div className={styles.stats}>
            <div className={styles.left}>
              <>Liked by {post.likeCount} people</>
            </div>
            <div className={styles.right}>
              <p>
                <>{post?.commentCount} comments</>
              </p>
              <p>
                <>{post?.shareCount} shares</>
              </p>
            </div>
          </div>
          <hr />
          <div className={styles.buttons}>
            <button onClick={() => handleLike()}>
              <div>
                {post.liked ? (
                  <AiFillLike
                    size={20}
                    color={"#1877f2"}
                  />
                ) : (
                  <AiOutlineLike
                    size={20}
                    color={"gray"}
                  />
                )}
                <p className={post.liked ? styles.liked : ""}>Like</p>
              </div>
            </button>
            <div />
            <button onClick={() => handleShowComment()}>
              <div>
                <GoComment
                  size={20}
                  color={"gray"}
                />
                <p>Comment</p>
              </div>
            </button>
            <div />
            <button onClick={() => handleShare()}>
              <div>
                <PiShareFatThin
                  size={20}
                  color={"gray"}
                />
                <p>Share</p>
              </div>
            </button>
          </div>
          <hr />
        </div>
        {showComment && (
          <>
            <div className={styles.commentInput}>
              <ProfilePicture
                user={auth}
                showBox={false}
              />
              <div className={styles.commentContainer}>
                <RichText
                  key={reset}
                  setText={setComment}
                  width={"100%"}
                  overflow={"hidden"}
                  placeholder={"Write a comment..."}
                />
                <div className={styles.commentFooter}>
                  <IoSend
                    size={"1rem"}
                    onClick={() => handleComment()}
                    color={comment.length > 8 ? "rgb(0, 100, 244)" : ""}
                    disabled={comment.length == 8}
                  />
                </div>
              </div>
            </div>
            <div className={styles.comment}>
              {comments &&
                comments.map((comment) => {
                  return (
                    <Comments
                      key={comment.id}
                      comment={comment}
                    />
                  );
                })}
            </div>
          </>
        )}
      </div>
    );
}
