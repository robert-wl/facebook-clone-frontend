import styles from "../../src/assets/styles/sidebar/sidebarButton.module.scss";
import { MdKeyboardArrowRight } from "react-icons/md";

interface SidebarButton {
    text: string;
    active: boolean;
    children: JSX.Element;
}

export default function SidebarButton({ text, active, children }: SidebarButton) {
    return (
        <div className={active ? styles.containerActive : styles.container}>
            <div className={styles.logo}>{children}</div>
            <h4>{text}</h4>
            <MdKeyboardArrowRight
                color={"black"}
                size={"1.5rem"}
            />
        </div>
    );
}
