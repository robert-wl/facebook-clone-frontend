import styles from "../../../src/assets/styles/navbar/navbarButtons.module.scss"
import {Link, useLocation} from "react-router-dom";
import {BiGroup, BiSolidGroup} from "react-icons/bi";


export default function GroupButton(){
    const location = useLocation();

    return (
        <Link to={"/group"}>
            <div className={location.pathname === "/group" ? styles.buttonActive : styles.button}>
                {
                    location.pathname === "/group" ?
                        <BiSolidGroup
                            color={"#1877f2"}
                            size={"1.5rem"}
                        /> :
                        <BiGroup
                            color={"black"}
                            size={"1.5rem"}
                        />
                }
            </div>
        </Link>
    );
}
