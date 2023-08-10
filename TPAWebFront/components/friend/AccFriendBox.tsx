import styles from "../../src/assets/styles/friends/accFriendBox.module.scss";
import {Friend} from "../../gql/graphql.ts";
import {Link} from "react-router-dom";


interface AccFriendBox {
    friend: Friend
}


export default function AccFriendBox({ friend } : AccFriendBox){


    return (
        <div className={styles.container}>
            <header>
                <Link to={"/user/" + friend.sender.username} >
                    <img src={friend.sender.profile ? friend.sender.profile : "../src/assets/default-profile.jpg"}  alt={""}/>
                </Link>
            </header>
            <div className={styles.content} >
                <h4>
                    { friend.sender.firstName } { friend.sender.lastName }
                </h4>
                <p>
                    { friend.sender.username }
                </p>
            </div>
        </div>
    );
}
