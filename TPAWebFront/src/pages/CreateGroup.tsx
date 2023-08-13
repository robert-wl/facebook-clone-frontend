import styles from "../assets/styles/reels/createReels.module.scss";
import Navbar from "../../components/navbar/Navbar.tsx";

export default function CreateGroup() {
    return (
        <>
            <div className={styles.page}>
                <Navbar />
                <div className={styles.content}>
                    {/*<ReelsSidebar*/}
                    {/*    setVideo={setVideo}*/}
                    {/*    content={content}*/}
                    {/*    setContent={setContent}*/}
                    {/*    handleSubmit={handleSubmit}*/}
                    {/*/>*/}
                </div>
            </div>
        </>
    );
}
