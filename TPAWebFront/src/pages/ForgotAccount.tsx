import styles from "../assets/styles/forgotAccount/forgotAccount.module.scss";
import {Link} from "react-router-dom";
import {useMutation} from "@apollo/client";
import {FORGOT_PASSWORD} from "../../lib/query/user/forgotPassword.graphql.ts";
import {useState} from "react";
import errorHandler from "../../controller/errorHandler.ts";
import createToast from "../../controller/toast/handler.ts";


export default function ForgotAccount(){
    const [forgotPassword] = useMutation(FORGOT_PASSWORD);
    const [email, setEmail] = useState("");

    const handleSubmit = () => {
        if(email.length != 0){
            forgotPassword({
                variables: {
                    email: email
                }
            }).
            then(() => {
                createToast("Success: email sent", "green")
            }).
            catch(e => errorHandler(e))
        }
    }


    return (
        <div className={styles.page}>
            <div className={styles.box}>
                <h3>
                    Find your Account
                </h3>
                <hr />
                <p>
                    Please enter your email address to search for your account.
                </p>
                <input
                    placeholder="Email address"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <hr />
                <div>
                    <button>
                        <Link to="/login">
                            Cancel
                        </Link>
                    </button>
                    <button
                        onClick={() => handleSubmit()}
                    >
                        Search
                    </button>
                </div>
            </div>
        </div>
    )
}
