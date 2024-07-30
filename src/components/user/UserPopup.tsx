import { AnimatePresence, motion } from "framer-motion";
import styles from "@/assets/styles/profilePicture.module.scss";
import { Link } from "react-router-dom";
import userProfileLoader from "@/controller/userProfileLoader.ts";
import { User } from "@/gql/graphql.ts";

interface IProps {
  isShown: boolean;
  setIsShown: (value: boolean) => void;
  user: User;
}

export default function UserPopup({ isShown, setIsShown, user }: IProps) {
  return (
    <AnimatePresence>
      {isShown && (
        <motion.div
          style={{ zIndex: 100 }}
          onMouseEnter={() => setIsShown(true)}
          onMouseLeave={() => setIsShown(false)}
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
  );
}
