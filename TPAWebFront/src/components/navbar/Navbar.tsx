import styles from "../../assets/styles/navbar/navbar.module.scss";
import HomeButton from "./buttons/HomeButton.tsx";
import FriendButton from "./buttons/FriendButton.tsx";
import GroupButton from "./buttons/GroupButton.tsx";
import { useContext, useEffect, useRef } from "react";
import { AuthContext } from "../context/AuthContextProvider.tsx";
import { Link } from "react-router-dom";
import { AiFillBell } from "react-icons/ai";
import { BiSolidMessageRoundedDetail, BiUserCircle } from "react-icons/bi";
import { MdKeyboardArrowRight, MdLogout } from "react-icons/md";
import userProfileLoader from "../../../controller/userProfileLoader.ts";
import SearchBar from "./SearchBar.tsx";

export default function Navbar() {
    const { auth } = useContext(AuthContext);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const handleClick = () => {
        dropdownRef.current!.style.display = "flex";
    };

    const handleOutsideClick = (e: MouseEvent) => {
        if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
            dropdownRef.current.style.display = "none";
        }
    };

    const handleLogout = () => {
        localStorage.removeItem("token");
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
                    <Link to={""}>
                        <div className={styles.circles}>
                            <AiFillBell
                                color={"black"}
                                size={"1.2rem"}
                            />
                        </div>
                    </Link>
                    <Link to={"/messages"}>
                        <div className={styles.circles}>
                            <BiSolidMessageRoundedDetail
                                color={"black"}
                                size={"1.2rem"}
                            />
                        </div>
                    </Link>
                    <div className={styles.imageBox}>
                        <img
                            onClick={() => handleClick()}
                            src={userProfileLoader(auth?.profile)}
                            alt={""}
                        />

                        <div
                            ref={dropdownRef}
                            className={styles.dropDown}
                        >
                            <button>
                                <Link to={"/user/" + auth?.username}>
                                    <BiUserCircle size={"1.4rem"} />
                                    <p>My Profile</p>
                                    <MdKeyboardArrowRight
                                        color={"black"}
                                        size={"1.5rem"}
                                    />
                                </Link>
                            </button>
                            <button onClick={() => handleLogout()}>
                                <Link to={"/login"}>
                                    <MdLogout size={"1.4rem"} />
                                    <p>Logout</p>
                                    <MdKeyboardArrowRight
                                        color={"black"}
                                        size={"1.5rem"}
                                    />
                                </Link>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className={styles.navbarSpace}>a</div>
        </>
    );
}
