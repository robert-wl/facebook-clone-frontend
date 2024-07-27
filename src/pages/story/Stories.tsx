import styles from "@/assets/styles/story/stories.module.scss";
import Navbar from "@/components/navbar/Navbar.tsx";
import Sidebar from "@/components/sidebar/Sidebar.tsx";
import SidebarButton from "@/components/sidebar/SidebarButton.tsx";
import {useContext, useEffect, useState} from "react";
import {IoAddOutline} from "react-icons/io5";
import {Link, Navigate, useParams} from "react-router-dom";
import {useLazyQuery} from "@apollo/client";
import {GET_STORIES} from "@/lib/query/story/getStories.graphql.ts";
import {Story, User} from "@/gql/graphql.ts";
import StoryBox from "@/components/stories/StoryBox.tsx";
import {AuthContext} from "@/components/context/AuthContextProvider.tsx";
import {GET_USER_WITH_STORIES} from "@/lib/query/story/getUserWithStories.graphql.ts";
import {debouncedError} from "@/controller/errorHandler.ts";
import userProfileLoader from "@/controller/userProfileLoader.ts";

export default function Stories() {
  const [stories, setStories] = useState<Story[]>([]);
  const [friends, setFriends] = useState<User[]>([]);

  const [getUserWithStories] = useLazyQuery(GET_USER_WITH_STORIES, {
    onError: debouncedError,
  });

  const {username} = useParams();
  const {auth} = useContext(AuthContext);

  const [getStories] = useLazyQuery(GET_STORIES);

  useEffect(() => {
    getUserWithStories()
      .then((res) => {
        setFriends(Array.from(new Set(res.data.getUserWithStories)));
      })
      .catch(debouncedError);

    getStories({
      variables: {
        username: username,
      },
      fetchPolicy: "network-only",
    })
      .then((res) => {
        setStories(res.data.getStories);
      })
      .catch(debouncedError);
  }, [username]);

  if (friends.length != 0 && friends.filter((friend) => friend.username == username).length == 0) {
    return <Navigate to={"/stories/create"}/>;
  }

  if (auth && username)
    return (
      <>
        <div
          id={"page"}
          className={styles.page}>
          <Navbar/>
          <div className={styles.content}>
            <>
              <Sidebar title={"Stories"}>
                <>
                  <div className={styles.top}>My Stories</div>
                  <div>
                    <Link to={"/stories/create"}>
                      <SidebarButton
                        active={false}
                        text={"Create a Story"}>
                        <IoAddOutline
                          color={"black"}
                          size={"1.5rem"}
                        />
                      </SidebarButton>
                    </Link>
                  </div>
                  {friends &&
                    friends.map((friend, index) => {
                      if (auth?.username == friend.username)
                        return (
                          <div
                            key={index}
                            className={styles.friend}>
                            <Link to={"/stories/" + friend.username}>
                              <SidebarButton
                                active={username == friend.username}
                                text={friend.firstName + " " + friend.lastName}>
                                <img
                                  src={userProfileLoader(friend.profile)}
                                  alt={""}
                                />
                              </SidebarButton>
                            </Link>
                          </div>
                        );
                    })}
                  <div className={styles.top}>All Stories</div>
                  {friends &&
                    friends.map((friend, index) => {
                      if (auth?.username != friend.username)
                        return (
                          <div
                            key={index}
                            className={styles.friend}>
                            <Link to={"/stories/" + friend.username}>
                              <SidebarButton
                                active={username == friend.username}
                                text={friend.firstName + " " + friend.lastName}>
                                <img
                                  src={userProfileLoader(friend.profile)}
                                  alt={""}
                                />
                              </SidebarButton>
                            </Link>
                          </div>
                        );
                    })}
                  {friends.length == 0 || (friends.length == 1 && friends[0].username == auth?.username &&
                      <h5>No available stories</h5>)}
                </>
              </Sidebar>
            </>
            {stories?.length > 0 && (
              <StoryBox
                key={Date.now()}
                stories={stories}
              />
            )}
          </div>
        </div>
      </>
    );
}
