import styles from "../../src/assets/styles/friends/friendBox.module.scss";
import {Friend} from "../../gql/graphql.ts";


interface FriendBox {
    friend: Friend
}


export default function FriendBox({ friend } : FriendBox){


    return (
        <div className={styles.container}>
            <header>
                <img src={friend.sender.profile ? friend.sender.profile : "../src/assets/default-profile.jpg"} />
            </header>
            <div className={styles.content} >
                <h4>
                    { friend.sender.firstName } { friend.sender.lastName }
                </h4>
                <button>
                    Accept
                </button>
                <button>
                    Decline
                </button>
            </div>
        </div>
    );
}
