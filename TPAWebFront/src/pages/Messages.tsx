import styles from "../assets/styles/messages/messages.module.scss";
import Navbar from "../../components/navbar/Navbar.tsx";
import {Link, Navigate, useParams} from "react-router-dom";
import { AiOutlineSearch } from "react-icons/ai";
import { useContext, useEffect, useState } from "react";
import { useQuery, useSubscription } from "@apollo/client";
import { GET_CONVERSATIONS } from "../../lib/query/message/getConversations.graphql.ts";
import { Conversation, Message } from "../../gql/graphql.ts";
import errorHandler from "../../controller/errorHandler.ts";
import { AuthContext } from "../../components/context/AuthContextProvider.tsx";
import MessageInput from "../../components/message/MessageInput.tsx";
import { VIEW_CONVERSATION } from "../../lib/query/message/viewConversation.graphql.ts";

export default function Messages() {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const { conversationID } = useParams();
  const { auth } = useContext(AuthContext);
  const [stop, setStop] = useState<boolean>(false);
  const { data: conversationData } = useQuery(GET_CONVERSATIONS, {
    fetchPolicy: "network-only",
    onError: errorHandler,
  });

  const { data, error } = useSubscription(VIEW_CONVERSATION, {
    variables: {
      conversation: conversationID,
    },
    skip: stop
  });

  useEffect(() => {
    if (conversationData) {
      setConversations(conversationData.getConversations);
    }
  }, [conversationData]);

  // console.log(data.viewConversation)
  // console.log((!loading && !data.viewConversation))

  if(error && !error.message.includes("must be defined") && !stop) {
    return <Navigate to={"/messages"} />
  }
  else if(error && error.message.includes("must be defined") && !stop) {
    console.log(error)
    setStop(true)
  }

  return (
    <>
      <div id={"page"} className={styles.page}>
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
                  <input type={"text"} placeholder={"Seach Messenger"} />
                </div>
                <div className={styles.top}></div>
                <div className={styles.messageContainer}>
                  {conversations.length > 0 &&
                    conversations.map((conv, index) => {
                      const user =
                        conv.users[0].user.username == auth?.username
                          ? conv.users[1].user
                          : conv.users[0].user;

                      return (
                        <div
                          key={index}
                          className={
                            conv.id.toString() === conversationID
                              ? styles.messageActive
                              : styles.message
                          }
                        >
                          <Link to={"/messages/" + conv.id}>
                            <img
                              src={
                                user.profile
                                  ? user.profile
                                  : "../src/assets/default-profile.jpg"
                              }
                              alt={"profile picture"}
                            />
                            <div className={styles.content}>
                              <h3>
                                {user.firstName} {user.lastName}
                              </h3>
                              <p>
                                {conv.messages
                                  ? conv.messages[conv.messages.length - 1]
                                      ?.message
                                  : ""}
                              </p>
                            </div>
                          </Link>
                        </div>
                      );
                    })}
                </div>
              </div>
            </div>
            <div className={styles.barSpace} />
            {conversationID ? (
              <>
                <div className={styles.chat}>
                  <MessageInput conversationID={conversationID} />
                  {data &&
                    data.viewConversation.map((message: Message) => {
                      return (
                           <>
                                {message.sender.username == auth?.username ? (
                                     <div className={styles.chatReceiver}>
                                          <div>
                                               {message.image ? (
                                                    <img src={message.image}  alt={""}/>
                                               ) : (
                                                    message.message
                                               )}
                                          </div>
                                     </div>
                                ) : (
                                     <div className={styles.chatSender}>
                                       <div>
                                         {message.image ? (
                                             <img src={message.image}  alt={""}/>
                                         ) : (
                                             message.message
                                         )}
                                       </div>
                                     </div>
                                )}
                           </>
                      );
                    })}
                </div>
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
