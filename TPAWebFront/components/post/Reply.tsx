import {Comment, Maybe} from "../../gql/graphql";
import styles from "../../src/assets/styles/post/reply.module.scss";
import {AiFillLike} from "react-icons/ai";
import {useState} from "react";
import errorHandler from "../../controller/errorHandler.ts";
import {useMutation} from "@apollo/client";
import {LIKE_COMMENT} from "../../lib/query/post/likeComment.ts";


interface Reply {
    c: Comment | Maybe<Comment>,
}

export default function Reply({ c } : Reply){
    const [comment, setComment] = useState(c);
    const [likecomment] = useMutation(LIKE_COMMENT);
    const handleLike = () => {
        likecomment({
            variables: {
                id: comment?.id
            }
        }).
        then(() => {
            if(comment)
                setComment({
                    ...comment,
                    liked: !comment?.liked,
                    likeCount: comment?.liked ? comment?.likeCount - 1 : comment?.likeCount + 1
                });
        }).
        catch(errorHandler)
    }

    return (
        <div className={styles.container}>
            <div className={styles.top}>
                <div className={styles.image}>
                    <img src={comment?.user.profile ? comment.user.profile : "../src/assets/default-profile.jpg"} alt={""}/>
                </div>
                <div className={styles.content}>
                    <div className={styles.contentBox}>
                        <h4>{comment?.user.firstName} {comment?.user.lastName}</h4>
                        <p>{comment?.content}</p>
                        {
                            comment?.likeCount != undefined && comment?.likeCount > 0 &&
                            <div className={styles.like}>
                                <AiFillLike
                                    color={"#1877f2"}
                                    size={"1rem"}

                                />
                                { comment?.likeCount }
                            </div>
                        }
                    </div>
                    <div className={styles.buttons}>
                        <p
                            onClick={() => handleLike()}
                            className={comment?.liked ? styles.liked : ""}
                        >
                            Like
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
