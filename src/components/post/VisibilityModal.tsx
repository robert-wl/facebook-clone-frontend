import styles from "@/assets/styles/shareModal.module.scss";
import { AiOutlineClose, AiOutlineSearch } from "react-icons/ai";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import { GET_FRIENDS } from "@/lib/query/friend/getFriends.graphql.ts";
import { User } from "@/gql/graphql.ts";
import { debouncedError } from "@/controller/errorHandler.ts";
import userProfileLoader from "@/controller/userProfileLoader.ts";
import useAuth from "@/hooks/use-auth.ts";

interface VisibilityModal {
  setVisibilityModalState: Dispatch<SetStateAction<boolean>>;
  visibilityList: User[];
  setVisibilityList: Dispatch<SetStateAction<User[]>>;
}

export default function VisibilityModal({ setVisibilityModalState, visibilityList, setVisibilityList }: VisibilityModal) {
  const [friends, setFriends] = useState<User[]>([]);
  const [filteredFriends, setFilteredFriends] = useState<User[]>([]);
  const { auth } = useAuth();
  const { data } = useQuery(GET_FRIENDS, {
    onError: debouncedError,
  });

  useEffect(() => {
    if (data) {
      setFriends(data.getFriends);
      setFilteredFriends(data.getFriends);
    }
  }, [data, auth]);

  const handleCheck = (user: User) => {
    if (visibilityList.includes(user)) {
      const newList = visibilityList.filter((u) => u.id.toString() != user.id.toString());
      setVisibilityList(newList);
    } else {
      setVisibilityList([...visibilityList, user]);
    }
  };

  const handleFilter = (value: string) => {
    const filtered = friends.filter((user) => {
      const name = `${user.firstName} ${user.lastName}`;
      return name.toLowerCase().includes(value.toLowerCase());
    });
    setFilteredFriends(filtered);
  };
  return (
    <>
      <div className={styles.background}>
        <div className={styles.box}>
          <header>
            <h2>Manage Visibility</h2>
            <AiOutlineClose
              size={"1.5rem"}
              onClick={() => setVisibilityModalState(false)}
            />
          </header>
          <hr />
          <div>
            <div className={styles.content}>
              <AiOutlineSearch size={"1.2rem"} />
              <input
                type={"text"}
                placeholder={"Search friends..."}
                onChange={(e) => handleFilter(e.target.value)}
              />
            </div>
            <h4 onClick={() => setVisibilityModalState(false)}>Done</h4>
          </div>
          <div className={styles.friendList}>
            {filteredFriends.map((user, index) => {
              return (
                <div
                  key={index}
                  className={styles.friend}
                  onClick={() => handleCheck(user)}>
                  <div>
                    <img src={userProfileLoader(user.profile)} />
                    <span>
                      {user.firstName} {user.lastName}
                    </span>
                  </div>
                  <input
                    checked={visibilityList.includes(user)}
                    type={"checkbox"}
                    value={user.id}
                    onChange={() => handleCheck(user)}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
