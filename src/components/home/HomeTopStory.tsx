import styles from "@/assets/styles/home/homeTop.module.scss";
import { Link } from "react-router-dom";
import userProfileLoader from "@/controller/userProfileLoader.ts";
import { MdOutlineAdd } from "react-icons/md";
import { AiOutlineShareAlt } from "react-icons/ai";
import { BsClockHistory } from "react-icons/bs";
import useAuth from "@/hooks/use-auth.ts";
import { IoChatboxEllipsesOutline } from "react-icons/io5";

export default function HomeTopStory() {
  const { auth } = useAuth();

  return (
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
          <IoChatboxEllipsesOutline size={"1.5rem"} />
          Your stories are private
        </p>
      </div>
    </>
  );
}
