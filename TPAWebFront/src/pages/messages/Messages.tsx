import styles from "../../assets/styles/messages/messages.module.scss";
import Navbar from "../../components/navbar/Navbar.tsx";
import { Link, Navigate, useParams } from "react-router-dom";
import { AiOutlineSearch } from "react-icons/ai";
import { useContext, useEffect, useState } from "react";
import { useQuery, useSubscription } from "@apollo/client";
import { GET_CONVERSATIONS } from "../../../lib/query/message/getConversations.graphql.ts";
import { Conversation, Message } from "../../../gql/graphql.ts";
import errorHandler from "../../../controller/errorHandler.ts";
import { VIEW_CONVERSATION } from "../../../lib/query/message/viewConversation.graphql.ts";
import { AuthContext } from "../../components/context/AuthContextProvider.tsx";
import MessageInput from "../../components/message/MessageInput.tsx";

export default function Messages() {
    const [conversations, setConversations] = useState<Conversation[]>([]);
    const [filteredConversations, setFilteredConversations] = useState<Conversation[]>([]);
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
        skip: stop,
    });

    useEffect(() => {
        if (conversationData) {
            setConversations(conversationData.getConversations);
            setFilteredConversations(conversationData.getConversations);
        }
    }, [conversationData]);

    const handleFilter = (filter: string) => {
        const filtered = conversations.filter((conv) => {
            const user = conv.users[0].user.username == auth?.username ? conv.users[1].user : conv.users[0].user;
            const name = user.firstName + " " + user.lastName;
            return name.toLowerCase().includes(filter.toLowerCase());
        });

        setFilteredConversations(filtered);
    };
    // console.log(data.viewConversation)
    // console.log((!loading && !data.viewConversation))

    if (error && !error.message.includes("must be defined") && !stop) {
        return <Navigate to={"/messages"} />;
    } else if (error && error.message.includes("must be defined") && !stop) {
        setStop(true);
    }

    return (
        <>
            <div
                id={"page"}
                className={styles.page}
            >
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
                                        onChange={(e) => handleFilter(e.target.value)}
                                    />
                                </div>
                                <div className={styles.top}></div>
                                <div className={styles.messageContainer}>
                                    {filteredConversations.length > 0 &&
                                        filteredConversations.map((conv, index) => {
                                            console.log(conv.group);
                                            if (conv.users[0] && conv.users[1]) {
                                                const user = conv.users[0].user.username == auth?.username ? conv.users[1].user : conv.users[0].user;

                                                return (
                                                    <div
                                                        key={index}
                                                        className={conv.id.toString() === conversationID ? styles.messageActive : styles.message}
                                                    >
                                                        <Link to={"/messages/" + conv.id}>
                                                            <img
                                                                src={user.profile ? user.profile : "../src/assets/default-profile.jpg"}
                                                                alt={"profile picture"}
                                                            />
                                                            <div className={styles.content}>
                                                                <h3>
                                                                    {user.firstName} {user.lastName}
                                                                </h3>
                                                                <p>{conv.messages ? conv.messages[conv.messages.length - 1]?.message : ""}</p>
                                                            </div>
                                                        </Link>
                                                    </div>
                                                );
                                            }
                                            if (conv.group) {
                                                return (
                                                    <div
                                                        key={index}
                                                        className={conv.id.toString() === conversationID ? styles.messageActive : styles.message}
                                                    >
                                                        <Link to={"/messages/" + conv.id}>
                                                            <img
                                                                src={conv.group.background ? conv.group.background : "../src/assets/default-profile.jpg"}
                                                                alt={"profile picture"}
                                                            />
                                                            <div className={styles.content}>
                                                                <h3>{conv.group.name}</h3>
                                                                <p>{conv.messages ? conv.messages[conv.messages.length - 1]?.message : ""}</p>
                                                            </div>
                                                        </Link>
                                                    </div>
                                                );
                                            }
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
                                                                    <img
                                                                        src={message.image}
                                                                        alt={""}
                                                                    />
                                                                ) : message.post ? (
                                                                    <div className={styles.post}>
                                                                        <header>
                                                                            <img
                                                                                src={message.post.user.profile ? message.post.user.profile : "../src/assets/default-profile.jpg"}
                                                                                alt={""}
                                                                            />
                                                                            {message.post.user.firstName} {message.post.user.lastName}
                                                                        </header>
                                                                        <div className={styles.content}>
                                                                            <img
                                                                                src={message.post.files ? message.post.files[0]! : ""}
                                                                                alt={""}
                                                                            />
                                                                            {message.post.content}
                                                                        </div>
                                                                    </div>
                                                                ) : (
                                                                    message.message
                                                                )}
                                                            </div>
                                                        </div>
                                                    ) : (
                                                        <div className={styles.chatSender}>
                                                            <div>
                                                                {message.image ? (
                                                                    <img
                                                                        src={message.image}
                                                                        alt={""}
                                                                    />
                                                                ) : message.post ? (
                                                                    <div className={styles.post}>
                                                                        <header>
                                                                            <img
                                                                                src={message.post.user.profile ? message.post.user.profile : "../src/assets/default-profile.jpg"}
                                                                                alt={""}
                                                                            />
                                                                            {message.post.user.firstName} {message.post.user.lastName}
                                                                        </header>
                                                                        <div className={styles.content}>
                                                                            <img
                                                                                src={message.post.files ? message.post.files[0]! : ""}
                                                                                alt={""}
                                                                            />
                                                                            {message.post.content}
                                                                        </div>
                                                                    </div>
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
