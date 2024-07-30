import styles from "@/assets/styles/profilePicture.module.scss";
import { User } from "@/gql/graphql.ts";
import { Link } from "react-router-dom";
import userProfileLoader from "@/controller/userProfileLoader.ts";
import { Nullable } from "@/types/utils";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import useDebounce from "@/hooks/use-debounce.ts";

interface IProps {
  user: Nullable<User>;
  showBox: boolean;
  zIndex?: number;
}

export default function ProfilePicture({ user, showBox, zIndex }: IProps) {
  const [showPopup, setShowPopup] = useState(false);
  const debouncedPopup = useDebounce(setShowPopup, 500);

  return (
    <div
      className={styles.imageBox}
      style={{ zIndex: zIndex }}>
      {showBox}
      <Link to={"/user/" + user?.username}>
        <img
          onMouseEnter={() => debouncedPopup(true)}
          onMouseLeave={() => debouncedPopup(false)}
          src={userProfileLoader(user?.profile)}
          alt={""}
        />
      </Link>
      <AnimatePresence>
        {showPopup && (
          <motion.div
            onMouseEnter={() => debouncedPopup(true)}
            onMouseLeave={() => debouncedPopup(false)}
            initial={{ opacity: 0, y: 2 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 2 }}
            className={styles.profile}>
            <div className={styles.content}>
              <Link to={"/user/" + user?.username}>
                <img
                  src={userProfileLoader(user?.profile)}
                  alt={""}
                />
              </Link>
              <div className={styles.bio}>
                {console.log(user)}
                <h4>
                  {user?.firstName} {user?.lastName}
                </h4>
                <p>{user?.username}</p>
                <p>{user?.gender}</p>
                <p>{user?.email}</p>
                <p>{new Date(user?.dob).toLocaleDateString()}</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
