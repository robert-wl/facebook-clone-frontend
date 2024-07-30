import styles from "@/assets/styles/profilePicture.module.scss";
import { User } from "@/gql/graphql.ts";
import { Link } from "react-router-dom";
import userProfileLoader from "@/controller/userProfileLoader.ts";
import { Nullable } from "@/types/utils";
import { useState } from "react";
import useDebounce from "@/hooks/use-debounce.ts";
import UserPopup from "@/components/user/UserPopup.tsx";

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
      <UserPopup
        isShown={showPopup}
        setIsShown={setShowPopup}
        user={user!}
      />
      <Link to={"/user/" + user?.username}>
        <img
          onMouseEnter={() => debouncedPopup(true)}
          onMouseLeave={() => debouncedPopup(false)}
          src={userProfileLoader(user?.profile)}
          alt={""}
        />
      </Link>
    </div>
  );
}
