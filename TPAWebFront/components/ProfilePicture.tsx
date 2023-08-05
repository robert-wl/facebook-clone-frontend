import styles from "../src/assets/styles/profilePicture.module.scss"
import {Maybe} from "../gql/graphql.ts";


export default function ProfilePicture({ src } : { src: Maybe<string> | undefined}){


    return (
        <div className={styles.imageBox}>
            <img src={src ? src : "../src/assets/default-profile.jpg"} alt={""}/>
        </div>
    );
}
