import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { User } from "@/gql/graphql.ts";
import { useMutation, useQuery } from "@apollo/client";
import { debouncedError } from "@/controller/errorHandler.ts";
import styles from "@/assets/styles/shareModal.module.scss";
import { AiOutlineSearch } from "react-icons/ai";
import { MdOutlineArrowForwardIos } from "react-icons/md";
import { GET_GROUP_INVITE } from "@/lib/query/group/getGroupInvite.graphql.ts";
import { useParams } from "react-router-dom";
import { INVITE_TO_GROUP } from "@/lib/query/group/inviteToGroup.graphql.ts";
import userProfileLoader from "@/controller/userProfileLoader.ts";
import useAuth from "@/hooks/use-auth.ts";

interface IProps {
  inviteModalState: boolean;
  setInviteModalState: Dispatch<SetStateAction<boolean>>;
}

export default function InviteGroupModal({ inviteModalState, setInviteModalState }: IProps) {
  const { groupId } = useParams();
  const [friends, setFriends] = useState<User[]>([]);
  const [filteredFriends, setFilteredFriends] = useState<User[]>([]);
  const { data } = useQuery(GET_GROUP_INVITE, {
    variables: {
      id: groupId,
    },
    onError: debouncedError,
  });
  const [inviteToGroup] = useMutation(INVITE_TO_GROUP);
  const { auth } = useAuth();

  useEffect(() => {
    if (data && auth) {
      setFriends(data.getGroupInvite);
      setFilteredFriends(data.getGroupInvite);
    }
  }, [data]);

  const handleFilter = (filter: string) => {
    const filtered = friends.filter((user) => {
      const name = user.firstName + " " + user.lastName;
      return name.toLowerCase().includes(filter.toLowerCase());
    });

    setFilteredFriends(filtered);
  };

  const handleInvite = async (userID: string) => {
    await inviteToGroup({
      variables: {
        groupId: groupId,
        userId: userID,
      },
    }).catch(debouncedError);
    setInviteModalState(false);
  };

  return (
    <>
      {inviteModalState && (
        <div className={styles.background}>
          <div className={styles.box}>
            <header>
              <div>
                <h2>Invite to group</h2>
                <div onClick={() => setInviteModalState(false)}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    className="bi bi-x-lg"
                    viewBox="0 0 16 16">
                    <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z" />
                  </svg>
                </div>
              </div>
              <hr />
              <div className={styles.content}>
                <AiOutlineSearch size={"1.2rem"} />
                <input
                  type={"text"}
                  placeholder={"Search friends..."}
                  onChange={(e) => handleFilter(e.target.value)}
                />
              </div>
            </header>
            <div className={styles.friendList}>
              {filteredFriends.map((user, index) => {
                return (
                  <div
                    key={index}
                    className={styles.friend}
                    onClick={() => handleInvite(user.id)}>
                    <div>
                      <img
                        src={userProfileLoader(user.profile)}
                        alt={"profile picture"}
                      />
                      <span>
                        {user.firstName} {user.lastName}
                      </span>
                    </div>
                    <MdOutlineArrowForwardIos />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
