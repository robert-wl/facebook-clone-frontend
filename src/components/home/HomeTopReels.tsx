import styles from "@/assets/styles/home/homeTop.module.scss";
import { Link } from "react-router-dom";
import { MdOutlineAdd } from "react-icons/md";
import { AiOutlineShareAlt } from "react-icons/ai";
import { BsFillCameraVideoFill } from "react-icons/bs";
import useAuth from "@/hooks/use-auth.ts";
import { IoChatboxEllipsesOutline } from "react-icons/io5";
import SafeImage from "@/components/SafeImage.tsx";

export default function HomeTopReels() {
  const { auth } = useAuth();
  return (
    <>
      <div className={styles.left}>
        <div className={styles.story}>
          <Link to={"/reels"}>
            <SafeImage
              className={styles.vid}
              src={auth?.profile}
              type={"user-profile"}
            />
            <BsFillCameraVideoFill size={"3rem"} />
          </Link>
          <div className={styles.create}>
            <h4>Create Reel</h4>
            <Link to={"/reels/create"}>
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
          Make and share a short video
        </p>
        <p>
          <IoChatboxEllipsesOutline size={"1.5rem"} />
          Your reels are visible to everyone
        </p>
      </div>
    </>
  );
}
