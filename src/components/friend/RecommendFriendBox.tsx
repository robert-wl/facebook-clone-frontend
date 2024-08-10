import styles from "@/assets/styles/friends/friendBox.module.scss";
import { Link } from "react-router-dom";
import { BsFillPersonPlusFill } from "react-icons/bs";
import { User } from "@/gql/graphql.ts";
import { Dispatch, SetStateAction, useRef } from "react";
import { useMutation } from "@apollo/client";
import { debouncedError } from "@/utils/error-handler.ts";
import { ADD_FRIEND } from "@/lib/query/friend/addFriend.graphql.ts";
import useAuth from "@/hooks/use-auth.ts";
import SafeImage from "@/components/SafeImage.tsx";

interface RecommendFriendBox {
  friend: User;
  setFriends: Dispatch<SetStateAction<User[]>>;
}

export default function RecommendFriendBox({ friend, setFriends }: RecommendFriendBox) {
  const [addFriend] = useMutation(ADD_FRIEND);
  const ref = useRef<HTMLDivElement>(null);
  const { auth } = useAuth();

  const handleAddFriend = async () => {
    if (ref.current) ref.current.style.display = "none";
    await addFriend({
      variables: {
        friendInput: {
          sender: auth!.id,
          receiver: friend.id,
        },
      },
    }).catch(debouncedError);
    setFriends((friends) => {
      console.log(friends.filter((f) => f.id.toString() !== friend.id.toString()));
      return friends.filter((f) => f.id.toString() !== friend.id.toString());
    });
  };

  const handleRemove = () => {
    if (ref.current) ref.current.style.display = "none";
  };

  return (
    <div
      ref={ref}
      className={styles.recommendFriendBox}>
      <header>
        <Link to={"/user/" + friend.username}>
          <SafeImage
            src={friend.profile}
            type={"user-profile"}
          />
        </Link>
      </header>
      <div className={styles.content}>
        <h4>
          {friend.firstName} {friend.lastName}
        </h4>
        <button onClick={() => handleAddFriend()}>
          <BsFillPersonPlusFill size={"1.2rem"} /> Add Friend
        </button>
        <button onClick={() => handleRemove()}>Remove</button>
      </div>
    </div>
  );
}
