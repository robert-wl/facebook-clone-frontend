import styles from "@/assets/styles/home/homeTop.module.scss";
import {Link} from "react-router-dom";
import {MdOutlineAdd} from "react-icons/md";
import {AiOutlineShareAlt} from "react-icons/ai";
import {BsFillCameraVideoFill} from "react-icons/bs";
import {BiSolidMessageRoundedDetail} from "react-icons/bi";
import {useContext} from "react";
import {AuthContext} from "@/components/context/AuthContextProvider.tsx";

export default function HomeTopReels() {
  const {auth} = useContext(AuthContext);
  return (
    <>
      <div className={styles.left}>
        <div className={styles.story}>
          <Link to={"/reels"}>
            <img
              className={styles.vid}
              src={auth?.profile ? auth.profile : "@/src/assets/default-profile.jpg"}
              alt={""}
            />
            <BsFillCameraVideoFill size={"3rem"}/>
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
          <AiOutlineShareAlt size={"1.5rem"}/>
          Make and share a short video
        </p>
        <p>
          <BiSolidMessageRoundedDetail size={"1.5rem"}/>
          Your reels are visible to everyone
        </p>
      </div>
    </>
  );
}
