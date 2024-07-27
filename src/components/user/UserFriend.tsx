import { User } from "@/gql/graphql.ts";
import styles from "@/assets/styles/user/user.module.scss";
import UserFriendBox from "@/components/friend/UserFriendBox.tsx";
import NoFriendBox from "@/components/friend/NoFriendBox.tsx";
import { useQuery } from "@apollo/client";
import { debouncedError } from "@/controller/errorHandler.ts";
import { GET_USER_MUTUALS } from "@/lib/query/friend/getUserMutuals.graphql.ts";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { GET_USER_FRIENDS } from "@/lib/query/friend/getUserFriends.graphql.ts";
import useAuth from "@/hooks/use-auth.ts";

interface UserFriend {
  isPost: boolean;
}

export default function UserFriend() {
  const [friends, setFriends] = useState<User[]>([]);
  const [mutuals, setMutuals] = useState<User[]>([]);
  const { username } = useParams();
  const { auth } = useAuth();

  useQuery(GET_USER_FRIENDS, {
    variables: {
      username: username,
    },
    onCompleted: (data) => {
      console.log("hai");
      setFriends(data.getUserFriends);
    },
    onError: debouncedError,
  });
  useQuery(GET_USER_MUTUALS, {
    variables: {
      username: username,
    },
    onCompleted: (data) => {
      setMutuals(data.getUserMutuals);
    },
    onError: debouncedError,
  });

  return (
    <>
      <div className={styles.contentBox}>
        {username != auth?.username && (
          <>
            <h2>Mutuals</h2>
            <div className={styles.friendList}>
              {mutuals.map((friend, index) => {
                return (
                  <UserFriendBox
                    key={index}
                    friend={friend}
                    username={username!}
                  />
                );
              })}
              {mutuals.length == 0 && <NoFriendBox description={"No mutuals"} />}
            </div>
          </>
        )}
        <h2>Friend List</h2>
        <div className={styles.friendList}>
          {friends?.map((friend, index) => {
            return (
              <>
                <UserFriendBox
                  key={index}
                  friend={friend}
                  username={username!}
                />
              </>
            );
          })}
          {friends?.length == 0 && <NoFriendBox description={"This user has no friends"} />}
        </div>
      </div>
    </>
  );
}
