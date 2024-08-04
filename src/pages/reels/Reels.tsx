import styles from "@/assets/styles/reels/reels.module.scss";
import Navbar from "@/components/navbar/Navbar.tsx";
import { useMutation, useQuery } from "@apollo/client";
import { MouseEvent, useEffect, useState } from "react";
import { debouncedError } from "@/controller/errorHandler.ts";
import { Reel } from "@/gql/graphql.ts";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { AiFillLike } from "react-icons/ai";
import { PiShareFatFill } from "react-icons/pi";
import { BiSolidCommentDetail } from "react-icons/bi";
import statsConverter from "@/controller/statsConverter.ts";
import { LIKE_REEL } from "@/lib/query/reels/likeReel.graphql.ts";
import ReelCommentSidebar from "@/components/reels/ReelCommentSidebar.tsx";
import { MdOutlineVideoLibrary } from "react-icons/md";
import { Link } from "react-router-dom";
import userProfileLoader from "@/controller/userProfileLoader.ts";
import reelLoader from "@/controller/reelLoader.ts";
import { GET_REELS_PAGINATED } from "@/lib/query/reels/getReelsPaginated.graphql.ts";

const paginationLimit = 8;

export default function Reels() {
  const [reels, setReels] = useState<Reel[]>([]);
  const [index, setIndex] = useState(0);
  const [showComment, setShowComment] = useState(false);
  const [currStartIndex, setCurrStartIndex] = useState(0);
  useQuery(GET_REELS_PAGINATED, {
    variables: {
      pagination: {
        start: currStartIndex,
        limit: paginationLimit,
      },
    },
    fetchPolicy: "cache-and-network",
    onCompleted: (dat) => {
      const result = dat.getReelsPaginated;

      setReels((data) => [...data, ...result]);
    },
    onError: debouncedError,
  });

  const [likeReel] = useMutation(LIKE_REEL);

  useEffect(() => {
    if (currStartIndex + 5 - 2 == index) {
      setCurrStartIndex((prev) => prev + paginationLimit);
    }
  }, [index, currStartIndex]);

  const handleMove = (num: number) => {
    if (num == -1) {
      if (index == 0) {
        return;
      }

      setIndex(index - 1);
      return;
    }

    setIndex(index + 1);
  };

  const currentReel = reels[index];

  const handleLiked = () => {
    if (!currentReel) {
      return;
    }

    setReels([
      ...reels.slice(0, index),
      {
        ...currentReel,
        likeCount: currentReel.likeCount - (currentReel.liked ? 1 : -1),
        liked: !currentReel.liked,
      },
      ...reels.slice(index + 1),
    ]);

    likeReel({
      variables: {
        reel: currentReel.id,
      },
    }).catch(debouncedError);
  };

  const pauseHandler = (e: MouseEvent<HTMLVideoElement>) => {
    const video = e.target as HTMLVideoElement;
    if (video.paused) {
      video.play();
    } else {
      video.pause();
    }
  };

  return (
    <>
      <div
        id={"page"}
        className={styles.page}>
        <Navbar />
        <div className={styles.pageContainer}>
          <div className={styles.content}>
            <Link to={"/reels/create"}>
              <div className={styles.createReel}>
                <MdOutlineVideoLibrary size={"1.5rem"} />
                <p>Create Reel</p>
              </div>
            </Link>
            <div className={styles.box}>
              <div className={styles.profile}>
                <Link to={`/user/${currentReel?.user.username}`}>
                  <img
                    src={userProfileLoader(currentReel?.user.profile)}
                    alt={""}
                  />
                </Link>
                <h4>
                  {currentReel?.user.firstName} {currentReel?.user.lastName}
                </h4>
              </div>
              {index != 0 && (
                <div
                  className={styles.left}
                  onClick={() => handleMove(-1)}>
                  <IoIosArrowBack size={"1.5rem"} />
                </div>
              )}
              {index != reels.length - 1 && (
                <div
                  className={styles.right}
                  onClick={() => handleMove(1)}>
                  <IoIosArrowForward size={"1.5rem"} />
                </div>
              )}
              {currentReel && (
                <video
                  autoPlay={true}
                  loop={true}
                  crossOrigin="anonymous"
                  key={currentReel.id}
                  onClick={(e) => pauseHandler(e)}>
                  <source src={reelLoader(currentReel)} />
                </video>
              )}
              <div className={styles.interaction}>
                <div onClick={() => handleLiked()}>
                  <AiFillLike
                    size={"1.2rem"}
                    className={currentReel?.liked ? styles.active : ""}
                  />
                  <span>{statsConverter(currentReel?.likeCount)}</span>
                </div>{" "}
                <div onClick={() => setShowComment(!showComment)}>
                  <BiSolidCommentDetail
                    size={"1.2rem"}
                    className={showComment ? styles.active : ""}
                  />
                  <span>{statsConverter(currentReel?.commentCount)}</span>
                </div>{" "}
                <div>
                  <PiShareFatFill
                    size={"1.2rem"}
                    color={"white"}
                  />
                  <span>{statsConverter(currentReel?.shareCount)}</span>
                </div>
              </div>
              <span>{currentReel?.content}</span>
            </div>
          </div>
          <>
            {showComment && currentReel && (
              <ReelCommentSidebar
                key={reels[index].id}
                reelData={currentReel!}
                setReelsData={setReels}
              />
            )}
          </>
        </div>
      </div>
    </>
  );
}
