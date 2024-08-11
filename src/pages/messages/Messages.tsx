import styles from "@/assets/styles/messages/messages.module.scss";
import Navbar from "@/components/navbar/Navbar.tsx";
import { Link, useParams } from "react-router-dom";
import { AiOutlineSearch } from "react-icons/ai";
import { useEffect, useMemo, useState } from "react";
import { useQuery } from "@apollo/client";
import { GET_CONVERSATIONS } from "@/lib/query/message/getConversations.graphql.ts";
import { Conversation } from "@/gql/graphql.ts";
import { debouncedError } from "@/utils/error-handler.ts";
import MessageBox from "@/components/message/MessageBox.tsx";
import useAuth from "@/hooks/use-auth.ts";
import SafeImage from "@/components/SafeImage.tsx";

export default function Messages() {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [filter, setFilter] = useState<string>("");
  const { conversationID } = useParams();
  const { auth } = useAuth();
  const { data: conversationData } = useQuery(GET_CONVERSATIONS, {
    fetchPolicy: "network-only",
    onError: debouncedError,
  });

  const filteredConversations = useMemo(() => {
    return conversations
      .filter((conv) => {
        const user = conv.users[0].user.username == auth?.username ? conv.users[1]?.user : conv.users[0]?.user;
        const name = user.firstName + " " + user.lastName;
        return name.toLowerCase().includes(filter.toLowerCase());
      })
      .sort((a, b) => new Date(b.lastSentMessageTime).getTime() - new Date(a.lastSentMessageTime).getTime());
  }, [conversations, filter]);

  useEffect(() => {
    if (conversationData) {
      setConversations(conversationData.getConversations);
    }
  }, [conversationData]);

  return (
    <>
      <div
        id={"page"}
        className={styles.page}>
        <Navbar />
        <div className={styles.content}>
          <div className={styles.conversation}>
            <div className={styles.bar}>
              <header>
                <div className={styles.bio}>
                  <h2>Messages</h2>
                </div>
              </header>
              <hr />
              <div className={styles.content}>
                <div className={styles.search}>
                  <AiOutlineSearch size={"1.2rem"} />
                  <input
                    type={"text"}
                    placeholder={"Seach Messenger"}
                    onChange={(e) => setFilter(e.target.value)}
                  />
                </div>
                <div className={styles.messageContainer}>
                  {filteredConversations.length > 0 ? (
                    filteredConversations.map((conv, index) => {
                      if (conv.group) {
                        return (
                          <div
                            key={index}
                            className={conv.id.toString() === conversationID ? styles.messageActive : styles.message}>
                            <Link to={"/messages/" + conv.id}>
                              <SafeImage
                                src={conv.group.background}
                                type={"group-background"}
                                alt={"group background"}
                              />
                              <div className={styles.content}>
                                <h3>{conv.group.name}</h3>
                                <p>{conv.lastMessage}</p>
                              </div>
                            </Link>
                          </div>
                        );
                      }

                      if (conv.users[0] && conv.users[1]) {
                        const user = conv.users[0].user.username == auth?.username ? conv.users[1].user : conv.users[0].user;

                        return (
                          <div
                            key={index}
                            className={conv.id.toString() === conversationID ? styles.messageActive : styles.message}>
                            <Link to={"/messages/" + conv.id}>
                              <SafeImage
                                src={user.profile}
                                type={"user-profile"}
                                alt={"profile picture"}
                              />
                              <div className={styles.content}>
                                <h3>
                                  {user.firstName} {user.lastName}
                                </h3>
                                <p dangerouslySetInnerHTML={{ __html: conv.lastMessage ?? "" }} />
                              </div>
                            </Link>
                          </div>
                        );
                      }
                    })
                  ) : (
                    <div className={styles.noMessage}>
                      <h3>No conversations found</h3>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className={styles.barSpace} />
            {conversationID ? (
              <>
                <MessageBox
                  setConversations={setConversations}
                  key={conversationID}
                />
              </>
            ) : (
              <div className={styles.empty}>
                <h3>Start a new conversation</h3>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
