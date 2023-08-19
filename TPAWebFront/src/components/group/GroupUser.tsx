import styles from "../../assets/styles/user/user.module.scss";
import UserFriendBox from "../friend/UserFriendBox.tsx";
import { Group } from "../../../gql/graphql.ts";

interface GroupUser {
    group: Group;
}
export default function GroupUser({ group }: GroupUser) {
    console.log(group.members);
    return (
        <>
            <div className={styles.contentBox}>
                <h2>User List</h2>
                <div className={styles.friendList}>
                    {group.members?.map((member, index) => {
                        if (!member.approved && !member.requested) return <></>;
                        const user = member.user!;
                        return (
                            <UserFriendBox
                                key={index}
                                friend={user}
                                username={""}
                            />
                        );
                    })}
                </div>
            </div>
        </>
    );
}
