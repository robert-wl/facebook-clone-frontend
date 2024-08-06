import styles from "@/assets/styles/story/stories.module.scss";
import Navbar from "@/components/navbar/Navbar.tsx";
import Sidebar from "@/components/sidebar/Sidebar.tsx";
import SidebarButton from "@/components/sidebar/SidebarButton.tsx";
import { useState } from "react";
import { IoAddOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { User } from "@/gql/graphql.ts";
import { GET_USER_WITH_STORIES } from "@/lib/query/story/getUserWithStories.graphql.ts";
import { debouncedError } from "@/utils/error-handler.ts";
import EmptyStory from "@/components/stories/EmptyStory.tsx";
import useAuth from "@/hooks/use-auth.ts";
import SafeImage from "@/components/SafeImage.tsx";

export default function StoriesHome() {
  const [friends, setFriends] = useState<User[]>([]);

  useQuery(GET_USER_WITH_STORIES, {
    onError: debouncedError,
    onCompleted: (data) => {
      setFriends(Array.from(new Set(data.getUserWithStories)));
    },
  });

  const { auth } = useAuth();

  if (auth)
    return (
      <>
        <div
          id={"page"}
          className={styles.page}>
          <Navbar />
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
                                active={false}
                                text={friend.firstName + " " + friend.lastName}>
                                <SafeImage
                                  src={friend.profile}
                                  type={"user-profile"}
                                  alt={"profile picture"}
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
                                active={false}
                                text={friend.firstName + " " + friend.lastName}>
                                <SafeImage
                                  src={friend.profile}
                                  type={"user-profile"}
                                  alt={"profile picture"}
                                />
                              </SidebarButton>
                            </Link>
                          </div>
                        );
                    })}
                </>
              </Sidebar>
            </>
            <EmptyStory />
          </div>
        </div>
      </>
    );
}
