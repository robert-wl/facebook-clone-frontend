import styles from "../../src/assets/styles/sidebar/sidebar.module.scss";
import {useContext} from "react";
import {AuthContext} from "../context/AuthContextProvider.tsx";

interface Sidebar {
    children: JSX.Element
    title: string
}
export default function Sidebar({ children, title } : Sidebar){
    const { auth } = useContext(AuthContext)

    if(auth)
    return (
        <>
            <div className={styles.barSpace} />
            <div className={styles.bar}>
                <header>
                    <div className={styles.bio}>
                        <h2>{ title }</h2>
                    </div>
                </header>
                <hr />
                <div className={styles.content}>
                    { children }
                </div>
            </div>
        </>
    )
}
