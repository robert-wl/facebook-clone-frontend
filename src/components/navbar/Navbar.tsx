import styles from "@/assets/styles/navbar/navbar.module.scss";
import HomeButton from "./buttons/HomeButton.tsx";
import FriendButton from "./buttons/FriendButton.tsx";
import GroupButton from "./buttons/GroupButton.tsx";
import { useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { BiSolidMessageRoundedDetail, BiUserCircle } from "react-icons/bi";
import { MdKeyboardArrowRight, MdLogout } from "react-icons/md";
import userProfileLoader from "@/controller/userProfileLoader.ts";
import SearchBar from "./SearchBar.tsx";
import NotificationButton from "./buttons/NotificationButton.tsx";
import { BsFillMoonFill } from "react-icons/bs";
import useAuth from "@/hooks/use-auth.ts";

export default function Navbar() {
  const location = useLocation();
  const { auth, toggleTheme, logout } = useAuth();
  const imageRef = useRef<HTMLImageElement>(null);
  const dropdownRef = useRef<HTMLDialogElement>(null);

  const handleClick = () => {
    const dialog = dropdownRef.current;

    if (!dialog) {
      return;
    }

    if (dialog.open) {
      dialog.close();
      return;
    }

    dialog.show();
  };

  const handleOutsideClick = (e: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node) && imageRef.current && !imageRef.current.contains(e.target as Node)) {
      dropdownRef.current.close();
    }
  };

  const handleLogout = () => {
    logout!();
  };

  useEffect(() => {
    window.addEventListener("mousedown", handleOutsideClick);

    return () => {
      window.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  return (
    <>
      <div className={styles.bar}>
        <div className={styles.left}>
          <SearchBar />
        </div>
        <div className={styles.center}>
          <HomeButton />
          <FriendButton />
          <GroupButton />
        </div>
        <div className={styles.end}>
          <Link to={"/messages"}>
            <div className={location.pathname.includes("messages") ? styles.circlesActive : styles.circles}>
              <BiSolidMessageRoundedDetail size={"1.2rem"} />
            </div>
          </Link>
          <NotificationButton />
          <div className={styles.imageBox}>
            <img
              onClick={() => handleClick()}
              src={userProfileLoader(auth?.profile)}
              alt={""}
              ref={imageRef}
            />

            <dialog
              ref={dropdownRef}
              className={styles.dropDown}>
              <button>
                <Link to={"/user/" + auth?.username}>
                  <BiUserCircle size={"1.4rem"} />
                  <p>My Profile</p>
                  <MdKeyboardArrowRight size={"1.5rem"} />
                </Link>
              </button>
              <button>
                <>
                  <BsFillMoonFill />
                  <p>Dark Mode</p>
                </>
                <label>
                  <input
                    checked={auth?.theme == "dark"}
                    type={"checkbox"}
                    onChange={() => toggleTheme!()}
                  />
                  <div className={styles.fill} />
                </label>
              </button>
              <button onClick={() => handleLogout()}>
                <Link to={"/login"}>
                  <MdLogout size={"1.4rem"} />
                  <p>Logout</p>
                  <MdKeyboardArrowRight size={"1.5rem"} />
                </Link>
              </button>
            </dialog>
          </div>
        </div>
      </div>
      <div className={styles.navbarSpace}>a</div>
    </>
  );
}
