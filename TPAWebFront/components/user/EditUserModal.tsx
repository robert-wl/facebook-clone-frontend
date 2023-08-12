import styles from "../../src/assets/styles/user/editUser.module.scss";
import { Dispatch, SetStateAction, useState } from "react";
import { User } from "../../gql/graphql";
import { useMutation } from "@apollo/client";
import { UPDATE_USER } from "../../lib/query/user/updateUser.graphql.ts";
import createToast from "../../controller/toast/handler.ts";
import errorHandler from "../../controller/errorHandler.ts";

interface EditUserModal {
    userDat: User;
    setUserDat: Dispatch<SetStateAction<User | null>>;
    setModalState: Dispatch<SetStateAction<boolean>>;
}

export default function EditUserModal({ userDat, setUserDat, setModalState }: EditUserModal) {
    const [user, setUser] = useState(userDat);
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [updateUser] = useMutation(UPDATE_USER);

    const handleClose = () => {
        setPassword("");
        setConfirmPassword("");
        setModalState(false);
    };

    const handleSubmit = () => {
        if (password != confirmPassword) {
            return createToast("Error: Password must be the same!", "red");
        }

        handleClose();

        updateUser({
            variables: {
                updateUser: {
                    firstName: user.firstName,
                    lastName: user.lastName,
                    password: password,
                    gender: user.gender,
                },
            },
        }).catch(errorHandler);

        if (userDat) setUserDat(user);
    };

    return (
        <div className={styles.page}>
            <div className={styles.registerBox}>
                <header>
                    <h2>Update Profile</h2>
                    <div
                        className={styles.close}
                        onClick={() => handleClose()}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            fill="black"
                            className="bi bi-x-lg"
                            viewBox="0 0 16 16"
                        >
                            <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z" />
                        </svg>
                    </div>
                </header>
                <div className={styles.inputBox}>
                    <div className={styles.inputName}>
                        <input
                            placeholder={"First Name"}
                            value={user.firstName}
                            onChange={(e) => setUser({ ...user, firstName: e.target.value })}
                        />
                        <input
                            placeholder={"Last Name"}
                            value={user.lastName}
                            onChange={(e) => setUser({ ...user, lastName: e.target.value })}
                        />
                    </div>
                    <input
                        type="password"
                        value={password}
                        placeholder={"Password"}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <input
                        type="password"
                        value={confirmPassword}
                        placeholder={"Confirm password"}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                    <label>Gender</label>
                    <div className={styles.genderBox}>
                        <label>
                            <p>Female</p>
                            <input
                                type="radio"
                                checked={user.gender == "female"}
                                onChange={() => setUser({ ...user, gender: "female" })}
                            />
                        </label>
                        <label>
                            <p>Male</p>
                            <input
                                type="radio"
                                checked={user.gender == "male"}
                                onChange={() => setUser({ ...user, gender: "male" })}
                            />
                        </label>
                        <label>
                            <p>Walmart</p>
                            <input
                                type="radio"
                                checked={user.gender == "walmart"}
                                onChange={() => setUser({ ...user, gender: "walmart" })}
                            />
                        </label>
                    </div>
                    <hr />
                    <button onClick={() => handleSubmit()}>Update Profile</button>
                </div>
            </div>
        </div>
    );
}
