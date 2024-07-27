import styles from "@/assets/styles/navbar/navbar.module.scss";
import {AiFillBell} from "react-icons/ai";
import {Link} from "react-router-dom";
import {useContext} from "react";
import {AuthContext} from "@/components/context/AuthContextProvider.tsx";

export default function NotificationButton() {
  const {auth} = useContext(AuthContext);

  return (
    <Link to={"/notification"}>
      <div className={location.pathname.includes("notification") ? styles.circlesActive : styles.circles}>
        <AiFillBell size={"1.2rem"}/>
        {auth && auth.notificationCount != 0 && (
          <span>
            <p>{auth?.notificationCount}</p>
          </span>
        )}
      </div>
    </Link>
  );
}
