import { FaBookOpen } from "react-icons/fa";
import { MdOutlineVideoLibrary } from "react-icons/md";
import styles from "@/assets/styles/home/homeTop.module.scss";
import { useState } from "react";
import HomeTopReels from "./HomeTopReels.tsx";
import HomeTopStory from "@/components/home/HomeTopStory.tsx";

export default function HomeTop() {
  const [tab, setTab] = useState("stories");

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
      <div className={styles.content}>{tab == "stories" ? <HomeTopStory /> : <HomeTopReels />}</div>
    </div>
  );
}
