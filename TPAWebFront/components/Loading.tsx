import styles from "../src/assets/styles/loading.module.scss";
import Spinner from "./misc/Spinner.tsx";



export default function Loading(){

    return (
        <div className={styles.page}>
            <div className={styles.container}>
                <Spinner />
            </div>
        </div>
    )
}
