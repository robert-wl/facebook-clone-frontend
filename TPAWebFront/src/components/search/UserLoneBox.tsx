import styles from "../../assets/styles/search/search.module.scss";
import { Link } from "react-router-dom";
import userProfileLoader from "../../../controller/userProfileLoader.ts";
import { User } from "../../../gql/graphql.ts";
import { debouncedError } from "../../../controller/errorHandler.ts";
import { useMutation } from "@apollo/client";
import { ADD_FRIEND } from "../../../lib/query/friend/addFriend.graphql.ts";
import { Dispatch, SetStateAction, useContext } from "react";
import { AuthContext } from "../context/AuthContextProvider.tsx";

interface UserLoneBox {
    user: User;
    setUsers: Dispatch<SetStateAction<User[]>>;
}

export default function UserLoneBox({ user, setUsers }: UserLoneBox) {
    const [addFriend] = useMutation(ADD_FRIEND);
    const { auth } = useContext(AuthContext);
    const handleAddFriend = async () => {
        // if (ref.current) ref.current.style.display = "none";
        await addFriend({
            variables: {
                friendInput: {
                    sender: auth!.id,
                    receiver: user.id,
                },
            },
        }).catch(debouncedError);

        setUsers((prev) => {
            return prev.map((f) => {
                if (f.id.toString() === user.id.toString()) {
                    return {
                        ...f,
                        friended: "pending",
                    };
                }
                return f;
            });
        });
    };

    return (
        <div className={styles.userLoneBox}>
            <div className={styles.left}>
                <Link to={"/user/" + user.username}>
                    <img
                        src={userProfileLoader(user.profile)}
                        alt={""}
                    />
                </Link>
            </div>
            <div className={styles.center}>
                <h4>
                    {user.firstName} {user.lastName}
                </h4>
            </div>
            <div className={styles.right}>
                {user.friended == "friends" && (
                    <>
                        <button disabled={true}>Friended</button>
                    </>
                )}
                {user.friended == "pending" && (
                    <>
                        <button disabled={true}>Pending</button>
                    </>
                )}
                {user.friended == "not friends" && (
                    <>
                        <button onClick={() => handleAddFriend()}>Add Friend</button>
                    </>
                )}
            </div>
        </div>
    );
}
