import styles from "../../../assets/styles/navbar/navbarButtons.module.scss";
import { Link, useLocation } from "react-router-dom";
import { FaHouseChimney } from "react-icons/fa6";
import { BsHouseDoor } from "react-icons/bs";

export default function HomeButton() {
    const location = useLocation();

    return (
        <Link to={"/"}>
            <div className={location.pathname === "/" ? styles.buttonActive : styles.button}>
                {location.pathname === "/" ? (
                    <FaHouseChimney
                        color={"#1877f2"}
                        size={"1.5rem"}
                    />
                ) : (
                    <BsHouseDoor
                        color={"black"}
                        size={"1.5rem"}
                    />
                )}
            </div>
        </Link>
    );
}
