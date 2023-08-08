import styles from "../../src/assets/styles/sidebar/sidebar.module.scss";
import {useContext} from "react";
import {AuthContext} from "../context/AuthContextProvider.tsx";
import ProfilePicture from "../ProfilePicture.tsx";
import SidebarButton from "./SidebarButton.tsx";
import {FaUserFriends} from "react-icons/fa";
import {BsFillPersonCheckFill, BsFillPersonPlusFill} from "react-icons/bs";


export default function Sidebar(){
    const auth = useContext(AuthContext)

    if(auth)
    return (
        <>
            <div className={styles.barSpace} />
            <div className={styles.bar}>
                <header>
                    <ProfilePicture src={auth?.profile} />
                    <div className={styles.bio}>
                        <h4>{ auth?.firstName } { auth?.lastName }</h4>
                        <p>{ auth?.username }</p>
                    </div>
                </header>
                <hr />
                <div className={styles.content}>
                    <SidebarButton active={true} text={"All"}>
                        <FaUserFriends
                            color={"black"}
                            size={"1.5rem"}
                        />
                    </SidebarButton>
                    <SidebarButton active={false} text={"Requests"}>
                        <BsFillPersonPlusFill
                            color={"black"}
                            size={"1.5rem"}
                        />
                    </SidebarButton>
                    <SidebarButton active={false} text={"Recommendation"}>
                        <BsFillPersonCheckFill
                            color={"black"}
                            size={"1.5rem"}
                        />
                    </SidebarButton>
                </div>
            </div>
        </>
    )

}
