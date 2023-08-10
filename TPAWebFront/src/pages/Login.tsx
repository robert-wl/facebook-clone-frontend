import styles from "../assets/styles/login/login.module.scss"
import {Link, useNavigate} from "react-router-dom";
import {useMutation} from "@apollo/client";
import {AUTHENTICATE_USER} from "../../lib/query/user/authenticateUser.graphql.ts";
import {useContext, useState} from "react";
import Toastify from "toastify-js";
import errorHandler from "../../controller/errorHandler.ts";
import {AuthContext} from "../../components/context/AuthContextProvider.tsx";

export default function Login(){
    const [authenticateUser] = useMutation(AUTHENTICATE_USER);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const { getUser } = useContext(AuthContext);
    const handleSubmit = () => {
        let error = "Unknown error";
        if(email.length == 0){
            error = "Error: Email cannot be empty"
        }
        else if(password.length == 0){
            error = "Error: Password cannot be empty"
        }
        else {
            return authenticateUser({
                variables: {
                    email: email,
                    password: password
                }
            }).
            then((token) => {
                localStorage.setItem("token", token.data.authenticateUser)

                if (getUser) {
                    getUser();
                }
                return navigate("/")
            }).
            catch(err => errorHandler(err));
        }
        Toastify({
            text: error,
            style: {
                background: "red",
            },
        }).showToast();
    }



    return (
        <div className={styles.page}>
            <img src="https://static.xx.fbcdn.net/rsrc.php/y8/r/dF5SId3UHWd.svg"  alt=""/>
            <div className={styles.loginBox}>
                <p>
                    Log in to Facebook
                </p>
                <div className={styles.inputBox}>
                    <input
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className={styles.email}
                        placeholder={"Email address"}
                    />
                    <input
                        type={"password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className={styles.password}
                        placeholder={"Password"}
                    />
                    <button
                        onClick={() => handleSubmit()}
                    >
                        <h3>
                            Log in
                        </h3>
                    </button>
                    <p>
                        <Link to={"/forgot"}>
                            Forgot Account
                        </Link>
                    </p>
                    <hr />
                    <button className={styles.newAccount}>
                        <Link to={"/register"}>
                            Create new account
                        </Link>
                    </button>
                </div>
            </div>
        </div>
    )
}
