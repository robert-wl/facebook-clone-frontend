import styles from "../../../assets/styles/navbar/navbarButtons.module.scss";
import { Link, useLocation } from "react-router-dom";
import { IoHomeOutline, IoHomeSharp } from "react-icons/io5";

export default function HomeButton() {
    const location = useLocation();

    return (
        <Link to={"/"}>
            <div className={location.pathname === "/" ? styles.buttonActive : styles.button}>
                {location.pathname === "/" ? (
                    <IoHomeSharp
                        color={"#1877f2"}
                        size={"1.5rem"}
                    />
                ) : (
                    <IoHomeOutline
                        color={"black"}
                        size={"1.5rem"}
                    />
                )}
            </div>
        </Link>
    );
}
