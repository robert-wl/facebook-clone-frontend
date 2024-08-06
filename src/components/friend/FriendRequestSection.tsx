import styles from "@/assets/styles/friends/friends.module.scss";
import FriendBox from "./FriendBox.tsx";
import NoFriendBox from "./NoFriendBox.tsx";
import { useMutation, useQuery } from "@apollo/client";
import { GET_FRIEND_REQUESTS } from "@/lib/query/friend/getFriendRequests.graphql.ts";
import { debouncedError } from "@/utils/error-handler.ts";
import { User } from "@/gql/graphql.ts";
import { Dispatch, SetStateAction, useState } from "react";
import { ACCEPT_FRIEND } from "@/lib/query/friend/acceptFriend.graphql.ts";
import { REJECT_FRIEND } from "@/lib/query/friend/rejectFriend.graphql.ts";

interface FriendRequestSection {
  setFriends: Dispatch<SetStateAction<User[]>>;
}

export default function FriendRequestSection({ setFriends }: FriendRequestSection) {
  const [requests, setRequests] = useState<User[]>([]);
  const [acceptFriend] = useMutation(ACCEPT_FRIEND);
  const [rejectFriend] = useMutation(REJECT_FRIEND);
  useQuery(GET_FRIEND_REQUESTS, {
    fetchPolicy: "cache-and-network",
    onError: debouncedError,
    onCompleted: (data) => {
      setRequests(data.getFriendRequests);
    },
  });

  const handleAccept = async (friend: User) => {
    await acceptFriend({
      variables: {
        friend: friend.id,
      },
    }).catch(debouncedError);
    console.log("hai");

    setFriends((prev) => [...prev, friend]);
    setRequests((prev) => {
      return prev.filter((f) => f.id.toString() !== friend.id.toString());
    });
  };

  const handleDeny = async (friend: User) => {
    await rejectFriend({
      variables: {
        friend: friend.id,
      },
    }).catch(debouncedError);

    setRequests((prev) => {
      return prev.filter((f) => f.id.toString() !== friend.id.toString());
    });
  };

  return (
    <>
      <h2>Friend Requests</h2>
      <div className={styles.friendList}>
        {requests.map((req, index) => {
          return (
            <>
              <FriendBox
                key={index}
                friend={req}
                handleAccept={handleAccept}
                handleDeny={handleDeny}
              />
            </>
          );
        })}
        {requests.length == 0 && <NoFriendBox description={"No Friend Requests"} />}
      </div>
      <hr />
    </>
  );
}
