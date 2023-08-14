import styles from "../../assets/styles/group/createGroupSidebar.module.scss";
import { Dispatch, SetStateAction, useContext } from "react";
import { AuthContext } from "../context/AuthContextProvider.tsx";
import createToast from "../../../controller/toast/handler.ts";
import { useMutation } from "@apollo/client";
import { CREATE_GROUP } from "../../../lib/query/group/createGroup.graphql.ts";
import { debouncedError } from "../../../controller/errorHandler.ts";

interface CreateGroupSidebar {
    groupData: { name: string; privacy: string; about: string };
    setGroupData: Dispatch<SetStateAction<{ name: string; privacy: string; about: string }>>;
}
export default function CreateGroupSidebar({ groupData, setGroupData }: CreateGroupSidebar) {
    const [createGroup] = useMutation(CREATE_GROUP);
    const { auth } = useContext(AuthContext);

    const handleSubmit = () => {
        if (groupData.name.length == 0) {
            return createToast("Error: please fill the group name", "red");
        }
        if (groupData.privacy.length == 0) {
            return createToast("Error: please fill the group privacy", "red");
        }
        if (groupData.about.length == 0) {
            return createToast("Error: please fill the group about", "red");
        }

        createGroup({
            variables: {
                group: {
                    name: groupData.name,
                    about: groupData.about,
                    privacy: groupData.privacy.toLowerCase(),
                },
            },
        })
            .then((data) => {
                console.log(data);
            })
            .catch(debouncedError);
    };
    return (
        <>
            <div className={styles.barSpace} />
            <div className={styles.bar}>
                <header>
                    <div className={styles.bio}>
                        <h2>Create Group</h2>
                    </div>
                </header>
                <div className={styles.profile}>
                    <img
                        src={auth?.profile ?? ""}
                        alt={""}
                    />
                    <div className={styles.text}>
                        <h3>
                            {auth?.firstName} {" " + auth?.lastName}
                        </h3>
                        <p>Admin</p>
                    </div>
                </div>
                <hr />
                <div className={styles.content}>
                    <input
                        value={groupData.name}
                        type={"text"}
                        placeholder={"Group name..."}
                        onChange={(e) =>
                            setGroupData({
                                ...groupData,
                                name: e.target.value,
                            })
                        }
                    />
                    <select
                        value={groupData.privacy}
                        onChange={(e) =>
                            setGroupData({
                                ...groupData,
                                privacy: e.target.value,
                            })
                        }
                    >
                        <option value={"Public"}>Public</option>
                        <option value={"Private"}>Private</option>
                    </select>
                    <textarea
                        value={groupData.about}
                        placeholder={"About group..."}
                        onChange={(e) =>
                            setGroupData({
                                ...groupData,
                                about: e.target.value,
                            })
                        }
                    />
                </div>
                <footer>
                    <div className={styles.buttons}>
                        <button>Cancel</button>
                        <button onClick={() => handleSubmit()}>Post</button>
                    </div>
                </footer>
            </div>
        </>
    );
}
