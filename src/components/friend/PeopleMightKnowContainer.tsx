import styles from "@/assets/styles/user/user.module.scss";
import { useQuery } from "@apollo/client";
import { GET_PEOPLE_MIGHT_KNOW } from "@/lib/query/friend/getPeopleMightKnow.graphql.ts";
import { debouncedError } from "@/utils/error-handler.ts";
import { User } from "@/gql/graphql.ts";
import { useState } from "react";
import RecommendFriendBox from "./RecommendFriendBox.tsx";
import { motion } from "framer-motion";

export default function PeopleMightKnowContainer() {
  const [people, setPeople] = useState<User[]>([]);

  const { loading } = useQuery(GET_PEOPLE_MIGHT_KNOW, {
    onError: debouncedError,
    fetchPolicy: "no-cache",
    onCompleted: (data) => {
      const ppl = data.getPeopleMightKnow as User[];
      setPeople(ppl);
    },
  });
  return (
    <motion.div
      className={styles.peopleMightKnow}
      initial={{ height: "0", opacity: 0 }}
      animate={{ height: "25rem", opacity: 1 }}
      exit={{ height: "0", opacity: 0, margin: 0, padding: 0 }}>
      <h3>People you may know</h3>
      <div className={styles.content}>
        {!loading && people.length == 0 && <h4>Unavailable</h4>}
        {people.map((person) => {
          return (
            <>
              <RecommendFriendBox
                key={person.id}
                friend={person}
                setFriends={setPeople}
              />
            </>
          );
        })}
      </div>
    </motion.div>
  );
}
