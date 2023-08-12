import styles from "../assets/styles/reels/reels.module.scss";
import Navbar from "../../components/navbar/Navbar.tsx";
import { useLazyQuery, useMutation, useQuery } from "@apollo/client";
import { GET_REELS } from "../../lib/query/reels/getReels.graphql.ts";
import { useEffect, useState } from "react";
import { GET_REEL } from "../../lib/query/reels/getReel.graphql.ts";
import { debouncedError } from "../../controller/errorHandler.ts";
import { Reel } from "../../gql/graphql.ts";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { AiFillLike } from "react-icons/ai";
import { PiShareFatFill } from "react-icons/pi";
import { BiSolidCommentDetail } from "react-icons/bi";
import statsConverter from "../../controller/statsConverter.ts";
import { LIKE_REEL } from "../../lib/query/reels/likeReel.graphql.ts";

export default function Reels() {
    const [reels, setReels] = useState<string[]>([]);
    const [reelData, setReelData] = useState<Reel | null>();
    const [index, setIndex] = useState(0);
    const { data } = useQuery(GET_REELS);
    const [getReel] = useLazyQuery(GET_REEL);
    const [likeReel] = useMutation(LIKE_REEL);

    useEffect(() => {
        if (reels.length > 0) {
            getReel({
                variables: {
                    id: reels[index],
                },
            })
                .then((result) => {
                    const { data } = result;
                    setReelData(data.getReel);
                })
                .catch(debouncedError);
        } else if (data && reels.length == 0) {
            setReels(data.getReels);
        }
    }, [index, data, reels]);

    const handleMove = (num: number) => {
        if (num == -1) {
            if (index == 0) return;
            setReelData(null);
            setIndex(index - 1);
        } else {
            if (index == reels.length - 1) return;
            setReelData(null);
            setIndex(index + 1);
        }
    };

    const handleLiked = () => {
        if (reelData) {
            if (reelData.liked) {
                setReelData({
                    ...reelData,
                    likeCount: reelData.likeCount - 1,
                    liked: !reelData?.liked,
                });
            } else {
                setReelData({
                    ...reelData,
                    likeCount: reelData.likeCount + 1,
                    liked: !reelData?.liked,
                });
            }

            likeReel({
                variables: {
                    reel: reelData.id,
                },
            }).catch(debouncedError);
        }
    };

    return (
        <>
            <div
                id={"page"}
                className={styles.page}
            >
                <Navbar />
                <div className={styles.content}>
                    <div className={styles.box}>
                        <div className={styles.profile}>
                            <img src={reelData?.user.profile ? reelData?.user.profile : "../src/assets/default-profile.jpg"} />
                            <h4>
                                {reelData?.user.firstName} {reelData?.user.lastName}
                            </h4>
                        </div>
                        {index != 0 && (
                            <div
                                className={styles.left}
                                onClick={() => handleMove(-1)}
                            >
                                <IoIosArrowBack size={"1.5rem"} />
                            </div>
                        )}
                        {index != reels.length - 1 && (
                            <div
                                className={styles.right}
                                onClick={() => handleMove(1)}
                            >
                                <IoIosArrowForward size={"1.5rem"} />
                            </div>
                        )}
                        {reelData && (
                            <video
                                autoPlay={true}
                                loop={true}
                            >
                                <source src={reelData.video} />
                            </video>
                        )}
                        <div className={styles.interaction}>
                            <div onClick={() => handleLiked()}>
                                <AiFillLike
                                    size={"1.2rem"}
                                    className={reelData?.liked ? styles.liked : ""}
                                />
                                <span>{statsConverter(reelData?.likeCount)}</span>
                            </div>{" "}
                            <div>
                                <BiSolidCommentDetail
                                    size={"1.2rem"}
                                    color={"white"}
                                />
                                <span>{statsConverter(reelData?.commentCount)}</span>
                            </div>{" "}
                            <div>
                                <PiShareFatFill
                                    size={"1.2rem"}
                                    color={"white"}
                                />
                                <span>{statsConverter(reelData?.shareCount)}</span>
                            </div>
                        </div>
                        <span>{reelData?.content}</span>
                    </div>
                </div>
            </div>
        </>
    );
}
