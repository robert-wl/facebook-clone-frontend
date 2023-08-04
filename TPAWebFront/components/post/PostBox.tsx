import styles from "../../src/assets/styles/post/post.module.scss";
import ProfilePicture from "../ProfilePicture.tsx";
import {AiOutlineLike} from "react-icons/ai";
import {GoComment} from "react-icons/go";
import {PiShareFatThin} from "react-icons/pi";
import {Post} from "../../gql/graphql.ts";
import getTimeDiff from "../timeConverter.ts";
import ImageCarousel from "../ImageCarousel.tsx";


export default function PostBox({ post } : { post: Post }){


    return (
        <div className={styles.myBox}>
            <header>
               <ProfilePicture />
               <div className={styles.bio}>
                    <h4>{ post.user.firstName } { post.user.lastName }</h4>
                    <p>{ getTimeDiff(post.createdAt) }</p>
               </div>
           </header>
            <div className={styles.content}>
                <p>
                    { post.content }
                </p>
                {
                    post?.files && <ImageCarousel files={post.files} />
                }
                <div className={styles.stats}>
                    <div className={styles.left}>
                        {
                            post.likeCount > 0 &&
                            <>Liked by { post.likeCount } people</>
                        }
                    </div>
                    <div className={styles.right}>
                        <p>
                            {
                                post.commentCount > 0 &&
                                <>{ post.commentCount } comments</>
                            }
                        </p>
                        <p>
                            {
                                post.shareCount > 0 &&
                                <>{ post.shareCount } shares</>
                            }
                        </p>
                    </div>
                </div>
                <hr />
                <div className={styles.buttons}>
                    <button>
                        <AiOutlineLike
                            size={20}
                            color={"gray"}
                        />
                        <p>
                            Like
                        </p>
                    </button>
                    <button>
                        <GoComment
                            size={20}
                            color={"gray"}
                        />
                        <p>
                           Comment
                        </p>
                    </button>
                    <button>
                        <PiShareFatThin
                            size={20}
                            color={"gray"}
                        />
                        <p>
                            Share
                        </p>
                    </button>
                </div>
                <hr />
            </div>
            <div className={styles.comment}>
                <ProfilePicture />
                <input/>
            </div>
        </div>
    );
}
