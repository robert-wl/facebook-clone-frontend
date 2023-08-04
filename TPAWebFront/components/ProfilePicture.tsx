import styles from "../src/assets/styles/profilePicture.module.scss"


export default function ProfilePicture(){


    return (
        <div className={styles.imageBox}>
            <img src="../src/assets/default-profile.jpg"/>
        </div>
    );
}
