import { FaBookOpen } from "react-icons/fa";
import { MdOutlineAdd, MdOutlineVideoLibrary } from "react-icons/md";
import styles from "@/assets/styles/home/homeTop.module.scss";
import { useState } from "react";
import { AiOutlineShareAlt } from "react-icons/ai";
import { BsClockHistory } from "react-icons/bs";
import { BiSolidMessageRoundedDetail } from "react-icons/bi";
import { Link } from "react-router-dom";
import HomeTopReels from "./HomeTopReels.tsx";
import userProfileLoader from "@/controller/userProfileLoader.ts";
import useAuth from "@/hooks/use-auth.ts";

export default function HomeTop() {
  const [tab, setTab] = useState("stories");
  const { auth } = useAuth();

  return (
    <div className={styles.myBox}>
      <header>
        <h4
          onClick={() => setTab("stories")}
          className={tab == "stories" ? styles.h4Active : ""}>
          <FaBookOpen size={"1.5rem"} />
          Stories
        </h4>
        <h4
          onClick={() => setTab("reels")}
          className={tab == "reels" ? styles.h4Active : ""}>
          <MdOutlineVideoLibrary size={"1.5rem"} />
          Reels
        </h4>
      </header>
      <hr />
      <div className={styles.content}>
        {tab == "stories" ? (
          <>
            <div className={styles.left}>
              <div className={styles.story}>
                <Link to={"/stories"}>
                  <img
                    src={userProfileLoader(auth?.profile)}
                    alt={""}
                  />
                </Link>
                <div className={styles.create}>
                  <h4>Create Story</h4>
                  <Link to={"/stories/create"}>
                    <MdOutlineAdd
                      size={"1.2rem"}
                      color={"white"}
                    />
                  </Link>
                </div>
              </div>
            </div>
            <div className={styles.right}>
              <p>
                <AiOutlineShareAlt size={"1.5rem"} />
                Share a photo or write something
              </p>
              <p>
                <BsClockHistory size={"1.5rem"} />
                Stories disappears after 24 hours
              </p>
              <p>
                <BiSolidMessageRoundedDetail size={"1.5rem"} />
                Your stories are private
              </p>
            </div>
          </>
        ) : (
          <HomeTopReels />
        )}
      </div>
    </div>
  );
}
