import styles from "@/assets/styles/search/search.module.scss";
import { Link } from "react-router-dom";
import { User } from "@/gql/graphql.ts";
import { useMutation } from "@apollo/client";
import { ADD_FRIEND } from "@/lib/query/friend/addFriend.graphql.ts";
import { Dispatch, SetStateAction } from "react";
import { debouncedError } from "@/controller/errorHandler.ts";
import useAuth from "@/hooks/use-auth.ts";
import SafeImage from "@/components/SafeImage.tsx";

interface UserBox {
  user: User;
  setUsers: Dispatch<SetStateAction<User[]>>;
}

export default function UserBox({ user, setUsers }: UserBox) {
  const [addFriend] = useMutation(ADD_FRIEND);
  const { auth } = useAuth();
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
    <div className={styles.userBox}>
      <div className={styles.left}>
        <Link to={"/user/" + user.username}>
          <SafeImage
            src={user.profile}
            type={"user-profile"}
            alt={"profile picture"}
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
