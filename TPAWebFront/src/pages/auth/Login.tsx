import styles from "../../assets/styles/login/login.module.scss";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { AUTHENTICATE_USER } from "../../../lib/query/user/authenticateUser.graphql.ts";
import { FormEvent, useContext, useState } from "react";
import Toastify from "toastify-js";
import { debouncedError } from "../../../controller/errorHandler.ts";
import { AuthContext } from "../../components/context/AuthContextProvider.tsx";
import Footer from "../../components/misc/Footer.tsx";

export default function Login() {
    const [authenticateUser] = useMutation(AUTHENTICATE_USER);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const { getUser } = useContext(AuthContext);
    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        let error = "Unknown error";
        if (email.length == 0) {
            error = "Error: Email cannot be empty";
        } else if (password.length == 0) {
            error = "Error: Password cannot be empty";
        } else {
            return authenticateUser({
                variables: {
                    email: email,
                    password: password,
                },
            })
                .then(async (token) => {
                    localStorage.setItem("token", token.data.authenticateUser);

                    if (getUser) {
                        await getUser();
                    }
                    return navigate("/");
                })
                .catch(debouncedError);
        }
        Toastify({
            text: error,
            style: {
                background: "red",
            },
        }).showToast();
    };

    return (
        <div className={styles.page}>
            <h5>FaREbook</h5>
            <div className={styles.loginBox}>
                <p>Log in to Facebook</p>
                <form className={styles.inputBox}>
                    <input
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className={styles.email}
                        placeholder={"Email address"}
                        autoComplete={"on"}
                    />
                    <input
                        type={"password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className={styles.password}
                        placeholder={"Password"}
                        autoComplete={"on"}
                    />
                    <button onClick={(e) => handleSubmit(e)}>
                        <h3>Log in</h3>
                    </button>
                    <p>
                        <Link to={"/forgot"}>Forgot Account</Link>
                    </p>
                    <hr />
                    <button className={styles.newAccount}>
                        <Link to={"/register"}>Create new account</Link>
                    </button>
                </form>
            </div>
            <Footer />
        </div>
    );
}
