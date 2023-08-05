import styles from "../../src/assets/styles/post/post.module.scss";
import ProfilePicture from "../ProfilePicture.tsx";
import {AiFillLike, AiOutlineLike} from "react-icons/ai";
import {GoComment} from "react-icons/go";
import {PiShareFatThin} from "react-icons/pi";
import {Comment, Post} from "../../gql/graphql.ts";
import getTimeDiff from "../../controller/timeConverter.ts";
import ImageCarousel from "../ImageCarousel.tsx";
import {IoSend} from "react-icons/io5";
import {useContext, useState} from "react";
import Comments from "./Comments.tsx";
import {useMutation, useQuery} from "@apollo/client";
import {GET_COMMENT_POST} from "../../lib/query/post/getCommentPost.graphql.ts";
import errorHandler from "../../controller/errorHandler.ts";
import {CREATE_COMMENT} from "../../lib/query/post/createComment.ts";
import {LIKE_POST} from "../../lib/query/post/likePost.graphql.ts";
import {AuthContext} from "../context/AuthContextProvider.tsx";


interface PostBox {
    post: Post
}

export default function PostBox({ post } : PostBox){
    const [comment, setComment] = useState("");
    const [showComment, setShowComment] = useState(false);
    const [liked, setLiked] = useState(post?.liked);
    const [comments, setComments] = useState<Comment[]>([]);
    const { refetch: getCommentPost } = useQuery(GET_COMMENT_POST, {
        skip: true,
        onError: errorHandler
    });
    const auth = useContext(AuthContext);
    const [createComment] = useMutation(CREATE_COMMENT);
    const [likePost] = useMutation(LIKE_POST)
    const [likeCount, setLikeCount] = useState(post?.likeCount);

    const handleShowComment = () => {
        getCommentPost({
            postId: post?.id
        }).
        then((data) => {
            const comments = data.data.getCommentPost;
            setComments(comments);
            setShowComment(true)
        }).
        catch(errorHandler)
    }

    const handleComment = () => {
        setComment("");
        createComment({
            variables: {
                newComment: {
                    parentPost: post?.id,
                    content: comment
                }
            }
        }).
        then((data) => {
            const comment = data.data.createComment
            setComments([...comments, comment])
        }).
        catch(errorHandler)
    }

    const handleLike = () => {
        likePost({
            variables: {
                id: post?.id
            }
        }).
        then(() => {
            setLiked(!liked);
        }).
        catch(errorHandler)
        if(liked) setLikeCount(likeCount - 1)
        else setLikeCount(likeCount + 1);
    }

    return (
        <div className={styles.myBox}>
            <header>
               <ProfilePicture src={post?.user.profile} />
               <div className={styles.bio}>
                    <h4>{ post?.user.firstName } { post?.user.lastName }</h4>
                    <p>{ getTimeDiff(post?.createdAt) }</p>
               </div>
           </header>
            <div className={styles.content}>
                <p>
                    { post?.content }
                </p>
                {
                    post?.files && post?.files.length > 0 && <ImageCarousel files={post.files} />
                }
                <div className={styles.stats}>
                    <div className={styles.left}>
                        <>Liked by { likeCount } people</>
                    </div>
                    <div className={styles.right}>
                        <p>
                            <>{ post?.commentCount } comments</>
                        </p>
                        <p>
                            <>{ post?.shareCount } shares</>
                        </p>
                    </div>
                </div>
                <hr />
                <div className={styles.buttons}>
                    <button>
                        <div
                            onClick={() => handleLike()}
                        >
                            {
                                liked ?
                                <AiFillLike
                                    size={20}
                                    color={"#1877f2"}
                                /> :
                                <AiOutlineLike
                                    size={20}
                                    color={"gray"}
                                    />
                            }
                            <p className={liked ? styles.liked : ""}>
                                Like
                            </p>
                        </div>
                    </button>
                    <div />
                    <button
                        onClick={() => handleShowComment()}
                    >
                        <div>
                            <GoComment
                                size={20}
                                color={"gray"}
                            />
                            <p>
                                Comment
                            </p>
                        </div>
                    </button>
                    <div />
                    <button>
                        <div>
                            <PiShareFatThin
                                size={20}
                                color={"gray"}
                            />
                            <p>
                                Share
                            </p>
                        </div>
                    </button>
                </div>
                <hr />
            </div>
            {
                showComment &&
                <>
                    <div className={styles.commentInput}>
                        <ProfilePicture src={auth?.profile} />
                        <div className={styles.commentContainer}>
                    <textarea
                        value={comment}
                        onChange={(e) => {
                            setComment(e.target.value);
                            e.target.style.height = 'fit-content';
                            e.target.style.height = e.target.scrollHeight + 'px';
                        }}
                        placeholder={"Write a comment..."}
                    />
                            <div className={styles.commentFooter}>
                                <IoSend
                                    size={"1rem"}
                                    onClick={() => handleComment()}
                                    color={comment.length > 0 ? "blue" : ""}
                                    disabled={comment.length == 0}
                                />
                            </div>
                        </div>
                    </div>
                    <div className={styles.comment}>
                        {
                            comments && comments.map((comment) => {
                                return <Comments
                                    key={comment.id}
                                    comment={comment}
                                />
                            })
                        }
                    </div>
                </>
            }
        </div>
    );
}
